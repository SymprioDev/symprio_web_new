import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';

const electrons = [
  { name: 'UiPath', logo: '/uipath-logo.png', orbit: 160, tiltX: 65, tiltZ: 0, speed: 12, dir: 1 },
  { name: 'Microsoft', logo: '/microsoft-logo.png', orbit: 160, tiltX: 65, tiltZ: 0, speed: 12, dir: 1, delay: -6 },
  { name: 'Oracle', logo: '/oracle-logo.png', orbit: 190, tiltX: 70, tiltZ: 60, speed: 16, dir: -1 },
  { name: 'Salesforce', logo: '/salesforce-logo.png', orbit: 190, tiltX: 70, tiltZ: 60, speed: 16, dir: -1, delay: -8 },
  { name: 'Google', logo: '/google-logo.png', orbit: 220, tiltX: 55, tiltZ: 120, speed: 20, dir: 1 },
  { name: 'Meta', logo: '/meta-logo.png', orbit: 220, tiltX: 55, tiltZ: 120, speed: 20, dir: 1, delay: -10 },
  { name: 'ChatGPT', logo: '/chatgpt-logo.png', orbit: 170, tiltX: 80, tiltZ: -40, speed: 14, dir: -1 },
  { name: 'Claude', logo: '/claude-logo.png', orbit: 200, tiltX: 60, tiltZ: -80, speed: 18, dir: 1 },
  { name: 'Mistral', logo: '/mistral-logo.svg', orbit: 200, tiltX: 60, tiltZ: -80, speed: 18, dir: 1, delay: -9 },
  { name: 'Manus', text: 'Manus', orbit: 170, tiltX: 80, tiltZ: -40, speed: 14, dir: -1, delay: -7 },
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
        gap: '40px',
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
            fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
            fontWeight: '600',
            lineHeight: '1.1',
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
            maxWidth: '500px',
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

        {/* Right — Electron Orbits */}
        <div style={{
          position: 'relative',
          opacity: showAnimation ? 1 : 0,
          transform: showAnimation ? 'scale(1)' : 'scale(0.85)',
          transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '560px'
        }}>
          {/* Gradient glow */}
          <div style={{
            position: 'absolute',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(24, 90, 219, 0.06) 0%, rgba(13, 148, 136, 0.03) 50%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }} />

          {/* Orbit ring paths (visual only) */}
          {[
            { r: 160, tiltX: 65, tiltZ: 0 },
            { r: 190, tiltX: 70, tiltZ: 60 },
            { r: 220, tiltX: 55, tiltZ: 120 },
            { r: 170, tiltX: 80, tiltZ: -40 },
            { r: 200, tiltX: 60, tiltZ: -80 },
          ].map((ring, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: ring.r * 2 + 'px',
              height: ring.r * 2 + 'px',
              borderRadius: '50%',
              border: '1px solid rgba(24, 90, 219, 0.06)',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotateX(${ring.tiltX}deg) rotateZ(${ring.tiltZ}deg)`,
              pointerEvents: 'none'
            }} />
          ))}

          {/* Center Symprio nucleus */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100px',
            height: '100px',
            marginLeft: '-50px',
            marginTop: '-50px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)',
            borderRadius: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 50px rgba(10, 45, 110, 0.18)',
            border: '2px solid rgba(24, 90, 219, 0.08)',
            zIndex: 20
          }}>
            <img src="/symprio-logo.png" alt="Symprio" style={{ width: '62px', objectFit: 'contain' }} />
          </div>

          {/* Electron logos — each on its own orbit */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 0,
            height: 0,
            perspective: '800px'
          }}>
            {electrons.map((e, i) => (
              <div
                key={e.name}
                className={`electron-orbit electron-orbit-${i}`}
                style={{
                  position: 'absolute',
                  width: e.orbit * 2 + 'px',
                  height: e.orbit * 2 + 'px',
                  marginLeft: -e.orbit + 'px',
                  marginTop: -e.orbit + 'px',
                  borderRadius: '50%',
                  transform: `rotateX(${e.tiltX}deg) rotateZ(${e.tiltZ}deg)`,
                  transformStyle: 'preserve-3d',
                  animationDelay: (e.delay || 0) + 's'
                }}
              >
                {/* The electron itself — positioned at top of orbit ring */}
                <div
                  className="electron-card"
                  style={{
                    position: 'absolute',
                    top: '-36px',
                    left: '50%',
                    marginLeft: '-36px',
                    width: '72px',
                    height: '72px',
                    background: '#fff',
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    transform: `rotateZ(${-e.tiltZ}deg) rotateX(${-e.tiltX}deg)`
                  }}
                >
                  {e.logo ? (
                    <img src={e.logo} alt={e.name} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#185ADB' }}>{e.text}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        ${electrons.map((e, i) => `
          @keyframes electronOrbit${i} {
            from { transform: rotateX(${e.tiltX}deg) rotateZ(${e.tiltZ}deg) rotate(0deg); }
            to   { transform: rotateX(${e.tiltX}deg) rotateZ(${e.tiltZ}deg) rotate(${e.dir > 0 ? 360 : -360}deg); }
          }
          .electron-orbit-${i} {
            animation: electronOrbit${i} ${e.speed}s linear infinite;
            animation-delay: ${e.delay || 0}s;
          }
        `).join('')}

        .electron-card {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .electron-card:hover {
          box-shadow: 0 16px 40px rgba(24, 90, 219, 0.18) !important;
          z-index: 100;
        }

        @media (max-width: 768px) {
          .electron-orbit { transform: scale(0.6) !important; }
        }
      `}</style>
    </div>
  );
}
