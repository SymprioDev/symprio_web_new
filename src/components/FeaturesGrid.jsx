import React from 'react';

const LightningBoltIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ChartIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const HeadsetIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" />
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
  </svg>
);

const ScaleIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const CpuIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
);

const features = [
  {
    icon: <LightningBoltIcon />,
    title: 'Fast Implementation',
    desc: 'Deploy automated workflows in weeks, not months, with our proven agile delivery methodology.'
  },
  {
    icon: <ShieldIcon />,
    title: 'Enterprise Security',
    desc: 'Robust governance and ISO-standard security frameworks to protect your mission-critical data.'
  },
  {
    icon: <ChartIcon />,
    title: 'Real-time Analytics',
    desc: 'Monitor bot performance and ROI with dynamic AI-powered dashboards and predictive reporting.'
  },
  {
    icon: <HeadsetIcon />,
    title: 'Elite Support',
    desc: '24/7 expert support teams available globally to ensure 99.9% uptime for your digital workforce.'
  },
  {
    icon: <ScaleIcon />,
    title: 'Infinite Scalability',
    desc: 'Seamlessly scale your digital operations as your business grows without increasing human overhead.'
  },
  {
    icon: <CpuIcon />,
    title: 'Agentic AI Engine',
    desc: 'The only platform combining RPA with advanced LLMs for truly autonomous end-to-end execution.'
  }
];

export default function FeaturesGrid() {
  return (
    <section style={{
      padding: '120px 20px',
      background: '#ffffff'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="section-tag">Our Expertise</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'var(--primary)',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            Modern Business <strong>Solutions</strong>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#444444', fontSize: '16px', lineHeight: '1.6' }}>
            Symprio provides the industrial-grade infrastructure your business needs to lead in the age of AI.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px'
        }}>
          {features.map((f, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 50}
              style={{
                padding: '40px',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1px solid #DCDCDC',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
              className="feature-card"
            >
              <div style={{
                width: '56px',
                height: '56px',
                color: '#185ADB',
                marginBottom: '32px'
              }}>
                {f.icon}
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '600',
                marginBottom: '16px',
                color: 'var(--primary)'
              }}>
                {f.title}
              </h3>
              <p style={{ color: '#444444', fontSize: '15px', lineHeight: '1.7', margin: '0 0 24px 0', flex: 1 }}>
                {f.desc}
              </p>
              <a href="#" style={{
                color: '#185ADB',
                fontSize: '15px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block'
              }}>
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
      `}</style>
    </section>
  );
}
