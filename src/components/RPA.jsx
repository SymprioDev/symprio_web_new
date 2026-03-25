import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReadyToStartCTA from './ReadyToStartCTA';
import ConsultationForm from './ConsultationForm';

/* ── SVG Icon helpers ── */
const SvgIcon = ({ children, size = 24, color = 'currentColor', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}>
    {children}
  </svg>
);

const IconSearch = (p) => <SvgIcon {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></SvgIcon>;
const IconClipboard = (p) => <SvgIcon {...p}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></SvgIcon>;
const IconBot = (p) => <SvgIcon {...p}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="11"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></SvgIcon>;
const IconRocket = (p) => <SvgIcon {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3"/></SvgIcon>;
const IconBook = (p) => <SvgIcon {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></SvgIcon>;
const IconBarChart = (p) => <SvgIcon {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></SvgIcon>;

const IconClock = (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></SvgIcon>;
const IconAlertCircle = (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></SvgIcon>;
const IconCalendar = (p) => <SvgIcon {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></SvgIcon>;
const IconDollar = (p) => <SvgIcon {...p}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></SvgIcon>;
const IconTrendDown = (p) => <SvgIcon {...p}><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></SvgIcon>;
const IconFrown = (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></SvgIcon>;

const IconZap = (p) => <SvgIcon {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></SvgIcon>;
const IconCheck = (p) => <SvgIcon {...p}><polyline points="20 6 9 17 4 12"/></SvgIcon>;
const IconGlobe = (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></SvgIcon>;
const IconWallet = (p) => <SvgIcon {...p}><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></SvgIcon>;
const IconTrendUp = (p) => <SvgIcon {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></SvgIcon>;
const IconSmile = (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></SvgIcon>;

const IconCoins = (p) => <SvgIcon {...p}><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><line x1="7" y1="6" x2="7.01" y2="6"/><line x1="14" y1="12" x2="14.01" y2="12"/></SvgIcon>;
const IconUsers = (p) => <SvgIcon {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></SvgIcon>;
const IconPackage = (p) => <SvgIcon {...p}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></SvgIcon>;
const IconScale = (p) => <SvgIcon {...p}><path d="M16 3l5 5-5 5"/><path d="M21 8H9"/><path d="M8 21l-5-5 5-5"/><path d="M3 16h12"/></SvgIcon>;

const journeyIcons = [IconSearch, IconClipboard, IconBot, IconRocket, IconBook, IconBarChart];

const beforeIcons = [IconClock, IconAlertCircle, IconCalendar, IconDollar, IconTrendDown, IconFrown];
const afterIcons = [IconZap, IconCheck, IconGlobe, IconWallet, IconTrendUp, IconSmile];

const useCaseIcons = [IconCoins, IconUsers, IconPackage, IconScale];

export default function RPA() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [containerVisible, setContainerVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
      offset: 100
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('rpa-container');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.75;
        if (isInView) {
          setContainerVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <section style={{
        backgroundImage: `linear-gradient(135deg, rgba(1, 11, 29, 0.85) 0%, rgba(24, 90, 219, 0.7) 100%), url(/assets/images/rpa.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        padding: '120px 20px 160px',
        textAlign: 'center',
        color: '#fff',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Banner content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 4.5rem)',
            fontWeight: '900',
            color: '#ffffff',
            margin: '0 0 24px 0',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            textShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }} data-aos="fade-up">
            Robotic Process <span style={{ color: '#0D9488' }}>Automation</span>
          </h1>
          <p style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: '500',
            maxWidth: '700px',
            margin: '0 auto'
          }} data-aos="fade-up" data-aos-delay="100">
            Intelligent bots created to automate high-volume, repetitive tasks—enhancing accuracy and scaling your digital workforce.
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
          <span style={{ color: '#185ADB' }}>RPA</span>
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
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
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
                color: '#010B1D',
                margin: '0 0 20px 0',
                lineHeight: '1.3'
              }}
            >
              Robotic Process <strong>Automation Services</strong>
            </h2>
            <div
              style={{
                width: '100px',
                height: '4px',
                background: '#185ADB',
                margin: '20px auto 30px',
                borderRadius: '3px'
              }}
            />
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#444444',
              margin: '0'
            }}>
              Symprio provides end-to-end RPA services from assessment through delivery, including ongoing support, training, and establishment of an RPA Center of Excellence. Our experienced architects and developers leverage leading platforms like UiPath and Microsoft Power Automate to deliver enterprise-grade automation solutions.
            </p>
          </div>
        </section>
      </div>

      {/* Main content container */}
      <div style={{
        maxWidth: '1200px',
        margin: '80px auto 0',
        padding: '0 20px'
      }}>

        {/* Introduction Section - Hidden since we have the overlay */}
        <section style={{ display: 'none', marginTop: '60px', marginBottom: '80px' }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{
              animation: isVisible ? 'slideUp 0.8s ease-out 0.1s both' : 'none'
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '400',
                color: '#010B1D',
                marginBottom: '20px'
              }}>
                About <strong>RPA</strong>
              </h2>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#444444',
                marginBottom: '20px'
              }}>
                Robotic Process Automation (RPA) is the automation of repetitive, rules-based tasks across departments to boost accuracy, speed and compliance. By deploying intelligent software robots, organizations can eliminate manual work, reduce errors, and free up employees to focus on high-value strategic activities.
              </p>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#444444',
                marginBottom: '30px'
              }}>
                Symprio provides end-to-end RPA services from assessment through delivery, including ongoing support, training, and establishment of an RPA Center of Excellence. Our experienced architects and developers leverage leading platforms like UiPath and Microsoft Power Automate to deliver enterprise-grade automation solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Services & Capabilities Section - Implementation Journey */}
        <section style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: 'calc(-50vw)', marginRight: 'calc(-50vw)', padding: '100px 20px', background: '#ffffff', marginBottom: '80px' }}>
          <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>IMPLEMENTATION JOURNEY</div>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '400',
            color: '#010B1D',
            marginBottom: '60px',
            textAlign: 'center',
            maxWidth: '1200px',
            margin: '0 auto 60px'
          }}
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="false">
            Your RPA <strong>Implementation Journey</strong>
          </h2>

          {/* Horizontal Stepper */}
          <div style={{
            position: 'relative',
            maxWidth: '1100px',
            margin: '0 auto',
            paddingBottom: '30px'
          }}>
            {/* Connecting line */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '60px',
              right: '60px',
              height: '1px',
              background: '#DCDCDC',
              zIndex: 0
            }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '15px',
              position: 'relative',
              zIndex: 1
            }}>
              {[
                {
                  phase: '01',
                  title: 'Assessment',
                  description: 'Evaluate processes and spot high-impact automation opportunities',
                  duration: '2-4 weeks'
                },
                {
                  phase: '02',
                  title: 'Planning',
                  description: 'Develop roadmap, set priorities and establish governance framework',
                  duration: '2-3 weeks'
                },
                {
                  phase: '03',
                  title: 'Build',
                  description: 'Design and develop bots with UiPath or Power Automate',
                  duration: 'Variable'
                },
                {
                  phase: '04',
                  title: 'Deploy',
                  description: 'Test, validate and deploy bots to production environment',
                  duration: '1-2 weeks'
                },
                {
                  phase: '05',
                  title: 'Train',
                  description: 'Establish CoE, train teams and build internal capability',
                  duration: 'Ongoing'
                },
                {
                  phase: '06',
                  title: 'Optimize',
                  description: '24/7 monitoring, optimization and continuous improvement',
                  duration: 'Ongoing'
                }
              ].map((stage, idx) => {
                const StepIcon = journeyIcons[idx];
                return (
                <div
                  key={idx}
                  style={{
                    textAlign: 'center'
                  }}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  data-aos-duration="1000"
                  data-aos-once="false"
                >
                  {/* Numbered Circle */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#185ADB',
                    margin: '0 auto 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '14px'
                  }}>
                    {stage.phase}
                  </div>

                  {/* Content Box */}
                  <div style={{
                    padding: '36px 20px',
                    background: '#ffffff',
                    borderRadius: '20px',
                    border: '1px solid #DCDCDC',
                    minHeight: '240px',
                    height: '240px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#185ADB';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(24, 90, 219, 0.08)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#DCDCDC';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                      <StepIcon size={24} color="#185ADB" />
                    </div>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#185ADB',
                      margin: '0 0 10px 0'
                    }}>
                      {stage.title}
                    </h4>
                    <p style={{
                      fontSize: '12px',
                      color: '#444444',
                      margin: '0 0 12px 0',
                      lineHeight: '1.5'
                    }}>
                      {stage.description}
                    </p>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#6b7280',
                      paddingTop: '10px',
                      borderTop: '1px solid #DCDCDC'
                    }}>
                      {stage.duration}
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section - Before/After Comparison */}
        <section style={{ marginBottom: '0', width: '100%', padding: '100px 20px', background: '#F1F7F3' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-tag" style={{ textAlign: 'center' }}>BUSINESS IMPACT</div>
            <h2 style={{
              fontSize: '40px',
              fontWeight: '400',
              color: '#010B1D',
              margin: '16px 0 10px'
            }}>
              <strong>Manual</strong> vs <strong>Automated</strong>
            </h2>
            <p style={{
              margin: '0 auto',
              maxWidth: '720px',
              color: '#444444',
              fontSize: '16px',
              lineHeight: '1.7'
            }}>
              A clear side-by-side comparison of outcomes before and after automation.
            </p>
          </div>

          {/* Before/After Comparison - Side by Side */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '50px',
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            alignItems: 'stretch',
            justifyContent: 'center'
          }}
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="800"
          data-aos-once="false">

            {/* BEFORE - Manual Processes */}
            <div style={{
              padding: '36px',
              background: '#F9FAFB',
              borderRadius: '20px',
              border: '1px solid #DCDCDC',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#185ADB';
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(24, 90, 219, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#DCDCDC';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <h3 style={{
                fontSize: '26px',
                fontWeight: '400',
                color: '#010B1D',
                marginBottom: '24px',
                marginTop: '0'
              }}>
                Before: <strong>Manual Processes</strong>
              </h3>
              <div style={{
                display: 'grid',
                gap: '20px',
                flex: 1
              }}>
                {[
                  { metric: 'Processing Time', value: '8-10 hours/day' },
                  { metric: 'Error Rate', value: '5-10% manual errors' },
                  { metric: 'Availability', value: '9-5 business hours' },
                  { metric: 'Cost/Month', value: '$15,000-20,000' },
                  { metric: 'Scalability', value: 'Limited by headcount' },
                  { metric: 'Employee Satisfaction', value: 'Repetitive, low morale' }
                ].map((item, idx) => {
                  const BeforeIcon = beforeIcons[idx];
                  return (
                  <div key={idx} style={{
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: '#ffffff',
                      border: '1px solid #DCDCDC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <BeforeIcon size={18} color="#9ca3af" />
                    </div>
                    <div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#6b7280'
                      }}>
                        {item.metric}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#444444'
                      }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            {/* AFTER - RPA Automation */}
            <div style={{
              padding: '36px',
              background: '#EFF6FF',
              borderRadius: '20px',
              border: '1px solid #DCDCDC',
              borderLeft: '4px solid #185ADB',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#185ADB';
              e.currentTarget.style.borderLeftWidth = '4px';
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(24, 90, 219, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#DCDCDC';
              e.currentTarget.style.borderLeftColor = '#185ADB';
              e.currentTarget.style.borderLeftWidth = '4px';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <h3 style={{
                fontSize: '26px',
                fontWeight: '400',
                color: '#010B1D',
                marginBottom: '24px',
                marginTop: '0'
              }}>
                After: <strong>Automated Processes</strong>
              </h3>
              <div style={{
                display: 'grid',
                gap: '20px',
                flex: 1
              }}>
                {[
                  { metric: 'Processing Time', value: 'Minutes not hours', improvement: '90% faster' },
                  { metric: 'Error Rate', value: '< 0.1% errors', improvement: '99% reduction' },
                  { metric: 'Availability', value: '24/7 without breaks', improvement: '100% uptime' },
                  { metric: 'Cost/Month', value: '$2,000-3,000', improvement: '85% savings' },
                  { metric: 'Scalability', value: 'Unlimited, add bots', improvement: 'Linear scale' },
                  { metric: 'Employee Satisfaction', value: 'Strategic, high-value work', improvement: 'Empowered' }
                ].map((item, idx) => {
                  const AfterIcon = afterIcons[idx];
                  return (
                  <div key={idx} style={{
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: '#ffffff',
                      border: '1px solid #DCDCDC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <AfterIcon size={18} color="#185ADB" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#185ADB'
                      }}>
                        {item.metric}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#010B1D'
                      }}>
                        {item.value}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#185ADB',
                        marginTop: '4px'
                      }}>
                        {item.improvement}
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Industry Use Cases Section - Process-Based Scenarios */}
        <section style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: 'calc(-50vw)', marginRight: 'calc(-50vw)', padding: '100px 20px', background: '#ffffff', marginBottom: '80px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>USE CASES</div>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '400',
              color: '#010B1D',
              marginBottom: '80px',
              textAlign: 'center'
            }}
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-once="false">
              Real-World <strong>Automation Scenarios</strong>
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '40px',
              maxWidth: '1100px',
              margin: '0 auto'
            }}>
              {[
                {
                  industry: 'Finance & Accounting',
                  color: '#185ADB',
                  scenario: 'Invoice Processing',
                  process: [
                    { step: 'Receive', desc: 'Bot captures invoices from email/portal' },
                    { step: 'Extract', desc: 'OCR extracts data: amount, vendor, PO' },
                    { step: 'Validate', desc: 'Cross-check with POs and receipts' },
                    { step: 'Post', desc: 'Auto-post to accounting system' }
                  ],
                  impact: 'Process 500+ invoices/month | 95% time saved | 99.8% accuracy'
                },
                {
                  industry: 'Human Resources',
                  color: '#0D9488',
                  scenario: 'Employee Onboarding',
                  process: [
                    { step: 'Collect', desc: 'Bot gathers employee data & documents' },
                    { step: 'Create', desc: 'Creates accounts (email, systems, tools)' },
                    { step: 'Register', desc: 'Registers for benefits & training' },
                    { step: 'Notify', desc: 'Sends welcome emails & resources' }
                  ],
                  impact: 'Onboard employees 5x faster | 100% consistency | Day-1 productivity'
                },
                {
                  industry: 'Supply Chain',
                  color: '#185ADB',
                  scenario: 'Order-to-Cash Process',
                  process: [
                    { step: 'Receive', desc: 'Bot retrieves orders from portals/APIs' },
                    { step: 'Process', desc: 'Validates inventory & customer data' },
                    { step: 'Fulfill', desc: 'Updates warehouse & shipping systems' },
                    { step: 'Invoice', desc: 'Auto-generates & sends invoice' }
                  ],
                  impact: '24/7 order processing | 2-hour cycle time | 40% cost reduction'
                },
                {
                  industry: 'Compliance & Audit',
                  color: '#0D9488',
                  scenario: 'Regulatory Reporting',
                  process: [
                    { step: 'Extract', desc: 'Bot pulls data from multiple systems' },
                    { step: 'Validate', desc: 'Checks data against compliance rules' },
                    { step: 'Format', desc: 'Creates regulatory-compliant reports' },
                    { step: 'File', desc: 'Submits to regulatory bodies' }
                  ],
                  impact: 'Reports generated 80% faster | Zero manual errors | Full audit trail'
                }
              ].map((useCase, idx) => {
                const CaseIcon = useCaseIcons[idx];
                return (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 150}
                  data-aos-duration="1000"
                  data-aos-once="false"
                  style={{
                    padding: '36px',
                    background: '#ffffff',
                    border: '1px solid #DCDCDC',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#185ADB';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(24, 90, 219, 0.08)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#DCDCDC';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '40px',
                    alignItems: 'start'
                  }}>
                    {/* Left: Header & Info */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          background: '#EFF6FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <CaseIcon size={24} color={useCase.color} />
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: useCase.color, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {useCase.industry}
                          </div>
                          <div style={{ fontSize: '24px', fontWeight: '700', color: '#010B1D', marginTop: '4px' }}>
                            {useCase.scenario}
                          </div>
                        </div>
                      </div>

                      {/* Impact Highlight */}
                      <div style={{
                        padding: '15px',
                        background: '#F1F7F3',
                        borderRadius: '12px',
                        border: '1px solid #DCDCDC',
                        marginTop: '20px'
                      }}>
                        <div style={{ fontSize: '11px', fontWeight: '700', color: useCase.color, textTransform: 'uppercase', marginBottom: '8px' }}>
                          Business Impact
                        </div>
                        <div style={{ fontSize: '13px', color: '#444444', lineHeight: '1.6' }}>
                          {useCase.impact}
                        </div>
                      </div>
                    </div>

                    {/* Right: Process Flow */}
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '15px' }}>
                        Automation Workflow
                      </div>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        {useCase.process.map((step, sidx) => (
                          <div key={sidx} style={{ display: 'grid', gridTemplateColumns: '50px 1fr', gap: '12px', alignItems: 'flex-start' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: '#EFF6FF',
                              border: '1px solid #DCDCDC',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: '700',
                              color: useCase.color,
                              fontSize: '12px'
                            }}>
                              {sidx + 1}
                            </div>
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: '700', color: useCase.color }}>
                                {step.step}
                              </div>
                              <div style={{ fontSize: '12px', color: '#444444', marginTop: '2px' }}>
                                {step.desc}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Metrics & Proof Section */}
        <section style={{ marginBottom: '80px' }}>
          <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>TRACK RECORD</div>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '400',
            color: '#010B1D',
            marginBottom: '50px',
            textAlign: 'center'
          }}>
            Our <strong>Track Record</strong>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '35px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {[
              {
                number: '400+',
                label: 'Robots Deployed',
                description: 'Successfully deployed over 400 intelligent automation solutions across various industries and use cases.'
              },
              {
                number: '45+',
                label: 'Customers Served',
                description: 'Trusted by 45+ leading organizations including Fortune 500 companies and emerging enterprises.'
              },
              {
                number: '15',
                label: 'Countries',
                description: 'Global presence with successful implementations across 15 countries spanning multiple regions.'
              }
            ].map((metric, idx) => (
              <div
                key={idx}
                style={{
                  padding: '36px',
                  background: '#ffffff',
                  borderRadius: '20px',
                  textAlign: 'center',
                  border: '1px solid #DCDCDC',
                  transition: 'all 0.3s ease',
                  animation: isVisible ? `slideUp 0.8s ease-out ${idx * 0.15}s both` : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#185ADB';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(24, 90, 219, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#DCDCDC';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: '#185ADB',
                  margin: '0 0 10px 0'
                }}>
                  {metric.number}
                </div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#010B1D',
                  margin: '0 0 12px 0'
                }}>
                  {metric.label}
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#444444',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* CTA Section */}
      <ReadyToStartCTA />

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
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
      `}</style>

      <ConsultationForm />
    </div>
  );
}
