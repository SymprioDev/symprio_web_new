import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';

/**
 * HeroSection Component
 * Modern SaaS-style hero section for AI-powered Digital Workforce
 * 
 * Features:
 * - 2-column layout (text left, visual right)
 * - Animated elements
 * - Primary & Secondary CTAs
 * - Trust indicators
 * - Responsive design
 */
const HeroSection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Scroll to contact form
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/contact');
    }
  };

  return (
    <>
      <SEO
        title="AI-powered Digital Workforce for Enterprises | Symprio"
        description="From RPA to Agentic AI — Symprio automates operations, decisions, and entire business workflows. Build your AI-powered digital workforce today."
      />
      
      <section 
        id="home"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0A192F 0%, #0f2a4a 50%, #1a3a5c 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 20px',
          overflow: 'hidden',
        }}
      >
        {/* Background Effects */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          {/* Top-left glow */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(24, 90, 219, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }} />
          
          {/* Bottom-right glow */}
          <div style={{
            position: 'absolute',
            bottom: '-30%',
            right: '-10%',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }} />
          
          {/* Grid pattern overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />
        </div>

        {/* Main Content Container */}
        <div style={{
          width: '100%',
          maxWidth: '1280px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
          gap: '60px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
        }}>
          {/* Left Content - Text */}
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}>
            {/* Tagline */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'rgba(24, 90, 219, 0.15)',
              borderRadius: '100px',
              marginBottom: '24px',
              border: '1px solid rgba(24, 90, 219, 0.3)',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
              }} />
              <span style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#93c5fd',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                AI-powered Digital Workforce
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '24px',
            }}>
              Build Your{' '}
              <span style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                AI-Powered
              </span>{' '}
              Digital Workforce
            </h1>

            {/* Subtext */}
            <p style={{
              fontSize: '18px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '40px',
              maxWidth: '520px',
            }}>
              From RPA to Agentic AI — we automate operations, decisions, and entire business workflows. 
              Deploy intelligent agents that work 24/7, eliminate repetitive tasks, and scale without limits.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '48px',
            }}>
              {/* Primary CTA */}
              <button
                onClick={scrollToContact}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #185ADB 0%, #2563eb 100%)',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(24, 90, 219, 0.4)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(24, 90, 219, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(24, 90, 219, 0.4)';
                }}
              >
                Book a Demo
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => navigate('/services')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '16px 32px',
                  background: 'transparent',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                Explore Services
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </button>
            </div>

            {/* Trust Indicators */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '24px',
            }}>
              {/* Stats */}
              {[
                { value: '400+', label: 'Bots Deployed' },
                { value: '15+', label: 'Countries' },
                { value: '40%', label: 'Cost Reduction' },
              ].map((stat, index) => (
                <div key={index} style={{
                  paddingRight: index < 2 ? '24px' : '0',
                  borderRight: index < 2 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                }}>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#ffffff',
                    lineHeight: '1',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginTop: '4px',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Visual */}
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.9)',
            transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            {/* AI Workforce Visualization */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '500px',
              aspectRatio: '1',
            }}>
              {/* Central AI Hub */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '140px',
                height: '140px',
                background: 'linear-gradient(135deg, #185ADB 0%, #7c3aed 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 60px rgba(24, 90, 219, 0.5), 0 0 120px rgba(124, 58, 237, 0.3)',
                zIndex: 10,
              }}>
                <div style={{
                  textAlign: 'center',
                }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    <path d="M12 8a4 4 0 0 1 4 4" strokeLinecap="round" />
                  </svg>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginTop: '8px',
                    letterSpacing: '0.1em',
                  }}>
                    AI CORE
                  </div>
                </div>
              </div>

              {/* Orbiting Elements */}
              {[
                { angle: 0, label: 'RPA Bots', icon: '🤖', color: '#22c55e' },
                { angle: 120, label: 'AI Agents', icon: '🧠', color: '#3b82f6' },
                { angle: 240, label: 'Workflows', icon: '⚡', color: '#f59e0b' },
              ].map((item, index) => {
                const angle = (item.angle * Math.PI) / 180;
                const radius = 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                      width: '100px',
                      height: '100px',
                      background: 'rgba(10, 25, 47, 0.9)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${item.color}30`,
                      boxShadow: `0 0 30px ${item.color}20`,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(1.1)`;
                      e.currentTarget.style.boxShadow = `0 0 40px ${item.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(1)`;
                      e.currentTarget.style.boxShadow = `0 0 30px ${item.color}20`;
                    }}
                  >
                    <span style={{ fontSize: '28px' }}>{item.icon}</span>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      color: '#ffffff',
                      marginTop: '8px',
                      textAlign: 'center',
                    }}>
                      {item.label}
                    </span>
                  </div>
                );
              })}

              {/* Connecting Lines (CSS-drawn) */}
              <svg
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                }}
              >
                {[0, 120, 240].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const radius = 180;
                  const x = 250 + Math.cos(rad) * radius;
                  const y = 250 + Math.sin(rad) * radius;
                  const gradientId = `lineGradient${i}`;
                  return (
                    <line
                      key={i}
                      x1="250"
                      y1="250"
                      x2={x}
                      y2={y}
                      stroke={`url(#${gradientId})`}
                      strokeWidth="2"
                      strokeDasharray="8 4"
                      opacity="0.5"
                    />
                  );
                })}
                <defs>
                  {[0, 120, 240].map((_, i) => (
                    <linearGradient key={i} id={`lineGradient${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#185ADB" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4" />
                    </linearGradient>
                  ))}
                </defs>
              </svg>

              {/* Outer Ring Animation */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '420px',
                height: '420px',
                borderRadius: '50%',
                border: '1px dashed rgba(24, 90, 219, 0.3)',
                animation: 'spin 30s linear infinite',
              }} />
              
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '360px',
                height: '360px',
                borderRadius: '50%',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                animation: 'spin 20s linear infinite reverse',
              }} />
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to bottom, transparent, #ffffff)',
          pointerEvents: 'none',
        }} />

        {/* Keyframe Animation Styles */}
        <style>{`
          @keyframes spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
              text-align: center;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default HeroSection;
