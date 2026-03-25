import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';

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
      background: '#ffffff',
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
          {/* Badge Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px'
          }}>
            <span style={{ color: '#185ADB', fontSize: '14px', lineHeight: 1 }}>&#8226;</span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#185ADB', letterSpacing: '0.05em' }}>
              AI & Automation Solutions
            </span>
          </div>

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

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              onClick={() => navigate('/contact')}
              className="btn-pill btn-primary"
              style={{ padding: '18px 40px', fontSize: '16px' }}
            >
              Get Started Now <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <button
              onClick={() => navigate('/services')}
              className="btn-pill hover-scale"
              style={{
                background: 'transparent',
                border: '2px solid rgba(0,0,0,0.12)',
                color: 'var(--primary)',
                padding: '18px 32px',
                fontSize: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '12px' }}>&#9654;</span> Watch Demo
            </button>
          </div>

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

        {/* Right Visual */}
        <div style={{
          position: 'relative',
          opacity: showAnimation ? 1 : 0,
          transform: showAnimation ? 'translateX(0)' : 'translateX(40px)',
          transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s'
        }}>
          <div className="animate-float" style={{
            position: 'relative',
            zIndex: 2,
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(10, 45, 110, 0.12)',
            border: '8px solid #fff',
            background: '#f8fafc'
          }}>
            <img
              src="/assets/images/hero-dashboard.jpg"
              alt="Symprio AI Operations Dashboard"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
