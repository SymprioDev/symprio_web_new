import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from './SEO';

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
      title: 'Digital Transformation',
      description: 'Accelerate your business evolution with expert strategy and change management. We turn digital roadmaps into real-world success.',
      expanded: 'Our digital transformation services encompass strategic planning, technology assessment, change management, and end-to-end implementation to modernize your operations and unlock new growth.',
      link: '/services/digital-transformation'
    },
    {
      number: '02',
      title: 'Agentic AI & AI Solutions',
      description: 'Deploy autonomous AI agents that handle complex tasks and boost team productivity. Experience the next generation of generative AI for enterprise.',
      expanded: 'We design and deploy intelligent AI agents powered by large language models, custom-trained on your data, to automate workflows, enhance decision-making, and drive measurable outcomes.',
      link: '/services/agentic-ai'
    },
    {
      number: '03',
      title: 'Intelligent RPA',
      description: 'Eliminate manual errors and slash operational costs with Robotic Process Automation. Scale your output without increasing headcount.',
      expanded: 'Our RPA solutions automate repetitive tasks across finance, HR, operations, and customer service — delivering faster processing, fewer errors, and significant cost savings.',
      link: '/services/rpa'
    },
    {
      number: '04',
      title: 'ERP & Platforms',
      description: 'Optimize your core operations with seamless Oracle and enterprise platform solutions. Expert implementation for maximized ROI.',
      expanded: 'From Oracle Cloud implementation to platform migrations and integrations, we ensure your ERP ecosystem runs efficiently and scales with your business.',
      link: '/services/erp-oracle'
    },
    {
      number: '05',
      title: 'Digital Workforce',
      description: 'Access elite IT talent and flexible staff augmentation. Build your dream team with our managed workforce and outsourcing services.',
      expanded: 'Whether you need dedicated teams, staff augmentation, or fully managed IT services, we provide the skilled professionals to keep your projects moving forward.',
      link: '/services/digital-workforce'
    },
    {
      number: '06',
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
              End-to-End AI & Automation <strong>Services</strong>
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
                {/* Number Indicator */}
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#185ADB',
                  letterSpacing: '0.1em'
                }}>
                  {service.number}
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
