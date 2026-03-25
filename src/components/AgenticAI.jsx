import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReadyToStartCTA from './ReadyToStartCTA';
import FAQSection from './FAQSection';
import ConsultationForm from './ConsultationForm';

/* ── SVG Icon helpers ── */
const SvgBrain = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 0 1 4.55 2.91A4.5 4.5 0 0 1 20 9.5a4.5 4.5 0 0 1-2.1 3.81A5 5 0 0 1 12 22a5 5 0 0 1-5.9-8.69A4.5 4.5 0 0 1 4 9.5a4.5 4.5 0 0 1 3.45-4.59A5 5 0 0 1 12 2z"/>
    <path d="M12 2v20"/>
  </svg>
);
const SvgBolt = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);
const SvgRefresh = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
  </svg>
);
const SvgPhone = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.35a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.75.32 1.54.55 2.35.68A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const SvgBriefcase = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);
const SvgBox = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05"/><path d="M12 22.08V12"/>
  </svg>
);
const SvgDollar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const SvgUsers = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const SvgSearch = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const SvgMap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);
const SvgTool = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);
const SvgFlask = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6v7l5 8a2 2 0 0 1-1.7 3H5.7a2 2 0 0 1-1.7-3l5-8V3z"/><line x1="9" y1="3" x2="15" y2="3"/>
  </svg>
);
const SvgRocket = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const agenticFaqs = [
  {
    q: 'How does Agentic AI differ from traditional RPA?',
    a: 'While RPA follows fixed rules, Agentic AI uses reasoning to handle semi-structured data and changing environments. It can decide *how* to achieve a goal rather than just following steps.'
  },
  {
    q: 'Can AI agents work with my existing software?',
    a: 'Yes. Our agents are designed to use tools (APIs, web browsers, databases) just like a human would, allowing them to integrate with any legacy or modern system.'
  },
  {
    q: 'What is "Human-in-the-loop" in Agentic AI?',
    a: 'It\'s a safety framework where agents pause for human approval before high-stakes actions, ensuring you maintain full control over the AI\'s output.'
  }
];

const whyMatters = [
  {
    icon: <SvgBrain />,
    title: 'Autonomous Decision-Making',
    description: 'Agents reason through complex scenarios, weighing options and making informed decisions without waiting for human input at every step.'
  },
  {
    icon: <SvgBolt />,
    title: 'End-to-End Task Execution',
    description: 'Unlike chatbots that only suggest, agentic AI completes entire workflows—from data gathering to action—autonomously and reliably.'
  },
  {
    icon: <SvgRefresh />,
    title: 'Continuous Learning',
    description: 'Agents improve over time by learning from outcomes, adapting strategies, and becoming more effective with every interaction.'
  }
];

const useCases = [
  {
    number: '01',
    title: 'Intelligent Customer Service',
    overview: 'AI agents that handle complex customer queries, escalate intelligently, and resolve issues end-to-end.',
    benefits: ['80% reduction in response time', 'Seamless handoff to human agents', '24/7 multi-channel support'],
    icon: <SvgPhone />
  },
  {
    number: '02',
    title: 'Procurement Automation',
    overview: 'Agents that manage vendor selection, negotiate contracts, and process purchase orders autonomously.',
    benefits: ['40% cost savings on procurement', 'Automated compliance checks', 'Real-time spend analytics'],
    icon: <SvgBriefcase />
  },
  {
    number: '03',
    title: 'Supply Chain Orchestration',
    overview: 'Intelligent agents monitoring inventory, predicting demand, and coordinating logistics in real time.',
    benefits: ['30% reduction in stockouts', 'Predictive demand planning', 'Automated supplier coordination'],
    icon: <SvgBox />
  },
  {
    number: '04',
    title: 'Financial Operations',
    overview: 'Agents that reconcile accounts, detect anomalies, and generate regulatory reports without manual intervention.',
    benefits: ['99.5% reconciliation accuracy', 'Real-time fraud detection', 'Automated regulatory filing'],
    icon: <SvgDollar />
  },
  {
    number: '05',
    title: 'HR & Talent Management',
    overview: 'AI-driven screening, onboarding, and employee engagement workflows that run autonomously.',
    benefits: ['5x faster candidate screening', 'Personalized onboarding journeys', 'Proactive retention insights'],
    icon: <SvgUsers />
  }
];

export default function AgenticAI() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
      offset: 100
    });
  }, []);

  const implementationSteps = [
    {
      step: '01',
      title: 'Assessment & Readiness',
      timeline: 'Week 1-2',
      label: 'ASSESSMENT',
      description: 'Evaluate current automation maturity, data quality and AI readiness. Understand your organization\'s digital infrastructure and capability gaps.'
    },
    {
      step: '02',
      title: 'Use Case Prioritisation',
      timeline: 'Week 2-3',
      label: 'PRIORITISATION',
      description: 'Identify high-impact processes and define success metrics. Prioritize use cases based on business value and implementation feasibility.'
    },
    {
      step: '03',
      title: 'Pilot & Validation',
      timeline: 'Week 4-6',
      label: 'PILOT',
      description: 'Develop proof of concept, validate ROI and ensure ethical & regulatory compliance. Test agent performance in controlled environment.'
    },
    {
      step: '04',
      title: 'Deployment & Scaling',
      timeline: 'Week 7-10',
      label: 'DEPLOYMENT',
      description: 'Integrate agents into production systems with secure access controls. Deploy with proper monitoring and rollback capabilities.'
    },
    {
      step: '05',
      title: 'Monitoring & Improvement',
      timeline: 'Ongoing',
      label: 'MONITOR',
      description: 'Monitor agent performance, gather user feedback and continuously iterate. Optimize processes based on real-world data and outcomes.'
    }
  ];

  /* ── Comparison data ── */
  const comparisonRows = [
    { category: 'Autonomy', gen: 'Requires human prompts & limited independent action', agent: 'Self-directed execution with minimal intervention' },
    { category: 'Decision Making', gen: 'Suggests options for human approval', agent: 'Makes autonomous decisions & executes' },
    { category: 'Control', gen: 'User-driven operations & manual control', agent: 'Goal-oriented with continuous learning' }
  ];

  return (
    <div style={{
      background: '#fff',
      color: '#444444',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Hero Section */}
      <section style={{
        backgroundImage: `linear-gradient(135deg, rgba(1, 11, 29, 0.85) 0%, rgba(24, 90, 219, 0.7) 100%), url('/assets/images/agentic-ai.jpg')`,
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
            fontSize: 'clamp(3rem, 8vw, 4.5rem)',
            fontWeight: '900',
            margin: '0 0 24px 0',
            lineHeight: '1.1',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            textShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
          data-aos="fade-up">
            Agentic AI <span style={{ color: '#0D9488' }}>Solutions</span>
          </h1>
          <p style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: '1.6',
            margin: '0 auto',
            fontWeight: '500',
            maxWidth: '750px'
          }}
          data-aos="fade-up"
          data-aos-delay="100">
            The next evolution of AI: autonomous digital agents that reason, decide, and execute complex workflows without constant oversight.
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
          <span style={{ color: '#185ADB' }}>Agentic AI</span>
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

        {/* Introduction Section */}
        <section style={{
          marginBottom: '80px',
          background: '#ffffff',
          borderRadius: '20px',
          padding: '60px 50px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          border: '1px solid #DCDCDC'
        }} data-aos="fade-up">
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2
              style={{
                fontSize: '48px',
                fontWeight: '400',
                margin: '0 0 24px 0',
                lineHeight: '1.2',
                color: '#010B1D'
              }}
            >
              The Next Stage of <strong>Autonomous Enterprise</strong>
            </h2>
            <div
              style={{
                width: '80px',
                height: '4px',
                background: '#185ADB',
                margin: '30px auto',
                borderRadius: '3px'
              }}
            />
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#444444',
              margin: '0',
              fontWeight: '400'
            }}>
              Agentic AI represents a paradigm shift from tools that <em>respond</em> to tools that <em>act</em>. Our solutions enable organizations to deploy specialized agents that can browse the web, use internal tools, and collaborate to solve multi-stage problems autonomously.
            </p>
          </div>
        </section>
      </div>

      {/* What is Agentic AI Container - Overlapping Banner */}
      <div
        id="agentic-container"
        style={{
          display: 'none',
          position: 'relative',
          marginTop: '-60px',
          marginBottom: '80px',
          maxWidth: '1200px',
          margin: '-60px auto 80px',
          padding: '0 20px',
          zIndex: 10
        }}>
        <div style={{
          background: '#ffffff',
          padding: '50px',
          position: 'relative',
          zIndex: 10
        }}
        data-aos="fade-up"
        data-aos-once="false">
          <h2 style={{
            fontSize: '42px',
            fontWeight: '400',
            color: '#010B1D',
            margin: '0 0 15px 0',
            textAlign: 'center'
          }}
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="false">
            What is <strong>Agentic AI</strong>?
          </h2>

          <div style={{
            textAlign: 'center',
            fontSize: '16px',
            color: '#444444',
            marginBottom: '60px',
            maxWidth: '700px',
            margin: '0 auto 60px'
          }}
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="800"
          data-aos-once="false">
            The next generation of artificial intelligence that reasons, decides, and executes autonomously
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
            marginBottom: '80px'
          }}>
            {/* Left Side - Content */}
            <div>
              <p style={{
                fontSize: '16px',
                color: '#444444',
                lineHeight: '1.9',
                margin: '0 0 25px 0'
              }}
              data-aos="fade-up"
              data-aos-delay="100">
                Agentic AI represents the next stage of AI evolution. While generative AI assists humans, agentic AI agents can reason, make decisions and execute tasks autonomously. They operate as digital team members, planning tasks, monitoring outcomes and adjusting strategies without constant human oversight.
              </p>

              <div style={{
                background: '#185ADB',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px',
                border: 'none',
                boxShadow: 'none',
                position: 'relative',
                overflow: 'hidden'
              }}
              data-aos="fade-right"
              data-aos-delay="200">
                <div style={{
                  position: 'relative',
                  zIndex: 1
                }}>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#ffffff',
                    margin: '0 0 6px 0'
                  }}>
                    Key Capabilities
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: '1.6',
                    opacity: 0.9
                  }}>
                    Autonomous reasoning, real-time decision making, continuous learning, multi-task orchestration
                  </p>
                </div>
              </div>

              <div style={{
                background: '#0D9488',
                padding: '20px',
                borderRadius: '12px',
                border: 'none',
                boxShadow: 'none',
                position: 'relative',
                overflow: 'hidden'
              }}
              data-aos="fade-left"
              data-aos-delay="300">
                <div style={{
                  position: 'relative',
                  zIndex: 1
                }}>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#ffffff',
                    margin: '0 0 6px 0'
                  }}>
                    Industry Outlook
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: '1.6',
                    opacity: 0.9
                  }}>
                    Analyst firms predict 40% of large enterprises will deploy autonomous AI agents by 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div style={{
              position: 'relative',
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #010B1D 0%, #185ADB 100%)',
              borderRadius: '20px'
            }}
            data-aos="zoom-in"
            data-aos-delay="100">
              <div style={{
                textAlign: 'center',
                color: '#ffffff'
              }}>
                <SvgBrain />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Section - CSS Grid (no HTML table) */}
      <div id="comparison-section" style={{
        marginTop: '20px',
        padding: '100px 20px',
        position: 'relative',
        background: '#ffffff'
      }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>Comparison</div>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '400',
            color: '#010B1D',
            margin: '0 0 15px 0',
            lineHeight: '1.3'
          }} data-aos="fade-up">
            <strong>Generative AI</strong> vs <strong>Agentic AI</strong>
          </h2>
          <div style={{
            width: '80px',
            height: '4px',
            background: '#185ADB',
            margin: '20px auto 30px',
            borderRadius: '3px'
          }} data-aos="fade-up" data-aos-delay="100" />
          <p style={{
            fontSize: '16px',
            color: '#444444',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.7'
          }} data-aos="fade-up" data-aos-delay="200">
            Understand the key differences between Generative AI and Agentic AI to make informed decisions about implementing the right solution for your business needs.
          </p>
        </div>

        {/* 3-column CSS Grid Comparison */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }} data-aos="fade-up" data-aos-delay="300">
          {/* Header Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0',
            background: '#F1F7F3',
            borderRadius: '20px 20px 0 0',
            border: '1px solid #DCDCDC',
            borderBottom: 'none'
          }}>
            {['Category', 'Generative AI', 'Agentic AI'].map((label, i) => (
              <div key={i} style={{
                padding: '18px 24px',
                fontWeight: '600',
                color: '#010B1D',
                fontSize: '16px',
                textAlign: 'center',
                borderRight: i < 2 ? '1px solid #DCDCDC' : 'none'
              }}>
                {label}
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {comparisonRows.map((row, idx) => (
            <div key={idx} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '0',
              background: idx % 2 === 0 ? '#ffffff' : '#F1F7F3',
              border: '1px solid #DCDCDC',
              borderBottom: idx === comparisonRows.length - 1 ? '1px solid #DCDCDC' : 'none',
              borderRadius: idx === comparisonRows.length - 1 ? '0 0 20px 20px' : '0'
            }}>
              <div style={{
                padding: '18px 24px',
                fontWeight: '600',
                color: '#010B1D',
                textAlign: 'center',
                borderRight: '1px solid #DCDCDC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {row.category}
              </div>
              <div style={{
                padding: '18px 24px',
                color: '#444444',
                textAlign: 'center',
                borderRight: '1px solid #DCDCDC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px'
              }}>
                {row.gen}
              </div>
              <div style={{
                padding: '18px 24px',
                color: '#444444',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px'
              }}>
                {row.agent}
              </div>
            </div>
          ))}
        </div>

        {/* Info Line Below */}
        <div style={{
          maxWidth: '900px',
          margin: '30px auto 0',
          padding: '20px',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '16px',
            color: '#444444',
            lineHeight: '1.7',
            margin: '0'
          }}>
            <span style={{ fontWeight: '600', color: '#010B1D' }}>Generative AI</span> focuses on content creation and suggestions, requiring human guidance for every action. <span style={{ fontWeight: '600', color: '#010B1D' }}>Agentic AI</span> independently executes tasks and makes decisions with minimal human oversight, delivering faster results and higher efficiency.
          </p>
        </div>
      </div>
      </div>

      {/* Introduction Section - Hidden */}
      <section style={{
        display: 'none',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 20px',
        backgroundColor: '#ffffff'
      }}>
      </section>

      {/* Why Agentic AI Matters - Value Pillars */}
      <section id="why-matters-section" style={{
        width: '100%',
        margin: '0',
        padding: '100px 20px',
        position: 'relative',
        background: '#F1F7F3',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>Why It Matters</div>
          <h2 style={{
            fontSize: '44px',
            fontWeight: '400',
            color: '#010B1D',
            margin: '0 0 15px 0',
            textAlign: 'center'
          }}>
            Why <strong>Agentic AI</strong> Matters
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#444444',
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto 60px',
            lineHeight: '1.7'
          }} data-aos="fade-up">
            Three fundamental reasons why autonomous AI agents are reshaping enterprise automation.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px'
          }}>
            {whyMatters.map((item, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                style={{
                  padding: '36px',
                  background: '#ffffff',
                  border: '1px solid #DCDCDC',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(24, 90, 219, 0.12)';
                  e.currentTarget.style.borderColor = '#185ADB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#DCDCDC';
                }}
              >
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
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#010B1D',
                  margin: '0 0 15px 0'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#444444',
                  lineHeight: '1.7',
                  margin: '0'
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Use Cases */}
      <section style={{
        width: '100%',
        padding: '100px 20px',
        backgroundColor: '#ffffff'
      }}>
        <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>Use Cases</div>
        <h2 style={{
          fontSize: '44px',
          fontWeight: '400',
          color: '#010B1D',
          margin: '0 0 15px 0',
          textAlign: 'center'
        }} data-aos="fade-up">
          Enterprise <strong>Use Cases</strong>
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#444444',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto 60px',
          lineHeight: '1.7'
        }} data-aos="fade-up">
          Five transformative scenarios where agentic AI delivers measurable business impact.
        </p>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gap: '30px'
        }}>
          {useCases.map((useCase, idx) => {
            const accentColor = idx % 2 === 0 ? '#185ADB' : '#0D9488';

            return (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '30px',
                  alignItems: 'start',
                  padding: '36px',
                  background: '#ffffff',
                  border: '1px solid #DCDCDC',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#185ADB';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(24, 90, 219, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#DCDCDC';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Left: icon + number */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: '#F1F7F3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: accentColor,
                    margin: '0 auto 8px'
                  }}>
                    {useCase.icon}
                  </div>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    color: accentColor
                  }}>
                    {useCase.number}
                  </div>
                </div>

                {/* Right: text content */}
                <div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#010B1D',
                    margin: '0 0 12px 0'
                  }}>
                    {useCase.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#444444',
                    margin: '0 0 20px 0',
                    lineHeight: '1.7',
                    fontWeight: '500'
                  }}>
                    {useCase.overview}
                  </p>
                  <div>
                    <p style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: accentColor,
                      margin: '0 0 12px 0',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Key Benefits
                    </p>
                    <ul style={{
                      margin: 0,
                      paddingLeft: '20px',
                      fontSize: '14px',
                      color: '#444444',
                      lineHeight: '1.8'
                    }}>
                      {useCase.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Technology & Platforms Section */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '100px 20px',
        background: '#F1F7F3'
      }}>
        <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>Technology Stack</div>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '400',
          color: '#010B1D',
          margin: '0 0 60px 0',
          textAlign: 'center'
        }}
        data-aos="fade-up">
          Technology & <strong>Platforms</strong>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px'
        }}>
          <div style={{
            padding: '36px',
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #DCDCDC',
            transition: 'all 0.3s ease'
          }}
          data-aos="fade-right"
          data-aos-delay="100"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#185ADB';
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(24, 90, 219, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#DCDCDC';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#185ADB',
              margin: '0 0 15px 0'
            }}>
              Leading Partnerships
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#444444',
              lineHeight: '1.7',
              margin: '0'
            }}>
              Symprio partners with leading agentic AI platforms, including custom LLMs and workflow orchestration tools. We emphasise integration with your existing ERP, CRM and HR systems.
            </p>
          </div>

          <div style={{
            padding: '36px',
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #DCDCDC',
            transition: 'all 0.3s ease'
          }}
          data-aos="fade-left"
          data-aos-delay="200"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#185ADB';
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(24, 90, 219, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#DCDCDC';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#0D9488',
              margin: '0 0 15px 0'
            }}>
              Customization & Governance
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#444444',
              lineHeight: '1.7',
              margin: '0'
            }}>
              We tailor agentic AI agents to your processes and governance frameworks, ensuring security, compliance and alignment with your business objectives.
            </p>
          </div>
        </div>
      </section>

      {/* Implementation Approach - Vertical Timeline */}
      <section style={{
        width: '100%',
        padding: '100px 20px',
        backgroundColor: '#ffffff'
      }}>
        <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>Implementation</div>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '400',
          color: '#010B1D',
          margin: '0 0 50px 0',
          textAlign: 'center'
        }}
        data-aos="fade-up">
          Our <strong>Implementation Approach</strong>
        </h2>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          paddingLeft: '60px'
        }}>
          {/* Thin vertical line */}
          <div style={{
            position: 'absolute',
            left: '19px',
            top: '0',
            bottom: '0',
            width: '2px',
            background: '#DCDCDC'
          }} />

          {implementationSteps.map((step, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 80}
              style={{
                position: 'relative',
                marginBottom: idx < implementationSteps.length - 1 ? '50px' : '0'
              }}
            >
              {/* Numbered circle */}
              <div style={{
                position: 'absolute',
                left: '-60px',
                top: '0',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#185ADB',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '14px',
                zIndex: 2
              }}>
                {step.step}
              </div>

              {/* Content */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #DCDCDC',
                borderRadius: '20px',
                padding: '36px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#185ADB';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(24, 90, 219, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#DCDCDC';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#185ADB',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {step.timeline} — {step.label}
                </div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#010B1D',
                  margin: '0 0 12px 0'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#444444',
                  lineHeight: '1.7',
                  margin: '0'
                }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <ReadyToStartCTA />

      <ConsultationForm />
    </div>
  );
}
