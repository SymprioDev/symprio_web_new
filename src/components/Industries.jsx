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
    <section style={{ padding: '100px 20px', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="section-tag">Industries</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#010B1D',
            margin: '0 0 20px 0',
            lineHeight: '1.2'
          }}>
            Expertise Across <strong>Every Industry</strong>
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#444444',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            We are a domain-agnostic consultancy. We study your processes and design solutions that fit your operational context.
          </p>
        </div>

        <div className="industries-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px'
        }}>
          {industries.map((industry, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 50}
              className="industry-card"
              style={{
                padding: '32px 24px',
                background: '#ffffff',
                border: '1px solid #DCDCDC',
                borderRadius: '16px',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                cursor: 'default'
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{industry.icon}</div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#010B1D',
                marginBottom: '10px'
              }}>
                {industry.name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#444444',
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
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(24, 90, 219, 0.1);
          border-color: #185ADB !important;
        }
        @media (max-width: 1024px) {
          .industries-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .industries-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
