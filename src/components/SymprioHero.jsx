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
      background: 'var(--bg-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 20px 80px',
      overflow: 'hidden'
    }}>
      <SEO 
        title="Home" 
        description="Empowering enterprises with intelligent automation, AI-driven solutions, and strategic digital transformation. Discover the future of business efficiency with Symprio."
        keywords="digital transformation, intelligent automation, AI solutions, robotic process automation, RPA, ERP, custom software development"
      />
      {/* Background Shapes */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'rgba(24, 90, 219, 0.05)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '400px',
        height: '400px',
        background: 'rgba(139, 92, 246, 0.05)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: 0
      }} />

      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
        gap: '40px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Left Content */}
        <div style={{
          textAlign: 'left',
          opacity: showAnimation ? 1 : 0,
          transform: showAnimation ? 'translateX(0)' : 'translateX(-30px)',
          transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
        }}>
          <h1 style={{
            color: 'var(--secondary)',
            marginBottom: '24px'
          }}>
            Intelligent <span className="font-serif-italic" style={{ color: 'var(--primary)' }}>Automation Solutions</span> for Your Digital Transformation
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--text-muted)',
            lineHeight: '1.6',
            marginBottom: '40px',
            maxWidth: '540px'
          }}>
            Supercharge your business efficiency with Symprio's cutting-edge AI and automation. We bridge the gap between complex challenges and streamlined results.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button
              onClick={() => navigate('/enquiry')}
              style={{
                background: 'var(--primary)',
                color: '#fff',
                padding: '16px 36px',
                borderRadius: '100px',
                fontSize: '16px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(24, 90, 219, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(24, 90, 219, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(24, 90, 219, 0.2)';
              }}
            >
              Start Your Journey
            </button>
            <button
              onClick={() => navigate('/services')}
              style={{
                background: 'transparent',
                color: 'var(--secondary)',
                padding: '16px 36px',
                borderRadius: '100px',
                fontSize: '16px',
                fontWeight: '700',
                border: '2px solid rgba(10, 25, 47, 0.1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--secondary)';
                e.currentTarget.style.background = 'rgba(10, 25, 47, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(10, 25, 47, 0.1)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Explore Services
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div style={{
          position: 'relative',
          opacity: showAnimation ? 1 : 0,
          transform: showAnimation ? 'scale(1)' : 'scale(0.9)',
          transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img 
            src="/Users/symprio/.gemini/antigravity/brain/4b123a20-53dd-4b3d-8b9d-07f97ae567d3/orbixa_software_mockup_1774424279044.png" 
            alt="Intelligent Software Mockup showing analytics and automation interfaces" 
            style={{
              width: '100%',
              height: 'auto',
              filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.15))'
            }}
          />
        </div>
      </div>
    </div>
  );
}

