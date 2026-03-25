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

/* SVG Icon Components */
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const HandshakeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const BuildingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8.01" y2="6"/><line x1="16" y1="6" x2="16.01" y2="6"/><line x1="8" y1="10" x2="8.01" y2="10"/><line x1="16" y1="10" x2="16.01" y2="10"/><line x1="8" y1="14" x2="8.01" y2="14"/><line x1="16" y1="14" x2="16.01" y2="14"/>
  </svg>
);

const categoryIcons = [<ShieldIcon />, <CodeIcon />, <ChartIcon />, <TargetIcon />];
const modelIcons = [<HandshakeIcon />, <UsersIcon />, <BuildingIcon />];

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
        <section style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
                description: 'Security consultants, cloud architects, and Oracle DBAs.',
                roles: ['IT Support Engineer', 'Security Consultant', 'Cloud Architect']
              },
              {
                title: 'Software Excellence',
                description: 'Full-stack developers and technical leads with modern expertise.',
                roles: ['Full-Stack Developer', 'Node.js Expert', 'Frontend Lead']
              },
              {
                title: 'Project Leadership',
                description: 'Scrum masters and PMs who deliver high-impact results.',
                roles: ['Scrum Master', 'Project Manager', 'Agile Coach']
              },
              {
                title: 'Business Functions',
                description: 'Strategic roles in HR, digital marketing, and operations.',
                roles: ['Digital Marketer', 'HR Operations', 'SEO Strategist']
              }
            ].map((offering, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                style={{
                  padding: '36px',
                  background: '#fff',
                  borderRadius: '20px',
                  border: '1px solid #DCDCDC',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#185ADB';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(24, 90, 219, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#DCDCDC';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#185ADB',
                  marginBottom: '20px'
                }}>
                  {categoryIcons[idx]}
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#010B1D', marginBottom: '12px', marginTop: '0' }}>{offering.title}</h3>
                <p style={{ fontSize: '16px', color: '#444444', lineHeight: '1.7', marginBottom: '20px' }}>{offering.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {offering.roles.map((role, i) => (
                    <span key={i} style={{
                      fontSize: '12px',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      background: '#EFF6FF',
                      border: 'none',
                      color: '#185ADB',
                      fontWeight: '600'
                    }}>{role}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engagement Models */}
        <section style={{ padding: '100px 20px' }}>
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
                desc: 'Quickly scale your internal teams with specialized external expertise.'
              },
              {
                title: 'Managed Teams',
                desc: 'Dedicated Symprio teams managing end-to-end delivery of your roadmap.',
                highlight: true
              },
              {
                title: 'Strategic Outsourcing',
                desc: 'Complete ownership of business functions for long-term operational success.'
              }
            ].map((model, idx) => (
              <div key={idx} style={{
                padding: '36px',
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
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(24, 90, 219, 0.12)';
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
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: model.highlight ? 'rgba(255,255,255,0.15)' : '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: model.highlight ? '#fff' : '#185ADB',
                  margin: '0 auto 24px'
                }}>
                  {modelIcons[idx]}
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px', marginTop: '0' }}>{model.title}</h3>
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
