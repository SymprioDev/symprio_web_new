import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FAQSection from './FAQSection';
import ConsultationForm from './ConsultationForm';

const erpFaqs = [
  {
    q: 'Why should we choose Oracle Cloud ERP over our legacy on-premise system?',
    a: 'Oracle Cloud ERP offers automatic quarterly updates, superior mobile access, and advanced AI-driven analytics that on-premise systems can\u2019t match, all while reducing total cost of ownership by up to 40%.'
  },
  {
    q: 'How does Symprio accelerate ERP implementation?',
    a: 'We use our proprietary "RapidPath" methodology, which includes pre-configured industry templates and automated data migration tools to reduce implementation timelines by 30%.'
  },
  {
    q: 'Do you provide post-implementation support?',
    a: 'Yes. Our Managed Services team provides 24/7 global support, ensuring your systems are always optimized, secure, and compliant with local regulations.'
  }
];

export default function ERP() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
      offset: 100
    });
  }, []);

  return (
    <div style={{ backgroundColor: '#fff', fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Banner */}
      <section style={{
        backgroundImage: `linear-gradient(135deg, rgba(1,11,29,0.75) 0%, rgba(1,11,29,0.75) 100%), url('/assets/images/erp-oracle.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        padding: '120px 20px 160px',
        textAlign: 'center',
        color: '#fff',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '700',
            color: '#ffffff',
            margin: '0 0 24px 0',
            lineHeight: '1.15'
          }} data-aos="fade-up">
            ERP & <span style={{ color: '#0D9488' }}>Oracle</span> Solutions
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.85)',
            margin: '0 auto',
            fontWeight: '400',
            maxWidth: '750px'
          }} data-aos="fade-up" data-aos-delay="100">
            Transforming complex business operations into streamlined, cloud-native powerhouses.
          </p>
        </div>
      </section>

      {/* Overlapping Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '-80px auto 0',
        padding: '0 20px',
        position: 'relative',
        zIndex: 10
      }}>
        <section style={{
          marginBottom: '80px',
          background: '#ffffff',
          borderRadius: '20px',
          padding: '60px 50px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          border: '1px solid #DCDCDC'
        }} data-aos="fade-up">
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>ORACLE CLOUD</div>
            <h2 style={{
              fontSize: '40px',
              fontWeight: '400',
              color: '#010B1D',
              margin: '0 0 24px 0',
              lineHeight: '1.2'
            }}>
              Oracle Cloud <strong>Excellence</strong>
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#444444',
              margin: '0',
              fontWeight: '400'
            }}>
              As an Oracle partner, Symprio delivers end-to-end ERP implementations and cloud transformations. We combine certified expertise with deep industry knowledge to maximize ROI and minimize disruption across your enterprise systems.
            </p>
          </div>
        </section>
      </div>

      {/* ERP Modules Hierarchy - Layered Architecture */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '100px 20px'
      }}>
        <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>MODULE STACK</div>
        <h2 style={{
          fontSize: '40px',
          fontWeight: '400',
          color: '#010B1D',
          margin: '0 0 15px 0',
          textAlign: 'center'
        }} data-aos="fade-up">
          Oracle ERP <strong>Module Stack</strong>
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#444444',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto 60px',
          lineHeight: '1.7'
        }} data-aos="fade-up">
          Complete integration across core business processes, from financial management to supply chain optimization.
        </p>

        <div style={{
          display: 'grid',
          gap: '20px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {[
            {
              layer: 'Core Platform',
              icon: '\u2699\uFE0F',
              modules: ['Oracle Cloud Infrastructure', 'Multi-Entity Consolidation', 'Global Consolidation System'],
              color: '#185ADB'
            },
            {
              layer: 'Financial Management',
              icon: '\uD83D\uDCB0',
              modules: ['General Ledger', 'Accounts Payable', 'Accounts Receivable', 'Cash Management'],
              color: '#0D9488'
            },
            {
              layer: 'Supply Chain',
              icon: '\uD83D\uDCE6',
              modules: ['Inventory', 'Procurement', 'Logistics', 'Demand Planning'],
              color: '#185ADB'
            },
            {
              layer: 'Human Capital',
              icon: '\uD83D\uDC65',
              modules: ['Payroll', 'Talent Management', 'HR Analytics', 'Workforce Planning'],
              color: '#0D9488'
            },
            {
              layer: 'Manufacturing & Analytics',
              icon: '\uD83C\uDFED',
              modules: ['Manufacturing Cloud', 'Business Analytics', 'Advanced Reporting', 'BI Integration'],
              color: '#185ADB'
            }
          ].map((layer, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              style={{
                padding: '30px 40px',
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
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#185ADB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#DCDCDC';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '25px'
              }}>
                <div style={{
                  fontSize: '48px',
                  flexShrink: 0
                }}>
                  {layer.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#010B1D',
                    margin: '0 0 12px 0'
                  }}>
                    {layer.layer}
                  </h3>
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap'
                  }}>
                    {layer.modules.map((module, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#ffffff',
                          background: '#185ADB',
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Before/After Transformation */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '100px 20px',
        marginBottom: '0'
      }}>
        <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>COMPARISON</div>
        <h2 style={{
          fontSize: '40px',
          fontWeight: '400',
          color: '#010B1D',
          margin: '0 0 15px 0',
          textAlign: 'center'
        }} data-aos="fade-up">
          Legacy vs. <strong>Oracle ERP</strong>
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#444444',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto 60px',
          lineHeight: '1.7'
        }} data-aos="fade-up">
          See the dramatic improvements when you modernize to Oracle Cloud ERP.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Legacy Systems - Left */}
          <div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#ef4444',
              marginBottom: '40px',
              paddingBottom: '20px',
              borderBottom: '2px solid #DCDCDC'
            }} data-aos="fade-right">
              Legacy ERP Systems
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { metric: '15-20 days', label: 'Financial Close Cycle', icon: '\u23F1\uFE0F' },
                { metric: '30-40% Manual', label: 'Reconciliation Work', icon: '\uD83D\uDCDD' },
                { metric: 'Siloed Data', label: 'No Real-time Visibility', icon: '\uD83D\uDD12' },
                { metric: 'High Cost', label: 'Maintenance & Support', icon: '\uD83D\uDCB8' },
                { metric: 'Limited Scale', label: 'Multi-entity Challenges', icon: '\uD83D\uDCCA' },
                { metric: 'Slow Updates', label: 'Delayed Business Insights', icon: '\u26A0\uFE0F' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  data-aos="fade-right"
                  data-aos-delay={idx * 80}
                  style={{
                    padding: '20px',
                    background: '#fef2f2',
                    border: '1px solid #DCDCDC',
                    borderRadius: '20px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                  }}>
                    <div style={{ fontSize: '28px' }}>{item.icon}</div>
                    <div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#dc2626'
                      }}>
                        {item.metric}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: '#444444'
                      }}>
                        {item.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Oracle ERP - Right */}
          <div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#0D9488',
              marginBottom: '40px',
              paddingBottom: '20px',
              borderBottom: '2px solid #DCDCDC'
            }} data-aos="fade-left">
              Oracle Cloud ERP
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { metric: '3-5 days', label: 'Financial Close Cycle', icon: '\u26A1', improvement: '-75%' },
                { metric: '98%+ Automated', label: 'Reconciliation Accuracy', icon: '\u2713', improvement: '+98%' },
                { metric: 'Real-time Data', label: 'Live Business Visibility', icon: '\uD83D\uDC41\uFE0F', improvement: '24/7' },
                { metric: 'Optimized Cost', label: 'Cloud-based Efficiency', icon: '\uD83D\uDCB0', improvement: '-40%' },
                { metric: 'Global Scale', label: 'Multi-entity Consolidation', icon: '\uD83C\uDF0D', improvement: 'Yes' },
                { metric: 'Instant Updates', label: 'Predictive Analytics', icon: '\uD83D\uDCC8', improvement: 'Live' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  data-aos="fade-left"
                  data-aos-delay={idx * 80}
                  style={{
                    padding: '20px',
                    background: '#f0fdf4',
                    border: '1px solid #DCDCDC',
                    borderRadius: '20px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                  }}>
                    <div style={{ fontSize: '28px' }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#0D9488'
                      }}>
                        {item.metric}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: '#444444'
                      }}>
                        {item.label}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#0D9488',
                      background: '#f0fdf4',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      border: '1px solid #DCDCDC',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.improvement}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry-Specific Use Cases */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '100px 20px'
      }}>
        <div className="section-tag" style={{ textAlign: 'center', marginBottom: '16px' }}>INDUSTRIES</div>
        <h2 style={{
          fontSize: '40px',
          fontWeight: '400',
          color: '#010B1D',
          margin: '0 0 60px 0',
          textAlign: 'center'
        }} data-aos="fade-up">
          Industry <strong>Solutions</strong>
        </h2>

        <div style={{
          display: 'grid',
          gap: '30px'
        }}>
          {[
            {
              industry: 'Manufacturing',
              icon: '\uD83C\uDFED',
              challenges: ['Multi-site Operations', 'Complex BOM Management', 'Production Planning'],
              solution: 'Oracle Manufacturing Cloud with integrated planning, costing, and supply chain optimization across global facilities.'
            },
            {
              industry: 'Distribution & Logistics',
              icon: '\uD83D\uDCE6',
              challenges: ['Inventory Across Locations', 'Order Fulfillment', 'Demand Forecasting'],
              solution: 'SCM modules with real-time inventory visibility, automated replenishment, and demand-driven planning.'
            },
            {
              industry: 'Financial Services',
              icon: '\uD83C\uDFE6',
              challenges: ['Regulatory Compliance', 'Multi-entity Consolidation', 'Real-time Reporting'],
              solution: 'Oracle ERP with GCS, multi-dimensional accounting, and integrated compliance/audit workflows.'
            },
            {
              industry: 'Healthcare',
              icon: '\uD83C\uDFE5',
              challenges: ['Patient Billing', 'Supply Chain', 'Budget Management'],
              solution: 'Healthcare-specific ERP with patient accounting, materials management, and outcome-based analytics.'
            }
          ].map((useCase, idx) => (
            <div
              key={idx}
              data-aos={idx % 2 === 0 ? 'fade-right' : 'fade-left'}
              data-aos-delay={idx * 100}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '40px',
                alignItems: 'center',
                padding: '40px',
                background: '#ffffff',
                border: '1px solid #DCDCDC',
                borderRadius: '20px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = '#185ADB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#DCDCDC';
              }}
            >
              {idx % 2 === 0 ? (
                <>
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      marginBottom: '25px'
                    }}>
                      <div style={{ fontSize: '44px' }}>{useCase.icon}</div>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#010B1D',
                        margin: 0
                      }}>
                        {useCase.industry}
                      </h3>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                      <p style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#185ADB',
                        margin: '0 0 8px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Key Challenges
                      </p>
                      <ul style={{
                        margin: 0,
                        paddingLeft: '20px',
                        fontSize: '16px',
                        color: '#444444',
                        lineHeight: '1.8'
                      }}>
                        {useCase.challenges.map((challenge, i) => (
                          <li key={i}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div style={{
                    padding: '25px',
                    background: '#f8f9fa',
                    borderRadius: '20px',
                    border: '1px solid #DCDCDC'
                  }}>
                    <p style={{
                      fontSize: '16px',
                      color: '#444444',
                      lineHeight: '1.8',
                      margin: 0
                    }}>
                      <span style={{ color: '#185ADB', fontWeight: '700' }}>Our Solution:</span> {useCase.solution}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div style={{
                    padding: '25px',
                    background: '#f8f9fa',
                    borderRadius: '20px',
                    border: '1px solid #DCDCDC'
                  }}>
                    <p style={{
                      fontSize: '16px',
                      color: '#444444',
                      lineHeight: '1.8',
                      margin: 0
                    }}>
                      <span style={{ color: '#185ADB', fontWeight: '700' }}>Our Solution:</span> {useCase.solution}
                    </p>
                  </div>
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      marginBottom: '25px'
                    }}>
                      <div style={{ fontSize: '44px' }}>{useCase.icon}</div>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#010B1D',
                        margin: 0
                      }}>
                        {useCase.industry}
                      </h3>
                    </div>
                    <div>
                      <p style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#185ADB',
                        margin: '0 0 8px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Key Challenges
                      </p>
                      <ul style={{
                        margin: 0,
                        paddingLeft: '20px',
                        fontSize: '16px',
                        color: '#444444',
                        lineHeight: '1.8'
                      }}>
                        {useCase.challenges.map((challenge, i) => (
                          <li key={i}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Success Story */}
      <section style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 20px 100px'
      }}>
        <div
          data-aos="fade-up"
          style={{
            padding: '50px 40px',
            background: '#f8f9fa',
            borderRadius: '20px',
            border: '1px solid #DCDCDC'
          }}
        >
          <h3 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#010B1D',
            margin: '0 0 20px 0'
          }}>
            Case Study: Digital Finance Transformation
          </h3>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#444444',
            margin: '0 0 20px 0'
          }}>
            A global manufacturing company with operations across 8 countries faced challenges with legacy ERP systems causing:
          </p>
          <ul style={{
            fontSize: '16px',
            lineHeight: '2',
            color: '#444444',
            margin: '0 0 25px 0',
            paddingLeft: '20px'
          }}>
            <li>15-day financial close cycle across multiple entities</li>
            <li>Manual reconciliation processes prone to errors</li>
            <li>Limited real-time visibility into cash flow</li>
            <li>Compliance challenges across regions</li>
          </ul>

          <p style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#185ADB',
            margin: '0 0 15px 0'
          }}>
            Results After Oracle ERP Implementation:
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px'
          }}>
            {[
              { value: '6 days', label: 'Financial Close (from 15 days)' },
              { value: '99.8%', label: 'Automated Reconciliation Accuracy' },
              { value: 'Real-time', label: 'Financial Reporting & Visibility' },
              { value: '$2.3M', label: 'Annual Operational Savings' }
            ].map((result, idx) => (
              <div key={idx} style={{
                padding: '15px',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #DCDCDC',
                borderLeft: '4px solid #185ADB'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#185ADB'
                }}>
                  {result.value}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#444444',
                  marginTop: '5px'
                }}>
                  {result.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={erpFaqs} />

      <ConsultationForm />
    </div>
  );
}
