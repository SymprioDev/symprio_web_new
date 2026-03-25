import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';

const partners = [
  { name: 'UiPath', logo: '/uipath-logo.png' },
  { name: 'Microsoft', logo: '/microsoft-logo.png' },
  { name: 'Oracle', logo: '/oracle-logo.png' },
  { name: 'Salesforce', logo: '/salesforce-logo.png' }
];

export default function SymprioHero() {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      background: '#F1F7F3',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 20px 80px',
      overflow: 'hidden'
    }} id="home">
      <SEO
        title="Home"
        description="AI & Automation Solutions for the Modern Enterprise. Symprio empowers businesses to reduce costs and accelerate growth."
      />

      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Left Content */}
        <div style={{
          opacity: showAnimation ? 1 : 0,
          transform: showAnimation ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
        }}>
          <h1 style={{
            marginBottom: '24px',
            fontSize: 'clamp(3rem, 7vw, 5rem)',
            fontWeight: '600',
            lineHeight: '1.08',
            letterSpacing: '-0.02em',
            color: 'var(--primary)'
          }}>
            Empowering Your Business With Smart <span className="gradient-text">Automation</span>
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            lineHeight: '1.75',
            marginBottom: '48px',
            maxWidth: '540px',
            fontWeight: '300'
          }}>
            Symprio empowers global enterprises to redefine productivity, reduce costs by up to 40%, and scale exponentially with intelligent Agentic AI solutions.
          </p>

          <button
            onClick={() => navigate('/contact')}
            className="btn-pill btn-primary"
            style={{ padding: '20px 52px', fontSize: '17px' }}
          >
            Get Started <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </button>

          {/* Trust Metrics */}
          <div style={{
            display: 'flex',
            gap: '48px',
            marginTop: '64px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(0,0,0,0.06)'
          }}>
            {[
              { val: '50+', label: 'Global Clients' },
              { val: '500+', label: 'Bots Live' },
              { val: '99.9%', label: 'Uptime' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary)', marginBottom: '4px', lineHeight: 1.1 }}>{stat.val}</div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — 3D Rotating Partner Logos */}
        <div style={{
          position: 'relative',
          opacity: showAnimation ? 1 : 0,
          transform: showAnimation ? 'scale(1)' : 'scale(0.8)',
          transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '420px'
        }}>
          {/* Orbit ring glow */}
          <div style={{
            position: 'absolute',
            width: '340px',
            height: '340px',
            borderRadius: '50%',
            border: '1px solid rgba(24, 90, 219, 0.08)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }} />
          <div style={{
            position: 'absolute',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(24, 90, 219, 0.04) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }} />

          {/* Center Symprio logo */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
            width: '80px',
            height: '80px',
            background: '#fff',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 15px 40px rgba(10, 45, 110, 0.12)',
            border: '1px solid rgba(0,0,0,0.04)'
          }}>
            <img src="/symprio-logo.png" alt="Symprio" style={{ width: '52px', objectFit: 'contain' }} />
          </div>

          {/* Rotating orbit */}
          <div className="orbit-container" style={{
            width: '340px',
            height: '340px',
            position: 'relative'
          }}>
            {partners.map((p, i) => {
              const angle = (i * 360) / partners.length;
              return (
                <div
                  key={p.name}
                  className="orbit-item"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '80px',
                    height: '80px',
                    marginLeft: '-40px',
                    marginTop: '-40px',
                    transform: `rotate(${angle}deg) translateX(170px) rotate(-${angle}deg)`,
                  }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: '#fff',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  className="orbit-logo-card"
                  >
                    <img src={p.logo} alt={p.name} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .orbit-container {
          animation: orbitSpin 20s linear infinite;
        }

        /* Counter-rotate each item so logos stay upright */
        .orbit-item {
          animation: orbitSpinReverse 20s linear infinite;
        }

        @keyframes orbitSpinReverse {
          from { transform: rotate(var(--start-angle)) translateX(170px) rotate(calc(-1 * var(--start-angle) + 0deg)); }
          to { transform: rotate(calc(var(--start-angle) - 360deg)) translateX(170px) rotate(calc(-1 * var(--start-angle) + 360deg)); }
        }

        /* Simpler approach: counter-rotate items */
        .orbit-item > .orbit-logo-card {
          animation: counterSpin 20s linear infinite;
        }

        @keyframes counterSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .orbit-logo-card:hover {
          transform: rotate(0deg) scale(1.15) !important;
          box-shadow: 0 16px 40px rgba(24, 90, 219, 0.15) !important;
        }

        @media (max-width: 768px) {
          .orbit-container {
            width: 260px !important;
            height: 260px !important;
          }
        }
      `}</style>
    </div>
  );
}
