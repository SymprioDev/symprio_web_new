import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from './SEO';

const Services = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    setIsVisible(true);
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
      offset: 100
    });
  }, []);

  const toggleExpand = (idx) => {
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
      link: '/digital-transformation'
    },
    {
      number: '02',
      title: 'Agentic AI & AI‑Solutions',
      description: 'Deploy autonomous AI agents that handle complex tasks and boost team productivity. Experience the next generation of generative AI for enterprise.',
      link: '/agentic-ai'
    },
    {
      number: '03',
      title: 'Intelligent RPA',
      description: 'Eliminate manual errors and slash operational costs with Robotic Process Automation. Scale your output without increasing headcount.',
      link: '/rpa'
    },
    {
      number: '04',
      title: 'ERP & Platforms',
      description: 'Optimize your core operations with seamless Oracle and enterprise platform solutions. Expert implementation for maximized ROI.',
      link: '/erp'
    },
    {
      number: '05',
      title: 'Digital Workforce',
      description: 'Access elite IT talent and flexible staff augmentation. Build your dream team with our managed workforce and outsourcing services.',
      link: '/digital-workforce'
    },
    {
      number: '06',
      title: 'Custom Development',
      description: 'Build bespoke, scalable software tailored to your unique business needs. From ideation to deployment, we engineer excellence.',
      link: '/custom-development'
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
        padding: '100px 20px',
        background: 'var(--bg-soft)',
        position: 'relative',
        overflow: 'hidden'
      }}>
      {/* Bubbles */}
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%',
        top: '-50px',
        left: '10%',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '150px',
        height: '150px',
        background: 'rgba(59, 130, 246, 0.1)',
        borderRadius: '50%',
        bottom: '50px',
        right: '10%',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '100px',
        height: '100px',
        background: 'rgba(139, 92, 246, 0.08)',
        borderRadius: '50%',
        top: '50%',
        left: '5%',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '120px',
        height: '120px',
        background: 'rgba(59, 130, 246, 0.08)',
        borderRadius: '50%',
        bottom: '20%',
        left: '20%',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '90px',
        height: '90px',
        background: 'rgba(139, 92, 246, 0.1)',
        borderRadius: '50%',
        top: '30%',
        right: '5%',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '50px'
          }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '700',
              color: '#ffffff',
              margin: '0'
            }}
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-once="false">
              Choose The Best IT Service Company
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
                  borderRadius: '16px',
                  border: '1px solid rgba(10, 25, 47, 0.05)',
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  textAlign: 'left',
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(24, 90, 219, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(10, 25, 47, 0.05)';
                }}
              >
                {/* Number Indicator */}
                <div style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: 'var(--primary)',
                  letterSpacing: '0.1em'
                }}>
                  {service.number}
                </div>

                {/* Content */}
                <div>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: 'var(--secondary)',
                    marginBottom: '16px',
                    lineHeight: '1.3'
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: 'var(--text-muted)',
                    lineHeight: '1.6',
                    marginBottom: '24px'
                  }}>
                    {service.description}
                  </p>
                </div>

                {/* Link */}
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--primary)',
                  fontWeight: '700',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Explore Service
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes expandLine {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 40px;
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Services;






