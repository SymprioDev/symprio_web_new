import React from 'react';

const BuildingColumnsIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="21" x2="21" y2="21" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <polyline points="12 3 21 10 3 10" />
    <line x1="6" y1="10" x2="6" y2="21" />
    <line x1="10" y1="10" x2="10" y2="21" />
    <line x1="14" y1="10" x2="14" y2="21" />
    <line x1="18" y1="10" x2="18" y2="21" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const CreditCardIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const HeartPulseIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.34l-.77-.76a5.4 5.4 0 0 0-7.65 0 5.4 5.4 0 0 0 0 7.65L12 20.65l8.42-8.42a5.4 5.4 0 0 0 0-7.65z" />
    <polyline points="3.5 12 8.5 12 10 10 12 14 14 10 15.5 12 20.5 12" />
  </svg>
);

const SignalIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
);

const GearIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1.08z" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const LandmarkIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 20 8 4 8" />
    <line x1="2" y1="18" x2="22" y2="18" />
  </svg>
);

const industries = [
  { icon: <BuildingColumnsIcon />, name: 'Banking & Finance', desc: 'Compliance automation, loan processing, fraud detection, customer onboarding' },
  { icon: <ShieldCheckIcon />, name: 'Insurance', desc: 'Claims processing, policy management, underwriting automation' },
  { icon: <CreditCardIcon />, name: 'Fintech', desc: 'AI-powered fintech apps, transaction automation, risk reduction' },
  { icon: <HeartPulseIcon />, name: 'Healthcare', desc: 'Patient data, billing, reporting automation' },
  { icon: <SignalIcon />, name: 'Telecom', desc: 'Churn reduction, network operations, customer experience AI' },
  { icon: <GearIcon />, name: 'Manufacturing', desc: 'Computer vision, predictive maintenance, supply chain automation' },
  { icon: <ShoppingBagIcon />, name: 'Retail & E-Commerce', desc: 'AI personalisation, inventory automation, service bots' },
  { icon: <LandmarkIcon />, name: 'Government & Public Sector', desc: 'Citizen services, back-office workflows, compliance' }
];

export default function Industries() {
  return (
    <section style={{ padding: '100px 20px', background: '#F1F7F3' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="section-tag">Industries We Serve</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#010B1D',
            margin: '0 0 20px 0',
            lineHeight: '1.2'
          }}>
            Expertise Across <em className="accent-text" style={{fontWeight:'400'}}>Every Industry</em>
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
              <div style={{ width: '48px', height: '48px', color: '#185ADB', marginBottom: '16px' }}>
                {industry.icon}
              </div>
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
