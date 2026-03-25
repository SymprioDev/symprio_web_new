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

        {/* Right — 3D Sphere Rotating Partner Logos */}
        <div style={{
          position: 'relative',
          opacity: showAnimation ? 1 : 0,
          transform: showAnimation ? 'scale(1)' : 'scale(0.85)',
          transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '560px',
          perspective: '1200px'
        }}>
          {/* Soft glow behind sphere */}
          <div style={{
            position: 'absolute',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(24, 90, 219, 0.06) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }} />

          {/* 3D Sphere container */}
          <div className="sphere" style={{
            width: '500px',
            height: '500px',
            position: 'relative',
            transformStyle: 'preserve-3d'
          }}>
            {/* Partner logos positioned on sphere surface */}
            {partners.map((p, i) => {
              // Distribute on sphere: 2 rows, staggered
              const rows = [
                { rotateX: -25, items: [0, 1] },
                { rotateX: 25, items: [2, 3] }
              ];
              const row = i < 2 ? 0 : 1;
              const col = i % 2;
              const rotateY = col * 180 + (row * 90);
              const rotateX = rows[row].rotateX;

              return (
                <div
                  key={p.name}
                  className="sphere-item"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '110px',
                    height: '110px',
                    marginLeft: '-55px',
                    marginTop: '-55px',
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(250px)`
                  }}
                >
                  <div className="sphere-logo-card" style={{
                    width: '110px',
                    height: '110px',
                    background: '#fff',
                    borderRadius: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    backfaceVisibility: 'hidden'
                  }}>
                    <img src={p.logo} alt={p.name} style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                  </div>
                </div>
              );
            })}

            {/* Center Symprio logo — stays fixed */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '110px',
              height: '110px',
              marginLeft: '-55px',
              marginTop: '-55px',
              background: '#fff',
              borderRadius: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 60px rgba(10, 45, 110, 0.18)',
              border: '1px solid rgba(0,0,0,0.04)',
              zIndex: 10,
              transform: 'translateZ(0px)'
            }}>
              <img src="/symprio-logo.png" alt="Symprio" style={{ width: '68px', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sphereRotate {
          0% { transform: rotateY(0deg) rotateX(5deg); }
          100% { transform: rotateY(360deg) rotateX(5deg); }
        }

        .sphere {
          animation: sphereRotate 18s linear infinite;
          transform-style: preserve-3d;
        }

        .sphere-item {
          transform-style: preserve-3d;
        }

        /* Keep the center logo from rotating */
        .sphere > div:last-child {
          animation: sphereRotateReverse 18s linear infinite;
        }

        @keyframes sphereRotateReverse {
          0% { transform: translateZ(0) rotateX(-5deg) rotateY(0deg); }
          100% { transform: translateZ(0) rotateX(-5deg) rotateY(-360deg); }
        }

        .sphere-logo-card {
          transition: box-shadow 0.3s ease;
        }

        .sphere-logo-card:hover {
          box-shadow: 0 20px 50px rgba(24, 90, 219, 0.2) !important;
        }

        @media (max-width: 768px) {
          .sphere {
            width: 280px !important;
            height: 280px !important;
          }
          .sphere-item {
            transform: rotateY(var(--ry)) rotateX(var(--rx)) translateZ(140px) !important;
          }
        }
      `}</style>
    </div>
  );
}
