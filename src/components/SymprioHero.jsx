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
  { name: 'Mistral', logo: '/mistral-logo.svg' },
  { name: 'Manus', text: 'Manus' }
];

// Distribute N items evenly on a sphere using golden angle
function getSpherePositions(count, radius) {
  const positions = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
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

  const spherePositions = getSpherePositions(partners.length, 210);

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

        {/* Right — 3D Sphere */}
        <div style={{
          position: 'relative',
          opacity: showAnimation ? 1 : 0,
          transform: showAnimation ? 'scale(1)' : 'scale(0.8)',
          transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '580px',
          perspective: '1200px'
        }}>
          {/* Gradient glow */}
          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(24, 90, 219, 0.07) 0%, rgba(13, 148, 136, 0.03) 40%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }} />

          {/* Orbit rings */}
          <div style={{
            position: 'absolute', width: '440px', height: '440px', borderRadius: '50%',
            border: '1px dashed rgba(24, 90, 219, 0.07)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%) rotateX(70deg)',
            pointerEvents: 'none'
          }} />

          {/* 3D Sphere — tighter radius, bigger cards, faster */}
          <div className="sphere" style={{
            width: '500px',
            height: '500px',
            position: 'relative',
            transformStyle: 'preserve-3d'
          }}>
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
                    width: '100px',
                    height: '100px',
                    marginLeft: '-50px',
                    marginTop: '-50px',
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${pos.rotateY}deg) rotateX(${pos.rotateX}deg) translateZ(${pos.radius}px)`
                  }}
                >
                  <div className="sphere-logo-card" style={{
                    width: '100px',
                    height: '100px',
                    background: '#fff',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    backfaceVisibility: 'hidden'
                  }}>
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
                    ) : (
                      <span style={{ fontSize: '15px', fontWeight: '800', color: '#185ADB', letterSpacing: '-0.02em' }}>{p.text}</span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Center Symprio logo */}
            <div className="sphere-center" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '110px',
              height: '110px',
              marginLeft: '-55px',
              marginTop: '-55px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)',
              borderRadius: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 24px 60px rgba(10, 45, 110, 0.2)',
              border: '2px solid rgba(24, 90, 219, 0.1)',
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
          0%   { transform: rotateY(0deg) rotateX(8deg); }
          25%  { transform: rotateY(60deg) rotateX(8deg); }
          50%  { transform: rotateY(180deg) rotateX(8deg); }
          75%  { transform: rotateY(300deg) rotateX(8deg); }
          100% { transform: rotateY(360deg) rotateX(8deg); }
        }

        .sphere {
          animation: sphereRotate 14s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
          transform-style: preserve-3d;
        }

        .sphere-item {
          transform-style: preserve-3d;
        }

        @keyframes sphereCenterReverse {
          0%   { transform: translateZ(0) rotateX(-8deg) rotateY(0deg); }
          25%  { transform: translateZ(0) rotateX(-8deg) rotateY(-60deg); }
          50%  { transform: translateZ(0) rotateX(-8deg) rotateY(-180deg); }
          75%  { transform: translateZ(0) rotateX(-8deg) rotateY(-300deg); }
          100% { transform: translateZ(0) rotateX(-8deg) rotateY(-360deg); }
        }

        .sphere-center {
          animation: sphereCenterReverse 14s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }

        .sphere-logo-card {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .sphere-logo-card:hover {
          box-shadow: 0 20px 50px rgba(24, 90, 219, 0.2) !important;
          transform: scale(1.1);
        }

        @media (max-width: 1024px) {
          .sphere { width: 380px !important; height: 380px !important; }
        }

        @media (max-width: 768px) {
          .sphere { width: 280px !important; height: 280px !important; }
        }
      `}</style>
    </div>
  );
}
