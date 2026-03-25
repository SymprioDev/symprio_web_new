import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FAQSection from './FAQSection';
import ConsultationForm from './ConsultationForm';

const customDevFaqs = [
  {
    q: 'What technologies do you specialize in for custom development?',
    a: 'We are platform-agnostic but specialize in modern stacks including React/Next.js for frontends, Node.js and .NET for backends, and AWS/Azure for cloud infrastructure.'
  },
  {
    q: 'How do you ensure the security of custom-built applications?',
    a: 'Security is baked into our "DevSecOps" pipeline. We perform regular static and dynamic code analysis, dependency scanning, and follow OWASP best practices for all builds.'
  },
  {
    q: 'Can you take over and modernize our existing legacy application?',
    a: 'Yes. We offer legacy modernization services where we refactor outdated codebases into scalable microservices architectures while maintaining data integrity.'
  }
];

/* SVG Icon Components */
const PaletteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.04-.23-.29-.38-.63-.38-1.04 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.17-4.5-9-10-9z"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const WrenchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

const CloudIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const SmartphoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);

const LayoutIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
);

const ServerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
);

const DatabaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);

const ContainerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12l-10 5.5L2 12l10-5.5L22 12z"/><path d="M22 17l-10 5.5L2 17"/><path d="M22 7l-10 5.5L2 7"/>
  </svg>
);

const lifecycleIcons = [<PaletteIcon />, <CodeIcon />, <CheckCircleIcon />, <RocketIcon />, <WrenchIcon />, <CloudIcon />];
const projectIcons = [<ChartIcon />, <LinkIcon />, <CloudIcon />, <SmartphoneIcon />];
const techIcons = [<LayoutIcon />, <ServerIcon />, <DatabaseIcon />, <ContainerIcon />];

export default function CustomDevelopment() {
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
        backgroundImage: `linear-gradient(135deg, rgba(1,11,29,0.75) 0%, rgba(1,11,29,0.75) 100%), url('/assets/images/custom-dev.jpg')`,
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
            Custom <span style={{ color: '#0D9488' }}>Software</span> Development
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.85)',
            margin: '0 auto',
            fontWeight: '400',
            maxWidth: '750px'
          }} data-aos="fade-up" data-aos-delay="100">
            Full-stack excellence from initial concept to global scale.
          </p>
        </div>

        {/* Breadcrumb */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          background: '#fff',
          padding: '16px 32px',
          borderTopRightRadius: '24px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <a href="/" style={{ color: '#6b7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Home
          </a>
          <span style={{ color: '#d1d5db' }}>/</span>
          <a href="/services" style={{ color: '#6b7280', textDecoration: 'none' }}>Services</a>
          <span style={{ color: '#d1d5db' }}>/</span>
          <span style={{ color: '#185ADB' }}>Custom Software</span>
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
            <div className="section-tag">Our Approach</div>
            <h2 style={{
              fontSize: '40px',
              fontWeight: '400',
              color: '#010B1D',
              margin: '0 0 24px 0',
              lineHeight: '1.2'
            }}>
              Agile & <strong>DevOps Excellence</strong>
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#444444',
              marginBottom: '20px',
              fontWeight: '400'
            }}>
              Symprio is your trusted partner for building bespoke solutions that align with your unique business objectives. We specialize in full-stack development leveraging modern technologies, agile methodologies, and DevOps practices to deliver scalable, secure, and innovative solutions.
            </p>
          </div>
        </section>

        {/* Services Section - Timeline/Process Flow */}
        <section style={{ marginBottom: '100px', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="section-tag">Development Process</div>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '400',
            color: '#010B1D',
            marginBottom: '80px',
            textAlign: 'center'
          }} data-aos="fade-up">
            Development <strong>Lifecycle</strong>
          </h2>

          <div style={{ position: 'relative', paddingBottom: '40px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'relative',
              gap: '20px'
            }}>
              {/* Background connector line */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '40px',
                right: '40px',
                height: '2px',
                background: '#DCDCDC',
                zIndex: 0
              }} />

              {[
                { step: '01', title: 'Discovery', description: 'Requirements & roadmap' },
                { step: '02', title: 'Development', description: 'Full-stack implementation' },
                { step: '03', title: 'QA', description: 'Testing & optimization' },
                { step: '04', title: 'DevOps', description: 'CI/CD & release' },
                { step: '05', title: 'Support', description: 'Maintenance & monitoring' },
                { step: '06', title: 'Scale', description: 'Growth & optimization' }
              ].map((item, idx) => (
                <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100} style={{ textAlign: 'center', flex: '1', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#185ADB',
                    margin: '0 auto 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '14px'
                  }}>
                    {item.step}
                  </div>

                  <div style={{
                    padding: '24px 16px',
                    background: 'white',
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
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: '#EFF6FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#185ADB',
                      margin: '0 auto 12px'
                    }}>
                      {lifecycleIcons[idx]}
                    </div>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#010B1D', margin: '0 0 8px 0' }}>{item.title}</h4>
                    <p style={{ fontSize: '14px', color: '#444444', margin: 0, lineHeight: '1.5' }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typical Projects Section */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px', background: '#F1F7F3', borderRadius: '20px', marginBottom: '0' }}>
          <div className="section-tag">What We Build</div>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '400',
            color: '#010B1D',
            marginBottom: '60px',
            textAlign: 'center'
          }} data-aos="fade-up">
            Projects We <strong>Deliver</strong>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', maxWidth: '1100px', margin: '0 auto' }}>
            {[
              {
                num: '01',
                title: 'Custom Portals & Dashboards',
                description: 'Executive dashboards and customer portals with real-time analytics and intuitive UX.',
              },
              {
                num: '02',
                title: 'API & Integration Platforms',
                description: 'RESTful and GraphQL APIs connecting disparate systems for seamless data flow.',
              },
              {
                num: '03',
                title: 'Cloud Migrations',
                description: 'Seamless migration from on-premises systems to Oracle Cloud, AWS, or Azure.',
              },
              {
                num: '04',
                title: 'Mobile Applications',
                description: 'iOS and Android applications with native performance and offline capabilities.',
              }
            ].map((project, idx) => (
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#185ADB',
                    flexShrink: 0
                  }}>
                    {projectIcons[idx]}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#185ADB', background: '#EFF6FF', padding: '4px 12px', borderRadius: '9999px' }}>{project.num}</span>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#010B1D', marginBottom: '12px', marginTop: '0' }}>{project.title}</h3>
                <p style={{ fontSize: '16px', color: '#444444', lineHeight: '1.7', margin: 0 }}>{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack Section */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px 100px' }}>
          <div className="section-tag">Technology Stack</div>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '400',
            color: '#010B1D',
            marginBottom: '60px',
            textAlign: 'center'
          }} data-aos="fade-up">
            Technology <strong>Expertise</strong>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              {
                layer: 'Front End',
                technologies: ['React', 'Angular', 'Vue.js', 'Next.js']
              },
              {
                layer: 'Back End',
                technologies: ['Node.js', '.NET Core', 'Java', 'Python']
              },
              {
                layer: 'Data',
                technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Kafka']
              },
              {
                layer: 'Cloud/DevOps',
                technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes']
              }
            ].map((stack, idx) => (
              <div key={idx} style={{
                padding: '36px 24px',
                background: idx % 2 === 0 ? '#010B1D' : '#185ADB',
                borderRadius: '20px',
                color: '#fff',
                textAlign: 'center'
              }} data-aos="fade-up" data-aos-delay={idx * 100}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  {techIcons[idx]}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', marginTop: '0' }}>{stack.layer}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {stack.technologies.map((tech, tidx) => (
                    <span key={tidx} style={{
                      opacity: '0.85',
                      fontWeight: '400',
                      fontSize: '16px',
                      padding: '6px 0',
                      borderBottom: tidx < stack.technologies.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none'
                    }}>{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
      <FAQSection faqs={customDevFaqs} />

      <ConsultationForm />
    </div>
  );
}
