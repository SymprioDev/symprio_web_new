import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReadyToStartCTA from './ReadyToStartCTA';

export default function ServicesLanding() {
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const bannerTitleRef = useRef(null);
  const bannerDescRef = useRef(null);
  const [showBannerAnimation, setShowBannerAnimation] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBannerAnimation(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (bannerTitleRef.current) {
      observer.observe(bannerTitleRef.current);
    }

    return () => {
      if (bannerTitleRef.current) {
        observer.unobserve(bannerTitleRef.current);
      }
    };
  }, []);

  const services = [
    {
      number: '01',
      title: 'Digital Transformation',
      description: 'Strategy, assessment and change management for enterprise‑wide digital journeys.',
      points: [
        'Assessment & Strategy: Evaluate your organisation\'s maturity, processes and technology landscape. Provide a digital roadmap and prioritised initiatives.',
        'Change Management: Drive adoption through training, communication and stakeholder engagement.',
        'Process Improvement: Redesign workflows for efficiency and effectiveness.',
        'Technology Enablement: Select and integrate technologies such as ERP, RPA, AI and cloud platforms.'
      ],
      link: '/digital-transformation'
    },
    {
      number: '02',
      title: 'Agentic AI & AI‑Powered Solutions',
      description: 'Autonomous AI agents, generative AI and conversational AI to drive productivity.',
      points: [
        'Agentic AI Agents: Autonomous agents that plan, act and learn with minimal human intervention. Use cases include customer support, finance & compliance, sales & marketing, procurement & supply chain and HR & talent acquisition.',
        'Generative AI & LLM Services: Custom language models, content generation, summarisation, translation and creative AI services for marketing, documentation and knowledge management.',
        'Conversational AI & Chatbots: SaaS‑based conversational platforms supporting multiple languages, guided responses, live chat integration and auditing. Trigger automation flows through AI.',
        'AI‑Driven Analytics & Insights: Predictive analytics, anomaly detection and real‑time forecasting across finance, operations and customer behaviour.'
      ],
      link: '/agentic-ai'
    },
    {
      number: '03',
      title: 'Robotic Process Automation (RPA)',
      description: 'Comprehensive RPA services from assessment and CoE setup to bot development and support.',
      points: [
        'End‑to‑End RPA Services: From assessment and opportunity identification to bot development, deployment and support.',
        'Center of Excellence Setup: Processes, templates, governance and training to build internal automation capabilities.',
        'RPA Licenses & Tools: Assist clients in selecting and managing RPA platforms (UiPath, Microsoft Power Automate).',
        'RPA Training & Support: Provide custom training and ongoing bot monitoring.'
      ],
      link: '/rpa'
    },
    {
      number: '04',
      title: 'ERP & Enterprise Platforms',
      description: 'Oracle Cloud/R12 implementations, integrations and upgrades with deep APAC expertise.',
      points: [
        'Oracle Cloud & R12 Implementations: Business transformation rollouts and implementations. Emphasise localisations, program leadership and deep APAC expertise.',
        'Integrations & Extensions: Integrate ERP with AI, RPA and custom applications. Provide extensibility through REST APIs, PL/SQL and workflow customisation.',
        'Analytics & Reporting: Leverage BI, analytics and automation for real‑time insights.',
        'Support & Enhancement: Continuous support for Oracle Cloud and R12, including upgrades and automation.'
      ],
      link: '/erp'
    },
    {
      number: '05',
      title: 'Digital Workforce Services',
      description: 'Skilled IT and non‑IT professionals with flexible engagement models.',
      points: [
        'Talent Solutions: Offer skilled resources across IT and non‑IT roles (IT support engineer, security consultant, software developer, project manager, testers, recruiters and marketing specialists).',
        'Flexible Engagement Models: Provide on‑demand staffing, managed teams or full outsourcing.',
        'Talent Development: Upskilling and reskilling programs to ensure teams stay current.'
      ],
      link: '/digital-workforce'
    },
    {
      number: '06',
      title: 'Custom Software Development',
      description: 'Full‑stack development, mobile apps and cloud‑native solutions.',
      points: [
        'Full‑Stack Development: Web, mobile and cloud‑native applications using modern frameworks and languages.',
        'Agile & Hybrid Methodologies: Deliver software through agile, waterfall or hybrid approaches to match client needs.',
        'DevOps & CI/CD: End‑to‑end lifecycle management, from assessment to DevOps and deployment.',
        'Technology Expertise: Front‑end frameworks (React, Angular), back‑end services (Node.js, .NET), databases and API design.'
      ],
      link: '/custom-development'
    }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f4f8 100%)',
      backgroundAttachment: 'fixed',
      color: '#1f2937',
      fontFamily: "'Poppins', sans-serif",
      position: 'relative'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      {/* Content Wrapper */}
      <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Banner Section */}
      <section style={{
        maxWidth: '100%',
        margin: '0',
        padding: '0',
        background: 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.2))',
        backgroundImage: `url('/services-banner.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '350px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: '40px'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0',
          padding: '30px 60px',
          textAlign: 'left',
          color: '#fff'
        }}>
          <h2 style={{
            fontSize: '44px',
            fontWeight: '700',
            margin: '0 0 15px 0',
            lineHeight: '1.3',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            color: '#000000',
            animation: showBannerAnimation ? 'bannerSlideIn 1.2s cubic-bezier(0.13, 0.53, 0.13, 0.96) 0s both' : 'none'
          }}
          ref={bannerTitleRef}>
            Transform Your Business with Our Services
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#e5e7eb',
            lineHeight: '1.8',
            margin: '0',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            animation: showBannerAnimation ? 'bannerSlideIn 1.2s cubic-bezier(0.13, 0.53, 0.13, 0.96) 0.4s both' : 'none'
          }}
          ref={bannerDescRef}>
            Partner with Symprio to unlock digital transformation, automation, and innovation
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{
        maxWidth: '1200px',
        margin: '-150px auto 0 auto',
        padding: '80px 20px',
        backgroundColor: 'transparent',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
          justifyItems: 'center',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {services.map((service, idx) => (
            <div
              key={idx}
              style={{
                padding: '30px',
                background: expandedIndex === idx ? 'rgba(59, 130, 246, 0.95)' : '#ffffff',
                border: expandedIndex === idx ? '1px solid #3b82f6' : '1px solid #e5e7eb',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                boxShadow: expandedIndex === idx ? '0 8px 16px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                animation: isVisible ? `slideUp 0.8s ease-out ${idx * 0.1}s both` : 'none',
                minHeight: '380px',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                if (expandedIndex !== idx) {
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                  // Change text colors on hover
                  const numberDiv = e.currentTarget.querySelector('div.service-number');
                  const titleH3 = e.currentTarget.querySelector('h3');
                  const paragraphP = e.currentTarget.querySelector('p:first-of-type');
                  const spanArrow = e.currentTarget.querySelector('span.expand-arrow');
                  if (numberDiv) numberDiv.style.color = '#ffffff';
                  if (titleH3) titleH3.style.color = '#ffffff';
                  if (paragraphP) paragraphP.style.color = '#e0e7ff';
                  if (spanArrow) {
                    spanArrow.style.color = '#ffffff';
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (expandedIndex !== idx) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  // Reset text colors
                  const numberDiv = e.currentTarget.querySelector('div.service-number');
                  const titleH3 = e.currentTarget.querySelector('h3');
                  const paragraphP = e.currentTarget.querySelector('p:first-of-type');
                  const spanArrow = e.currentTarget.querySelector('span.expand-arrow');
                  if (numberDiv) numberDiv.style.color = '#3b82f6';
                  if (titleH3) titleH3.style.color = '#1f2937';
                  if (paragraphP) paragraphP.style.color = '#6b7280';
                  if (spanArrow) {
                    spanArrow.style.color = '#3b82f6';
                  }
                }
              }}
              onClick={() => {
                // Navigate to service page if link is available
                if (service.link) {
                  navigate(service.link);
                } else {
                  setExpandedIndex(expandedIndex === idx ? null : idx);
                }
              }}
            >
              {/* Large watermark number in bottom right */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-20px',
                  fontSize: '100px',
                  fontWeight: '800',
                  color: '#3b82f6',
                  opacity: '0.08',
                  pointerEvents: 'none'
                }}
              >
                {service.number}
              </div>

              {/* Icon logo in top right */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: expandedIndex === idx ? 0.15 : 0.08,
                zIndex: 0,
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease'
              }}>
                {idx === 0 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width: '100%', height: '100%', color: '#3b82f6'}}>
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                ) : idx === 1 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width: '100%', height: '100%', color: '#3b82f6'}}>
                    <rect x="6" y="8" width="12" height="12" rx="2"/>
                    <path d="M9 8V6c0-1 .5-2 1-2h4c.5 0 1 1 1 2v2"/>
                    <circle cx="10" cy="13" r="1" fill="currentColor"/>
                    <circle cx="14" cy="13" r="1" fill="currentColor"/>
                    <path d="M9 16h6"/>
                    <path d="M7 11h1M16 11h1"/>
                  </svg>
                ) : idx === 2 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width: '100%', height: '100%', color: '#3b82f6'}}>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="9.5" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ) : idx === 3 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width: '100%', height: '100%', color: '#3b82f6'}}>
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18"/>
                  </svg>
                ) : idx === 4 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width: '100%', height: '100%', color: '#3b82f6'}}>
                    <path d="M12 2v20M2 12h20"/>
                    <path d="M6 6h12v12H6z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width: '100%', height: '100%', color: '#3b82f6'}}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                )}
              </div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div className="service-number" style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: expandedIndex === idx ? '#ffffff' : '#3b82f6',
                    marginBottom: '15px',
                    animation: isVisible ? `scaleIn 0.8s ease-out ${idx * 0.1 + 0.1}s both` : 'none'
                  }}>
                    {service.number}
                  </div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: expandedIndex === idx ? '#ffffff' : '#1f2937',
                    margin: '0 0 15px 0',
                    animation: isVisible ? `fadeInUp 0.8s ease-out ${idx * 0.1 + 0.15}s both` : 'none'
                  }}>
                    {service.title}
                  </h3>
                  <div
                    style={{
                      width: '40px',
                      height: '3px',
                      background: expandedIndex === idx ? 'linear-gradient(90deg, #ffffff, #e0e7ff)' : 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                      marginBottom: '15px',
                      borderRadius: '2px',
                      animation: isVisible ? `expandLine 0.8s ease-out ${idx * 0.1 + 0.2}s both` : 'none'
                    }}
                  />
                  <p style={{
                    fontSize: '14px',
                    color: expandedIndex === idx ? '#e0e7ff' : '#6b7280',
                    margin: '0 0 20px 0',
                    lineHeight: '1.6',
                    animation: isVisible ? `fadeInUp 0.8s ease-out ${idx * 0.1 + 0.25}s both` : 'none',
                    display: '-webkit-box',
                    WebkitLineClamp: expandedIndex === idx ? 'unset' : '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: expandedIndex === idx ? 'visible' : 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {service.description}
                  </p>

                  {/* Expandable Points */}
                  {expandedIndex === idx && (
                    <div style={{
                      marginTop: '25px',
                      paddingTop: '25px',
                      borderTop: '2px solid rgba(255, 255, 255, 0.3)',
                      animation: `fadeIn 0.4s ease-out`
                    }}>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#e0e7ff',
                        margin: '0 0 15px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Key Capabilities:
                      </h4>
                      <ul style={{
                        margin: '0',
                        padding: '0',
                        listStyle: 'none'
                      }}>
                        {service.points.map((point, pointIdx) => (
                          <li key={pointIdx} style={{
                            fontSize: '13px',
                            color: '#e0e7ff',
                            marginBottom: '12px',
                            paddingLeft: '20px',
                            position: 'relative',
                            lineHeight: '1.5'
                          }}>
                            <span style={{
                              position: 'absolute',
                              left: '0',
                              color: '#ffffff',
                              fontWeight: '700'
                            }}>•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Expand/Collapse Button */}
                <span 
                  className="expand-arrow"
                  style={{
                    color: expandedIndex === idx ? '#ffffff' : '#3b82f6',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    display: 'inline-block',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    marginTop: '15px',
                    padding: '10px 16px',
                    borderRadius: '4px',
                    userSelect: 'none',
                    backgroundColor: expandedIndex === idx ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    border: expandedIndex === idx ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #e5e7eb',
                    width: 'fit-content'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedIndex(expandedIndex === idx ? null : idx);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  {expandedIndex === idx ? '− Show Less' : '+ Show More'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <ReadyToStartCTA />

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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(150px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bannerSlideIn {
          0% {
            opacity: 0;
            transform: translateX(-80px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      </div>
    </div>
  );
}
