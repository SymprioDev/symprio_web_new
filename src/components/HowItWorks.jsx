import React, { useEffect, useState, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Process Assessment',
    description: 'We study your operations, identify bottlenecks, and map automation opportunities across your organization.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #185ADB 0%, #1E40AF 100%)',
    glowColor: 'rgba(24, 90, 219, 0.4)'
  },
  {
    number: '02',
    title: 'Automate',
    subtitle: 'RPA & AI Deployment',
    description: 'We design and deploy intelligent automation — from RPA bots to AI agents — tailored to your specific workflows.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
    glowColor: 'rgba(13, 148, 136, 0.4)'
  },
  {
    number: '03',
    title: 'Scale',
    subtitle: 'Digital Workforce',
    description: 'We scale your automation into a full digital workforce — autonomous AI agents running operations end-to-end.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
    glowColor: 'rgba(124, 58, 237, 0.4)'
  }
];

// Animated floating particles background
const FloatingParticles = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            borderRadius: '50%',
            background: 'rgba(24, 90, 219, 0.15)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

// Modern step card component
const ProcessStep = ({ step, index, isLast }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.2}s`
      }}
    >
      {/* Connector line */}
      {!isLast && (
        <div style={{
          position: 'absolute',
          top: '48px',
          left: 'calc(50% + 60px)',
          width: 'calc(100% - 120px)',
          height: '3px',
          background: 'linear-gradient(90deg, #185ADB, #0D9488)',
          zIndex: 0,
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            width: '50%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            animation: 'shimmer 2s infinite'
          }} />
          <style>{`
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
          `}</style>
        </div>
      )}

      {/* Main card */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          padding: '40px 32px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: isHovered 
            ? `0 25px 50px -12px ${step.glowColor}, 0 0 0 1px rgba(24, 90, 219, 0.1)` 
            : '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          zIndex: 1
        }}
      >
        {/* Glow effect on hover */}
        <div style={{
          position: 'absolute',
          inset: '-1px',
          borderRadius: '25px',
          background: step.gradient,
          opacity: isHovered ? 0.1 : 0,
          transition: 'opacity 0.5s ease',
          zIndex: -1
        }} />

        {/* Step number badge */}
        <div style={{
          position: 'absolute',
          top: '-16px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: step.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 800,
            boxShadow: `0 8px 20px ${step.glowColor}`,
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
          }}>
            {step.number}
          </div>
        </div>

        {/* Icon container */}
        <div style={{
          width: '80px',
          height: '80px',
          margin: '24px auto 28px',
          borderRadius: '20px',
          background: `${step.gradient}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: `0 12px 30px ${step.glowColor}`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated background ring */}
          <div style={{
            position: 'absolute',
            inset: '-50%',
            background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: 'spin 4s linear infinite',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }} />
          <style>{`
            @keyframes spin {
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <div style={{ position: 'relative', zIndex: 1 }}>{step.icon}</div>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#010B1D',
          marginBottom: '4px',
          letterSpacing: '-0.02em'
        }}>
          {step.title}
        </h3>

        {/* Subtitle */}
        <p style={{
          fontSize: '13px',
          fontWeight: 700,
          background: step.gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          {step.subtitle}
        </p>

        {/* Description */}
        <p style={{
          fontSize: '15px',
          color: '#64748b',
          lineHeight: '1.7',
          maxWidth: '280px',
          margin: '0 auto'
        }}>
          {step.description}
        </p>

        {/* Bottom accent line */}
        <div style={{
          width: '60px',
          height: '4px',
          margin: '24px auto 0',
          borderRadius: '2px',
          background: step.gradient,
          opacity: isHovered ? 1 : 0.5,
          transition: 'opacity 0.3s ease, width 0.3s ease',
          width: isHovered ? '80px' : '60px'
        }} />
      </div>
    </div>
  );
};

export default function HowItWorks() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate through steps on desktop
  useEffect(() => {
    if (isMobile) return;
    
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 3);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <section 
      ref={sectionRef}
      style={{
        padding: '140px 20px',
        background: 'linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 50%, #F8FAFC 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorations */}
      <FloatingParticles />
      
      {/* Large decorative circles */}
      <div style={{
        position: 'absolute',
        top: '-200px',
        right: '-200px',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(24,90,219,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-150px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '100px',
          opacity: 1,
          transform: 'translateY(0)',
          transition: 'all 0.8s ease'
        }}>
          <div 
            className="section-tag" 
            data-aos="fade-up"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, rgba(24,90,219,0.1) 0%, rgba(13,148,136,0.1) 100%)',
              borderRadius: '100px',
              marginBottom: '24px'
            }}
          >
            <span style={{ color: '#185ADB', fontWeight: 600 }}>⚡</span>
            <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 500 }}>Our Methodology</span>
          </div>
          
          <h2 
            data-aos="fade-up" 
            data-aos-delay="100"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: '#010B1D',
              marginBottom: '24px',
              lineHeight: '1.1',
              fontWeight: 700,
              letterSpacing: '-0.03em'
            }}
          >
            How We{' '}
            <span style={{
              background: 'linear-gradient(135deg, #185ADB 0%, #0D9488 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Transform
            </span>
          </h2>
          
          <p 
            data-aos="fade-up" 
            data-aos-delay="200"
            style={{ 
              maxWidth: '640px', 
              margin: '0 auto', 
              color: '#64748b', 
              fontSize: '18px', 
              lineHeight: '1.7',
              fontWeight: 400
            }}
          >
            A battle-tested 3-step methodology that takes your organization from manual processes to an autonomous AI-powered digital workforce.
          </p>

          {/* Step indicators */}
          <div 
            data-aos="fade-up" 
            data-aos-delay="300"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '40px'
            }}
          >
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '100px',
                  border: 'none',
                  background: activeStep === i 
                    ? 'linear-gradient(135deg, #185ADB 0%, #0D9488 100%)' 
                    : 'rgba(255,255,255,0.8)',
                  color: activeStep === i ? '#fff' : '#64748b',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeStep === i 
                    ? '0 4px 15px rgba(24,90,219,0.3)' 
                    : '0 2px 8px rgba(0,0,0,0.05)',
                  transform: activeStep === i ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {step.number} — {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Process cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '40px',
          position: 'relative'
        }}>
          {steps.map((step, i) => (
            <ProcessStep 
              key={i} 
              step={step} 
              index={i} 
              isLast={i === steps.length - 1}
            />
          ))}
        </div>

        {/* Bottom stats */}
        <div 
          data-aos="fade-up"
          data-aos-delay="400"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '60px',
            marginTop: '100px',
            padding: '40px',
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.8)',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)'
          }}
        >
          {[
            { value: '500+', label: 'Processes Automated' },
            { value: '98%', label: 'Success Rate' },
            { value: '60%', label: 'Cost Reduction' },
            { value: '4x', label: 'Faster Delivery' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #185ADB 0%, #0D9488 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '8px'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#64748b',
                fontWeight: 500
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(24, 90, 219, 0.3); }
          50% { box-shadow: 0 0 40px rgba(24, 90, 219, 0.6); }
        }
      `}</style>
    </section>
  );
}
