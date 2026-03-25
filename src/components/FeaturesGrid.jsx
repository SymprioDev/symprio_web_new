import React from 'react';

const features = [
  {
    icon: '⚡',
    title: 'Fast Implementation',
    desc: 'Deploy automated workflows in weeks, not months, with our proven agile delivery methodology.',
    color: '#0D9488'
  },
  {
    icon: '🛡️',
    title: 'Enterprise Security',
    desc: 'Robust governance and ISO-standard security frameworks to protect your mission-critical data.',
    color: '#0A2D6E'
  },
  {
    icon: '📊',
    title: 'Real-time Analytics',
    desc: 'Monitor bot performance and ROI with dynamic AI-powered dashboards and predictive reporting.',
    color: '#0A2D6E'
  },
  {
    icon: '🤝',
    title: 'Elite Support',
    desc: '24/7 expert support teams available globally to ensure 99.9% uptime for your digital workforce.',
    color: '#0D9488'
  },
  {
    icon: '🚀',
    title: 'Infinite Scalability',
    desc: 'Seamlessly scale your digital operations as your business grows without increasing human overhead.',
    color: '#0D9488'
  },
  {
    icon: '🧠',
    title: 'Agentic AI Engine',
    desc: 'The only platform combining RPA with advanced LLMs for truly autonomous end-to-end execution.',
    color: '#0A2D6E'
  }
];

export default function FeaturesGrid() {
  return (
    <section style={{ 
      padding: '120px 20px', 
      background: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Accent */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '0',
        width: '30%',
        height: '40%',
        background: 'rgba(13, 148, 136, 0.03)',
        filter: 'blur(100px)',
        borderRadius: '50%',
        zIndex: 1
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            color: 'var(--secondary)',
            fontWeight: '800',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '16px',
            display: 'inline-block',
            padding: '4px 12px',
            background: 'rgba(0, 119, 182, 0.08)',
            borderRadius: '4px'
          }}>
            Enterprise Capabilities
          </div>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
            fontWeight: '900', 
            color: 'var(--primary)',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            Engineered for <span className="gradient-text">Performance</span>
          </h2>
          <p style={{ maxWidth: '650px', margin: '0 auto', color: '#4b5563', fontSize: '18px', lineHeight: '1.6' }}>
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
                padding: '48px',
                borderRadius: '32px',
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
              className="feature-card"
            >
              <div style={{
                width: '72px',
                height: '72px',
                background: `linear-gradient(135deg, ${f.color}15 0%, ${f.color}05 100%)`,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '32px',
                border: `1px solid ${f.color}20`
              }}>
                {f.icon}
              </div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '800', 
                marginBottom: '20px', 
                color: 'var(--primary)',
                letterSpacing: '-0.01em'
              }}>
                {f.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.7', margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .feature-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 40px 80px rgba(10, 45, 110, 0.08);
          border-color: var(--secondary)33;
        }
        .feature-card:hover h3 {
          color: var(--secondary);
        }
      `}</style>
    </section>
  );
}
