import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FAQSection from './FAQSection';
import ConsultationForm from './ConsultationForm';

const paFaqs = [
  {
    q: 'How long does a process assessment take?',
    a: 'A typical assessment for a single department takes 2-4 weeks, while an enterprise-wide automation roadmap can take 6-8 weeks.'
  },
  {
    q: 'What do you need from our team during the assessment?',
    a: 'We usually require 2-3 hours of interview time with each process owner and access to any existing SOP (Standard Operating Procedure) documents.'
  },
  {
    q: 'What is the "Automation Scorecard"?',
    a: 'It\u2019s our proprietary scoring system that ranks processes based on volume, complexity, standardisation, and potential ROI to help you prioritise your roadmap.'
  }
];

/* SVG Icon Components */
const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const DollarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const MapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);

const TrophyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
  </svg>
);

const TrendUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);

const stepIcons = [<SearchIcon />, <ChartIcon />, <DollarIcon />, <MapIcon />];

export default function ProcessAssessment() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  const steps = [
    {
      title: 'Discovery & Mapping',
      description: 'We interview stakeholders and document your current "as-is" processes in detail.',
    },
    {
      title: 'Bottleneck Analysis',
      description: 'Identifying manual handoffs, repetitive tasks, and operational inefficiencies.',
    },
    {
      title: 'ROI Estimation',
      description: 'We calculate the potential cost savings and efficiency gains for each automation opportunity.',
    },
    {
      title: 'Roadmap Design',
      description: 'Prioritized list of automation projects with clear timelines and resource requirements.',
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section style={{
        backgroundImage: `linear-gradient(135deg, rgba(1,11,29,0.75) 0%, rgba(1,11,29,0.75) 100%), url('/assets/images/process-assessment.jpg')`,
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
            margin: '0 0 20px 0',
            color: '#ffffff',
            lineHeight: '1.15'
          }} data-aos="fade-up">
            Process Assessment & Consultancy
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.85)',
            margin: '0 auto',
            fontWeight: '400',
            maxWidth: '700px'
          }} data-aos="fade-up" data-aos-delay="100">
            Understand your processes before you automate them.
          </p>
        </div>
      </section>

      {/* Main intro section */}
      <section style={{ padding: '100px 20px' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div data-aos="fade-right">
              <div className="section-tag" style={{ marginBottom: '16px' }}>CONSULTANCY</div>
              <h2 style={{ fontSize: '40px', fontWeight: '400', color: '#010B1D', marginBottom: '24px', lineHeight: '1.3' }}>
                Don't Automate Chaos. <strong>Optimize First.</strong>
              </h2>
              <p style={{ fontSize: '16px', color: '#444444', lineHeight: '1.8', marginBottom: '32px' }}>
                Before deploying technology, it is critical to understand if a process is truly "automation-ready".
                Symprio's assessment methodology helps you identify the high-impact areas where AI and RPA
                can deliver maximum ROI.
              </p>
              <div className="space-y-6">
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '24px',
                  borderRadius: '20px',
                  background: '#ffffff',
                  border: '1px solid #DCDCDC',
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
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#185ADB',
                    flexShrink: 0
                  }}>
                    <TrophyIcon />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '700', color: '#010B1D', fontSize: '18px', marginBottom: '4px' }}>Strategic Alignment</h4>
                    <p style={{ color: '#444444', fontSize: '16px', margin: 0, lineHeight: '1.6' }}>Ensuring automation goals match your long-term business objectives.</p>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '24px',
                  borderRadius: '20px',
                  background: '#ffffff',
                  border: '1px solid #DCDCDC',
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
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#185ADB',
                    flexShrink: 0
                  }}>
                    <TrendUpIcon />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '700', color: '#010B1D', fontSize: '18px', marginBottom: '4px' }}>Data-Driven Decisions</h4>
                    <p style={{ color: '#444444', fontSize: '16px', margin: 0, lineHeight: '1.6' }}>Moving beyond intuition with clear process metrics and ROI analysis.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6" data-aos="fade-left">
              {steps.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'center',
                    padding: '28px',
                    background: '#ffffff',
                    border: '1px solid #DCDCDC',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
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
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#185ADB',
                    flexShrink: 0
                  }}>
                    {stepIcons[i]}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#010B1D', marginBottom: '4px' }}>{step.title}</h3>
                    <p style={{ color: '#444444', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Center of Excellence section */}
      <section style={{
        background: 'linear-gradient(135deg, #010B1D 0%, #185ADB 100%)',
        padding: '100px 20px',
        color: '#fff',
        position: 'relative'
      }}>
        <div className="container mx-auto px-6 text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '40px', fontWeight: '400', color: '#ffffff', marginBottom: '24px' }}>
              <strong>CoE Setup</strong> & Governance
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '40px',
              lineHeight: '1.8'
            }}>
              We help you build an internal Center of Excellence capable of
              governing, scaling, and maintaining your digital workforce independently.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="btn-pill btn-primary"
            >
              Start Your CoE Journey
            </button>
          </div>
        </div>
      </section>

      <FAQSection faqs={paFaqs} />

      <ConsultationForm />
    </div>
  );
}
