import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AIMode() {
  const navigate = useNavigate();
  const [orbState, setOrbState] = useState('idle');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello. I'm Symprio AI — your intelligent guide to AI & automation solutions. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  /* ---- Text-to-Speech ---- */
  const speak = useCallback((text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 0.9;
    const voices = window.speechSynthesis.getVoices();
    utterance.voice =
      voices.find(
        (v) => v.name.includes('Google') || v.name.includes('Daniel')
      ) || voices[0];
    utterance.onstart = () => setOrbState('speaking');
    utterance.onend = () => setOrbState('idle');
    window.speechSynthesis.speak(utterance);
  }, []);

  /* ---- Chat send ---- */
  const handleSend = useCallback(
    async (text) => {
      const msg = (text || input).trim();
      if (!msg) return;

      const newMessages = [...messages, { role: 'user', content: msg }];
      setMessages(newMessages);
      setInput('');
      setLoading(true);
      setOrbState('thinking');

      try {
        const res = await fetch('/api/ai-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: msg,
            history: newMessages.slice(-10),
          }),
        });
        const data = await res.json();
        const reply =
          data.reply ||
          "I'm having trouble connecting. Please try again.";
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: reply },
        ]);
        speak(reply);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Connection interrupted. Please try again.',
          },
        ]);
        setOrbState('idle');
      } finally {
        setLoading(false);
      }
    },
    [input, messages, speak]
  );

  /* ---- Speech Recognition ---- */
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      /* We call handleSend via a ref so we always get the latest closure */
      handleSendRef.current(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
      setOrbState((prev) => (prev === 'listening' ? 'idle' : prev));
    };

    recognitionRef.current = recognition;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Keep a stable ref to handleSend for the speech callback */
  const handleSendRef = useRef(handleSend);
  useEffect(() => {
    handleSendRef.current = handleSend;
  }, [handleSend]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setOrbState('idle');
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      setOrbState('listening');
    }
  }, [isListening]);

  /* ---- Auto-scroll chat ---- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* ---- Preload voices ---- */
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  /* ---- Status text ---- */
  const statusText =
    orbState === 'listening'
      ? 'Listening...'
      : orbState === 'thinking'
      ? 'Thinking...'
      : orbState === 'speaking'
      ? 'Speaking...'
      : 'Ready';

  /* ---- Floating particles data ---- */
  const particles = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: 2 + Math.random() * 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 6,
    }))
  );

  return (
    <div style={styles.wrapper}>
      {/* Background grid overlay */}
      <div style={styles.gridOverlay} />

      {/* Floating particles */}
      {particles.current.map((p) => (
        <div
          key={p.id}
          className="ai-particle"
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'rgba(24,90,219,0.35)',
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ))}

      {/* ===== HEADER ===== */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logoText}>SYMPRIO AI</span>
          <span style={styles.badge}>AI MODE</span>
        </div>
        <button
          onClick={() => navigate('/')}
          style={styles.exitBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: 6 }}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Exit
        </button>
      </header>

      {/* ===== ORB ===== */}
      <main style={styles.main}>
        <div style={styles.orbContainer}>
          <div
            className={`ai-orb-ring ai-orb-outer ${orbState}`}
            style={styles.orbOuter}
          />
          <div
            className={`ai-orb-ring ai-orb-middle ${orbState}`}
            style={styles.orbMiddle}
          />
          <div
            className={`ai-orb-core ${orbState}`}
            style={styles.orbCore}
          />
        </div>
        <p style={styles.statusText}>{statusText}</p>
      </main>

      {/* ===== CHAT TRANSCRIPT ===== */}
      <section style={styles.chatSection}>
        <div style={styles.chatScroll}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={
                m.role === 'user'
                  ? styles.chatBubbleUser
                  : styles.chatBubbleAssistant
              }
            >
              <span
                style={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  color:
                    m.role === 'user'
                      ? '#185ADB'
                      : '#0D9488',
                  marginBottom: 4,
                  display: 'block',
                  fontWeight: 600,
                }}
              >
                {m.role === 'user' ? 'You' : 'Symprio AI'}
              </span>
              {m.content}
            </div>
          ))}
          {loading && (
            <div style={styles.chatBubbleAssistant}>
              <span
                style={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  color: '#0D9488',
                  marginBottom: 4,
                  display: 'block',
                  fontWeight: 600,
                }}
              >
                Symprio AI
              </span>
              <span className="ai-typing-dots">
                <span className="ai-dot" />
                <span className="ai-dot" />
                <span className="ai-dot" />
              </span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </section>

      {/* ===== INPUT BAR ===== */}
      <footer style={styles.footer}>
        <button
          onClick={toggleListening}
          style={{
            ...styles.micBtn,
            background: isListening
              ? 'rgba(220,38,38,0.8)'
              : 'rgba(255,255,255,0.08)',
            boxShadow: isListening
              ? '0 0 20px rgba(220,38,38,0.4)'
              : 'none',
          }}
          title={isListening ? 'Stop listening' : 'Start voice input'}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>

        <input
          ref={inputRef}
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type a message or press the mic..."
          disabled={loading}
        />

        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          style={{
            ...styles.sendBtn,
            opacity: loading || !input.trim() ? 0.4 : 1,
          }}
          title="Send message"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </footer>

      {/* ===== EMBEDDED ANIMATIONS ===== */}
      <style>{`
        /* ---- Orb Core ---- */
        .ai-orb-core {
          animation: orbPulseIdle 3s ease-in-out infinite;
        }
        .ai-orb-core.listening {
          animation: orbPulseListening 1.2s ease-in-out infinite;
          box-shadow: 0 0 60px rgba(24,90,219,0.6), 0 0 120px rgba(24,90,219,0.3) !important;
        }
        .ai-orb-core.thinking {
          animation: orbPulseThinking 1.8s ease-in-out infinite;
        }
        .ai-orb-core.speaking {
          animation: orbPulseSpeaking 0.6s ease-in-out infinite;
          box-shadow: 0 0 80px rgba(13,148,136,0.5), 0 0 160px rgba(24,90,219,0.3) !important;
        }

        @keyframes orbPulseIdle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes orbPulseListening {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        @keyframes orbPulseThinking {
          0%, 100% { transform: scale(0.97); }
          50% { transform: scale(1.06); }
        }
        @keyframes orbPulseSpeaking {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.15); }
          75% { transform: scale(0.95); }
        }

        /* ---- Middle Ring ---- */
        .ai-orb-middle {
          animation: ringRotate 12s linear infinite;
        }
        .ai-orb-middle.listening {
          animation: ringRotate 6s linear infinite;
          border-color: rgba(24,90,219,0.5) !important;
        }
        .ai-orb-middle.thinking {
          animation: ringRotate 3s linear infinite;
          border-color: rgba(24,90,219,0.6) !important;
        }
        .ai-orb-middle.speaking {
          animation: ringRotate 4s linear infinite, ringExpandSpeak 0.8s ease-in-out infinite;
        }

        @keyframes ringRotate {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to { transform: translate(-50%,-50%) rotate(360deg); }
        }

        @keyframes ringExpandSpeak {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        /* ---- Outer Ring ---- */
        .ai-orb-outer {
          animation: ringCounterRotate 18s linear infinite;
        }
        .ai-orb-outer.listening {
          animation: ringCounterRotate 8s linear infinite;
        }
        .ai-orb-outer.thinking {
          animation: ringCounterRotate 5s linear infinite;
          border-color: rgba(24,90,219,0.35) !important;
        }
        .ai-orb-outer.speaking {
          animation: ringCounterRotate 6s linear infinite, outerExpandSpeak 0.6s ease-in-out infinite;
        }

        @keyframes ringCounterRotate {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to { transform: translate(-50%,-50%) rotate(-360deg); }
        }

        @keyframes outerExpandSpeak {
          0%, 100% { transform: translate(-50%,-50%) scale(1) rotate(0deg); opacity: 0.3; }
          50% { transform: translate(-50%,-50%) scale(1.08) rotate(-10deg); opacity: 0.5; }
        }

        /* ---- Particles ---- */
        .ai-particle {
          animation: floatParticle 5s ease-in-out infinite alternate;
        }

        @keyframes floatParticle {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-30px) translateX(15px); opacity: 0.15; }
        }

        /* ---- Typing Dots ---- */
        .ai-typing-dots {
          display: inline-flex;
          gap: 4px;
          align-items: center;
          padding: 4px 0;
        }
        .ai-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(13,148,136,0.6);
          animation: dotBounce 1.2s ease-in-out infinite;
        }
        .ai-dot:nth-child(2) { animation-delay: 0.2s; }
        .ai-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dotBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-8px); opacity: 1; }
        }

        /* ---- Scrollbar ---- */
        .ai-chat-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .ai-chat-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .ai-chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

/* =========================================
   INLINE STYLES
   ========================================= */

const styles = {
  wrapper: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: 'linear-gradient(180deg, #0a0a1a 0%, #0d1b2a 100%)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    overflow: 'hidden',
  },

  gridOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'repeating-linear-gradient(0deg, rgba(24,90,219,0.03) 0px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(24,90,219,0.03) 0px, transparent 1px, transparent 60px)',
    pointerEvents: 'none',
    zIndex: 0,
  },

  /* ---- Header ---- */
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 28px',
    zIndex: 2,
    flexShrink: 0,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 2,
    color: '#fff',
  },
  badge: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    background: 'rgba(24,90,219,0.2)',
    color: '#185ADB',
    padding: '4px 10px',
    borderRadius: 20,
  },
  exitBtn: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.7)',
    padding: '8px 18px',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    transition: 'background 0.2s',
  },

  /* ---- Orb ---- */
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0 10px',
    zIndex: 1,
    flexShrink: 0,
  },
  orbContainer: {
    position: 'relative',
    width: 200,
    height: 200,
  },
  orbCore: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    marginTop: -60,
    marginLeft: -60,
    background:
      'radial-gradient(circle at 40% 35%, #185ADB, #0d1b6a 70%, #0a0a1a)',
    boxShadow:
      '0 0 40px rgba(24,90,219,0.4), 0 0 80px rgba(24,90,219,0.15), inset 0 0 30px rgba(13,148,136,0.2)',
  },
  orbMiddle: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    border: '2px dashed rgba(24,90,219,0.3)',
    boxSizing: 'border-box',
  },
  orbOuter: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    border: '1.5px dotted rgba(24,90,219,0.15)',
    opacity: 0.3,
    boxSizing: 'border-box',
  },
  statusText: {
    marginTop: 18,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
  },

  /* ---- Chat ---- */
  chatSection: {
    flex: 1,
    overflow: 'hidden',
    padding: '0 28px',
    zIndex: 1,
    minHeight: 0,
  },
  chatScroll: {
    height: '100%',
    overflowY: 'auto',
    paddingTop: 10,
    paddingBottom: 10,
    className: 'ai-chat-scroll',
  },
  chatBubbleUser: {
    background: 'rgba(24,90,219,0.15)',
    borderLeft: '3px solid #185ADB',
    borderRadius: '0 10px 10px 0',
    padding: '12px 16px',
    marginBottom: 10,
    fontSize: 14,
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.85)',
    maxWidth: 640,
  },
  chatBubbleAssistant: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: '12px 16px',
    marginBottom: 10,
    fontSize: 14,
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.7)',
    maxWidth: 640,
  },

  /* ---- Footer / Input ---- */
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '14px 28px 22px',
    zIndex: 2,
    flexShrink: 0,
  },
  micBtn: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'background 0.2s, box-shadow 0.2s',
  },
  input: {
    flex: 1,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '12px 16px',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    border: 'none',
    background: '#185ADB',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'opacity 0.2s',
  },
};
