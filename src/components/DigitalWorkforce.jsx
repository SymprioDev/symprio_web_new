import FAQSection from './FAQSection';

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
        backgroundImage: `linear-gradient(135deg, rgba(10, 45, 110, 0.8) 0%, rgba(13, 148, 136, 0.4) 100%), url('/assets/images/digital-workforce.jpg')`,
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
            Digital <span style={{ color: 'var(--accent)' }}>Workforce</span> Solutions
          </h1>
          <p style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.9)',
            margin: '0 auto',
            fontWeight: '500',
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
              Flexible Talent <span className="gradient-text">Augmentation</span>
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
              marginBottom: '24px',
              fontWeight: '400'
            }}>
              Symprio provides flexible and transparent talent solutions to support large organizations. We deliver skilled professionals across IT, software development, project management, and business functions, serving global enterprises like Meta, AXA, and AIA.
            </p>
          </div>
        </section>

        {/* Offerings Section */}
        <section style={{ marginBottom: '100px', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '44px',
            fontWeight: '900',
            color: 'var(--primary)',
            marginBottom: '80px',
            textAlign: 'center'
          }} data-aos="fade-up">
            Talent <span className="gradient-text">Categories</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
            {[
              {
                title: 'IT & Infrastructure',
                icon: '🔒',
                description: 'Security consultants, cloud architects, and Oracle DBAs.',
                roles: ['IT Support Engineer', 'Security Consultant', 'Cloud Architect']
              },
              {
                title: 'Software Excellence',
                icon: '💻',
                description: 'Full-stack developers and technical leads with modern expertise.',
                roles: ['Full-Stack Developer', 'Node.js Expert', 'Frontend Lead']
              },
              {
                title: 'Project Leadership',
                icon: '📊',
                description: 'Scrum masters and PMs who deliver high-impact results.',
                roles: ['Scrum Master', 'Project Manager', 'Agile Coach']
              },
              {
                title: 'Business Functions',
                icon: '🎯',
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
                  borderRadius: '32px',
                  border: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease'
                }}
                className="hover-card"
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>{offering.icon}</div>
                <h3 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--primary)', marginBottom: '15px' }}>{offering.title}</h3>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.6', marginBottom: '20px' }}>{offering.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {offering.roles.map((role, i) => (
                    <span key={i} className="btn-pill" style={{ fontSize: '12px', padding: '6px 14px' }}>{role}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engagement Models */}
        <section style={{ marginBottom: '120px' }}>
          <h2 style={{
            fontSize: '44px',
            fontWeight: '900',
            color: 'var(--primary)',
            marginBottom: '80px',
            textAlign: 'center'
          }} data-aos="fade-up">
            Engagement <span className="gradient-text">Models</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {[
              {
                title: 'Talent Augmentation',
                icon: '🤝',
                desc: 'Quickly scale your internal teams with specialized external expertise.'
              },
              {
                title: 'Managed Teams',
                icon: '👥',
                desc: 'Dedicated Symprio teams managing end-to-end delivery of your roadmap.',
                highlight: true
              },
              {
                title: 'Strategic Outsourcing',
                icon: '🏢',
                desc: 'Complete ownership of business functions for long-term operational success.'
              }
            ].map((model, idx) => (
              <div key={idx} style={{
                padding: '40px',
                background: model.highlight ? 'var(--primary)' : '#fff',
                color: model.highlight ? '#fff' : 'inherit',
                borderRadius: '32px',
                textAlign: 'center',
                boxShadow: '0 30px 60px rgba(0,0,0,0.05)',
                border: model.highlight ? 'none' : '1px solid rgba(0,0,0,0.05)'
              }} data-aos="zoom-in" data-aos-delay={idx * 100}>
                <div style={{ fontSize: '48px', marginBottom: '24px' }}>{model.icon}</div>
                <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '15px' }}>{model.title}</h3>
                <p style={{ fontSize: '16px', opacity: '0.8', margin: 0 }}>{model.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
      <FAQSection faqs={workforceFaqs} />
    </div>
  );
}
