import React from 'react';

export default function SymprioStats() {
  const stats = [
    { number: '85', suffix: '%', label: 'Cost Reduction', description: 'Average cost savings achieved for our clients through intelligent automation and AI-powered digital workforce solutions.' },
    { number: '400', suffix: '+', label: 'Bots Deployed', description: 'Successfully deployed over 400 robotic process automation solutions, delivering end-to-end RPA services from assessment to delivery.' },
    { number: '45', suffix: '+', label: 'Enterprise Clients', description: 'Leading organizations including Meta, Amway, JPA, HRDF and many others trust Symprio for their AI transformation initiatives.' },
    { number: '15', suffix: '+', label: 'Countries', description: 'Serving customers across the Indo-Pacific region including Silicon Valley, Singapore, Malaysia, and India with global expertise.' },
  ];

  return (
    <section style={{
      padding: '80px 20px',
      background: '#010B1D',
      width: '100%',
      margin: '0'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0'
        }}>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 120}
              data-aos-duration="1500"
              data-aos-offset="100"
              data-aos-once="false"
              style={{
                padding: '25px 30px',
                textAlign: 'center',
                borderRight: idx < stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
              }}
            >
              <h3 style={{
                fontSize: '56px',
                fontWeight: '700',
                color: '#ffffff',
                margin: '0',
                display: 'inline'
              }}>
                {stat.number}
              </h3>
              <span style={{
                fontSize: '56px',
                fontWeight: '700',
                color: '#185ADB',
                display: 'inline'
              }}>
                {stat.suffix}
              </span>
              <h6 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: '10px 0 15px 0',
                letterSpacing: '1px'
              }}>
                {stat.label}
              </h6>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.5)',
                margin: 0,
                lineHeight: '1.6'
              }}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
