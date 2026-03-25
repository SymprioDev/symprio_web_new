import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReadyToStartCTA from './ReadyToStartCTA';

// Zigzag Features Component
const ZigzagFeatures = () => {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const zigzagSection = document.getElementById('zigzag-section');
      if (zigzagSection) {
        // Get section position in document
        const sectionRect = zigzagSection.getBoundingClientRect();
        const sectionTopInDoc = sectionRect.top + window.scrollY;
        const sectionHeight = sectionRect.height;
        
        // Get current scroll position
        const currentScroll = window.scrollY;
        
        // Calculate how much we've scrolled INTO the section
        const scrollIntoSection = currentScroll - sectionTopInDoc;
        
        // Only animate when section is in/near view
        if (scrollIntoSection > -window.innerHeight && scrollIntoSection < sectionHeight) {
          // Clamp between 0 and section height for smooth progression
          const clampedScroll = Math.max(0, Math.min(scrollIntoSection, sectionHeight));
          // Map to line animation (smaller multiplier for controlled flow)
          setScrollOffset(clampedScroll / 3);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      padding: '60px 20px',
      position: 'relative'
    }}>
      {/* Animated Scroll-Triggered Glowing Elements */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {/* Glowing orbs that appear on scroll */}
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '150px',
          opacity: Math.min(scrollOffset / 100, 1),
          transition: 'opacity 0.3s ease-out'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(102, 217, 255, 0.6) 0%, rgba(102, 217, 255, 0.2) 70%, transparent 100%)',
            boxShadow: '0 0 40px rgba(102, 217, 255, 0.5)',
            animation: 'pulse 3s ease-in-out infinite'
          }}/>
        </div>

        {/* Additional scroll-triggered elements */}
        <div style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '800px',
          opacity: Math.min(Math.max((scrollOffset - 300) / 100, 0), 1),
          transition: 'opacity 0.3s ease-out'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(139, 92, 246, 0.2) 70%, transparent 100%)',
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)',
            animation: 'pulse 3s ease-in-out infinite 0.5s'
          }}/>
        </div>
      </div>

      {/* Content with relative positioning */}
      <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Animated Title Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '80px'
      }}>
        <h2
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-offset="50"
          style={{
            fontSize: '48px',
            fontWeight: '800',
            color: '#1f2937',
            margin: '0 0 15px 0',
            lineHeight: '1.3'
          }}
        >
          Digital Transformation Solutions
        </h2>
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="800"
          data-aos-offset="50"
          style={{
            width: '80px',
            height: '5px',
            background: 'linear-gradient(90deg, #19b5fe, #0f8cc8)',
            margin: '20px auto 30px',
            borderRadius: '3px'
          }}
        />
        <p
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-duration="800"
          data-aos-offset="50"
          style={{
            fontSize: '18px',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
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
              borderRadius: '0',
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
              fontSize: '36px',
              fontWeight: '800',
              color: '#1f2937',
              margin: '0 0 20px 0',
              lineHeight: '1.3'
            }}>
              {feature.title}
            </h3>
            <div style={{
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, #19b5fe, #0f8cc8)',
              borderRadius: '2px',
              margin: '20px 0 30px 0'
            }} />
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
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

      <style>{`
        @keyframes dashflow {
          0% {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dasharray: 1000;
            stroke-dashoffset: -1000;
          }
        }

        @keyframes pulse {
          0%, 100% {
            r: 8;
            opacity: 0.7;
          }
          50% {
            r: 12;
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
};

import FAQSection from './FAQSection';

const dtFaqs = [
  {
    q: 'How long does a typical digital transformation take?',
    a: 'While quick wins can be achieved in 3-6 months, a full enterprise-wide transformation usually spans 12-24 months, depending on the scope and organizational maturity.'
  },
  {
    q: 'What is the "Digital Maturity Assessment"?',
    a: 'It’s our proprietary framework to evaluate your current technology, culture, and processes, resulting in a colored-coded scorecard and a prioritized roadmap.'
  },
  {
    q: 'Can you work with our existing legacy systems?',
    a: 'Absolutely. We specialize in bridged transformation—modernizing your workflows while ensuring your legacy core systems remain stable and integrated.'
  }
];

export default function DigitalTransformation() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Banner */}
      <section style={{
        backgroundImage: `linear-gradient(135deg, rgba(10, 45, 110, 0.8) 0%, rgba(0, 245, 212, 0.3) 100%), url('/assets/images/digital-transformation.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#fff',
        padding: '120px 20px 160px',
        textAlign: 'center',
        position: 'relative',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 4.5rem)',
            fontWeight: '900',
            margin: '0 0 24px 0',
            color: '#ffffff',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            textShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }} data-aos="fade-up">
            Digital <span style={{ color: 'var(--accent)' }}>Transformation</span>
          </h1>
          <p style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.9)',
            margin: '0 auto',
            fontWeight: '500',
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
          borderRadius: '16px',
          padding: '60px 50px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '2px solid #0891b2'
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
              <h2 style={{ 
                fontSize: '44px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #0f172a 0%, #0891b2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginTop: 0,
                marginBottom: '15px',
                lineHeight: '1.3'
              }}>
                Your Digital Transformation Partner
              </h2>
              <div
                style={{
                  width: '100px',
                  height: '6px',
                  background: 'linear-gradient(90deg, #0f172a 0%, #0891b2 100%)',
                  margin: '20px 0 30px',
                  borderRadius: '3px'
                }}
              />
                
                <p style={{ 
                  color: '#4b5563',
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
                    color: '#0891b2',
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
                    <li style={{
                      color: '#4b5563',
                      lineHeight: '1.8',
                      fontSize: '15px',
                      marginBottom: '14px',
                      paddingLeft: '32px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        width: '24px',
                        height: '24px',
                        background: 'linear-gradient(135deg, #19b5fe, #0f8cc8)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>1</span>
                      Comprehensive assessment of your organization's current digital maturity
                    </li>
                    <li style={{
                      color: '#4b5563',
                      lineHeight: '1.8',
                      fontSize: '15px',
                      marginBottom: '14px',
                      paddingLeft: '32px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        width: '24px',
                        height: '24px',
                        background: 'linear-gradient(135deg, #19b5fe, #0f8cc8)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>2</span>
                      Evaluate organizational readiness and technology adoption capabilities
                    </li>
                    <li style={{
                      color: '#4b5563',
                      lineHeight: '1.8',
                      fontSize: '15px',
                      marginBottom: 0,
                      paddingLeft: '32px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        width: '24px',
                        height: '24px',
                        background: 'linear-gradient(135deg, #19b5fe, #0f8cc8)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>3</span>
                      Develop strategic digital roadmap with actionable recommendations
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column - Image */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '30px',
                backgroundColor: 'rgba(219, 234, 254, 0.3)',
                borderRadius: '12px'
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
                icon: '🔍'
              },
              {
                phase: 'Plan',
                description: 'Develop comprehensive strategy with clear milestones and technology roadmap',
                icon: '📋'
              },
              {
                phase: 'Transform',
                description: 'Execute transformation with continuous optimization and stakeholder alignment',
                icon: '🚀'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={`${idx * 80}`}
                data-aos-duration="800"
                data-aos-offset="50"
                style={{
                  background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.05) 0%, rgba(25, 181, 254, 0.05) 100%)',
                  border: '2px solid #19b5fe',
                  borderRadius: '12px',
                  padding: '32px 24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(8, 145, 178, 0.15)';
                  e.currentTarget.style.borderColor = '#0891b2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#19b5fe';
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
                  color: '#0891b2',
                  margin: '0 0 12px 0'
                }}>
                  {item.phase}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
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
                    color: '#19b5fe',
                    fontWeight: '300'
                  }}>
                    →
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
        {/* Areas of Coverage Section - Enhanced Design */}
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
            <h2 style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#1f2937',
              margin: '0 0 15px 0',
              lineHeight: '1.3'
            }}>
              Comprehensive Coverage Areas
            </h2>
            <div style={{
              width: '80px',
              height: '5px',
              background: 'linear-gradient(90deg, #19b5fe, #0f8cc8)',
              margin: '20px auto 30px',
              borderRadius: '3px'
            }} />
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
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
              {
                title: 'Ecosystem',
                description: 'Build integrated systems and strategic partnerships to create a connected digital ecosystem',
                color: '#3b82f6',
                lightBg: 'rgba(59, 130, 246, 0.05)'
              },
              {
                title: 'Organization Culture',
                description: 'Foster innovation-driven culture and organizational readiness for digital initiatives',
                color: '#8b5cf6',
                lightBg: 'rgba(139, 92, 246, 0.05)'
              },
              {
                title: 'Change Management',
                description: 'Navigate organizational transformation with structured change management frameworks',
                color: '#f59e0b',
                lightBg: 'rgba(245, 158, 11, 0.05)'
              },
              {
                title: 'Data & Insights',
                description: 'Leverage data-driven decision making and advanced analytics for business intelligence',
                color: '#ec4899',
                lightBg: 'rgba(236, 72, 153, 0.05)'
              },
              {
                title: 'Customer Experience',
                description: 'Deliver exceptional omnichannel experiences and personalized customer journeys',
                color: '#10b981',
                lightBg: 'rgba(16, 185, 129, 0.05)'
              },
              {
                title: 'Innovation',
                description: 'Drive continuous innovation and explore emerging technologies for competitive advantage',
                color: '#06b6d4',
                lightBg: 'rgba(6, 182, 212, 0.05)'
              },
              {
                title: 'Technology',
                description: 'Implement scalable technology platforms and modern infrastructure solutions',
                color: '#ef4444',
                lightBg: 'rgba(239, 68, 68, 0.05)'
              },
              {
                title: 'People & Skillset',
                description: 'Develop workforce capabilities and build digital-first talent strategies',
                color: '#14b8a6',
                lightBg: 'rgba(20, 184, 166, 0.05)'
              }
            ].map((area, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={`${(idx % 4) * 80}`}
                data-aos-duration="800"
                data-aos-offset="50"
                style={{
                  background: area.lightBg,
                  border: `2px solid ${area.color}`,
                  borderRadius: '12px',
                  padding: '32px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${area.color}20`;
                  e.currentTarget.style.borderColor = area.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = area.color;
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
                  background: area.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: '800',
                  fontSize: '18px',
                  opacity: 0.15
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Color Accent Line */}
                <div style={{
                  width: '4px',
                  height: '40px',
                  background: area.color,
                  borderRadius: '2px',
                  marginBottom: '20px'
                }} />

                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: '0 0 12px 0',
                  lineHeight: '1.3'
                }}>
                  {area.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
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

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes drawCheckmark {
          from {
            stroke-dasharray: 20;
            stroke-dashoffset: 20;
          }
          to {
            stroke-dasharray: 20;
            stroke-dashoffset: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 40px rgba(102, 217, 255, 0.5), inset 0 0 20px rgba(102, 217, 255, 0.2);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 60px rgba(102, 217, 255, 0.8), inset 0 0 30px rgba(102, 217, 255, 0.4);
            transform: scale(1.05);
          }
        }
      `}</style>
      <FAQSection faqs={dtFaqs} />
    </div>
  );
}
