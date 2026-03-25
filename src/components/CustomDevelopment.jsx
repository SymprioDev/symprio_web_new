import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FAQSection from './FAQSection';

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
            <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>DEVELOPMENT</div>
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
          <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>PROCESS</div>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '400',
            color: '#010B1D',
            marginBottom: '80px',
            textAlign: 'center'
          }} data-aos="fade-up">
            Development <strong>Lifecycle</strong>
          </h2>

          <div style={{
            position: 'relative',
            paddingBottom: '40px'
          }}>
            <div style={{
              position: 'absolute',
              top: '30px',
              left: '50px',
              right: '50px',
              height: '3px',
              background: 'linear-gradient(90deg, #010B1D 0%, #185ADB 100%)',
              zIndex: 0
            }}/>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '20px',
              position: 'relative',
              zIndex: 1
            }}>
              {[
                { step: '01', title: 'Discovery', icon: '\uD83C\uDFA8', description: 'Requirements & roadmap' },
                { step: '02', title: 'Development', icon: '\uD83D\uDCBB', description: 'Full-stack implementation' },
                { step: '03', title: 'QA', icon: '\u2713', description: 'Testing & optimization' },
                { step: '04', title: 'DevOps', icon: '\uD83D\uDE80', description: 'CI/CD & release' },
                { step: '05', title: 'Support', icon: '\uD83D\uDD27', description: 'Maintenance & monitoring' },
                { step: '06', title: 'Scale', icon: '\u2601\uFE0F', description: 'Growth & optimization' }
              ].map((item, idx) => (
                <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#185ADB',
                    margin: '0 auto 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '18px',
                    boxShadow: '0 8px 20px rgba(24, 90, 219, 0.25)',
                    border: '3px solid white'
                  }}>
                    {item.step}
                  </div>

                  <div style={{
                    padding: '20px',
                    background: 'white',
                    borderRadius: '20px',
                    border: '1px solid #DCDCDC',
                    minHeight: '180px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
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
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>{item.icon}</div>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#010B1D', margin: '0 0 8px 0' }}>{item.title}</h4>
                    <p style={{ fontSize: '14px', color: '#444444', margin: 0, lineHeight: '1.5' }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typical Projects Section */}
        <section style={{ marginBottom: '100px', maxWidth: '1200px', margin: '0 auto', padding: '100px 20px' }}>
          <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>PROJECTS</div>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '400',
            color: '#010B1D',
            marginBottom: '60px',
            textAlign: 'center'
          }} data-aos="fade-up">
            Projects We <strong>Deliver</strong>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
            {[
              {
                num: '01',
                title: 'Custom Portals & Dashboards',
                icon: '\uD83D\uDCCA',
                description: 'Executive dashboards and customer portals with real-time analytics and intuitive UX.',
              },
              {
                num: '02',
                title: 'API & Integration Platforms',
                icon: '\uD83D\uDD17',
                description: 'RESTful and GraphQL APIs connecting disparate systems for seamless data flow.',
              },
              {
                num: '03',
                title: 'Cloud Migrations',
                icon: '\u2601\uFE0F',
                description: 'Seamless migration from on-premises systems to Oracle Cloud, AWS, or Azure.',
              },
              {
                num: '04',
                title: 'Mobile Applications',
                icon: '\uD83D\uDCF1',
                description: 'iOS and Android applications with native performance and offline capabilities.',
              }
            ].map((project, idx) => (
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
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>{project.icon}</div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#010B1D', marginBottom: '15px' }}>{project.title}</h3>
                <p style={{ fontSize: '16px', color: '#444444', lineHeight: '1.7', margin: 0 }}>{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack Section */}
        <section style={{ marginBottom: '120px', maxWidth: '1200px', margin: '0 auto', padding: '0 20px 100px' }}>
          <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>TECH STACK</div>
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
                padding: '30px',
                background: idx % 2 === 0 ? '#010B1D' : '#185ADB',
                borderRadius: '20px',
                color: '#fff',
                textAlign: 'center'
              }} data-aos="fade-up" data-aos-delay={idx * 100}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>{stack.layer}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {stack.technologies.map((tech, tidx) => (
                    <span key={tidx} style={{ opacity: '0.85', fontWeight: '400', fontSize: '16px' }}>{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
      <FAQSection faqs={customDevFaqs} />
    </div>
  );
}
