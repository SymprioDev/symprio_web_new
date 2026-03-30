import React, { useEffect, useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Process Assessment',
    description: 'We study your operations, identify bottlenecks, and map automation opportunities across your organization.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    )
  },
  {
    number: '02',
    title: 'Automate',
    subtitle: 'RPA & AI Deployment',
    description: 'We design and deploy intelligent automation — from RPA bots to AI agents — tailored to your specific workflows.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    )
  },
  {
    number: '03',
    title: 'Scale',
    subtitle: 'Digital Workforce',
    description: 'We scale your automation into a full digital workforce — autonomous AI agents running operations end-to-end.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    )
  }
];

export default function HowItWorks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section style={{
      padding: '120px 20px',
      background: '#F1F7F3'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="section-tag" data-aos="fade-up">Our Process</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'var(--primary)',
            marginBottom: '24px',
            lineHeight: '1.2',
            fontWeight: 400
          }} data-aos="fade-up" data-aos-delay="100">
            How We <em className="accent-text" style={{ fontWeight: '400' }}>Work</em>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#444444', fontSize: '16px', lineHeight: '1.6' }} data-aos="fade-up" data-aos-delay="150">
            A proven 3-step methodology to take you from manual operations to an AI-powered digital workforce.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '40px',
          position: 'relative'
        }}>
          {/* Connector line (desktop only) */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: '80px',
              left: 'calc(16.67% + 20px)',
              right: 'calc(16.67% + 20px)',
              height: '2px',
              background: 'linear-gradient(90deg, #185ADB, #0D9488)',
              zIndex: 0
            }} />
          )}

          {steps.map((step, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              style={{
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
              }}
            >
              {/* Icon circle */}
              <div style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '2px solid #185ADB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 32px',
                color: '#185ADB',
                boxShadow: '0 8px 32px rgba(24,90,219,0.1)',
                position: 'relative'
              }}>
                {step.icon}
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#185ADB',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {step.number}
                </span>
              </div>

              <h3 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#010B1D',
                marginBottom: '8px'
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#185ADB',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {step.subtitle}
              </p>
              <p style={{
                fontSize: '15px',
                color: '#444444',
                lineHeight: '1.7',
                maxWidth: '320px',
                margin: '0 auto'
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
