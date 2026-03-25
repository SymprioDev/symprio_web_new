import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';
import CurvedDivider from './CurvedDivider';
import FAQSection from './FAQSection';
import ConsultationForm from './ConsultationForm';

const aiFaqs = [
  {
    q: 'What kind of data do I need for a custom AI model?',
    a: 'We work with your existing structured (databases) and unstructured (documents, emails) data. If needed, we help you implement data collection and cleaning pipelines.'
  },
  {
    q: 'How long does it take to build a chatbot?',
    a: 'A production-ready intelligent chatbot usually takes 4-8 weeks to develop, including integration with your messaging channels and backend systems.'
  },
  {
    q: 'Is my data secure with your AI solutions?',
    a: 'Yes. We prioritize security and privacy, often deploying models within your own virtual private cloud (VPC) to ensure data never leaves your infrastructure.'
  }
];

export default function AIApplicationDevelopment() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  const features = [
    {
      title: 'Conversational AI & Chatbots',
      description: 'Next-gen chatbots with multi-language support, guided responses, and live-chat integration.',
      icon: '💬'
    },
    {
      title: 'Autonomous AI Agents',
      description: 'AI agents that can take actions, use tools, and complete complex workflows independently.',
      icon: '🤖'
    },
    {
      title: 'Document Intelligence',
      description: 'Automated data extraction and understanding from structured and unstructured documents.',
      icon: '📄'
    },
    {
      title: 'Computer Vision',
      description: 'Custom AI models for image recognition, object detection, and visual inspection.',
      icon: '👁️'
    },
    {
      title: 'LLM Fine-tuning',
      description: 'Adapting open-source LLMs to your specific business data and domain requirements.',
      icon: '🧠'
    },
    {
      title: 'RAG Implementation',
      description: 'Retrieval-Augmented Generation for accurate, data-backed AI responses.',
      icon: '🔍'
    }
  ];

  return (
    <div style={{ background: '#fff' }}>
      <PageBanner
        title="AI Application Development"
        breadcrumb={[{ label: 'Services', url: '/services' }, { label: 'AI Development' }]}
        backgroundImage="/assets/images/ai-development.jpg"
      />

      {/* Intro Section */}
      <section style={{ padding: '110px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>AI SOLUTIONS</div>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '400',
              color: '#010B1D',
              marginBottom: '32px'
            }} data-aos="fade-up">
              Future-Proof Your Business with <strong>Intelligent AI</strong>
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#444444',
              lineHeight: '1.8',
              marginBottom: '48px'
            }} data-aos="fade-up" data-aos-delay="100">
              Symprio specializes in building custom AI applications that solve real-world business challenges.
              From intelligent chatbots to autonomous agents, we help you leverage the power of Generative AI
              and Machine Learning to drive efficiency and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '110px 0', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px'
          }}>
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  padding: '48px',
                  borderRadius: '20px',
                  background: '#ffffff',
                  border: '1px solid #DCDCDC',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#185ADB';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(24, 90, 219, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#DCDCDC';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '24px' }}>{f.icon}</div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#010B1D',
                  marginBottom: '12px',
                  marginTop: '0'
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#444444',
                  lineHeight: '1.7',
                  margin: '0'
                }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Journey Section */}
      <section style={{ padding: '110px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>DEVELOPMENT LIFECYCLE</div>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '400',
            color: '#010B1D',
            textAlign: 'center',
            marginBottom: '60px',
            marginTop: '0'
          }} data-aos="fade-up">
            Our AI <strong>Development Lifecycle</strong>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '24px'
          }}>
            {[
              { step: '01', title: 'Discovery', icon: '🎯', desc: 'Identifying high-ROI AI use cases.' },
              { step: '02', title: 'Data Prep', icon: '📊', desc: 'Cleaning and structuring your data.' },
              { step: '03', title: 'Modeling', icon: '🧪', desc: 'Selecting and fine-tuning AI models.' },
              { step: '04', title: 'Pipeline', icon: '⛓️', desc: 'Building RAG and API integrations.' },
              { step: '05', title: 'Test', icon: '✅', desc: 'Validation and user acceptance labs.' },
              { step: '06', title: 'Scale', icon: '🚀', desc: 'Deployment and ongoing optimization.' }
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }} data-aos="fade-up" data-aos-delay={i * 100}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#185ADB',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  fontWeight: '700',
                  fontSize: '18px',
                  boxShadow: '0 8px 24px rgba(24, 90, 219, 0.3)'
                }}>
                  {s.step}
                </div>
                <h4 style={{
                  fontWeight: '700',
                  color: '#010B1D',
                  marginBottom: '8px',
                  marginTop: '0',
                  fontSize: '16px'
                }}>{s.title}</h4>
                <p style={{ fontSize: '14px', color: '#444444', margin: '0', lineHeight: '1.6' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section style={{ padding: '110px 0', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '64px',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: '1 1 400px' }} data-aos="fade-right">
              <div className="section-tag" style={{ marginBottom: '16px' }}>INTEGRATIONS</div>
              <h2 style={{
                fontSize: '40px',
                fontWeight: '400',
                color: '#010B1D',
                marginBottom: '24px',
                marginTop: '0'
              }}>
                Seamless <strong>Integrations</strong>
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#444444',
                marginBottom: '32px',
                lineHeight: '1.8'
              }}>
                Our AI solutions are built to talk to your existing stack. We don't just build models; we build production-ready systems that drive value from day one.
              </p>
              <ul style={{ listStyle: 'none', padding: '0', margin: '0', display: 'grid', gap: '16px' }}>
                {['WhatsApp & Messaging Channels', 'Microsoft 365 & Teams', 'SAP, Oracle & Salesforce', 'Enterprise Data Warehouses'].map((item, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#444444',
                    fontWeight: '600',
                    fontSize: '16px'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#0D9488',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      flexShrink: 0
                    }}>✓</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flex: '1 1 400px' }} data-aos="fade-left">
              <div style={{
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid #DCDCDC',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
              }}>
                <img src="/assets/images/custom-dev.jpg" alt="AI Integration" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={aiFaqs} />

      {/* CTA */}
      <section style={{
        padding: '110px 0',
        background: 'linear-gradient(135deg, #010B1D 0%, #185ADB 100%)',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '400',
            marginBottom: '24px',
            marginTop: '0',
            color: '#fff'
          }}>
            Ready to <strong>Unleash AI</strong>?
          </h2>
          <p style={{
            fontSize: '18px',
            marginBottom: '40px',
            opacity: 0.85,
            maxWidth: '640px',
            margin: '0 auto 40px',
            lineHeight: '1.7'
          }}>
            Book a discovery call today and let our experts show you how AI can transform your bottom line.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="btn-pill btn-primary"
            style={{ fontSize: '16px', padding: '16px 48px' }}
          >
            Start Your Discovery Phase
          </button>
        </div>
      </section>

      <ConsultationForm />
    </div>
  );
}
