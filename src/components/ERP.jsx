import FAQSection from './FAQSection';

const erpFaqs = [
  {
    q: 'Why should we choose Oracle Cloud ERP over our legacy on-premise system?',
    a: 'Oracle Cloud ERP offers automatic quarterly updates, superior mobile access, and advanced AI-driven analytics that on-premise systems can’t match, all while reducing total cost of ownership by up to 40%.'
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
        backgroundImage: `linear-gradient(135deg, rgba(10, 45, 110, 0.8) 0%, rgba(184, 134, 11, 0.4) 100%), url('/assets/images/erp-oracle.jpg')`,
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
            ERP & <span style={{ color: '#FFD700' }}>Oracle</span> Solutions
          </h1>
          <p style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.9)',
            margin: '0 auto',
            fontWeight: '500',
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
          borderRadius: '32px',
          padding: '80px 60px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
          border: '1px solid rgba(0,0,0,0.05)'
        }} data-aos="fade-up">
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '900',
              color: 'var(--primary)',
              margin: '0 0 24px 0',
              lineHeight: '1.2'
            }}>
              Oracle Cloud <span className="gradient-text">Excellence</span>
            </h2>
            <div style={{
              width: '80px',
              height: '6px',
              background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)',
              margin: '30px auto',
              borderRadius: '3px'
            }}/>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#4b5563',
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
        padding: '80px 20px'
      }}>
        <h2 style={{
          fontSize: '44px',
          fontWeight: '800',
          color: '#1f2937',
          margin: '0 0 15px 0',
          textAlign: 'center'
        }} data-aos="fade-up">
          Oracle ERP Module Stack
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto 60px',
          lineHeight: '1.6'
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
              icon: '⚙️',
              modules: ['Oracle Cloud Infrastructure', 'Multi-Entity Consolidation', 'Global Consolidation System'],
              color: '#0891b2',
              bgColor: '#dbeafe'
            },
            {
              layer: 'Financial Management',
              icon: '💰',
              modules: ['General Ledger', 'Accounts Payable', 'Accounts Receivable', 'Cash Management'],
              color: '#10b981',
              bgColor: '#dcfce7'
            },
            {
              layer: 'Supply Chain',
              icon: '📦',
              modules: ['Inventory', 'Procurement', 'Logistics', 'Demand Planning'],
              color: '#f59e0b',
              bgColor: '#fef3c7'
            },
            {
              layer: 'Human Capital',
              icon: '👥',
              modules: ['Payroll', 'Talent Management', 'HR Analytics', 'Workforce Planning'],
              color: '#8b5cf6',
              bgColor: '#f3e8ff'
            },
            {
              layer: 'Manufacturing & Analytics',
              icon: '🏭',
              modules: ['Manufacturing Cloud', 'Business Analytics', 'Advanced Reporting', 'BI Integration'],
              color: '#ec4899',
              bgColor: '#ffe4e6'
            }
          ].map((layer, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              style={{
                padding: '30px 40px',
                background: layer.bgColor,
                border: `3px solid ${layer.color}`,
                borderRadius: '12px',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(20px)';
                e.currentTarget.style.boxShadow = `0 20px 50px ${layer.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
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
                    fontWeight: '800',
                    color: layer.color,
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
                          fontWeight: '700',
                          color: '#ffffff',
                          background: layer.color,
                          padding: '6px 14px',
                          borderRadius: '12px',
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
        padding: '80px 20px',
        marginBottom: '80px'
      }}>
        <h2 style={{
          fontSize: '44px',
          fontWeight: '800',
          color: '#1f2937',
          margin: '0 0 15px 0',
          textAlign: 'center'
        }} data-aos="fade-up">
          Legacy vs. Oracle ERP
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto 60px',
          lineHeight: '1.6'
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
              fontWeight: '800',
              color: '#ef4444',
              marginBottom: '40px',
              paddingBottom: '20px',
              borderBottom: '3px solid #fee2e2'
            }} data-aos="fade-right">
              Legacy ERP Systems
            </h3>
            <div style={{ display: 'grid', gap: '20px' }}>
              {[
                { metric: '15-20 days', label: 'Financial Close Cycle', icon: '⏱️' },
                { metric: '30-40% Manual', label: 'Reconciliation Work', icon: '📝' },
                { metric: 'Siloed Data', label: 'No Real-time Visibility', icon: '🔒' },
                { metric: 'High Cost', label: 'Maintenance & Support', icon: '💸' },
                { metric: 'Limited Scale', label: 'Multi-entity Challenges', icon: '📊' },
                { metric: 'Slow Updates', label: 'Delayed Business Insights', icon: '⚠️' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  data-aos="fade-right"
                  data-aos-delay={idx * 80}
                  style={{
                    padding: '20px',
                    background: '#fef2f2',
                    border: '2px solid #fee2e2',
                    borderRadius: '8px'
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
                        fontWeight: '800',
                        color: '#dc2626'
                      }}>
                        {item.metric}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#991b1b'
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
              fontWeight: '800',
              color: '#10b981',
              marginBottom: '40px',
              paddingBottom: '20px',
              borderBottom: '3px solid #dcfce7'
            }} data-aos="fade-left">
              Oracle Cloud ERP
            </h3>
            <div style={{ display: 'grid', gap: '20px' }}>
              {[
                { metric: '3-5 days', label: 'Financial Close Cycle', icon: '⚡', improvement: '-75%' },
                { metric: '98%+ Automated', label: 'Reconciliation Accuracy', icon: '✓', improvement: '+98%' },
                { metric: 'Real-time Data', label: 'Live Business Visibility', icon: '👁️', improvement: '24/7' },
                { metric: 'Optimized Cost', label: 'Cloud-based Efficiency', icon: '💰', improvement: '-40%' },
                { metric: 'Global Scale', label: 'Multi-entity Consolidation', icon: '🌍', improvement: 'Yes' },
                { metric: 'Instant Updates', label: 'Predictive Analytics', icon: '📈', improvement: 'Live' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  data-aos="fade-left"
                  data-aos-delay={idx * 80}
                  style={{
                    padding: '20px',
                    background: '#f0fdf4',
                    border: '2px solid #dcfce7',
                    borderRadius: '8px'
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
                        fontWeight: '800',
                        color: '#059669'
                      }}>
                        {item.metric}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#047857'
                      }}>
                        {item.label}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      color: '#10b981',
                      background: '#dcfce7',
                      padding: '4px 10px',
                      borderRadius: '6px',
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
        padding: '80px 20px'
      }}>
        <h2 style={{
          fontSize: '44px',
          fontWeight: '800',
          color: '#1f2937',
          margin: '0 0 60px 0',
          textAlign: 'center'
        }} data-aos="fade-up">
          Industry Solutions
        </h2>

        <div style={{
          display: 'grid',
          gap: '30px'
        }}>
          {[
            {
              industry: 'Manufacturing',
              icon: '🏭',
              color: '#f59e0b',
              bgColor: '#fef3c7',
              challenges: ['Multi-site Operations', 'Complex BOM Management', 'Production Planning'],
              solution: 'Oracle Manufacturing Cloud with integrated planning, costing, and supply chain optimization across global facilities.'
            },
            {
              industry: 'Distribution & Logistics',
              icon: '📦',
              color: '#3b82f6',
              bgColor: '#dbeafe',
              challenges: ['Inventory Across Locations', 'Order Fulfillment', 'Demand Forecasting'],
              solution: 'SCM modules with real-time inventory visibility, automated replenishment, and demand-driven planning.'
            },
            {
              industry: 'Financial Services',
              icon: '🏦',
              color: '#10b981',
              bgColor: '#dcfce7',
              challenges: ['Regulatory Compliance', 'Multi-entity Consolidation', 'Real-time Reporting'],
              solution: 'Oracle ERP with GCS, multi-dimensional accounting, and integrated compliance/audit workflows.'
            },
            {
              industry: 'Healthcare',
              icon: '🏥',
              color: '#8b5cf6',
              bgColor: '#f3e8ff',
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
                background: useCase.bgColor,
                border: `3px solid ${useCase.color}`,
                borderRadius: '12px',
                transition: 'all 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 50px ${useCase.color}33`;
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
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
                        fontSize: '26px',
                        fontWeight: '800',
                        color: useCase.color,
                        margin: 0
                      }}>
                        {useCase.industry}
                      </h3>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                      <p style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: useCase.color,
                        margin: '0 0 8px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Key Challenges
                      </p>
                      <ul style={{
                        margin: 0,
                        paddingLeft: '20px',
                        fontSize: '14px',
                        color: '#4b5563',
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
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '8px',
                    border: `2px solid ${useCase.color}33`
                  }}>
                    <p style={{
                      fontSize: '14px',
                      color: '#1f2937',
                      lineHeight: '1.8',
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      <span style={{ color: useCase.color, fontWeight: '800' }}>Our Solution:</span> {useCase.solution}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div style={{
                    padding: '25px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '8px',
                    border: `2px solid ${useCase.color}33`
                  }}>
                    <p style={{
                      fontSize: '14px',
                      color: '#1f2937',
                      lineHeight: '1.8',
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      <span style={{ color: useCase.color, fontWeight: '800' }}>Our Solution:</span> {useCase.solution}
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
                        fontSize: '26px',
                        fontWeight: '800',
                        color: useCase.color,
                        margin: 0
                      }}>
                        {useCase.industry}
                      </h3>
                    </div>
                    <div>
                      <p style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: useCase.color,
                        margin: '0 0 8px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Key Challenges
                      </p>
                      <ul style={{
                        margin: 0,
                        paddingLeft: '20px',
                        fontSize: '14px',
                        color: '#4b5563',
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
        padding: '80px 20px'
      }}>
        <div
          data-aos="fade-up"
          style={{
            padding: '50px 40px',
            background: 'linear-gradient(135deg, rgba(219, 234, 254, 0.5) 0%, rgba(191, 219, 254, 0.3) 100%)',
            borderRadius: '16px',
            border: '2px solid #0891b2',
            boxShadow: '0 10px 30px rgba(8, 145, 178, 0.1)'
          }}
        >
          <h3 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#0c4a6e',
            margin: '0 0 20px 0'
          }}>
            ✨ Case Study: Digital Finance Transformation
          </h3>
          <p style={{
            fontSize: '15px',
            lineHeight: '1.8',
            color: '#374151',
            margin: '0 0 20px 0'
          }}>
            A global manufacturing company with operations across 8 countries faced challenges with legacy ERP systems causing:
          </p>
          <ul style={{
            fontSize: '14px',
            lineHeight: '2',
            color: '#374151',
            margin: '0 0 25px 0',
            paddingLeft: '20px'
          }}>
            <li>15-day financial close cycle across multiple entities</li>
            <li>Manual reconciliation processes prone to errors</li>
            <li>Limited real-time visibility into cash flow</li>
            <li>Compliance challenges across regions</li>
          </ul>
          
          <p style={{
            fontSize: '15px',
            fontWeight: '700',
            color: '#0891b2',
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
                backgroundColor: 'rgba(8, 145, 178, 0.1)',
                borderRadius: '8px',
                borderLeft: '4px solid #0891b2'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#0891b2'
                }}>
                  {result.value}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#4b5563',
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
    </div>
  );
}
