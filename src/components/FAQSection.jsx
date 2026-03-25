import React, { useState } from 'react';

const faqs = [
  {
    q: 'What is the implementation timeline?',
    a: 'Timelines vary by project complexity, but most initial RPA bots or AI pilot solutions are deployed within 4 to 8 weeks following the initial assessment.'
  },
  {
    q: 'Do you provide training for our internal team?',
    a: 'Yes, as a Microsoft Official Partner, we provide comprehensive training programs for UiPath, Power Automate, and general AI literacy to help you build your own CoE.'
  },
  {
    q: 'What industries do you specialize in?',
    a: 'We are domain-agnostic and have successfully delivered solutions across Banking, Insurance, Healthcare, Manufacturing, Retail, and the Public Sector.'
  },
  {
    q: 'How do you measure ROI for automation projects?',
    a: 'We calculate ROI based on time savings, error reduction, increased compliance, and the ability to reallocate human talent to higher-value strategic tasks.'
  },
  {
    q: 'Can your AI solutions integrate with legacy systems?',
    a: 'Absolutely. We specialize in bridging the gap between modern AI/Automation and legacy infrastructure using robust API integrations and RPA surface automation.'
  }
];

export default function FAQSection({ faqs: customFaqs }) {
  const defaultFaqs = [
    {
      q: 'What is the implementation timeline?',
      a: 'Timelines vary by project complexity, but most initial RPA bots or AI pilot solutions are deployed within 4 to 8 weeks following the initial assessment.'
    },
    {
      q: 'Do you provide training for our internal team?',
      a: 'Yes, as a Microsoft Official Partner, we provide comprehensive training programs for UiPath, Power Automate, and general AI literacy to help you build your own CoE.'
    },
    {
      q: 'What industries do you specialize in?',
      a: 'We are domain-agnostic and have successfully delivered solutions across Banking, Insurance, Healthcare, Manufacturing, Retail, and the Public Sector.'
    }
  ];

  const currentFaqs = customFaqs || defaultFaqs;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section style={{ padding: '100px 20px', background: '#f9fafb' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{
            color: 'var(--primary)',
            fontWeight: '700',
            fontSize: '14px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            HAVE QUESTIONS?
          </span>
          <h2 style={{ marginTop: '16px' }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {currentFaqs.map((faq, i) => (
            <div 
              key={i}
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: openIndex === i ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                style={{
                  width: '100%',
                  padding: '24px 30px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>{faq.q}</span>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: openIndex === i ? 'var(--primary)' : 'rgba(0,0,0,0.05)',
                  color: openIndex === i ? 'white' : '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  transition: 'all 0.3s ease',
                  transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)'
                }}>
                  +
                </span>
              </button>
              <div style={{
                maxHeight: openIndex === i ? '200px' : '0',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: openIndex === i ? 1 : 0
              }}>
                <div style={{ padding: '0 30px 32px', color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '16px' }}>
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
