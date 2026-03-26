import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/* =========================================================
   Knight Rider Scanner — Canvas Drawing
   ========================================================= */
function drawKnightRider(ctx, W, H, time, audioData, status) {
  ctx.clearRect(0, 0, W, H);

  const centerY = H * 0.45;
  const barWidth = Math.min(W * 0.6, 500);
  const barX = (W - barWidth) / 2;

  // Speed based on status
  const speed =
    status === 'listening' ? 3
    : status === 'speaking' ? 2.5
    : status === 'thinking' ? 4
    : 1;
  const pos = (Math.sin(time * speed) + 1) / 2; // 0 to 1
  const lightX = barX + pos * barWidth;

  // "SYMPRIO" watermark text behind scanner
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.font = `${Math.min(120, W * 0.12)}px Inter, -apple-system, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('SYMPRIO', W / 2, centerY - 80);

  // Audio equalizer bars above scanner
  const eqBars = 40;
  const eqBarWidth = barWidth / eqBars;
  for (let i = 0; i < eqBars; i++) {
    const freq = audioData
      ? (audioData[i * 2] || 0) / 255
      : Math.sin(time * 2 + i * 0.4) * 0.15 + 0.15;
    const barH = status === 'idle' ? freq * 30 : freq * 80;
    const x = barX + i * eqBarWidth + 2;

    // Distance from scanner light affects brightness
    const distFromLight = Math.abs(x - lightX) / barWidth;
    const alpha = Math.max(0.1, 0.7 - distFromLight);

    ctx.fillStyle = `rgba(24, 90, 219, ${alpha})`;
    ctx.fillRect(x, centerY - barH - 15, eqBarWidth - 4, barH);

    // Mirror below
    ctx.fillStyle = `rgba(13, 148, 136, ${alpha * 0.3})`;
    ctx.fillRect(x, centerY + 15, eqBarWidth - 4, barH * 0.4);
  }

  // Draw the scanner track (dark line)
  ctx.beginPath();
  ctx.moveTo(barX, centerY);
  ctx.lineTo(barX + barWidth, centerY);
  ctx.strokeStyle = 'rgba(24, 90, 219, 0.15)';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Scanning light glow trail
  const glowRadius = status === 'listening' || status === 'speaking' ? 100 : 80;
  const gradient = ctx.createRadialGradient(lightX, centerY, 0, lightX, centerY, glowRadius);
  gradient.addColorStop(0, status === 'listening' ? 'rgba(24, 90, 219, 1)' : 'rgba(24, 90, 219, 0.8)');
  gradient.addColorStop(0.3, 'rgba(24, 90, 219, 0.3)');
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(barX - glowRadius, centerY - glowRadius / 2, barWidth + glowRadius * 2, glowRadius);

  // Bright center dot — outer glow
  ctx.beginPath();
  ctx.arc(lightX, centerY, 12, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(24, 90, 219, 0.6)';
  ctx.fill();

  // Bright center dot — white core
  ctx.beginPath();
  ctx.arc(lightX, centerY, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();

  // Horizontal light streak along the track
  const streakGrad = ctx.createLinearGradient(lightX - 60, 0, lightX + 60, 0);
  streakGrad.addColorStop(0, 'transparent');
  streakGrad.addColorStop(0.5, 'rgba(24, 90, 219, 0.4)');
  streakGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = streakGrad;
  ctx.fillRect(lightX - 60, centerY - 2, 120, 4);
}

/* =========================================================
   Main Component
   ========================================================= */
export default function AIMode() {
  const navigate = useNavigate();

  const [status, setStatus] = useState('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastReply, setLastReply] = useState("Hello. I'm Symprio AI. Tap the mic or speak to begin.");
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const recognitionRef = useRef(null);
  const ambientRef = useRef(null);
  const micStreamRef = useRef(null);
  const handleSendRef = useRef(null);
  const statusRef = useRef(status);
  const detectedLangRef = useRef('en-US');
  const timeRef = useRef(0);
  const lastFrameRef = useRef(performance.now());

  useEffect(() => { statusRef.current = status; }, [status]);

  /* ---- Ambient drone ---- */
  const createAmbientSound = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.03;
      gainNode.connect(ctx.destination);
      const osc1 = ctx.createOscillator(); osc1.type = 'sine'; osc1.frequency.value = 80;
      osc1.connect(gainNode); osc1.start();
      const osc2 = ctx.createOscillator(); osc2.type = 'sine'; osc2.frequency.value = 120;
      const gain2 = ctx.createGain(); gain2.gain.value = 0.5;
      osc2.connect(gain2); gain2.connect(gainNode); osc2.start();
      const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.1;
      const lfoGain = ctx.createGain(); lfoGain.gain.value = 10;
      lfo.connect(lfoGain); lfoGain.connect(osc1.frequency); lfo.start();
      return { ctx, gainNode, oscillators: [osc1, osc2, lfo] };
    } catch { return null; }
  }, []);

  /* ---- Mic analyser for canvas EQ bars ---- */
  const setupAudioVisualizer = useCallback((stream) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = ctx.createAnalyser();
      ctx.createMediaStreamSource(stream).connect(analyser);
      analyser.fftSize = 256;
      audioContextRef.current = ctx;
      analyserRef.current = analyser;
    } catch { /* no analyser */ }
  }, []);

  /* ---- TTS ---- */
  const speak = useCallback((text, lang) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang || detectedLangRef.current || 'en-US';
    u.rate = 1.0; u.pitch = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const langVoice = voices.find(v => v.lang.startsWith(u.lang.split('-')[0]));
    u.voice = langVoice || voices.find(v => v.name.includes('Google') || v.name.includes('Daniel')) || voices[0];
    u.onstart = () => setStatus('speaking');
    u.onend = () => { setStatus('idle'); setTimeout(() => startListening(), 300); };
    window.speechSynthesis.speak(u);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---- Chat send ---- */
  const handleSend = useCallback(async (text) => {
    const msg = (text || '').trim();
    if (!msg) return;
    const userMsg = { role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    setTranscript(msg);
    setStatus('thinking');
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `[Respond in the same language as the user's message] ${msg}`,
          history: [...messages.slice(-10), userMsg],
        }),
      });
      const data = await res.json();
      const reply = data.reply || "I'm having trouble connecting. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      setLastReply(reply);
      speak(reply, detectedLangRef.current);
    } catch {
      const err = 'Connection interrupted. Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: err }]);
      setLastReply(err);
      setStatus('idle');
    }
  }, [messages, speak]);

  useEffect(() => { handleSendRef.current = handleSend; }, [handleSend]);

  /* ---- Speech recognition ---- */
  const startListening = useCallback(() => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (statusRef.current === 'thinking' || statusRef.current === 'speaking') return;
    try { rec.start(); setStatus('listening'); } catch { /* already running */ }
  }, []);

  const stopListening = useCallback(() => {
    const rec = recognitionRef.current;
    if (!rec) return;
    try { rec.stop(); } catch { /* not running */ }
    setStatus('idle');
  }, []);

  const toggleListening = useCallback(() => {
    if (statusRef.current === 'listening') stopListening();
    else if (statusRef.current === 'idle') startListening();
  }, [startListening, stopListening]);

  /* ---- Init everything on mount ---- */
  useEffect(() => {
    // Preload TTS voices
    if ('speechSynthesis' in window) window.speechSynthesis.getVoices();

    // Ambient sound
    const ambient = createAmbientSound();
    ambientRef.current = ambient;

    // Speech recognition
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      const recognition = new SR();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = '';
      let finalTranscript = '';

      recognition.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
            if (result[0].lang) detectedLangRef.current = result[0].lang;
          } else {
            interim += result[0].transcript;
          }
        }
        setTranscript(finalTranscript || interim);
      };

      recognition.onend = () => {
        if (finalTranscript.trim() && statusRef.current === 'listening') {
          const msg = finalTranscript.trim();
          finalTranscript = '';
          setStatus('thinking');
          handleSendRef.current(msg);
        } else if (statusRef.current === 'listening') {
          try { recognition.start(); } catch { /* */ }
        }
      };

      recognition.onerror = (e) => {
        if (e.error === 'no-speech' && statusRef.current === 'listening') {
          try { recognition.start(); } catch { /* */ }
        }
      };

      recognitionRef.current = recognition;
    }

    // Mic stream
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      micStreamRef.current = stream;
      setupAudioVisualizer(stream);
      setTimeout(() => {
        if (recognitionRef.current) {
          try { recognitionRef.current.start(); setStatus('listening'); } catch { /* */ }
        }
      }, 500);
    }).catch(() => { /* no mic */ });

    // Canvas animation loop
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      canvas._resizeHandler = resizeCanvas;

      const loop = (now) => {
        const dt = (now - lastFrameRef.current) / 1000;
        lastFrameRef.current = now;
        timeRef.current += dt;

        // Gather audio data
        let audioData = null;
        if (analyserRef.current) {
          audioData = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(audioData);
        }

        drawKnightRider(ctx, canvas.width, canvas.height, timeRef.current, audioData, statusRef.current);
        animFrameRef.current = requestAnimationFrame(loop);
      };
      animFrameRef.current = requestAnimationFrame(loop);
    }

    // Cleanup
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (recognitionRef.current) { try { recognitionRef.current.stop(); } catch { /* */ } }
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (ambientRef.current) {
        ambientRef.current.oscillators.forEach(o => { try { o.stop(); } catch { /* */ } });
        try { ambientRef.current.ctx.close(); } catch { /* */ }
      }
      if (audioContextRef.current) { try { audioContextRef.current.close(); } catch { /* */ } }
      if (micStreamRef.current) micStreamRef.current.getTracks().forEach(t => t.stop());
      if (canvas && canvas._resizeHandler) {
        window.removeEventListener('resize', canvas._resizeHandler);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---- Mute toggle ---- */
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (ambientRef.current?.gainNode) ambientRef.current.gainNode.gain.value = next ? 0 : 0.03;
      return next;
    });
  }, []);

  /* ---- Text submit ---- */
  const handleTextSubmit = useCallback((e) => {
    e.preventDefault();
    const msg = textInput.trim();
    if (!msg) return;
    setTextInput('');
    setShowTextInput(false);
    if (recognitionRef.current) { try { recognitionRef.current.stop(); } catch { /* */ } }
    handleSend(msg);
  }, [textInput, handleSend]);

  /* ---- Status label ---- */
  const statusLabel =
    status === 'listening' ? 'LISTENING...'
    : status === 'thinking' ? 'PROCESSING...'
    : status === 'speaking' ? 'SPEAKING...'
    : 'TAP TO SPEAK';

  /* =======================================================
     RENDER
     ======================================================= */
  return (
    <div style={S.wrapper}>

      {/* Canvas fills screen */}
      <canvas ref={canvasRef} style={S.canvas} />

      {/* Top bar */}
      <header style={S.header}>
        <div style={S.headerLeft}>
          <span style={S.logo}>SYMPRIO</span>
          <span style={S.dot} className="ai-dot" />
          <span style={S.aiLabel}>AI</span>
        </div>
        <div style={S.headerRight}>
          <button onClick={toggleMute} style={S.glassBtn} title={isMuted ? 'Unmute' : 'Mute'}>
            {isMuted ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            )}
          </button>
          <button
            onClick={() => {
              if (recognitionRef.current) { try { recognitionRef.current.stop(); } catch { /* */ } }
              window.speechSynthesis.cancel();
              navigate('/');
            }}
            style={S.exitBtn}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Exit
          </button>
        </div>
      </header>

      {/* Status text — centered below scanner */}
      <div style={S.statusArea}>
        <p style={S.statusText}>{statusLabel}</p>
        {transcript && (status === 'listening' || status === 'thinking') && (
          <p style={S.transcript}>{transcript}</p>
        )}
      </div>

      {/* Bottom controls */}
      <div style={S.bottom}>
        {/* Last AI reply */}
        <div style={S.replyBubble} className="ai-bubble-in">
          <p style={S.replyText}>{lastReply}</p>
        </div>

        {/* Chat history overlay */}
        {showHistory && messages.length > 0 && (
          <div style={S.historyPanel} className="ai-history-scroll">
            {messages.map((m, i) => (
              <div
                key={i}
                className="ai-bubble-in"
                style={m.role === 'user' ? S.bubbleUser : S.bubbleAI}
              >
                <span style={{
                  fontSize: 10, textTransform: 'uppercase', letterSpacing: 1,
                  color: m.role === 'user' ? '#185ADB' : '#0D9488', fontWeight: 600, marginRight: 8,
                }}>
                  {m.role === 'user' ? 'You' : 'AI'}
                </span>
                {m.content}
              </div>
            ))}
          </div>
        )}

        {/* Control buttons */}
        <div style={S.controls}>
          <button onClick={() => setShowHistory(!showHistory)} style={S.pillBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span style={{ fontSize: 11 }}>{showHistory ? 'Hide' : 'History'}</span>
          </button>

          <button
            onClick={toggleListening}
            style={{
              ...S.micBtn,
              background: status === 'listening' ? '#dc2626' : '#185ADB',
              boxShadow: status === 'listening'
                ? '0 0 0 4px rgba(220,38,38,0.3), 0 0 30px rgba(220,38,38,0.25)'
                : '0 0 0 2px rgba(24,90,219,0.15)',
            }}
            className={status === 'listening' ? 'ai-mic-pulse' : ''}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>

          <button onClick={() => setShowTextInput(!showTextInput)} style={S.pillBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M6 16h12"/>
            </svg>
            <span style={{ fontSize: 11 }}>Type</span>
          </button>
        </div>

        {/* Text input (toggle) */}
        {showTextInput && (
          <form onSubmit={handleTextSubmit} style={S.textForm}>
            <input
              autoFocus
              value={textInput}
              onChange={e => setTextInput(e.target.value)}
              placeholder="Type your message..."
              style={S.textInput}
            />
            <button type="submit" style={S.sendBtn} disabled={!textInput.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes bubbleIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ai-bubble-in {
          animation: bubbleIn 0.4s ease-out both;
        }

        @keyframes aiDotPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 4px #22c55e; }
          50% { opacity: 0.4; box-shadow: 0 0 8px #22c55e, 0 0 16px #22c55e; }
        }
        .ai-dot { animation: aiDotPulse 2s ease-in-out infinite; }

        @keyframes micPulse {
          0% { box-shadow: 0 0 0 4px rgba(220,38,38,0.3), 0 0 30px rgba(220,38,38,0.25); }
          50% { box-shadow: 0 0 0 10px rgba(220,38,38,0.1), 0 0 50px rgba(220,38,38,0.15); }
          100% { box-shadow: 0 0 0 4px rgba(220,38,38,0.3), 0 0 30px rgba(220,38,38,0.25); }
        }
        .ai-mic-pulse { animation: micPulse 1.5s ease-in-out infinite; }

        .ai-history-scroll::-webkit-scrollbar { width: 4px; }
        .ai-history-scroll::-webkit-scrollbar-track { background: transparent; }
        .ai-history-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>
    </div>
  );
}

/* =========================================================
   Inline Styles
   ========================================================= */
const S = {
  wrapper: {
    position: 'fixed', inset: 0, zIndex: 9999,
    background: '#050510',
    color: '#fff',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    overflow: 'hidden',
  },

  canvas: {
    position: 'absolute', inset: 0, zIndex: 1,
    width: '100%', height: '100%',
  },

  /* Header */
  header: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 32px',
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 10 },
  logo: { fontSize: 20, fontWeight: 800, letterSpacing: '0.15em', color: '#fff' },
  dot: {
    width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block',
  },
  aiLabel: { fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 },
  headerRight: { display: 'flex', alignItems: 'center', gap: 12 },
  glassBtn: {
    width: 44, height: 44, borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    color: 'rgba(255,255,255,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
  },
  exitBtn: {
    display: 'flex', alignItems: 'center',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    color: 'rgba(255,255,255,0.7)',
    padding: '10px 20px', borderRadius: 12,
    cursor: 'pointer', fontSize: 14, fontWeight: 500,
    transition: 'background 0.2s',
  },

  /* Status text below scanner */
  statusArea: {
    position: 'absolute', bottom: '35%', left: 0, right: 0, zIndex: 10,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    pointerEvents: 'none',
  },
  statusText: {
    fontSize: 13, fontWeight: 600, letterSpacing: '0.3em',
    color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
    margin: 0,
  },
  transcript: {
    marginTop: 8, fontSize: 15, color: 'rgba(255,255,255,0.3)',
    fontStyle: 'italic', textAlign: 'center', maxWidth: 500,
    padding: '0 20px', lineHeight: 1.5,
  },

  /* Bottom panel */
  bottom: {
    position: 'absolute', bottom: 40, left: 0, right: 0, zIndex: 20,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 14, padding: '0 28px',
  },

  /* Reply bubble */
  replyBubble: {
    maxWidth: 600, width: '100%',
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 16, padding: '16px 24px',
    marginBottom: 10,
  },
  replyText: {
    margin: 0, fontSize: 15, color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.6,
  },

  /* History */
  historyPanel: {
    maxWidth: 500, width: '100%', maxHeight: 300, overflowY: 'auto',
    display: 'flex', flexDirection: 'column', gap: 6,
    padding: '4px 0', marginBottom: 10,
  },
  bubbleUser: {
    fontSize: 13, color: 'rgba(255,255,255,0.6)',
    padding: '10px 14px',
    background: 'linear-gradient(135deg, rgba(24,90,219,0.15), rgba(24,90,219,0.08))',
    borderRadius: 12, lineHeight: 1.5,
    alignSelf: 'flex-end', maxWidth: '85%',
    marginLeft: 'auto',
  },
  bubbleAI: {
    fontSize: 13, color: 'rgba(255,255,255,0.55)',
    padding: '10px 14px',
    background: 'rgba(255,255,255,0.03)',
    borderLeft: '2px solid rgba(24,90,219,0.3)',
    borderRadius: 12, lineHeight: 1.5,
    alignSelf: 'flex-start', maxWidth: '85%',
  },

  /* Controls row */
  controls: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 16,
  },
  pillBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: 12, padding: '10px 18px',
    color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
    fontSize: 12, transition: 'background 0.2s',
  },
  micBtn: {
    width: 64, height: 64, borderRadius: '50%',
    border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'box-shadow 0.3s, background 0.3s',
    flexShrink: 0,
  },

  /* Text input */
  textForm: {
    display: 'flex', alignItems: 'center', gap: 8,
    maxWidth: 500, width: '100%', marginTop: 2,
  },
  textInput: {
    flex: 1,
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: 12, padding: '14px 18px',
    color: '#fff', fontSize: 14, outline: 'none',
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 12,
    border: 'none', background: '#185ADB',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0,
  },
};
