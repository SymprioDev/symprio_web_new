import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FAQSection from './FAQSection';
import ConsultationForm from './ConsultationForm';

const workforceFaqs = [
  {
    q: 'How do you ensure the quality of the talent you provide?',
    a: 'We use a rigorous 5-stage vetting process that includes technical assessments, behavioral interviews, and reference checks. Only the top 5% of applicants are accepted into our talent pool.'
  },
  {
    q: 'What is the average time to deploy a team?',
    a: 'Depending on the complexity of the roles, we can typically deploy individual specialists within 5-10 business days and full managed teams within 3-4 weeks.'
  },
  {
    q: 'Can we transition Symprio talent to our internal payroll?',
    a: 'Yes. We offer flexible "Contract-to-Hire" models that allow you to evaluate talent on-site before making a long-term commitment.'
  }
];

export default function DigitalWorkforce() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
      offset: 100
    });
  }, []);

  return (
    <div style={{ backgroundColor: '#fff', fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Banner */}
      <section style={{
        backgroundImage: `linear-gradient(135deg, rgba(1,11,29,0.75) 0%, rgba(1,11,29,0.75) 100%), url('/assets/images/digital-workforce.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        padding: '120px 20px 160px',
        textAlign: 'center',
        color: '#fff',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '700',
            color: '#ffffff',
            margin: '0 0 24px 0',
            lineHeight: '1.15'
          }} data-aos="fade-up">
            Digital <span style={{ color: '#0D9488' }}>Workforce</span> Solutions
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.85)',
            margin: '0 auto',
            fontWeight: '400',
            maxWidth: '750px'
          }} data-aos="fade-up" data-aos-delay="100">
            Augmenting your success with elite, vetted global talent.
          </p>
        </div>
      </section>

      {/* Main content container */}
      <div style={{
        maxWidth: '1200px',
        margin: '-80px auto 0',
        padding: '0 20px',
        position: 'relative',
        zIndex: 10
      }}>

        {/* Introduction Section - Overlapping Container */}
        <section style={{
          marginBottom: '80px',
          background: '#ffffff',
          borderRadius: '20px',
          padding: '60px 50px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          border: '1px solid #DCDCDC'
        }} data-aos="fade-up">
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>TALENT SOLUTIONS</div>
            <h2 style={{
              fontSize: '40px',
              fontWeight: '400',
              color: '#010B1D',
              margin: '0 0 24px 0',
              lineHeight: '1.2'
            }}>
              Flexible Talent <strong>Augmentation</strong>
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#444444',
              marginBottom: '24px',
              fontWeight: '400'
            }}>
              Symprio provides flexible and transparent talent solutions to support large organizations. We deliver skilled professionals across IT, software development, project management, and business functions, serving global enterprises like Meta, AXA, and AIA.
            </p>
          </div>
        </section>

        {/* Offerings Section */}
        <section style={{ marginBottom: '100px', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>CATEGORIES</div>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '400',
            color: '#010B1D',
            marginBottom: '60px',
            textAlign: 'center'
          }} data-aos="fade-up">
            Talent <strong>Categories</strong>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
            {[
              {
                title: 'IT & Infrastructure',
                icon: '\uD83D\uDD12',
                description: 'Security consultants, cloud architects, and Oracle DBAs.',
                roles: ['IT Support Engineer', 'Security Consultant', 'Cloud Architect']
              },
              {
                title: 'Software Excellence',
                icon: '\uD83D\uDCBB',
                description: 'Full-stack developers and technical leads with modern expertise.',
                roles: ['Full-Stack Developer', 'Node.js Expert', 'Frontend Lead']
              },
              {
                title: 'Project Leadership',
                icon: '\uD83D\uDCCA',
                description: 'Scrum masters and PMs who deliver high-impact results.',
                roles: ['Scrum Master', 'Project Manager', 'Agile Coach']
              },
              {
                title: 'Business Functions',
                icon: '\uD83C\uDFAF',
                description: 'Strategic roles in HR, digital marketing, and operations.',
                roles: ['Digital Marketer', 'HR Operations', 'SEO Strategist']
              }
            ].map((offering, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                style={{
                  padding: '40px',
                  background: '#fff',
                  borderRadius: '20px',
                  border: '1px solid #DCDCDC',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#185ADB';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#DCDCDC';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>{offering.icon}</div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#010B1D', marginBottom: '15px' }}>{offering.title}</h3>
                <p style={{ fontSize: '16px', color: '#444444', lineHeight: '1.7', marginBottom: '20px' }}>{offering.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {offering.roles.map((role, i) => (
                    <span key={i} style={{
                      fontSize: '12px',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      background: '#f8f9fa',
                      border: '1px solid #DCDCDC',
                      color: '#010B1D',
                      fontWeight: '600'
                    }}>{role}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engagement Models */}
        <section style={{ padding: '100px 0' }}>
          <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>ENGAGEMENT</div>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '400',
            color: '#010B1D',
            marginBottom: '60px',
            textAlign: 'center'
          }} data-aos="fade-up">
            Engagement <strong>Models</strong>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {[
              {
                title: 'Talent Augmentation',
                icon: '\uD83E\uDD1D',
                desc: 'Quickly scale your internal teams with specialized external expertise.'
              },
              {
                title: 'Managed Teams',
                icon: '\uD83D\uDC65',
                desc: 'Dedicated Symprio teams managing end-to-end delivery of your roadmap.',
                highlight: true
              },
              {
                title: 'Strategic Outsourcing',
                icon: '\uD83C\uDFE2',
                desc: 'Complete ownership of business functions for long-term operational success.'
              }
            ].map((model, idx) => (
              <div key={idx} style={{
                padding: '40px',
                background: model.highlight ? 'linear-gradient(135deg, #010B1D 0%, #185ADB 100%)' : '#fff',
                color: model.highlight ? '#fff' : 'inherit',
                borderRadius: '20px',
                textAlign: 'center',
                border: model.highlight ? 'none' : '1px solid #DCDCDC',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!model.highlight) {
                  e.currentTarget.style.borderColor = '#185ADB';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (!model.highlight) {
                  e.currentTarget.style.borderColor = '#DCDCDC';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
              data-aos="zoom-in" data-aos-delay={idx * 100}>
                <div style={{ fontSize: '48px', marginBottom: '24px' }}>{model.icon}</div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '15px' }}>{model.title}</h3>
                <p style={{ fontSize: '16px', color: model.highlight ? 'rgba(255,255,255,0.85)' : '#444444', margin: 0, lineHeight: '1.7' }}>{model.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
      <FAQSection faqs={workforceFaqs} />

      <ConsultationForm />
    </div>
  );
}
