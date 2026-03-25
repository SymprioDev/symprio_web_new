import React, { useEffect, useRef, useState } from 'react';

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#185ADB" opacity="0.2" />
    <path d="M6 10.5l2.5 2.5 5.5-5.5" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ProgressBar = ({ label, percentage, color, animate }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
      <span style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{label}</span>
      <span style={{ color: color, fontSize: 16, fontWeight: 700 }}>{percentage}%</span>
    </div>
    <div style={{
      width: '100%',
      height: 12,
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: 6,
      overflow: 'hidden'
    }}>
      <div style={{
        width: animate ? `${percentage}%` : '0%',
        height: '100%',
        backgroundColor: color,
        borderRadius: 6,
        transition: 'width 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }} />
    </div>
  </div>
);

export default function PowerfulFeatures() {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const bullets = [
    'End-to-end automation from assessment to delivery',
    'AI-powered analytics and reporting dashboards',
    'Seamless integration with existing enterprise systems'
  ];

  const bars = [
    { label: 'Task Automation', percentage: 92, color: '#185ADB' },
    { label: 'Process Efficiency', percentage: 85, color: '#0D9488' },
    { label: 'Cost Reduction', percentage: 78, color: '#60a5fa' }
  ];

  return (
    <section ref={sectionRef} style={{
      backgroundColor: '#010B1D',
      padding: '100px 20px',
      width: '100%'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 60,
        alignItems: 'center'
      }}>
        {/* Left Column */}
        <div style={{ flex: '1 1 480px', minWidth: 280 }}>
          <div className="section-tag" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Powerful Features
          </div>

          <h2 style={{
            color: '#fff',
            fontSize: 40,
            fontWeight: 700,
            lineHeight: 1.2,
            margin: '16px 0 20px'
          }}>
            Everything You Need in{' '}
            <em className="accent-text" style={{ fontWeight: '400', color: '#60a5fa' }}>One Place</em>
          </h2>

          <p style={{
            fontSize: 16,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.6)',
            margin: '0 0 32px'
          }}>
            Symprio's intelligent automation platform brings together AI, RPA, and process consulting
            under one roof — so you can modernize operations without juggling multiple vendors or
            fragmented tools.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px' }}>
            {bullets.map((text, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
                color: 'rgba(255,255,255,0.8)',
                fontSize: 15,
                lineHeight: 1.5
              }}>
                <CheckIcon />
                {text}
              </li>
            ))}
          </ul>

          <a href="/services" style={{
            display: 'inline-block',
            padding: '14px 36px',
            border: '1.5px solid rgba(255,255,255,0.4)',
            borderRadius: 999,
            color: '#fff',
            fontSize: 15,
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.borderColor = '#fff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
          }}
          >
            Explore More →
          </a>
        </div>

        {/* Right Column — Progress Bars */}
        <div style={{ flex: '1 1 440px', minWidth: 280 }}>
          {bars.map((bar, i) => (
            <ProgressBar key={i} {...bar} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
