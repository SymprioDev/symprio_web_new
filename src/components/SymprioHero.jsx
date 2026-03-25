import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';

const partners = [
  { name: 'UiPath', logo: '/uipath-logo.png' },
  { name: 'Microsoft', logo: '/microsoft-logo.png' },
  { name: 'Oracle', logo: '/oracle-logo.png' },
  { name: 'Salesforce', logo: '/salesforce-logo.png' },
  { name: 'Google', logo: '/google-logo.png' },
  { name: 'Meta', logo: '/meta-logo.png' },
  { name: 'ChatGPT', logo: '/chatgpt-logo.png' },
  { name: 'Claude', logo: '/claude-logo.png' },
  { name: 'Mistral', logo: '/mistral-logo.png' },
  { name: 'Manus', text: 'Manus' }
];

// Distribute N items evenly on a sphere using golden angle
function getSpherePositions(count, radius) {
  const positions = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // -1 to 1
    const theta = goldenAngle * i;
    const rotateX = Math.asin(y) * (180 / Math.PI);
    const rotateY = (theta * 180) / Math.PI;
    positions.push({ rotateX, rotateY, radius });
  }
  return positions;
}

export default function SymprioHero() {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const spherePositions = getSpherePositions(partners.length, 280);

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
        maxWidth: '1400px',
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
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

        {/* Right — Full 3D Sphere */}
        <div style={{
          position: 'relative',
          opacity: showAnimation ? 1 : 0,
          transform: showAnimation ? 'scale(1)' : 'scale(0.8)',
          transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '620px',
          perspective: '1400px'
        }}>
          {/* Gradient glow behind sphere */}
          <div style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(24, 90, 219, 0.08) 0%, rgba(13, 148, 136, 0.04) 40%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }} />

          {/* Decorative orbit rings */}
          <div style={{
            position: 'absolute',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            border: '1px dashed rgba(24, 90, 219, 0.08)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotateX(70deg)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            border: '1px dashed rgba(24, 90, 219, 0.06)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotateX(70deg) rotateZ(45deg)',
            pointerEvents: 'none'
          }} />

          {/* 3D Sphere container — cinematic ease */}
          <div className="sphere" style={{
            width: '600px',
            height: '600px',
            position: 'relative',
            transformStyle: 'preserve-3d'
          }}>
            {/* Partner logos on sphere surface */}
            {partners.map((p, i) => {
              const pos = spherePositions[i];
              return (
                <div
                  key={p.name}
                  className="sphere-item"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '90px',
                    height: '90px',
                    marginLeft: '-45px',
                    marginTop: '-45px',
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${pos.rotateY}deg) rotateX(${pos.rotateX}deg) translateZ(${pos.radius}px)`
                  }}
                >
                  <div className="sphere-logo-card" style={{
                    width: '90px',
                    height: '90px',
                    background: '#fff',
                    borderRadius: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    backfaceVisibility: 'hidden'
                  }}>
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} style={{ width: '52px', height: '52px', objectFit: 'contain' }} />
                    ) : (
                      <span style={{ fontSize: '16px', fontWeight: '800', color: '#185ADB', letterSpacing: '-0.02em' }}>{p.text}</span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Center Symprio logo — counter-rotates to stay fixed */}
            <div className="sphere-center" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '120px',
              height: '120px',
              marginLeft: '-60px',
              marginTop: '-60px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 24px 60px rgba(10, 45, 110, 0.2)',
              border: '2px solid rgba(24, 90, 219, 0.1)',
              zIndex: 10,
              transform: 'translateZ(0px)'
            }}>
              <img src="/symprio-logo.png" alt="Symprio" style={{ width: '74px', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Cinematic rotation — slow in front, fast behind */
        @keyframes sphereRotate {
          0%   { transform: rotateY(0deg) rotateX(8deg); }
          25%  { transform: rotateY(60deg) rotateX(8deg); }
          50%  { transform: rotateY(180deg) rotateX(8deg); }
          75%  { transform: rotateY(300deg) rotateX(8deg); }
          100% { transform: rotateY(360deg) rotateX(8deg); }
        }

        .sphere {
          animation: sphereRotate 22s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
          transform-style: preserve-3d;
        }

        .sphere-item {
          transform-style: preserve-3d;
        }

        /* Counter-rotate center logo to stay upright */
        @keyframes sphereCenterReverse {
          0%   { transform: translateZ(0) rotateX(-8deg) rotateY(0deg); }
          25%  { transform: translateZ(0) rotateX(-8deg) rotateY(-60deg); }
          50%  { transform: translateZ(0) rotateX(-8deg) rotateY(-180deg); }
          75%  { transform: translateZ(0) rotateX(-8deg) rotateY(-300deg); }
          100% { transform: translateZ(0) rotateX(-8deg) rotateY(-360deg); }
        }

        .sphere-center {
          animation: sphereCenterReverse 22s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }

        .sphere-logo-card {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .sphere-logo-card:hover {
          box-shadow: 0 20px 50px rgba(24, 90, 219, 0.2) !important;
          transform: scale(1.1);
        }

        @media (max-width: 1024px) {
          .sphere {
            width: 400px !important;
            height: 400px !important;
          }
        }

        @media (max-width: 768px) {
          .sphere {
            width: 300px !important;
            height: 300px !important;
          }
        }
      `}</style>
    </div>
  );
}
