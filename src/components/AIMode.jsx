import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Conversation } from '@11labs/client';

/* =========================================================
   KITT Scanner — Canvas Drawing (Knight Rider diamond bars)
   ========================================================= */
function drawKITT(ctx, W, H, time, audioData, status) {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, W, H);

  const centerX = W / 2;
  const centerY = H * 0.42;

  // Scale bars to ~35% of screen width
  const scale = Math.min(W * 0.35 / 160, 2.2);
  const barH = 22 * scale;
  const barGap = 6 * scale;
  const colGap = 16 * scale;

  // Column configs: x offset multiplier, bar count, max width
  const columns = [
    { x: -1, bars: 3, maxW: 140 * scale },
    { x: 0,  bars: 5, maxW: 160 * scale },
    { x: 1,  bars: 3, maxW: 140 * scale },
  ];

  // Scanner sweep speed varies by status
  const speed =
    status === 'listening' ? 2.5
    : status === 'speaking' ? 2
    : status === 'thinking' ? 3.5
    : 1.2;
  const scanPos = Math.sin(time * speed); // -1 to 1

  // Reset shadow before drawing bars
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  columns.forEach(col => {
    const colX = centerX + col.x * (col.maxW + colGap);
    const totalH = col.bars * barH + (col.bars - 1) * barGap;
    const startY = centerY - totalH / 2;

    for (let i = 0; i < col.bars; i++) {
      // Diamond shape: widest in center row, narrower at edges
      const centerIdx = (col.bars - 1) / 2;
      const distFromCenter = centerIdx === 0 ? 0 : Math.abs(i - centerIdx) / centerIdx;
      const barW = col.maxW * (1 - distFromCenter * 0.35);

      const y = startY + i * (barH + barGap);
      const x = colX - barW / 2;

      // Brightness: scanner proximity + bar position
      const colDist = Math.abs(scanPos - col.x * 0.8);
      const brightness = Math.max(0.15, 1 - colDist * 0.8 - distFromCenter * 0.3);

      // Audio reactivity
      const audioIdx = Math.abs(i + col.x * 3 + 10);
      const audioBoost = audioData ? (audioData[audioIdx] || 128) / 255 : 0.5;
      const finalBright = brightness * (0.6 + audioBoost * 0.4);

      // Red color with varying brightness
      const r = Math.floor(Math.min(255, finalBright * 255));
      const g = Math.floor(Math.min(255, finalBright * 20));

      // Draw bar with rounded corners
      ctx.save();
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.beginPath();
      const radius = 4 * scale;
      ctx.roundRect(x, y, barW, barH, radius);
      ctx.fillStyle = `rgb(${r}, ${g}, 0)`;
      ctx.fill();

      // Glow on bright bars
      if (finalBright > 0.6) {
        ctx.shadowColor = `rgba(255, 50, 0, ${finalBright * 0.5})`;
        ctx.shadowBlur = 20 * scale;
        ctx.fill();
      }
      ctx.restore();
    }
  });

  // Subtle horizontal scan glow
  const scanLineX = centerX + scanPos * 200 * scale;
  const scanGrad = ctx.createRadialGradient(scanLineX, centerY, 0, scanLineX, centerY, 100 * scale);
  scanGrad.addColorStop(0, 'rgba(255, 50, 0, 0.08)');
  scanGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = scanGrad;
  ctx.fillRect(0, centerY - 80 * scale, W, 160 * scale);
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
  const [lastReply, setLastReply] = useState("Hello. I'm Symprio AI. Tap the mic button to start a voice conversation, or use Type to chat.");
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const conversationRef = useRef(null);
  const themeAudioRef = useRef(null);
  const micStreamRef = useRef(null);
  const statusRef = useRef(status);
  const timeRef = useRef(0);
  const lastFrameRef = useRef(performance.now());

  useEffect(() => { statusRef.current = status; }, [status]);

  /* ---- Mic analyser for audio-reactive bars ---- */
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

  /* ---- ElevenLabs Conversational AI ---- */
  const initElevenLabs = useCallback(async () => {
    try {
      // Request mic permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const res = await fetch('/api/elevenlabs/signed-url');
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      const signedUrl = data.signedUrl || data.signed_url;
      if (!signedUrl) throw new Error('No signed URL in response');

      console.log('[ElevenLabs] Starting session...');
      const conversation = await Conversation.startSession({
        signedUrl,
        onConnect: () => {
          console.log('[ElevenLabs] Connected');
          setStatus('listening');
        },
        onDisconnect: () => {
          console.log('[ElevenLabs] Disconnected');
          setStatus('idle');
        },
        onMessage: (message) => {
          console.log('[ElevenLabs] Message:', message);
          if (message.source === 'user') {
            setTranscript(message.message);
            setMessages(prev => [...prev, { role: 'user', content: message.message }]);
          } else if (message.source === 'ai') {
            setLastReply(message.message);
            setMessages(prev => [...prev, { role: 'assistant', content: message.message }]);
          }
        },
        onModeChange: (mode) => {
          setStatus(mode.mode === 'speaking' ? 'speaking' : 'listening');
        },
        onError: (error) => {
          console.error('ElevenLabs error:', error);
          setLastReply('Connection issue. Tap mic to reconnect.');
          setStatus('idle');
        },
      });

      conversationRef.current = conversation;
    } catch (err) {
      console.error('[ElevenLabs] Failed:', err.message, err);
      if (err.name === 'NotFoundError' || err.message.includes('device not found')) {
        setLastReply('No microphone detected. Please connect a mic and tap the mic button, or use Type to chat.');
      } else if (err.name === 'NotAllowedError') {
        setLastReply('Microphone access denied. Please allow mic permission and tap the mic button to retry.');
      } else {
        setLastReply(`Voice connection issue. Tap mic to retry, or use Type to chat.`);
      }
      setStatus('idle');
    }
  }, []);

  /* ---- Toggle listening ---- */
  const toggleListening = useCallback(async () => {
    if (statusRef.current === 'listening' || statusRef.current === 'speaking') {
      // Stop conversation
      await conversationRef.current?.endSession();
      conversationRef.current = null;
      setStatus('idle');
    } else {
      // Start new conversation
      initElevenLabs();
    }
  }, [initElevenLabs]);

  /* ---- Init everything on mount ---- */
  useEffect(() => {
    // Knight Rider theme audio
    try {
      const audio = new Audio('/knight-rider.mp3');
      audio.loop = true;
      audio.volume = 0.15;
      audio.play().catch(() => { /* autoplay blocked */ });
      themeAudioRef.current = audio;
    } catch { /* no audio */ }

    // Try to get mic for visualizer — don't auto-start ElevenLabs
    // User clicks mic button to start voice conversation
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      micStreamRef.current = stream;
      setupAudioVisualizer(stream);
    }).catch(() => {
      console.log('[AIMode] No mic available — visualizer will use idle animation');
    });

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

        let audioData = null;
        if (analyserRef.current) {
          audioData = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(audioData);
        }

        drawKITT(ctx, canvas.width, canvas.height, timeRef.current, audioData, statusRef.current);
        animFrameRef.current = requestAnimationFrame(loop);
      };
      animFrameRef.current = requestAnimationFrame(loop);
    }

    // Cleanup
    return () => {
      if (conversationRef.current) conversationRef.current.endSession();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (themeAudioRef.current) { themeAudioRef.current.pause(); themeAudioRef.current = null; }
      if (audioContextRef.current) { try { audioContextRef.current.close(); } catch { /* */ } }
      if (micStreamRef.current) micStreamRef.current.getTracks().forEach(t => t.stop());
      if (canvas && canvas._resizeHandler) {
        window.removeEventListener('resize', canvas._resizeHandler);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---- Mute toggle (theme audio) ---- */
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (themeAudioRef.current) themeAudioRef.current.volume = next ? 0 : 0.15;
      return next;
    });
  }, []);

  /* ---- Text submit (Mistral fallback for typed messages) ---- */
  const handleTextSubmit = useCallback(async (e) => {
    e.preventDefault();
    const msg = textInput.trim();
    if (!msg) return;
    setTextInput('');
    setShowTextInput(false);
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setTranscript(msg);
    setStatus('thinking');
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: messages.slice(-10) }),
      });
      const data = await res.json();
      const reply = data.reply || 'Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      setLastReply(reply);
      setStatus('idle');
    } catch {
      setLastReply('Connection issue.');
      setStatus('idle');
    }
  }, [textInput, messages]);

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

      {/* Canvas fills entire screen */}
      <canvas
        ref={canvasRef}
        style={S.canvas}
        onClick={toggleListening}
      />

      {/* Top bar */}
      <header style={S.header}>
        <div style={S.headerLeft}>
          <span style={S.logo}>SYMPRIO</span>
          <span style={S.dot} className="kitt-dot" />
          <span style={S.aiLabel}>AI</span>
        </div>
        <div style={S.headerRight}>
          <button onClick={toggleMute} style={S.glassCircle} title={isMuted ? 'Unmute' : 'Mute'}>
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
            onClick={async () => {
              if (conversationRef.current) {
                await conversationRef.current.endSession();
                conversationRef.current = null;
              }
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

      {/* Status — below the scanner */}
      <div style={S.statusArea}>
        <p style={S.statusText}>{statusLabel}</p>
        {transcript && (status === 'listening' || status === 'thinking') && (
          <p style={S.transcript}>{transcript}</p>
        )}
      </div>

      {/* Bottom area */}
      <div style={S.bottom}>
        {/* Last reply bubble */}
        <div style={S.replyBubble} className="kitt-bubble-in">
          <p style={S.replyText}>{lastReply}</p>
        </div>

        {/* History overlay */}
        {showHistory && messages.length > 0 && (
          <div style={S.historyPanel} className="kitt-history-scroll">
            {messages.map((m, i) => (
              <div
                key={i}
                className="kitt-bubble-in"
                style={m.role === 'user' ? S.bubbleUser : S.bubbleAI}
              >
                <span style={{
                  fontSize: 10, textTransform: 'uppercase', letterSpacing: 1,
                  color: m.role === 'user' ? '#ff4444' : '#cc2222', fontWeight: 600, marginRight: 8,
                }}>
                  {m.role === 'user' ? 'You' : 'AI'}
                </span>
                {m.content}
              </div>
            ))}
          </div>
        )}

        {/* Controls */}
        <div style={S.controls}>
          <button onClick={() => setShowHistory(!showHistory)} style={S.pillBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span style={{ fontSize: 11 }}>{showHistory ? 'Hide' : 'History'}</span>
          </button>

          <button
            onClick={toggleListening}
            style={{
              ...S.micBtn,
              background: status === 'listening' ? '#dc2626' : 'rgba(255,255,255,0.08)',
              border: status === 'listening' ? '2px solid #ff4444' : '2px solid rgba(255,255,255,0.1)',
            }}
            className={status === 'listening' ? 'kitt-mic-pulse' : ''}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>

          <button onClick={() => setShowTextInput(!showTextInput)} style={S.pillBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
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
        .kitt-bubble-in {
          animation: bubbleIn 0.4s ease-out both;
        }

        @keyframes kittDotPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 4px #ff0000; }
          50% { opacity: 0.4; box-shadow: 0 0 8px #ff0000, 0 0 16px #ff0000; }
        }
        .kitt-dot { animation: kittDotPulse 2s ease-in-out infinite; }

        @keyframes micPulse {
          0% { box-shadow: 0 0 0 4px rgba(220,38,38,0.3), 0 0 30px rgba(220,38,38,0.25); }
          50% { box-shadow: 0 0 0 12px rgba(220,38,38,0.08), 0 0 50px rgba(220,38,38,0.15); }
          100% { box-shadow: 0 0 0 4px rgba(220,38,38,0.3), 0 0 30px rgba(220,38,38,0.25); }
        }
        .kitt-mic-pulse { animation: micPulse 1.5s ease-in-out infinite; }

        .kitt-history-scroll::-webkit-scrollbar { width: 4px; }
        .kitt-history-scroll::-webkit-scrollbar-track { background: transparent; }
        .kitt-history-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
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
    background: '#000000',
    color: '#fff',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    overflow: 'hidden',
  },

  canvas: {
    position: 'absolute', inset: 0, zIndex: 1,
    width: '100%', height: '100%',
    cursor: 'pointer',
  },

  /* Header */
  header: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 32px',
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 10 },
  logo: { fontSize: 18, fontWeight: 800, letterSpacing: '0.12em', color: '#fff' },
  dot: {
    width: 8, height: 8, borderRadius: '50%', background: '#ff0000', display: 'inline-block',
  },
  aiLabel: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: 1 },
  headerRight: { display: 'flex', alignItems: 'center', gap: 12 },
  glassCircle: {
    width: 40, height: 40, borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.08)',
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
    border: '1px solid rgba(255,255,255,0.08)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    color: 'rgba(255,255,255,0.7)',
    padding: '10px 20px', borderRadius: 10,
    cursor: 'pointer', fontSize: 14, fontWeight: 500,
    transition: 'background 0.2s',
  },

  /* Status text below scanner */
  statusArea: {
    position: 'absolute', top: '65%', left: 0, right: 0, zIndex: 10,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    pointerEvents: 'none',
  },
  statusText: {
    fontSize: 12, fontWeight: 600, letterSpacing: '0.3em',
    color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
    margin: 0,
  },
  transcript: {
    marginTop: 8, fontSize: 14, color: 'rgba(255,255,255,0.2)',
    fontStyle: 'italic', textAlign: 'center', maxWidth: 500,
    padding: '0 20px', lineHeight: 1.5,
  },

  /* Bottom panel */
  bottom: {
    position: 'absolute', bottom: 30, left: 0, right: 0, zIndex: 20,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 14, padding: '0 28px', maxWidth: 600, margin: '0 auto',
  },

  /* Reply bubble */
  replyBubble: {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 14, padding: '14px 20px',
    marginBottom: 6,
  },
  replyText: {
    margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.6,
  },

  /* History */
  historyPanel: {
    width: '100%', maxHeight: 280, overflowY: 'auto',
    display: 'flex', flexDirection: 'column', gap: 6,
    padding: '4px 0', marginBottom: 6,
  },
  bubbleUser: {
    fontSize: 13, color: 'rgba(255,255,255,0.6)',
    padding: '10px 14px',
    background: 'linear-gradient(135deg, rgba(220,38,38,0.15), rgba(220,38,38,0.08))',
    borderRadius: 12, lineHeight: 1.5,
    alignSelf: 'flex-end', maxWidth: '85%',
    marginLeft: 'auto',
  },
  bubbleAI: {
    fontSize: 13, color: 'rgba(255,255,255,0.55)',
    padding: '10px 14px',
    background: 'rgba(255,255,255,0.03)',
    borderLeft: '2px solid rgba(255,50,0,0.3)',
    borderRadius: 12, lineHeight: 1.5,
    alignSelf: 'flex-start', maxWidth: '85%',
  },

  /* Controls row */
  controls: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 14,
  },
  pillBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.08)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: 10, padding: '10px 18px', height: 40,
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
    fontSize: 13, transition: 'background 0.2s',
  },
  micBtn: {
    width: 64, height: 64, borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'box-shadow 0.3s, background 0.3s',
    flexShrink: 0,
  },

  /* Text input */
  textForm: {
    display: 'flex', alignItems: 'center', gap: 8,
    width: '100%', marginTop: 2,
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
    border: 'none', background: '#dc2626',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0,
  },
};
