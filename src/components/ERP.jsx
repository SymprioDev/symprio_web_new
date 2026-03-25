import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FAQSection from './FAQSection';
import ConsultationForm from './ConsultationForm';

/* ── SVG Icon helpers ── */
const SvgIcon = ({ children, size = 24, color = 'currentColor', style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}>
    {children}
  </svg>
);

const IconSettings = (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></SvgIcon>;
const IconWallet = (p) => <SvgIcon {...p}><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></SvgIcon>;
const IconPackage = (p) => <SvgIcon {...p}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></SvgIcon>;
const IconUsers = (p) => <SvgIcon {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></SvgIcon>;
const IconFactory = (p) => <SvgIcon {...p}><path d="M2 20h20"/><path d="M5 20V8l5 4V8l5 4V4h3a2 2 0 0 1 2 2v14"/><path d="M8 14h0"/><path d="M8 18h0"/><path d="M14 14h0"/><path d="M14 18h0"/></SvgIcon>;

/* Legacy comparison icons */
const IconClock = (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></SvgIcon>;
const IconEdit = (p) => <SvgIcon {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></SvgIcon>;
const IconLock = (p) => <SvgIcon {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></SvgIcon>;
const IconDollarSign = (p) => <SvgIcon {...p}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></SvgIcon>;
const IconBarChart = (p) => <SvgIcon {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></SvgIcon>;
const IconAlertTriangle = (p) => <SvgIcon {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></SvgIcon>;

/* Oracle comparison icons */
const IconZap = (p) => <SvgIcon {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></SvgIcon>;
const IconCheck = (p) => <SvgIcon {...p}><polyline points="20 6 9 17 4 12"/></SvgIcon>;
const IconEye = (p) => <SvgIcon {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></SvgIcon>;
const IconCoinStack = (p) => <SvgIcon {...p}><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><line x1="7" y1="6" x2="7.01" y2="6"/><line x1="14" y1="12" x2="14.01" y2="12"/></SvgIcon>;
const IconGlobe = (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></SvgIcon>;
const IconTrendUp = (p) => <SvgIcon {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></SvgIcon>;

/* Industry icons */
const IconTruck = (p) => <SvgIcon {...p}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></SvgIcon>;
const IconBank = (p) => <SvgIcon {...p}><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 8 4 8"/></SvgIcon>;
const IconHeart = (p) => <SvgIcon {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></SvgIcon>;

/* X icon for legacy items */
const IconX = (p) => <SvgIcon {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></SvgIcon>;

const moduleIcons = [IconSettings, IconWallet, IconPackage, IconUsers, IconFactory];
const legacyIcons = [IconClock, IconEdit, IconLock, IconDollarSign, IconBarChart, IconAlertTriangle];
const oracleIcons = [IconZap, IconCheck, IconEye, IconCoinStack, IconGlobe, IconTrendUp];
const industryIcons = [IconFactory, IconTruck, IconBank, IconHeart];

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
          <span style={{ color: '#185ADB' }}>ERP & Oracle</span>
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
            <div className="section-tag">Why Oracle Cloud</div>
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
        padding: '100px 20px',
        background: '#F1F7F3'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-tag">Module Stack</div>
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
              modules: ['Oracle Cloud Infrastructure', 'Multi-Entity Consolidation', 'Global Consolidation System'],
              color: '#185ADB'
            },
            {
              layer: 'Financial Management',
              modules: ['General Ledger', 'Accounts Payable', 'Accounts Receivable', 'Cash Management'],
              color: '#0D9488'
            },
            {
              layer: 'Supply Chain',
              modules: ['Inventory', 'Procurement', 'Logistics', 'Demand Planning'],
              color: '#185ADB'
            },
            {
              layer: 'Human Capital',
              modules: ['Payroll', 'Talent Management', 'HR Analytics', 'Workforce Planning'],
              color: '#0D9488'
            },
            {
              layer: 'Manufacturing & Analytics',
              modules: ['Manufacturing Cloud', 'Business Analytics', 'Advanced Reporting', 'BI Integration'],
              color: '#185ADB'
            }
          ].map((layer, idx) => {
            const ModIcon = moduleIcons[idx];
            return (
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
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(24, 90, 219, 0.08)';
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
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <ModIcon size={24} color={layer.color} />
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
                          color: '#185ADB',
                          background: '#EFF6FF',
                          padding: '6px 14px',
                          borderRadius: '8px',
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
            );
          })}
        </div>
        </div>
      </section>

      {/* Before/After Transformation */}
      <section style={{
        padding: '100px 20px',
        background: '#ffffff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-tag">Comparison</div>
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
              color: '#010B1D',
              marginBottom: '40px',
              paddingBottom: '20px',
              borderBottom: '2px solid #DCDCDC'
            }} data-aos="fade-right">
              Legacy ERP Systems
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { metric: '15-20 days', label: 'Financial Close Cycle' },
                { metric: '30-40% Manual', label: 'Reconciliation Work' },
                { metric: 'Siloed Data', label: 'No Real-time Visibility' },
                { metric: 'High Cost', label: 'Maintenance & Support' },
                { metric: 'Limited Scale', label: 'Multi-entity Challenges' },
                { metric: 'Slow Updates', label: 'Delayed Business Insights' }
              ].map((item, idx) => {
                const LegIcon = legacyIcons[idx];
                return (
                <div
                  key={idx}
                  data-aos="fade-right"
                  data-aos-delay={idx * 80}
                  style={{
                    padding: '20px',
                    background: '#F9FAFB',
                    border: '1px solid #DCDCDC',
                    borderRadius: '20px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
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
                      <IconX size={16} color="#9ca3af" />
                    </div>
                    <div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#444444'
                      }}>
                        {item.metric}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: '#6b7280'
                      }}>
                        {item.label}
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          {/* Oracle ERP - Right */}
          <div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#185ADB',
              marginBottom: '40px',
              paddingBottom: '20px',
              borderBottom: '2px solid #DCDCDC'
            }} data-aos="fade-left">
              Oracle Cloud ERP
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { metric: '3-5 days', label: 'Financial Close Cycle', improvement: '-75%' },
                { metric: '98%+ Automated', label: 'Reconciliation Accuracy', improvement: '+98%' },
                { metric: 'Real-time Data', label: 'Live Business Visibility', improvement: '24/7' },
                { metric: 'Optimized Cost', label: 'Cloud-based Efficiency', improvement: '-40%' },
                { metric: 'Global Scale', label: 'Multi-entity Consolidation', improvement: 'Yes' },
                { metric: 'Instant Updates', label: 'Predictive Analytics', improvement: 'Live' }
              ].map((item, idx) => {
                const OraIcon = oracleIcons[idx];
                return (
                <div
                  key={idx}
                  data-aos="fade-left"
                  data-aos-delay={idx * 80}
                  style={{
                    padding: '20px',
                    background: '#EFF6FF',
                    border: '1px solid #DCDCDC',
                    borderLeft: '4px solid #185ADB',
                    borderRadius: '20px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
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
                      <IconCheck size={16} color="#185ADB" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#185ADB'
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
                      color: '#185ADB',
                      background: '#ffffff',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: '1px solid #DCDCDC',
                      whiteSpace: 'nowrap'
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

      {/* Industry-Specific Use Cases */}
      <section style={{
        padding: '100px 20px',
        background: '#F1F7F3'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-tag">Industries</div>
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
              challenges: ['Multi-site Operations', 'Complex BOM Management', 'Production Planning'],
              solution: 'Oracle Manufacturing Cloud with integrated planning, costing, and supply chain optimization across global facilities.'
            },
            {
              industry: 'Distribution & Logistics',
              challenges: ['Inventory Across Locations', 'Order Fulfillment', 'Demand Forecasting'],
              solution: 'SCM modules with real-time inventory visibility, automated replenishment, and demand-driven planning.'
            },
            {
              industry: 'Financial Services',
              challenges: ['Regulatory Compliance', 'Multi-entity Consolidation', 'Real-time Reporting'],
              solution: 'Oracle ERP with GCS, multi-dimensional accounting, and integrated compliance/audit workflows.'
            },
            {
              industry: 'Healthcare',
              challenges: ['Patient Billing', 'Supply Chain', 'Budget Management'],
              solution: 'Healthcare-specific ERP with patient accounting, materials management, and outcome-based analytics.'
            }
          ].map((useCase, idx) => {
            const IndIcon = industryIcons[idx];
            return (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '40px',
                alignItems: 'center',
                padding: '36px',
                background: '#ffffff',
                border: '1px solid #DCDCDC',
                borderRadius: '20px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(24, 90, 219, 0.08)';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = '#185ADB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#DCDCDC';
              }}
            >
              {/* Left: Icon + Title + Challenges */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '25px'
                }}>
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
                    <IndIcon size={24} color="#185ADB" />
                  </div>
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

              {/* Right: Solution */}
              <div style={{
                padding: '25px',
                background: '#F1F7F3',
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
            </div>
            );
          })}
        </div>
        </div>
      </section>

      {/* Success Story */}
      <section style={{
        padding: '100px 20px',
        background: '#ffffff'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div
          data-aos="fade-up"
          style={{
            padding: '50px 40px',
            background: '#F9FAFB',
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
                padding: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #DCDCDC',
                borderLeft: '4px solid #185ADB',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#185ADB';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(24, 90, 219, 0.08)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#DCDCDC';
                e.currentTarget.style.borderLeftColor = '#185ADB';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
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
        </div>
      </section>

      <FAQSection faqs={erpFaqs} />

      <ConsultationForm />
    </div>
  );
}
