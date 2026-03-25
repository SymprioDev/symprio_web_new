import React from 'react';

const industries = [
  { icon: '🏦', name: 'Banking & Finance', desc: 'Compliance automation, loan processing, fraud detection, customer onboarding' },
  { icon: '🏢', name: 'Insurance', desc: 'Claims processing, policy management, underwriting automation' },
  { icon: '💳', name: 'Fintech', desc: 'AI-powered fintech apps, transaction automation, risk reduction' },
  { icon: '🏥', name: 'Healthcare', desc: 'Patient data, billing, reporting automation' },
  { icon: '📡', name: 'Telecom', desc: 'Churn reduction, network operations, customer experience AI' },
  { icon: '🏭', name: 'Manufacturing', desc: 'Computer vision, predictive maintenance, supply chain automation' },
  { icon: '🛍️', name: 'Retail & E-Commerce', desc: 'AI personalisation, inventory automation, service bots' },
  { icon: '🏛️', name: 'Government & Public Sector', desc: 'Citizen services, back-office workflows, compliance' }
];

export default function Industries() {
  return (
    <section style={{ padding: '100px 20px', background: '#f9fafb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-block',
            color: '#0D9488',
            fontWeight: '800',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '16px',
            padding: '4px 12px',
            background: 'rgba(13, 148, 136, 0.08)',
            borderRadius: '4px'
          }}>
            Industries
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '900',
            color: '#0A2D6E',
            margin: '0 0 20px 0',
            lineHeight: '1.2'
          }}>
            Expertise Across <span style={{ color: '#0D9488' }}>Every Industry</span>
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#4b5563',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            We are a domain-agnostic consultancy. We study your processes and design solutions that fit your operational context.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {industries.map((industry, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 50}
              className="industry-card"
              style={{
                padding: '36px 28px',
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '20px',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                cursor: 'default'
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{industry.icon}</div>
              <h3 style={{
                fontSize: '17px',
                fontWeight: '800',
                color: '#0A2D6E',
                marginBottom: '10px'
              }}>
                {industry.name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                margin: 0
              }}>
                {industry.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .industry-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(10, 45, 110, 0.08);
          border-color: rgba(13, 148, 136, 0.3);
        }
      `}</style>
    </section>
  );
}
