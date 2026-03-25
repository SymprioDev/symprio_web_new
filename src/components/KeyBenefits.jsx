import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function KeyBenefits() {
  const [expandedBenefit, setExpandedBenefit] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100
    });
  }, []);

  const benefits = [
    {
      id: 1,
      icon: '🚀',
      title: "End-to-End Digital Transformation",
      subtitle: "Accelerate Growth from Strategy to Execution",
      description: "We guide your organization through every stage of its digital journey, turning complex roadmaps into high-performance realities. Modernize your tech stack and align your operations with global digital standards.",
      highlights: ["Strategic Growth Assessment", "Process Optimization", "Modern Tech Integration", "Operational Excellence"]
    },
    {
      id: 2,
      icon: '🤖',
      title: "Intelligent Agentic AI Solutions",
      subtitle: "Future-Proof Your Team with Autonomous AI",
      description: "Step beyond simple chatbots. Our Agentic AI solutions act as autonomous team members capable of complex reasoning and independent action, revolutionizing customer service and supply chain efficiency.",
      highlights: ["Autonomous Digital Agents", "AI-Powered Customer Success", "Predictive Sales Automation", "Intelligent Supply Chain"]
    },
    {
      id: 3,
      icon: '🌐',
      title: "Global Expertise, Local Insight",
      subtitle: "Industry-Leading Consulting for Enterprise",
      description: "Our consultants bring deep experience from Banking, Telecom, and Healthcare. With deep roots in the Silicon Valley and Indo-Pacific, we bridge the gap between global innovation and regional needs.",
      highlights: ["Banking & Fintech Experts", "Healthcare Digitalization", "Telecom Infrastructure", "Public Sector Innovation"]
    }
  ];

  return (
    <section 
      id="benefits-section"
      style={{
        background: '#ffffff',
        padding: '0',
        position: 'relative',
        overflow: 'visible',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'stretch',
        marginTop: '0px'
      }}>
      {/* Bubbles */}
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        background: 'rgba(8, 145, 178, 0.1)',
        borderRadius: '50%',
        top: '10%',
        left: '5%',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '150px',
        height: '150px',
        background: 'rgba(139, 92, 246, 0.1)',
        borderRadius: '50%',
        bottom: '15%',
        right: '10%',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '100px',
        height: '100px',
        background: 'rgba(236, 72, 153, 0.1)',
        borderRadius: '50%',
        top: '50%',
        right: '5%',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '120px',
        height: '120px',
        background: 'rgba(8, 145, 178, 0.08)',
        borderRadius: '50%',
        bottom: '30%',
        left: '15%',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '80px',
        height: '80px',
        background: 'rgba(139, 92, 246, 0.12)',
        borderRadius: '50%',
        top: '20%',
        right: '20%',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      {/* Content starts here */}
      {/* LEFT SIDE - Title with Logo */}
      <div 
        style={{
          width: '40%',
          background: 'linear-gradient(135deg, #0f172a 0%, #0891b2 100%)',
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          minHeight: 'auto',
          position: 'relative',
          overflow: 'visible'
        }}>
        <div 
          style={{ 
            width: '100%',
            position: 'sticky',
            top: '100px',
            zIndex: 5,
            paddingBottom: '40px',
            borderBottom: '3px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '40px'
          }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '4px',
              background: 'linear-gradient(90deg, #00d4ff, #3b82f6)',
              borderRadius: '2px'
            }}></div>
            <span style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#00d4ff',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>Why Choose Us</span>
            <div style={{
              width: '40px',
              height: '4px',
              background: 'linear-gradient(90deg, #3b82f6, #00d4ff)',
              borderRadius: '2px'
            }}></div>
          </div>
          <h2 style={{
            fontSize: '56px',
            fontWeight: '800',
            color: '#ffffff',
            margin: '0 0 16px 0',
            lineHeight: '1.2'
          }}>
            Why Choose Symprio?
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#e0e7ff',
            margin: '0',
            lineHeight: '1.6',
            maxWidth: '90%'
          }}>
            We deliver enterprise transformation through strategic expertise, cutting-edge AI, and deep industry knowledge
          </p>
        </div>

        {/* Logo at bottom right */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          right: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '200px',
          height: '200px',
          opacity: 0.4,
          overflow: 'hidden'
        }}>
          <img 
            src="/symprio-logo.png" 
            alt="Symprio Logo" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '20px',
              filter: 'brightness(0) invert(1)'
            }}
          />
        </div>
      </div>

      {/* RIGHT SIDE - Cards */}
      <div style={{
        width: '60%',
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '40px',
        position: 'relative'
      }}>
        {/* Cards Grid - 1 Column */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>
          {benefits.map((benefit, idx) => (
            <div
              key={benefit.id}
              className="benefit-card"
              data-aos="fade-left"
              data-aos-delay={idx * 200}
              data-aos-duration="800"
              onClick={() => setExpandedBenefit(expandedBenefit === benefit.id ? null : benefit.id)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                cursor: 'pointer',
                gap: '24px',
                alignItems: 'flex-start'
              }}
            >
              {/* Icon and Number Badge */}
              <div style={{
                position: 'relative',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                {/* Number badge */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: idx === 0
                    ? 'linear-gradient(135deg, #0891b2, #3b82f6)'
                    : idx === 1
                    ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)'
                    : 'linear-gradient(135deg, #ec4899, #f59e0b)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '24px',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}>
                  {idx + 1}
                </div>
              </div>

              {/* Content */}
              <div style={{
                padding: '24px 28px',
                background: idx === 0 
                  ? 'linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%)'
                  : idx === 1
                  ? 'linear-gradient(135deg, #f5f3ff 0%, #fef3c7 100%)'
                  : 'linear-gradient(135deg, #fef2f2 0%, #fce7f3 100%)',
                borderRadius: '12px',
                border: expandedBenefit === benefit.id
                  ? `2px solid ${idx === 0 ? '#0891b2' : idx === 1 ? '#8b5cf6' : '#ec4899'}`
                  : '1px solid #e5e7eb',
                position: 'relative',
                overflow: 'hidden',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: expandedBenefit === benefit.id 
                  ? `0 12px 32px ${idx === 0 ? 'rgba(8, 145, 178, 0.2)' : idx === 1 ? 'rgba(139, 92, 246, 0.2)' : 'rgba(236, 72, 153, 0.2)'}`
                  : '0 2px 8px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (expandedBenefit !== benefit.id) {
                  e.currentTarget.style.boxShadow = `0 8px 20px rgba(0, 0, 0, 0.1)`;
                  e.currentTarget.style.transform = 'translateX(8px)';
                }
              }}
              onMouseLeave={(e) => {
                if (expandedBenefit !== benefit.id) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: '0 0 8px 0',
                  lineHeight: '1.3'
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: idx === 0 ? '#0891b2' : idx === 1 ? '#8b5cf6' : '#ec4899',
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {benefit.subtitle}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#4b5563',
                  lineHeight: '1.6',
                  margin: '0 0 16px 0',
                  flex: 1
                }}>
                  {benefit.description}
                </p>

                {/* Highlights - Expandable */}
                <div style={{
                  paddingTop: '16px',
                  borderTop: '1px solid #e5e7eb',
                  maxHeight: expandedBenefit === benefit.id ? '150px' : '0',
                  overflow: 'hidden',
                  opacity: expandedBenefit === benefit.id ? 1 : 0,
                  transition: 'all 0.3s ease'
                }}>
                  <p style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    margin: '0 0 12px 0'
                  }}>
                    Key Capabilities
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px'
                  }}>
                    {benefit.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px'
                        }}
                      >
                        <span style={{
                          display: 'inline-block',
                          width: '4px',
                          height: '4px',
                          background: idx === 0 ? '#0891b2' : idx === 1 ? '#8b5cf6' : '#ec4899',
                          borderRadius: '50%',
                          marginTop: '5px',
                          flexShrink: 0
                        }} />
                        <span style={{
                          fontSize: '12px',
                          color: '#4b5563',
                          lineHeight: '1.4'
                        }}>
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Click indicator */}
                <div style={{
                  marginTop: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: idx === 0 ? '#0891b2' : idx === 1 ? '#8b5cf6' : '#ec4899',
                  opacity: expandedBenefit === benefit.id ? 0 : 0.7,
                  transition: 'opacity 0.3s ease'
                }}>
                  {expandedBenefit !== benefit.id ? 'Click to expand' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
