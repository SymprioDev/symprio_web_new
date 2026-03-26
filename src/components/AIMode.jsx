import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

/* =========================================================
   Three.js Scene Factory
   ========================================================= */
function createScene(container) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45, container.clientWidth / container.clientHeight, 0.1, 1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Lights
  scene.add(new THREE.AmbientLight(0x404040, 0.5));
  const light1 = new THREE.PointLight(0x185ADB, 2, 50);
  light1.position.set(5, 5, 5);
  scene.add(light1);
  const light2 = new THREE.PointLight(0x0D9488, 1.5, 50);
  light2.position.set(-5, -3, 3);
  scene.add(light2);

  // Main morphing sphere
  const geometry = new THREE.IcosahedronGeometry(1.5, 20);
  const originalPositions = geometry.attributes.position.array.slice();
  const material = new THREE.MeshPhongMaterial({
    color: 0x185ADB,
    emissive: 0x0D9488,
    emissiveIntensity: 0.15,
    shininess: 100,
    transparent: true,
    opacity: 0.85,
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Outer wireframe shell
  const wireGeo = new THREE.IcosahedronGeometry(1.7, 8);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x185ADB,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  });
  const wireframe = new THREE.Mesh(wireGeo, wireMat);
  scene.add(wireframe);

  // Floating particles
  const particlesGeo = new THREE.BufferGeometry();
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x185ADB, size: 0.02, transparent: true, opacity: 0.4,
  });
  const particles = new THREE.Points(particlesGeo, particleMat);
  scene.add(particles);

  return { scene, camera, renderer, sphere, wireframe, particles, geometry, originalPositions };
}

/* =========================================================
   Animation loop (called every frame via rAF)
   ========================================================= */
function animateScene(threeRefs, analyserRef, statusRef) {
  const { scene, camera, renderer, sphere, wireframe, particles, geometry, originalPositions } = threeRefs;
  const time = Date.now() * 0.001;
  const currentStatus = statusRef.current;

  // Audio data
  let audioData = new Uint8Array(64);
  let avgFreq = 0;
  if (analyserRef.current) {
    audioData = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(audioData);
    avgFreq = audioData.reduce((a, b) => a + b, 0) / audioData.length / 255;
  }

  // Vertex displacement
  const pos = geometry.attributes.position.array;
  for (let i = 0; i < pos.length; i += 3) {
    const ox = originalPositions[i];
    const oy = originalPositions[i + 1];
    const oz = originalPositions[i + 2];
    const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
    const nx = ox / len;
    const ny = oy / len;
    const nz = oz / len;

    // Simplex-like noise via trig composition
    const noiseVal =
      Math.sin(ox * 3 + time * 0.8) *
      Math.cos(oy * 3 + time * 0.6) *
      Math.sin(oz * 3 + time * 0.7);

    // Map vertex angle to frequency bin
    const freqIndex = Math.abs(Math.floor((Math.atan2(ny, nx) / Math.PI + 1) * 32)) % 64;
    const audioVal = (audioData[freqIndex] || 0) / 255;

    // Status-driven displacement intensity
    let intensity = 0.05;
    if (currentStatus === 'listening') intensity = 0.08 + audioVal * 0.25;
    else if (currentStatus === 'thinking') intensity = 0.12 + Math.sin(time * 4) * 0.05;
    else if (currentStatus === 'speaking') intensity = 0.1 + audioVal * 0.15;

    const displacement = noiseVal * intensity;
    pos[i] = ox + nx * displacement;
    pos[i + 1] = oy + ny * displacement;
    pos[i + 2] = oz + nz * displacement;
  }
  geometry.attributes.position.needsUpdate = true;
  geometry.computeVertexNormals();

  // Rotation speeds
  const rotSpeed = currentStatus === 'thinking' ? 0.015 : 0.003;
  sphere.rotation.y += rotSpeed;
  sphere.rotation.x += rotSpeed * 0.3;
  wireframe.rotation.y -= 0.002;
  wireframe.rotation.z += 0.001;
  particles.rotation.y += 0.0005;

  // Audio-reactive scale pulse
  const scale = 1 + avgFreq * 0.15;
  sphere.scale.setScalar(scale);

  // Emissive glow intensity
  sphere.material.emissiveIntensity = 0.15 + avgFreq * 0.3;

  renderer.render(scene, camera);
  return requestAnimationFrame(() => animateScene(threeRefs, analyserRef, statusRef));
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

  const mountRef = useRef(null);
  const threeRef = useRef(null);
  const animFrameRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const recognitionRef = useRef(null);
  const ambientRef = useRef(null);
  const micStreamRef = useRef(null);
  const handleSendRef = useRef(null);
  const statusRef = useRef(status);
  const detectedLangRef = useRef('en-US');

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

  /* ---- Mic analyser for Three.js ---- */
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

    // Three.js scene
    const container = mountRef.current;
    if (container) {
      const refs = createScene(container);
      threeRef.current = refs;
      animFrameRef.current = animateScene(refs, analyserRef, statusRef);

      // Resize handler
      const onResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        refs.camera.aspect = w / h;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);
      // Store cleanup ref
      container._resizeHandler = onResize;
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
      if (threeRef.current) {
        const { renderer, geometry, sphere, wireframe, particles } = threeRef.current;
        geometry.dispose();
        sphere.material.dispose();
        wireframe.geometry.dispose();
        wireframe.material.dispose();
        particles.geometry.dispose();
        particles.material.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      if (container && container._resizeHandler) {
        window.removeEventListener('resize', container._resizeHandler);
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
  const statusText =
    status === 'listening' ? 'Listening...'
    : status === 'thinking' ? 'Processing...'
    : status === 'speaking' ? 'Speaking...'
    : 'Tap to speak';

  /* =======================================================
     RENDER
     ======================================================= */
  return (
    <div style={S.wrapper}>
      {/* Three.js canvas background */}
      <div ref={mountRef} style={S.threeContainer} />

      {/* UI Overlay */}
      <div style={S.overlay}>

        {/* ---- Top bar ---- */}
        <header style={S.header}>
          <div style={S.headerLeft}>
            <span style={S.logo}>SYMPRIO</span>
            <span style={S.dot} className="ai-dot" />
            <span style={S.aiLabel}>AI</span>
          </div>
          <div style={S.headerRight}>
            <button onClick={toggleMute} style={S.iconBtn} title={isMuted ? 'Unmute' : 'Mute'}>
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
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Exit
            </button>
          </div>
        </header>

        {/* ---- Center status ---- */}
        <div style={S.center}>
          <p style={S.statusText}>{statusText}</p>
          {transcript && (status === 'listening' || status === 'thinking') && (
            <p style={S.transcript}>{transcript}</p>
          )}
        </div>

        {/* ---- Bottom chat area ---- */}
        <div style={S.bottom}>
          {/* Latest AI reply bubble */}
          <div style={S.replyBubble} className="ai-bubble-in">
            <p style={S.replyText}>{lastReply}</p>
          </div>

          {/* Chat history */}
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

          {/* Controls row */}
          <div style={S.controls}>
            <button onClick={() => setShowHistory(!showHistory)} style={S.controlBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span style={{ fontSize: 11 }}>{showHistory ? 'Hide' : 'History'}</span>
            </button>

            <button
              onClick={toggleListening}
              style={{
                ...S.micBtn,
                boxShadow: status === 'listening'
                  ? '0 0 0 4px rgba(24,90,219,0.3), 0 0 30px rgba(24,90,219,0.25)'
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

            <button onClick={() => setShowTextInput(!showTextInput)} style={S.controlBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M6 16h12"/>
              </svg>
              <span style={{ fontSize: 11 }}>Type</span>
            </button>
          </div>

          {/* Text input */}
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
      </div>

      {/* ---- Animations ---- */}
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
          0% { box-shadow: 0 0 0 4px rgba(24,90,219,0.3), 0 0 30px rgba(24,90,219,0.25); }
          50% { box-shadow: 0 0 0 10px rgba(24,90,219,0.1), 0 0 50px rgba(24,90,219,0.15); }
          100% { box-shadow: 0 0 0 4px rgba(24,90,219,0.3), 0 0 30px rgba(24,90,219,0.25); }
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

  /* Three.js fills the entire background */
  threeContainer: {
    position: 'absolute', inset: 0, zIndex: 1,
  },

  /* UI overlay on top of Three.js */
  overlay: {
    position: 'relative', zIndex: 10,
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
    pointerEvents: 'none',
  },

  /* Header */
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '24px 32px', flexShrink: 0, pointerEvents: 'auto',
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 10 },
  logo: { fontSize: 18, fontWeight: 700, letterSpacing: 2, color: '#fff' },
  dot: {
    width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block',
  },
  aiLabel: { fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: 1 },
  headerRight: { display: 'flex', alignItems: 'center', gap: 10 },
  iconBtn: {
    width: 40, height: 40, borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
  },
  exitBtn: {
    display: 'flex', alignItems: 'center',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.7)',
    padding: '8px 18px', borderRadius: 8,
    cursor: 'pointer', fontSize: 14, fontWeight: 500,
    transition: 'background 0.2s',
  },

  /* Center (status text) */
  center: {
    flex: 1, display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    pointerEvents: 'none',
  },
  statusText: {
    fontSize: 13, fontWeight: 600, letterSpacing: 3,
    color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase',
    margin: 0,
  },
  transcript: {
    marginTop: 12, fontSize: 15, color: 'rgba(255,255,255,0.5)',
    fontStyle: 'italic', textAlign: 'center', maxWidth: 500,
    padding: '0 20px', lineHeight: 1.5,
  },

  /* Bottom panel */
  bottom: {
    flexShrink: 0, padding: '0 28px 32px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 14, maxWidth: 700, width: '100%', margin: '0 auto',
    pointerEvents: 'auto',
  },

  /* Reply bubble */
  replyBubble: {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderLeft: '3px solid rgba(24,90,219,0.5)',
    borderRadius: 14, padding: '16px 22px',
    maxWidth: '100%', width: '100%',
  },
  replyText: {
    margin: 0, fontSize: 15, color: 'rgba(255,255,255,0.8)',
    lineHeight: 1.65,
  },

  /* History */
  historyPanel: {
    width: '100%', maxHeight: 300, overflowY: 'auto',
    display: 'flex', flexDirection: 'column', gap: 6,
    padding: '4px 0',
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
    gap: 16, marginTop: 6,
  },
  controlBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12, padding: '10px 18px',
    color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
    fontSize: 12, transition: 'background 0.2s',
  },
  micBtn: {
    width: 64, height: 64, borderRadius: '50%',
    background: 'linear-gradient(135deg, #185ADB 0%, #0D9488 100%)',
    border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'box-shadow 0.3s',
    flexShrink: 0,
  },

  /* Text input */
  textForm: {
    display: 'flex', alignItems: 'center', gap: 8,
    width: '100%',
  },
  textInput: {
    flex: 1,
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
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
