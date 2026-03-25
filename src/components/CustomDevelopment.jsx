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
        backgroundImage: `linear-gradient(135deg, rgba(10, 45, 110, 0.8) 0%, rgba(0, 119, 182, 0.4) 100%), url('/assets/images/custom-dev.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        padding: '120px 20px 160px',
        textAlign: 'center',
        color: '#fff',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 4.5rem)',
            fontWeight: '900',
            color: '#ffffff',
            margin: '0 0 24px 0',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            textShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }} data-aos="fade-up">
            Custom <span style={{ color: 'var(--accent)' }}>Software</span> Development
          </h1>
          <p style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.9)',
            margin: '0 auto',
            fontWeight: '500',
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
          borderRadius: '32px',
          padding: '80px 60px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
          border: '1px solid rgba(0,0,0,0.05)'
        }} data-aos="fade-up">
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '900',
              color: 'var(--primary)',
              margin: '0 0 24px 0',
              lineHeight: '1.2'
            }}>
              Agile & <span className="gradient-text">DevOps</span> Excellence
            </h2>
            <div
              style={{
                width: '80px',
                height: '6px',
                background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)',
                margin: '30px auto',
                borderRadius: '3px'
              }}
            />
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#4b5563',
              marginBottom: '20px',
              fontWeight: '400'
            }}>
              Symprio is your trusted partner for building bespoke solutions that align with your unique business objectives. We specialize in full-stack development leveraging modern technologies, agile methodologies, and DevOps practices to deliver scalable, secure, and innovative solutions.
            </p>
          </div>
        </section>

        {/* Services Section - Timeline/Process Flow */}
        <section style={{ marginBottom: '100px', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{
            fontSize: '44px',
            fontWeight: '800',
            color: '#1f2937',
            marginBottom: '80px',
            textAlign: 'center'
          }} data-aos="fade-up">
            Development <span className="gradient-text">Lifecycle</span>
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
              background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)',
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
                { step: '01', title: 'Discovery', icon: '🎨', description: 'Requirements & roadmap' },
                { step: '02', title: 'Development', icon: '💻', description: 'Full-stack implementation' },
                { step: '03', title: 'QA', icon: '✓', description: 'Testing & optimization' },
                { step: '04', title: 'DevOps', icon: '🚀', description: 'CI/CD & release' },
                { step: '05', title: 'Support', icon: '🔧', description: 'Maintenance & monitoring' },
                { step: '06', title: 'Scale', icon: '☁️', description: 'Growth & optimization' }
              ].map((item, idx) => (
                <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                    margin: '0 auto 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '800',
                    fontSize: '18px',
                    boxShadow: '0 8px 20px rgba(10, 45, 110, 0.3)',
                    border: '3px solid white'
                  }}>
                    {item.step}
                  </div>
                  
                  <div style={{
                    padding: '20px',
                    background: 'white',
                    borderRadius: '24px',
                    border: '1px solid rgba(0,0,0,0.05)',
                    minHeight: '180px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  className="hover-card">
                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>{item.icon}</div>
                    <h4 style={{ fontSize: '16px', fontWeight: '900', color: 'var(--primary)', margin: '0 0 8px 0' }}>{item.title}</h4>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: '1.4' }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typical Projects Section - Staggered Showcase */}
        <section style={{ marginBottom: '100px', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{
            fontSize: '44px',
            fontWeight: '900',
            color: 'var(--primary)',
            marginBottom: '80px',
            textAlign: 'center'
          }} data-aos="fade-up">
            Projects We <span className="gradient-text">Deliver</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
            {[
              {
                num: '01',
                title: 'Custom Portals & Dashboards',
                icon: '📊',
                description: 'Executive dashboards and customer portals with real-time analytics and intuitive UX.',
              },
              {
                num: '02',
                title: 'API & Integration Platforms',
                icon: '🔗',
                description: 'RESTful and GraphQL APIs connecting disparate systems for seamless data flow.',
              },
              {
                num: '03',
                title: 'Cloud Migrations',
                icon: '☁️',
                description: 'Seamless migration from on-premises systems to Oracle Cloud, AWS, or Azure.',
              },
              {
                num: '04',
                title: 'Mobile Applications',
                icon: '📱',
                description: 'iOS and Android applications with native performance and offline capabilities.',
              }
            ].map((project, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                style={{
                  padding: '40px',
                  background: '#fff',
                  borderRadius: '32px',
                  border: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease'
                }}
                className="hover-card"
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>{project.icon}</div>
                <h3 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--primary)', marginBottom: '15px' }}>{project.title}</h3>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.6', margin: 0 }}>{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack Section - Layered Architecture */}
        <section style={{ marginBottom: '120px', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{
            fontSize: '44px',
            fontWeight: '900',
            color: 'var(--primary)',
            marginBottom: '80px',
            textAlign: 'center'
          }} data-aos="fade-up">
            Technology <span className="gradient-text">Expertise</span>
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
                background: idx % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
                borderRadius: '24px',
                color: '#fff',
                textAlign: 'center'
              }} data-aos="fade-up" data-aos-delay={idx * 100}>
                <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px' }}>{stack.layer}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {stack.technologies.map((tech, tidx) => (
                    <span key={tidx} style={{ opacity: '0.8', fontWeight: '500' }}>{tech}</span>
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
