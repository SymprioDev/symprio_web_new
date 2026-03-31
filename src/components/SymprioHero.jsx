import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';

const logos = [
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

function LogoSphere({ size = 420 }) {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const rafRef = useRef(null);
  const radius = size * 0.42;
  const count = logos.length;

  // Calculate initial sphere positions using Fibonacci sphere
  const getPositions = useCallback(() => {
    const positions = [];
    const offset = 2 / count;
    const increment = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
      positions.push({
        x: Math.cos(phi) * r,
        y: y,
        z: Math.sin(phi) * r
      });
    }
    return positions;
  }, [count]);

  useEffect(() => {
    const positions = getPositions();
    let autoRotateY = 0;

    function animate() {
      autoRotateY += 0.004;

      const cosY = Math.cos(autoRotateY);
      const sinY = Math.sin(autoRotateY);
      const tiltX = 0.3;
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);

      positions.forEach((pos, i) => {
        // Rotate Y
        const x1 = pos.x * cosY - pos.z * sinY;
        const z1 = pos.x * sinY + pos.z * cosY;
        const y1 = pos.y;

        // Rotate X (tilt)
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        const alpha = (z2 + 1) / 2; // 0 = back, 1 = front

        const el = itemsRef.current[i];
        if (el) {
          el.style.transform = `translate(-50%, -50%) translate(${x1 * radius}px, ${y2 * radius}px) scale(${0.6 + alpha * 0.5})`;
          el.style.opacity = 0.3 + alpha * 0.7;
          el.style.zIndex = Math.round(alpha * 100);
          el.style.filter = `blur(${(1 - alpha) * 1.5}px)`;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [getPositions, radius]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: size + 'px',
        height: size + 'px',
        margin: '0 auto'
      }}
    >
      {logos.map((item, i) => (
        <div
          key={item.name}
          ref={el => itemsRef.current[i] = el}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '76px',
            height: '76px',
            background: '#fff',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 28px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.6)',
            transition: 'box-shadow 0.3s ease',
            cursor: 'default',
            willChange: 'transform, opacity'
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 16px 40px rgba(24,90,219,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.1)'; }}
        >
          {item.logo ? (
            <img src={item.logo} alt={item.name} style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
          ) : (
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#185ADB' }}>{item.text}</span>
          )}
        </div>
      ))}

      {/* Center Symprio logo */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '96px',
        height: '96px',
        background: 'linear-gradient(135deg, #ffffff, #f0f4ff)',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 20px 50px rgba(10, 45, 110, 0.2)',
        border: '2px solid rgba(24, 90, 219, 0.08)',
        zIndex: 200
      }}>
        <img src="/symprio-logo.png" alt="Symprio" style={{ width: '60px', objectFit: 'contain' }} />
      </div>
    </div>
  );
}

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
        title="AI & Automation Solutions for Enterprises & SMEs"
        description="Symprio delivers AI-powered automation, RPA, digital transformation, and corporate training serving APAC, US, UK & Middle East."
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
            Build Your AI-Powered <span className="gradient-text">Digital Workforce</span>
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            lineHeight: '1.75',
            marginBottom: '48px',
            maxWidth: '520px',
            fontWeight: '300'
          }}>
            From RPA to Agentic AI — we automate operations, augment decisions, and build entire digital workforces that run your business.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/contact')}
              className="btn-pill btn-primary"
              style={{ padding: '20px 48px', fontSize: '17px' }}
            >
              Book a Demo <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
            <button
              onClick={() => navigate('/services')}
              className="btn-pill btn-outline"
              style={{ padding: '20px 48px', fontSize: '17px' }}
            >
              Explore Our Services
            </button>
          </div>
        </div>

        {/* Right — 3D Logo Sphere with gradient bg */}
        <div style={{
          position: 'relative',
          opacity: showAnimation ? 1 : 0,
          transform: showAnimation ? 'scale(1)' : 'scale(0.85)',
          transition: 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '520px'
        }}>
          {/* Gradient backdrop like Orbixa template */}
          <div style={{
            position: 'absolute',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 40%, rgba(24, 90, 219, 0.12) 0%, rgba(139, 92, 246, 0.08) 30%, rgba(236, 72, 153, 0.05) 60%, transparent 80%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            filter: 'blur(30px)'
          }} />

          <LogoSphere size={460} />
        </div>
      </div>

    </div>
  );
}
