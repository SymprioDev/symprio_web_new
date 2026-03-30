import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';

const useCases = [
  {
    industry: 'Finance',
    title: 'Invoice Automation',
    problem: 'Manual invoice processing taking 3-4 days per cycle',
    solution: 'AI-powered document extraction + RPA workflow',
    impact: 'Reduced to 4 hours, 85% cost savings',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    industry: 'Human Resources',
    title: 'AI Interview Agent',
    problem: 'Screening 500+ candidates manually per role',
    solution: 'Agentic AI conducts initial interviews & ranks candidates',
    impact: '70% reduction in screening time',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    industry: 'Customer Support',
    title: 'AI Chatbot & Triage',
    problem: 'Long response times and high support costs',
    solution: 'LLM-powered chatbot handles 80% of queries autonomously',
    impact: '60% cost reduction, 24/7 availability',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    industry: 'Compliance',
    title: 'Regulatory Automation',
    problem: 'Manual compliance reporting prone to errors',
    solution: 'RPA + AI validates data and auto-generates reports',
    impact: '90% fewer errors, real-time compliance',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  }
];

export default function UseCases() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="use-cases" style={{
      padding: '120px 20px',
      background: '#ffffff'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="section-tag" data-aos="fade-up">Use Cases</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'var(--primary)',
            marginBottom: '24px',
            lineHeight: '1.2',
            fontWeight: 400
          }} data-aos="fade-up" data-aos-delay="100">
            Real Solutions for <em className="accent-text" style={{ fontWeight: '400' }}>Real Problems</em>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#444444', fontSize: '16px', lineHeight: '1.6' }} data-aos="fade-up" data-aos-delay="150">
            Your clients buy solutions, not services. See how we deliver measurable business impact across industries.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '32px'
        }}>
          {useCases.map((uc, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              style={{
                padding: '40px',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1px solid #DCDCDC',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(24,90,219,0.08)';
                e.currentTarget.style.borderColor = '#185ADB';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#DCDCDC';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#185ADB',
                  flexShrink: 0
                }}>
                  {uc.icon}
                </div>
                <div>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#185ADB',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    {uc.industry}
                  </span>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 600,
                    color: '#010B1D',
                    margin: '4px 0 0',
                    lineHeight: '1.3'
                  }}>
                    {uc.title}
                  </h3>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '14px', flexShrink: 0, marginTop: '2px' }}>Problem:</span>
                  <span style={{ fontSize: '15px', color: '#444444', lineHeight: '1.6' }}>{uc.problem}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#185ADB', fontWeight: 700, fontSize: '14px', flexShrink: 0, marginTop: '2px' }}>Solution:</span>
                  <span style={{ fontSize: '15px', color: '#444444', lineHeight: '1.6' }}>{uc.solution}</span>
                </div>
                <div style={{
                  marginTop: '8px',
                  padding: '12px 16px',
                  background: 'linear-gradient(135deg, #F0FDF4, #ECFDF5)',
                  borderRadius: '10px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#059669', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>Impact:</span>
                  <span style={{ fontSize: '15px', color: '#065F46', fontWeight: 600, lineHeight: '1.6' }}>{uc.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px' }} data-aos="fade-up">
          <button
            className="btn-pill btn-primary"
            onClick={() => navigate('/case-studies')}
            style={{ padding: '16px 48px', fontSize: '16px' }}
          >
            View All Case Studies &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
