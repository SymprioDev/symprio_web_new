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

/* SVG Icon Components */
const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/>
  </svg>
);

const RobotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="16" r="1"/>
  </svg>
);

const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const BrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 0 1 4.55 2.92A5 5 0 0 1 21 9.5a5 5 0 0 1-2.45 4.3A5 5 0 0 1 12 22a5 5 0 0 1-6.55-7.7A5 5 0 0 1 3 9.5a5 5 0 0 1 4.45-4.58A5 5 0 0 1 12 2z"/>
    <path d="M12 2v20"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function AIApplicationDevelopment() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  const features = [
    {
      title: 'Conversational AI & Chatbots',
      description: 'Next-gen chatbots with multi-language support, guided responses, and live-chat integration.',
      icon: <ChatIcon />
    },
    {
      title: 'Autonomous AI Agents',
      description: 'AI agents that can take actions, use tools, and complete complex workflows independently.',
      icon: <RobotIcon />
    },
    {
      title: 'Document Intelligence',
      description: 'Automated data extraction and understanding from structured and unstructured documents.',
      icon: <DocumentIcon />
    },
    {
      title: 'Computer Vision',
      description: 'Custom AI models for image recognition, object detection, and visual inspection.',
      icon: <EyeIcon />
    },
    {
      title: 'LLM Fine-tuning',
      description: 'Adapting open-source LLMs to your specific business data and domain requirements.',
      icon: <BrainIcon />
    },
    {
      title: 'RAG Implementation',
      description: 'Retrieval-Augmented Generation for accurate, data-backed AI responses.',
      icon: <SearchIcon />
    }
  ];

  const timelineSteps = [
    { step: '01', title: 'Discovery', desc: 'Identifying high-ROI AI use cases.' },
    { step: '02', title: 'Data Prep', desc: 'Cleaning and structuring your data.' },
    { step: '03', title: 'Modeling', desc: 'Selecting and fine-tuning AI models.' },
    { step: '04', title: 'Pipeline', desc: 'Building RAG and API integrations.' },
    { step: '05', title: 'Test', desc: 'Validation and user acceptance labs.' },
    { step: '06', title: 'Scale', desc: 'Deployment and ongoing optimization.' }
  ];

  return (
    <div style={{ background: '#fff' }}>
      <PageBanner
        title="AI Application Development"
        breadcrumb={[{ label: 'Services', url: '/services' }, { label: 'AI Development' }]}
        backgroundImage="/assets/images/ai-development.jpg"
      />

      {/* Intro Section */}
      <section style={{ padding: '100px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <div className="section-tag">AI Solutions</div>
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
      <section style={{ padding: '100px 20px', background: '#F1F7F3' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px'
          }}>
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  padding: '36px',
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
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#185ADB',
                  marginBottom: '24px'
                }}>
                  {f.icon}
                </div>
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

      {/* AI Journey Section - 3 col grid (2 rows of 3) */}
      <section style={{ padding: '100px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-tag">Development Lifecycle</div>
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
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px 60px'
          }}>
            {timelineSteps.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }} data-aos="fade-up" data-aos-delay={i * 100}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  {/* Connector line to the right (except last in each row) */}
                  {(i % 3 !== 2) && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '100%',
                      height: '2px',
                      background: '#DCDCDC',
                      transform: 'translateY(-50%)',
                      zIndex: 0
                    }} />
                  )}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#185ADB',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '14px',
                    position: 'relative',
                    zIndex: 1,
                    flexShrink: 0
                  }}>
                    {s.step}
                  </div>
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
      <section style={{ padding: '100px 20px', background: '#F1F7F3' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '64px',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: '1 1 400px' }} data-aos="fade-right">
              <div className="section-tag">Integrations</div>
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
                      background: '#185ADB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      flexShrink: 0
                    }}>
                      <CheckIcon />
                    </div>
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
        padding: '100px 20px',
        background: 'linear-gradient(135deg, #010B1D 0%, #185ADB 100%)',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
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
