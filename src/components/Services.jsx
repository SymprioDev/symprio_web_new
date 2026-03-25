import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from './SEO';

const RefreshIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
    <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
  </svg>
);

const BrainIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

const RobotIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16.01" />
    <line x1="16" y1="16" x2="16" y2="16.01" />
    <line x1="1" y1="15" x2="3" y2="15" />
    <line x1="21" y1="15" x2="23" y2="15" />
  </svg>
);

const DatabaseIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const UsersIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CodeBracketIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const Services = () => {
  const navigate = useNavigate();
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
      offset: 100
    });
  }, []);

  const toggleExpand = (idx, e) => {
    e.stopPropagation();
    setExpandedCards(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const services = [
    {
      number: '01',
      icon: <RefreshIcon />,
      title: 'Digital Transformation',
      description: 'Accelerate your business evolution with expert strategy and change management. We turn digital roadmaps into real-world success.',
      expanded: 'Our digital transformation services encompass strategic planning, technology assessment, change management, and end-to-end implementation to modernize your operations and unlock new growth.',
      link: '/services/digital-transformation'
    },
    {
      number: '02',
      icon: <BrainIcon />,
      title: 'Agentic AI & AI Solutions',
      description: 'Deploy autonomous AI agents that handle complex tasks and boost team productivity. Experience the next generation of generative AI for enterprise.',
      expanded: 'We design and deploy intelligent AI agents powered by large language models, custom-trained on your data, to automate workflows, enhance decision-making, and drive measurable outcomes.',
      link: '/services/agentic-ai'
    },
    {
      number: '03',
      icon: <RobotIcon />,
      title: 'Intelligent RPA',
      description: 'Eliminate manual errors and slash operational costs with Robotic Process Automation. Scale your output without increasing headcount.',
      expanded: 'Our RPA solutions automate repetitive tasks across finance, HR, operations, and customer service — delivering faster processing, fewer errors, and significant cost savings.',
      link: '/services/rpa'
    },
    {
      number: '04',
      icon: <DatabaseIcon />,
      title: 'ERP & Platforms',
      description: 'Optimize your core operations with seamless Oracle and enterprise platform solutions. Expert implementation for maximized ROI.',
      expanded: 'From Oracle Cloud implementation to platform migrations and integrations, we ensure your ERP ecosystem runs efficiently and scales with your business.',
      link: '/services/erp-oracle'
    },
    {
      number: '05',
      icon: <UsersIcon />,
      title: 'Digital Workforce',
      description: 'Access elite IT talent and flexible staff augmentation. Build your dream team with our managed workforce and outsourcing services.',
      expanded: 'Whether you need dedicated teams, staff augmentation, or fully managed IT services, we provide the skilled professionals to keep your projects moving forward.',
      link: '/services/digital-workforce'
    },
    {
      number: '06',
      icon: <CodeBracketIcon />,
      title: 'Custom Development',
      description: 'Build bespoke, scalable software tailored to your unique business needs. From ideation to deployment, we engineer excellence.',
      expanded: 'Our full-stack development team builds custom web applications, mobile solutions, APIs, and cloud-native platforms designed for performance, security, and scale.',
      link: '/services/custom-software'
    }
  ];

  return (
    <>
      <SEO
        title="Our Services"
        description="Explore Symprio's tailored automation and AI services. From Digital Transformation to Intelligent RPA and Custom Software Development, we drive business efficiency."
        keywords="business automation, digital transformation services, AI solutions for enterprise, RPA consulting, IT staff augmentation"
      />
      <section style={{
        maxWidth: '100%',
        margin: '0',
        padding: '120px 20px',
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <div className="section-tag" data-aos="fade-up">What We Do</div>
            <h2 style={{
              color: '#010B1D',
              margin: '0',
              fontWeight: 400
            }}
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
            data-aos-once="false">
              End-to-End AI & Automation <em className="accent-text" style={{fontWeight:'400'}}>Services</em>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {services.map((service, idx) => (
              <div
                key={idx}
                onClick={() => navigate(service.link)}
                style={{
                  padding: '40px',
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #DCDCDC',
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  textAlign: 'left',
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(24,90,219,0.08)';
                  e.currentTarget.style.borderColor = '#185ADB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#DCDCDC';
                }}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {/* Icon and Number */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', color: '#185ADB' }}>
                    {service.icon}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#185ADB',
                    letterSpacing: '0.1em'
                  }}>
                    {service.number}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 600,
                    color: '#010B1D',
                    marginBottom: '16px',
                    lineHeight: '1.3'
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: '#444444',
                    lineHeight: '1.7',
                    marginBottom: expandedCards[idx] ? '16px' : '0'
                  }}>
                    {service.description}
                  </p>

                  {/* Expanded content */}
                  {expandedCards[idx] && service.expanded && (
                    <p style={{
                      fontSize: '14px',
                      color: '#444444',
                      lineHeight: '1.7',
                      marginBottom: '0',
                      paddingTop: '12px',
                      borderTop: '1px solid #F0F0F0',
                      animation: 'fadeInUp 0.3s ease'
                    }}>
                      {service.expanded}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#185ADB',
                      fontWeight: 600,
                      fontSize: '15px'
                    }}
                  >
                    Explore Service &rarr;
                  </span>

                  {service.expanded && (
                    <button
                      onClick={(e) => toggleExpand(idx, e)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#185ADB',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 600,
                        padding: '4px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {expandedCards[idx] ? 'Less' : 'More'}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: expandedCards[idx] ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Services;
