import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReadyToStartCTA from './ReadyToStartCTA';
import FAQSection from './FAQSection';

// Zigzag Features Component
const ZigzagFeatures = () => {
  const features = [
    {
      title: 'Enterprise Platform',
      description: 'Building scalable enterprise solutions that streamline operations, enhance collaboration, and drive digital transformation at organizational level. Our enterprise platforms provide robust infrastructure for modern business needs.',
      image: '/digitaltransformation/enterprise-platform.png',
      imagePosition: 'left'
    },
    {
      title: 'Hyper Automation',
      description: 'Advanced automation capabilities that combine RPA, AI, and intelligent process automation to eliminate manual work, reduce errors, and accelerate business processes. Unlock unprecedented efficiency gains across your operations.',
      image: '/digitaltransformation/hyper-automation-new.png',
      imagePosition: 'right'
    },
    {
      title: 'Upskilling and Reskilling',
      description: 'Comprehensive workforce development programs designed to equip your teams with cutting-edge skills. Our training initiatives ensure your employees stay ahead of technological advancements and business evolution.',
      image: '/digitaltransformation/upskilling-reskilling.png',
      imagePosition: 'left'
    },
    {
      title: 'Improving Customer Experience',
      description: 'Enhance customer interactions through intelligent automation, personalized engagement, and seamless omnichannel experiences. Deliver exceptional value at every touchpoint and build lasting customer relationships.',
      image: '/digitaltransformation/customer-experience-new.png',
      imagePosition: 'right'
    },
    {
      title: 'Enhancing Operational Efficiency',
      description: 'Optimize workflows, reduce operational costs, and improve resource utilization through intelligent automation. Achieve more with less while maintaining quality standards and improving employee satisfaction.',
      image: '/digitaltransformation/operational-efficiency-new.png',
      imagePosition: 'left'
    },
    {
      title: 'Increasing Service Accessibility',
      description: 'Make your services accessible to a broader audience through digital-first approaches. Ensure 24/7 availability, multi-channel support, and inclusive design that serves all customer segments effectively.',
      image: '/digitaltransformation/service-accessibility.png',
      imagePosition: 'right'
    },
    {
      title: 'Data Security',
      description: 'Protect your organization with comprehensive security measures, advanced threat detection, and compliance frameworks. Our data security solutions ensure confidentiality, integrity, and availability of your critical information.',
      image: '/digitaltransformation/data-security.png',
      imagePosition: 'left'
    }
  ];

  return (
    <section id="zigzag-section" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '100px 20px',
      position: 'relative'
    }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>OUR SOLUTIONS</div>
          <h2
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              fontSize: '40px',
              fontWeight: '400',
              color: '#010B1D',
              margin: '0 0 15px 0',
              lineHeight: '1.3'
            }}
          >
            Digital Transformation <strong>Solutions</strong>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="150"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              fontSize: '16px',
              color: '#444444',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}
          >
            Comprehensive solutions designed to accelerate your digital journey and drive sustainable business growth
          </p>
        </div>

        {features.map((feature, idx) => (
          <div
            key={idx}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '50px',
              alignItems: 'center',
              marginBottom: '60px',
              gridAutoFlow: feature.imagePosition === 'right' ? 'dense' : 'initial'
            }}
          >
            {/* Image Container */}
            <div
              data-aos={feature.imagePosition === 'left' ? 'fade-right' : 'fade-left'}
              data-aos-duration="900"
              data-aos-offset="50"
              style={{
                order: feature.imagePosition === 'right' ? 2 : 1,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: feature.imagePosition === 'left' ? 'flex-start' : 'flex-end',
                minHeight: 'auto',
                backgroundColor: '#ffffff',
                overflow: 'visible',
                padding: '0'
              }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  objectFit: 'contain',
                  width: 'auto',
                  height: 'auto'
                }}
              />
            </div>

            {/* Text Container */}
            <div
              data-aos={feature.imagePosition === 'left' ? 'fade-left' : 'fade-right'}
              data-aos-delay="100"
              data-aos-duration="900"
              data-aos-offset="50"
              style={{
                order: feature.imagePosition === 'right' ? 1 : 2
              }}
            >
              <h3 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#010B1D',
                margin: '0 0 16px 0',
                lineHeight: '1.3'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#444444',
                lineHeight: '1.8',
                margin: '0',
                textAlign: 'justify'
              }}>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const dtFaqs = [
  {
    q: 'How long does a typical digital transformation take?',
    a: 'While quick wins can be achieved in 3-6 months, a full enterprise-wide transformation usually spans 12-24 months, depending on the scope and organizational maturity.'
  },
  {
    q: 'What is the "Digital Maturity Assessment"?',
    a: 'It\u2019s our proprietary framework to evaluate your current technology, culture, and processes, resulting in a colored-coded scorecard and a prioritized roadmap.'
  },
  {
    q: 'Can you work with our existing legacy systems?',
    a: 'Absolutely. We specialize in bridged transformation\u2014modernizing your workflows while ensuring your legacy core systems remain stable and integrated.'
  }
];

export default function DigitalTransformation() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Banner */}
      <section style={{
        backgroundImage: `linear-gradient(135deg, rgba(1,11,29,0.75) 0%, rgba(1,11,29,0.75) 100%), url('/assets/images/digital-transformation.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#fff',
        padding: '120px 20px 160px',
        textAlign: 'center',
        position: 'relative',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '700',
            margin: '0 0 24px 0',
            color: '#ffffff',
            lineHeight: '1.15'
          }} data-aos="fade-up">
            Digital <span style={{ color: '#0D9488' }}>Transformation</span>
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.85)',
            margin: '0 auto',
            fontWeight: '400',
            maxWidth: '700px'
          }} data-aos="fade-up" data-aos-delay="100">
            Partnering with enterprise leaders to evolve their culture, technology, and operations for the digital age.
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
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
            marginBottom: '60px'
          }}>
            {/* Left Column - Information */}
            <div>
              <div className="section-tag" style={{ marginBottom: '16px' }}>ABOUT</div>
              <h2 style={{
                fontSize: '36px',
                fontWeight: '400',
                color: '#010B1D',
                marginTop: 0,
                marginBottom: '15px',
                lineHeight: '1.3'
              }}>
                Your Digital <strong>Transformation Partner</strong>
              </h2>

                <p style={{
                  color: '#444444',
                  lineHeight: '1.8',
                  fontSize: '16px',
                  marginBottom: '30px'
                }}>
                  Symprio helps leading organizations such as Facebook (Meta), Amway, JPA, HRDF and many others in digital transformation initiatives focused on AI, Automation, Process improvements & application rationalization.
                </p>

                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#185ADB',
                    marginTop: 0,
                    marginBottom: '16px'
                  }}>
                    Our Assessment Approach
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {[
                      'Comprehensive assessment of your organization\u2019s current digital maturity',
                      'Evaluate organizational readiness and technology adoption capabilities',
                      'Develop strategic digital roadmap with actionable recommendations'
                    ].map((text, i) => (
                      <li key={i} style={{
                        color: '#444444',
                        lineHeight: '1.8',
                        fontSize: '16px',
                        marginBottom: i < 2 ? '14px' : 0,
                        paddingLeft: '32px',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          width: '24px',
                          height: '24px',
                          background: '#185ADB',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: '700'
                        }}>{i + 1}</span>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Image */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '30px',
                backgroundColor: '#f8f9fa',
                borderRadius: '20px'
              }}>
                <img
                  src="/digitaltransformation/CircleDiagram.jpg"
                  alt="Digital Transformation Circle Diagram"
                  style={{
                    maxWidth: '80%',
                    height: 'auto',
                    borderRadius: '8px'
                  }}
                />
              </div>
            </div>

          {/* Transformation Journey - 3 Cards Below */}
          <div style={{
            gridColumn: '1 / -1',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px'
          }}>
            {[
              {
                phase: 'Assess',
                description: 'Evaluate current state, capabilities, and digital maturity across organization',
                icon: '\uD83D\uDD0D'
              },
              {
                phase: 'Plan',
                description: 'Develop comprehensive strategy with clear milestones and technology roadmap',
                icon: '\uD83D\uDCCB'
              },
              {
                phase: 'Transform',
                description: 'Execute transformation with continuous optimization and stakeholder alignment',
                icon: '\uD83D\uDE80'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={`${idx * 80}`}
                data-aos-duration="800"
                data-aos-offset="50"
                style={{
                  background: '#ffffff',
                  border: '1px solid #DCDCDC',
                  borderRadius: '20px',
                  padding: '32px 24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = '#185ADB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#DCDCDC';
                }}
              >
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#010B1D',
                  margin: '0 0 12px 0'
                }}>
                  {item.phase}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#444444',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {item.description}
                </p>

                {/* Arrow indicator between cards */}
                {idx < 2 && (
                  <div style={{
                    position: 'absolute',
                    right: '-45px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '24px',
                    color: '#185ADB',
                    fontWeight: '300'
                  }}>
                    {'\u2192'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Zigzag Features Section */}
      <ZigzagFeatures />

      {/* Rest of Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 80px 20px' }}>
        {/* Areas of Coverage Section */}
        <section id="coverage-section" style={{ marginBottom: '80px' }}>
          <div
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              textAlign: 'center',
              marginBottom: '80px'
            }}
          >
            <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>COVERAGE AREAS</div>
            <h2 style={{
              fontSize: '40px',
              fontWeight: '400',
              color: '#010B1D',
              margin: '0 0 15px 0',
              lineHeight: '1.3'
            }}>
              Comprehensive <strong>Coverage Areas</strong>
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#444444',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              We address every dimension of your digital transformation journey with holistic solutions
            </p>
          </div>

          {/* 4x2 Grid of Coverage Areas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              { title: 'Ecosystem', description: 'Build integrated systems and strategic partnerships to create a connected digital ecosystem' },
              { title: 'Organization Culture', description: 'Foster innovation-driven culture and organizational readiness for digital initiatives' },
              { title: 'Change Management', description: 'Navigate organizational transformation with structured change management frameworks' },
              { title: 'Data & Insights', description: 'Leverage data-driven decision making and advanced analytics for business intelligence' },
              { title: 'Customer Experience', description: 'Deliver exceptional omnichannel experiences and personalized customer journeys' },
              { title: 'Innovation', description: 'Drive continuous innovation and explore emerging technologies for competitive advantage' },
              { title: 'Technology', description: 'Implement scalable technology platforms and modern infrastructure solutions' },
              { title: 'People & Skillset', description: 'Develop workforce capabilities and build digital-first talent strategies' }
            ].map((area, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={`${(idx % 4) * 80}`}
                data-aos-duration="800"
                data-aos-offset="50"
                style={{
                  background: '#ffffff',
                  border: '1px solid #DCDCDC',
                  borderRadius: '20px',
                  padding: '32px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = '#185ADB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#DCDCDC';
                }}
              >
                {/* Number Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#185ADB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '14px',
                  opacity: 0.15
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Color Accent Line */}
                <div style={{
                  width: '4px',
                  height: '40px',
                  background: '#185ADB',
                  borderRadius: '2px',
                  marginBottom: '20px'
                }} />

                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#010B1D',
                  margin: '0 0 12px 0',
                  lineHeight: '1.3'
                }}>
                  {area.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#444444',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <ReadyToStartCTA />

      <FAQSection faqs={dtFaqs} />
    </div>
  );
}
