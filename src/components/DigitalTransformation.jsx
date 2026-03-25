import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReadyToStartCTA from './ReadyToStartCTA';
import FAQSection from './FAQSection';
import ConsultationForm from './ConsultationForm';

/* ── SVG Icon helpers ── */
const SvgSearch = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const SvgClipboard = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>
  </svg>
);
const SvgRocket = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);
const SvgGlobe = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const SvgHeart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const SvgShuffle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>
  </svg>
);
const SvgBarChart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const SvgSmile = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);
const SvgLightbulb = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>
  </svg>
);
const SvgCpu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
);
const SvgUsers = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const coverageIcons = [
  <SvgGlobe />,
  <SvgHeart />,
  <SvgShuffle />,
  <SvgBarChart />,
  <SvgSmile />,
  <SvgLightbulb />,
  <SvgCpu />,
  <SvgUsers />
];

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
          <div className="section-tag">Our Solutions</div>
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
              display: 'flex',
              flexDirection: feature.imagePosition === 'left' ? 'row' : 'row-reverse',
              gap: '50px',
              alignItems: 'center',
              marginBottom: '60px'
            }}
          >
            {/* Image Container */}
            <div
              data-aos={feature.imagePosition === 'left' ? 'fade-right' : 'fade-left'}
              data-aos-duration="900"
              data-aos-offset="50"
              style={{
                flex: '1',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
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
              style={{ flex: '1' }}
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

  const phaseCards = [
    {
      phase: 'Assess',
      description: 'Evaluate current state, capabilities, and digital maturity across organization',
      icon: <SvgSearch />
    },
    {
      phase: 'Plan',
      description: 'Develop comprehensive strategy with clear milestones and technology roadmap',
      icon: <SvgClipboard />
    },
    {
      phase: 'Transform',
      description: 'Execute transformation with continuous optimization and stakeholder alignment',
      icon: <SvgRocket />
    }
  ];

  const coverageAreas = [
    { title: 'Ecosystem', description: 'Build integrated systems and strategic partnerships to create a connected digital ecosystem' },
    { title: 'Organization Culture', description: 'Foster innovation-driven culture and organizational readiness for digital initiatives' },
    { title: 'Change Management', description: 'Navigate organizational transformation with structured change management frameworks' },
    { title: 'Data & Insights', description: 'Leverage data-driven decision making and advanced analytics for business intelligence' },
    { title: 'Customer Experience', description: 'Deliver exceptional omnichannel experiences and personalized customer journeys' },
    { title: 'Innovation', description: 'Drive continuous innovation and explore emerging technologies for competitive advantage' },
    { title: 'Technology', description: 'Implement scalable technology platforms and modern infrastructure solutions' },
    { title: 'People & Skillset', description: 'Develop workforce capabilities and build digital-first talent strategies' }
  ];

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
          <span style={{ color: '#185ADB' }}>Digital Transformation</span>
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
              <div className="section-tag">Our Approach</div>
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
            {phaseCards.map((item, idx) => (
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
                  padding: '36px',
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
                {/* SVG Icon */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: '#F1F7F3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#185ADB',
                  margin: '0 auto 20px'
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

                {/* Step number indicator */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#185ADB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '12px'
                }}>
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Zigzag Features Section */}
      <ZigzagFeatures />

      {/* Rest of Content */}
      <div style={{
        width: '100%',
        padding: '100px 20px',
        background: '#F1F7F3'
      }}>
        {/* Areas of Coverage Section */}
        <section id="coverage-section" style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              textAlign: 'center',
              marginBottom: '80px'
            }}
          >
            <div className="section-tag">What We Cover</div>
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
            {coverageAreas.map((area, idx) => (
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
                  padding: '36px',
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
                {/* Number Badge - small circle */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#185ADB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '13px'
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* SVG Icon */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#F1F7F3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#185ADB',
                  marginBottom: '20px'
                }}>
                  {coverageIcons[idx]}
                </div>

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

      <ConsultationForm />
    </div>
  );
}
