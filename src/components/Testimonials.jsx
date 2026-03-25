import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Symprio transformed our digital operations. Their RPA solution reduced our processing time by 60% and freed our team to focus on strategic initiatives.",
      author: "CEO, Financial Services",
      company: "Fortune 500 Bank",
      initials: "CF"
    },
    {
      quote: "Working with Symprio was seamless. Their agentic AI solution enhanced our customer support capabilities and improved satisfaction scores significantly.",
      author: "Head of Operations",
      company: "Global Telecom Company",
      initials: "HO"
    },
    {
      quote: "Symprio's Oracle expertise and change management approach made our ERP implementation smooth. Their team understood our local requirements perfectly.",
      author: "CIO",
      company: "Regional Enterprise",
      initials: "CI"
    },
    {
      quote: "The RPA training Symprio delivered was hands-on and immediately applicable. Our team was building bots within days.",
      author: "Digital Transformation Lead",
      company: "Insurance Company",
      initials: "DT"
    },
    {
      quote: "Symprio's process assessment revealed inefficiencies we didn't know existed. ROI was evident within the first quarter.",
      author: "COO",
      company: "Manufacturing Group",
      initials: "CO"
    },
    {
      quote: "Their AI agent handles our entire back-office workflow autonomously. It's like having a full-time team member who never stops.",
      author: "CEO, Fintech Startup",
      company: "Fintech Startup",
      initials: "CE"
    }
  ];

  const partners = [
    { name: 'UiPath', logo: '/uipath-logo.png' },
    { name: 'Microsoft', logo: '/microsoft-logo.png' },
    { name: 'Oracle', logo: '/oracle-logo.png' },
    { name: 'Salesforce', logo: '/salesforce-logo.png' }
  ];

  return (
    <>
    <style>{`
      @media (max-width: 1024px) {
        .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; }
      }
      @media (max-width: 600px) {
        .testimonials-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
    <section style={{
      width: '100%',
      margin: '0',
      padding: '120px 20px',
      background: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
      {/* Testimonials */}
      <div style={{ marginBottom: '80px' }}>
        <div className="section-tag" style={{ textAlign: 'center' }}>Client Stories</div>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '400',
          color: '#010B1D',
          textAlign: 'center',
          margin: '0 0 60px 0'
        }}
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-once="false">
          Feedback from <em className="accent-text" style={{fontWeight:'400'}}>Real Teams</em>
        </h2>

        <div className="testimonials-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px'
        }}>
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              data-aos-duration="1000"
              data-aos-offset="100"
              data-aos-once="false"
              style={{
                background: '#ffffff',
                padding: '32px',
                borderRadius: '20px',
                border: '1px solid #DCDCDC',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#185ADB';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(24,90,219,0.1)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#DCDCDC';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #185ADB, #0D9488)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '20px', fontWeight: '700',
                marginBottom: '20px'
              }}>
                {testimonial.initials}
              </div>

              <div style={{
                color: '#185ADB',
                fontSize: '18px',
                marginBottom: '15px'
              }}>
                ★★★★★
              </div>

              <p style={{
                fontSize: '15px',
                color: '#444444',
                lineHeight: '1.8',
                margin: '0 0 20px 0',
                fontStyle: 'italic'
              }}>
                "{testimonial.quote}"
              </p>

              <div style={{
                borderTop: '1px solid #DCDCDC',
                paddingTop: '20px'
              }}>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#010B1D',
                  margin: '0'
                }}>
                  {testimonial.author}
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  margin: '5px 0 0 0'
                }}>
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>

    {/* Partners Section - White Background */}
    <section style={{
      width: '100%',
      margin: '0',
      padding: '80px 20px',
      background: '#ffffff',
      borderRadius: '0px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h3 data-aos="fade-up" data-aos-duration="800" data-aos-offset="100" data-aos-once="false" style={{
          fontSize: '24px',
          fontWeight: '400',
          color: '#1f2937',
          textAlign: 'center',
          margin: '0 0 50px 0'
        }}>
          Trusted by Industry Leaders
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '40px',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {partners.map((partner, idx) => (
            <div
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 150}
              data-aos-duration="700"
              data-aos-offset="50"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                backgroundColor: 'transparent',
                borderRadius: '8px',
                border: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img src={partner.logo} alt={partner.name} style={{
                height: '100px',
                objectFit: 'contain',
                maxWidth: '100%'
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
