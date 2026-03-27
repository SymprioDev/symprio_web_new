import React from 'react';

const features = [
  {
    icon: '/assets/illustrations/fast-implementation.jpg',
    title: 'Fast Implementation',
    desc: 'Deploy automated workflows in weeks, not months, with our proven agile delivery methodology.'
  },
  {
    icon: '/assets/illustrations/enterprise-security.jpg',
    title: 'Enterprise Security',
    desc: 'Robust governance and ISO-standard security frameworks to protect your mission-critical data.'
  },
  {
    icon: '/assets/illustrations/realtime-analytics.jpg',
    title: 'Real-time Analytics',
    desc: 'Monitor bot performance and ROI with dynamic AI-powered dashboards and predictive reporting.'
  },
  {
    icon: '/assets/illustrations/elite-support.jpg',
    title: 'Elite Support',
    desc: '24/7 expert support teams available globally to ensure 99.9% uptime for your digital workforce.'
  },
  {
    icon: '/assets/illustrations/scalability.jpg',
    title: 'Infinite Scalability',
    desc: 'Seamlessly scale your digital operations as your business grows without increasing human overhead.'
  },
  {
    icon: '/assets/illustrations/ai-engine.jpg',
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
            Modern Business <em className="accent-text" style={{fontWeight:'400'}}>Solutions</em>
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
              <div style={{width:'72px', height:'72px', borderRadius:'16px', overflow:'hidden', marginBottom:'24px'}}>
                <img src={f.icon} alt={f.title} style={{width:'100%', height:'100%', objectFit:'cover'}} />
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
