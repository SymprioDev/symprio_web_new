import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AIModePrompt = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('aimode_prompt_dismissed')) {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      // Show after scrolling 60% of the page
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 40 && !dismissed) {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem('aimode_prompt_dismissed', 'true');
  };

  const handleTryAI = () => {
    handleDismiss();
    navigate('/ai');
  };

  if (dismissed || !visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9990,
      maxWidth: '360px',
      width: 'calc(100% - 48px)',
      animation: 'slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    }}>
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(13, 148, 136, 0); }
        }
      `}</style>

      <div style={{
        background: 'linear-gradient(135deg, #010B1D 0%, #0A1628 100%)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle glow accent */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, rgba(13,148,136,0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Close button */}
        <button
          onClick={handleDismiss}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Content */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          {/* AI icon with pulse */}
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0D9488, #185ADB)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            animation: 'pulseGlow 2s ease-in-out infinite'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7 7 0 0 1 14 23h-4a7 7 0 0 1-6.73-4H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
              <circle cx="9.5" cy="15.5" r="1"/>
              <circle cx="14.5" cy="15.5" r="1"/>
            </svg>
          </div>

          <div style={{ flex: 1 }}>
            <p style={{
              color: '#fff',
              fontSize: '15px',
              fontWeight: '700',
              margin: '0 0 4px 0',
              lineHeight: '1.3'
            }}>
              Tired of reading?
            </p>
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '13px',
              margin: '0 0 14px 0',
              lineHeight: '1.5'
            }}>
              Try our AI Mode — just talk and get answers instantly. The new era of browsing.
            </p>

            <button
              onClick={handleTryAI}
              style={{
                width: '100%',
                padding: '10px 16px',
                background: 'linear-gradient(135deg, #0D9488, #185ADB)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(13,148,136,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
              Try AI Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModePrompt;
