import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReadyToStartCTA from './ReadyToStartCTA';
import ConsultationForm from './ConsultationForm';

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

          {/* Connected Journey Timeline */}
          <div style={{
            position: 'relative',
            maxWidth: '1200px',
            margin: '0 auto',
            paddingBottom: '30px'
          }}>

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
                  icon: '🔍',
                  description: 'Evaluate processes and spot high-impact automation opportunities',
                  duration: '2-4 weeks'
                },
                {
                  phase: '02',
                  title: 'Planning',
                  icon: '📋',
                  description: 'Develop roadmap, set priorities and establish governance framework',
                  duration: '2-3 weeks'
                },
                {
                  phase: '03',
                  title: 'Build',
                  icon: '🤖',
                  description: 'Design and develop bots with UiPath or Power Automate',
                  duration: 'Variable'
                },
                {
                  phase: '04',
                  title: 'Deploy',
                  icon: '🚀',
                  description: 'Test, validate and deploy bots to production environment',
                  duration: '1-2 weeks'
                },
                {
                  phase: '05',
                  title: 'Train',
                  icon: '📚',
                  description: 'Establish CoE, train teams and build internal capability',
                  duration: 'Ongoing'
                },
                {
                  phase: '06',
                  title: 'Optimize',
                  icon: '📊',
                  description: '24/7 monitoring, optimization and continuous improvement',
                  duration: 'Ongoing'
                }
              ].map((stage, idx) => (
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
                {/* Phase Dot */}
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: '#185ADB',
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '800',
                  fontSize: '16px',
                  boxShadow: '0 10px 30px rgba(24, 90, 219, 0.3)'
                }}>
                  {stage.phase}
                </div>

                {/* Content Box */}
                <div style={{
                  padding: '20px',
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
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(24, 90, 219, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#DCDCDC';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '10px' }}>{stage.icon}</div>
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
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section - Before/After Comparison */}
        <section style={{ marginBottom: '0', width: '100%', padding: '100px 20px', background: '#f8f9fa' }}>
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
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #DCDCDC',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
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
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)';
            }}>
              <h3 style={{
                fontSize: '26px',
                fontWeight: '400',
                color: '#991b1b',
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
                  { metric: 'Processing Time', value: '8-10 hours/day', icon: '⏱️' },
                  { metric: 'Error Rate', value: '5-10% manual errors', icon: '🔴' },
                  { metric: 'Availability', value: '9-5 business hours', icon: '📅' },
                  { metric: 'Cost/Month', value: '$15,000-20,000', icon: '💸' },
                  { metric: 'Scalability', value: 'Limited by headcount', icon: '📉' },
                  { metric: 'Employee Satisfaction', value: 'Repetitive, low morale', icon: '😕' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{ fontSize: '24px' }}>{item.icon}</div>
                    <div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#7f1d1d'
                      }}>
                        {item.metric}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#991b1b'
                      }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AFTER - RPA Automation */}
            <div style={{
              padding: '36px',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #DCDCDC',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
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
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)';
            }}>
              <h3 style={{
                fontSize: '26px',
                fontWeight: '400',
                color: '#166534',
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
                  { metric: 'Processing Time', value: 'Minutes not hours', icon: '⚡', improvement: '90% faster' },
                  { metric: 'Error Rate', value: '< 0.1% errors', icon: '✓', improvement: '99% reduction' },
                  { metric: 'Availability', value: '24/7 without breaks', icon: '🌍', improvement: '100% uptime' },
                  { metric: 'Cost/Month', value: '$2,000-3,000', icon: '💰', improvement: '85% savings' },
                  { metric: 'Scalability', value: 'Unlimited, add bots', icon: '📈', improvement: 'Linear scale' },
                  { metric: 'Employee Satisfaction', value: 'Strategic, high-value work', icon: '😊', improvement: 'Empowered' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{ fontSize: '24px' }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#166534'
                      }}>
                        {item.metric}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#15803d'
                      }}>
                        {item.value}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#22c55e',
                        marginTop: '4px'
                      }}>
                        {item.improvement}
                      </div>
                    </div>
                  </div>
                ))}
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
                  icon: '💰',
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
                  icon: '👥',
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
                  icon: '📦',
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
                  icon: '⚖️',
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
              ].map((useCase, idx) => (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 150}
                  data-aos-duration="1000"
                  data-aos-once="false"
                  style={{
                    padding: '40px',
                    background: '#ffffff',
                    border: '1px solid #DCDCDC',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#185ADB';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(24, 90, 219, 0.12)';
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
                        <div style={{ fontSize: '40px' }}>{useCase.icon}</div>
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
                        background: '#f8f9fa',
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
                              background: '#f8f9fa',
                              border: '2px solid #DCDCDC',
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
              ))}
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
                  padding: '35px',
                  background: '#ffffff',
                  borderRadius: '20px',
                  textAlign: 'center',
                  border: '1px solid #DCDCDC',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  animation: isVisible ? `slideUp 0.8s ease-out ${idx * 0.15}s both` : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#185ADB';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(24, 90, 219, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#DCDCDC';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)';
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
