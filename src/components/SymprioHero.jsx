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

      {/* Decorative Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, rgba(10, 45, 110, 0) 70%)',
        borderRadius: '50%',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '2%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(10, 45, 110, 0.05) 0%, rgba(13, 148, 136, 0) 70%)',
        borderRadius: '50%',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
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
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(10, 45, 110, 0.08)',
            padding: '10px 20px',
            borderRadius: '100px',
            marginBottom: '32px',
            border: '1px solid rgba(10, 45, 110, 0.1)'
          }}>
            <span style={{ fontSize: '18px' }}>🤖</span>
            <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              The Future of Automation is Here
            </span>
          </div>

          <h1 style={{ 
            marginBottom: '28px',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: '900',
            lineHeight: '1.05',
            letterSpacing: '-0.03em',
            color: 'var(--primary)'
          }}>
            Pioneering AI & <span className="gradient-text">Automation</span> for Enterprises
          </h1>
          
          <p style={{
            fontSize: '20px',
            color: '#4b5563',
            lineHeight: '1.7',
            marginBottom: '48px',
            maxWidth: '580px',
            fontWeight: '400'
          }}>
            Symprio empowers global enterprises to redefine productivity, reduce costs by up to 40%, and scale exponentially with intelligent Agentic AI solutions.
          </p>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button
              onClick={() => navigate('/contact')}
              className="btn-pill btn-primary"
              style={{ padding: '18px 40px', fontSize: '16px' }}
            >
              Get Started Now <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <button
              onClick={() => navigate('/services')}
              className="btn-pill hover-scale"
              style={{
                background: 'transparent',
                border: '2px solid rgba(0,0,0,0.1)',
                color: 'var(--primary)',
                padding: '18px 32px',
                fontSize: '16px'
              }}
            >
              Our Solutions
            </button>
          </div>

          {/* Trust Metrics */}
          <div style={{
            display: 'flex',
            gap: '48px',
            marginTop: '64px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(0,0,0,0.08)'
          }}>
            {[
              { val: '50+', label: 'Global Clients' },
              { val: '500+', label: 'Bots Live' },
              { val: '99.9%', label: 'Uptime' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--primary)', marginBottom: '4px' }}>{stat.val}</div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual - Interactive Dashboard Preview */}
        <div style={{
          position: 'relative',
          opacity: showAnimation ? 1 : 0,
          transform: showAnimation ? 'translateX(0)' : 'translateX(40px)',
          transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s'
        }}>
          <div className="animate-float" style={{
            position: 'relative',
            zIndex: 2,
            borderRadius: '40px',
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(10, 45, 110, 0.15)',
            border: '12px solid #fff',
            background: '#f8fafc'
          }}>
            <img 
              src="/assets/images/hero-dashboard.jpg" 
              alt="Symprio AI Operations Dashboard" 
              style={{ width: '100%', display: 'block', transform: 'scale(1.02)' }} 
            />
            {/* Overlay Gradient for depth */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(10, 45, 110, 0.2), transparent)',
              pointerEvents: 'none'
            }} />
          </div>

          {/* Floating High-Impact Cards */}
          <div className="glass-panel" style={{
            position: 'absolute',
            top: '15%',
            left: '-40px',
            padding: '24px',
            borderRadius: '24px',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            border: '1px solid rgba(255,255,255,0.4)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '1px' }}>COST REDUCTION</div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary)' }}>-$1.2M</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#10b981', fontWeight: '700' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              Efficiency Up 35%
            </div>
          </div>

          <div className="glass-panel" style={{
            position: 'absolute',
            bottom: '10%',
            right: '-30px',
            padding: '24px',
            borderRadius: '24px',
            zIndex: 10,
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.4)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', 
              borderRadius: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 10px 20px rgba(10, 45, 110, 0.2)'
            }}>
              <span style={{ fontSize: '24px' }}>🧠</span>
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '900', color: 'var(--primary)' }}>Agentic AI Ready</div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Autonomous Workflow Engine</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

