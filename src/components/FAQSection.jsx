import React, { useState } from 'react';

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
    <section style={{ padding: '120px 20px', background: '#ffffff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-tag" style={{ textAlign: 'center' }}>Have Questions?</div>
          <h2 style={{ marginTop: '16px', color: '#010B1D', fontWeight: '400' }}>
            Frequently Asked <strong>Questions</strong>
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
                border: '1px solid #DCDCDC',
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
                <span style={{ fontSize: '17px', fontWeight: '600', color: '#010B1D' }}>{faq.q}</span>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: openIndex === i ? '#185ADB' : 'rgba(0,0,0,0.05)',
                  color: openIndex === i ? 'white' : '#010B1D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  transition: 'all 0.3s ease',
                  transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)',
                  flexShrink: 0
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
                <div style={{ padding: '0 30px 32px', color: '#444444', lineHeight: '1.7', fontSize: '15px' }}>
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
