import React from 'react';

const plans = [
  {
    name: 'Starter',
    price: '2,500',
    desc: 'Perfect for small teams starting their automation journey.',
    features: ['50 Support Hours', 'Email Support', 'Basic Process Audit', 'Monthly Reports', '1 Active Bot Monitor'],
    color: '#0a2d6e'
  },
  {
    name: 'Professional',
    price: '5,000',
    desc: 'Ideal for growing businesses with multiple automated workflows.',
    features: ['100 Support Hours', 'Priority Email & Chat', 'Deep Process Assessment', 'Weekly ROI Insights', '5 Active Bot Monitors'],
    color: '#0077b6',
    featured: true
  },
  {
    name: 'Enterprise',
    price: '10,000',
    desc: 'Comprehensive support for full-scale digital transformation.',
    features: ['200+ Support Hours', '24/7 Dedicated Support', 'Full CoE Governance', 'Custom AI Integration', 'Unlimited Bot Monitoring'],
    color: '#0f172a'
  }
];

export default function Pricing() {
  return (
    <section style={{ padding: '100px 20px', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{
            color: 'var(--primary)',
            fontWeight: '700',
            fontSize: '14px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            SIMPLE PRICING
          </span>
          <h2 style={{ marginTop: '16px', marginBottom: '20px' }}>
            Choose the Right Plan for <span className="gradient-text">Your Growth</span>
          </h2>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '17px' }}>
            Transparent tiered support plans tailored to your specific automation and AI maturity level.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          alignItems: 'stretch'
        }}>
          {plans.map((p, i) => (
            <div 
              key={i}
              className="transition-smooth"
              style={{
                padding: '50px 40px',
                borderRadius: '32px',
                background: p.featured ? 'var(--primary)' : '#f9fafb',
                color: p.featured ? 'white' : 'inherit',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transform: p.featured ? 'scale(1.05)' : 'none',
                zIndex: p.featured ? 2 : 1,
                boxShadow: p.featured ? '0 30px 60px rgba(10, 45, 110, 0.2)' : 'none'
              }}
            >
              {p.featured && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'var(--accent)',
                  color: 'var(--primary)',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  fontSize: '12px',
                  fontWeight: '800'
                }}>
                  MOST POPULAR
                </div>
              )}
              <h3 style={{ color: p.featured ? 'white' : 'var(--primary)', fontSize: '24px', marginBottom: '16px' }}>{p.name}</h3>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '48px', fontWeight: '900' }}>${p.price}</span>
                <span style={{ opacity: 0.7 }}>/month</span>
              </div>
              <p style={{ 
                color: p.featured ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)', 
                fontSize: '15px', 
                marginBottom: '40px',
                minHeight: '45px'
              }}>
                {p.desc}
              </p>
              
              <div style={{ flex: 1, marginBottom: '40px' }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center', fontSize: '15px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={p.featured ? 'var(--accent)' : 'var(--primary)'} strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {f}
                  </div>
                ))}
              </div>

              <button 
                className="btn-pill"
                style={{
                  background: p.featured ? 'white' : 'var(--primary)',
                  color: p.featured ? 'var(--primary)' : 'white',
                  width: '100%'
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
