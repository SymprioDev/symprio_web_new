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
      icon: '\u{1F680}',
      title: "End-to-End Digital Transformation",
      subtitle: "Accelerate Growth from Strategy to Execution",
      description: "We guide your organization through every stage of its digital journey, turning complex roadmaps into high-performance realities. Modernize your tech stack and align your operations with global digital standards.",
      highlights: ["Strategic Growth Assessment", "Process Optimization", "Modern Tech Integration", "Operational Excellence"]
    },
    {
      id: 2,
      icon: '\u{1F916}',
      title: "Intelligent Agentic AI Solutions",
      subtitle: "Future-Proof Your Team with Autonomous AI",
      description: "Step beyond simple chatbots. Our Agentic AI solutions act as autonomous team members capable of complex reasoning and independent action, revolutionizing customer service and supply chain efficiency.",
      highlights: ["Autonomous Digital Agents", "AI-Powered Customer Success", "Predictive Sales Automation", "Intelligent Supply Chain"]
    },
    {
      id: 3,
      icon: '\u{1F310}',
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
        padding: '120px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Section Tag */}
        <div className="section-tag" style={{ textAlign: 'center' }}>Why Choose Us</div>

        {/* Heading */}
        <h2
          data-aos="fade-up"
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 400,
            color: '#010B1D',
            textAlign: 'center',
            margin: '0 0 60px 0',
            lineHeight: 1.3
          }}>
          Why Businesses Choose <strong>Symprio</strong>
        </h2>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px'
        }} className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <div
              key={benefit.id}
              className="benefit-card"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              data-aos-duration="800"
              onClick={() => setExpandedBenefit(expandedBenefit === benefit.id ? null : benefit.id)}
              style={{
                border: '1px solid #DCDCDC',
                borderRadius: '20px',
                padding: '36px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: '#ffffff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#185ADB';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(24, 90, 219, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#DCDCDC';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon */}
              <div style={{ fontSize: '48px', marginBottom: '20px', lineHeight: 1 }}>
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: '#010B1D',
                margin: '0 0 8px 0',
                lineHeight: 1.3
              }}>
                {benefit.title}
              </h3>

              {/* Subtitle */}
              <p style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#185ADB',
                margin: '0 0 14px 0',
                letterSpacing: '0.3px'
              }}>
                {benefit.subtitle}
              </p>

              {/* Description */}
              <p style={{
                fontSize: '15px',
                color: '#444444',
                lineHeight: 1.7,
                margin: '0 0 20px 0'
              }}>
                {benefit.description}
              </p>

              {/* Highlights */}
              <div style={{
                maxHeight: expandedBenefit === benefit.id ? '200px' : '0',
                overflow: 'hidden',
                opacity: expandedBenefit === benefit.id ? 1 : 0,
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  paddingTop: '16px',
                  borderTop: '1px solid #DCDCDC',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {benefit.highlights.map((highlight, hIdx) => (
                    <span
                      key={hIdx}
                      style={{
                        background: '#f8f9fa',
                        color: '#444444',
                        fontSize: '13px',
                        fontWeight: 500,
                        padding: '6px 14px',
                        borderRadius: '8px'
                      }}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Click indicator */}
              <div style={{
                marginTop: '12px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#185ADB',
                opacity: expandedBenefit === benefit.id ? 0 : 0.6,
                transition: 'opacity 0.3s ease'
              }}>
                {expandedBenefit !== benefit.id ? 'Click to expand' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .benefits-grid {
            grid-template-columns: 1fr !important;
            max-width: 540px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
