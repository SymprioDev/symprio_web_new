import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const checklist = [
  'Consultancy-first, technology-second approach',
  'Microsoft Official Partner for RPA & AI Training',
  '45+ enterprise clients across 15+ countries',
  'Domain-agnostic — we serve any industry',
  'End-to-end delivery from assessment to support',
];

const stats = [
  { value: '45+', label: 'Enterprise Clients' },
  { value: '400+', label: 'Robots Deployed' },
  { value: '15+', label: 'Countries' },
  { value: '50+', label: 'Consultants' },
];

export default function AboutSnippet() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    section: {
      backgroundColor: '#ffffff',
      padding: '100px 20px',
      width: '100%',
      boxSizing: 'border-box',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '48px' : '64px',
      alignItems: isMobile ? 'flex-start' : 'center',
    },
    leftCol: {
      flex: '1 1 0',
      minWidth: 0,
    },
    tag: {
      display: 'inline-block',
      fontSize: '13px',
      fontWeight: '600',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#0D9488',
      backgroundColor: 'rgba(13, 148, 136, 0.08)',
      borderRadius: '999px',
      padding: '5px 14px',
      marginBottom: '20px',
    },
    heading: {
      fontSize: isMobile ? '28px' : '38px',
      fontWeight: '700',
      lineHeight: '1.25',
      color: '#0A2D6E',
      margin: '0 0 24px 0',
    },
    headingAccent: {
      color: '#0D9488',
    },
    body: {
      fontSize: '16px',
      lineHeight: '1.75',
      color: '#374151',
      margin: '0 0 32px 0',
    },
    checklistWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '40px',
    },
    checklistItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      fontSize: '15px',
      color: '#374151',
      lineHeight: '1.5',
    },
    checkIcon: {
      flexShrink: '0',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: 'rgba(13, 148, 136, 0.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1px',
    },
    checkSvg: {
      width: '11px',
      height: '11px',
    },
    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      backgroundColor: '#0A2D6E',
      color: '#ffffff',
      fontWeight: '600',
      fontSize: '15px',
      padding: '13px 28px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'background-color 0.2s ease, transform 0.2s ease',
    },
    rightCol: {
      flex: isMobile ? 'unset' : '0 0 360px',
      width: isMobile ? '100%' : '360px',
    },
    statsCard: {
      background: 'linear-gradient(135deg, #0A2D6E 0%, #0D9488 100%)',
      borderRadius: '16px',
      padding: '40px 32px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
    },
    statItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    statValue: {
      fontSize: '40px',
      fontWeight: '800',
      color: '#ffffff',
      lineHeight: '1',
      marginBottom: '8px',
      letterSpacing: '-0.02em',
    },
    statLabel: {
      fontSize: '13px',
      fontWeight: '500',
      color: 'rgba(255, 255, 255, 0.78)',
      lineHeight: '1.4',
      textAlign: 'center',
    },
  };

  const handleCtaClick = () => {
    navigate('/about');
  };

  const handleCtaMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = '#0077B6';
    e.currentTarget.style.transform = 'translateY(-1px)';
  };

  const handleCtaMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = '#0A2D6E';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Left Column */}
        <div style={styles.leftCol} data-aos="fade-up">
          <span style={styles.tag}>Who We Are</span>

          <h2 style={styles.heading} data-aos="fade-up" data-aos-delay="100">
            We Study Your Business. We Deliver{' '}
            <span style={styles.headingAccent}>Real Results.</span>
          </h2>

          <p style={styles.body} data-aos="fade-up" data-aos-delay="150">
            At Symprio, we believe every business challenge is unique — whether rooted in people,
            processes, or technology. We take a consultative-first approach: study your operations,
            identify inefficiencies, and design tailored AI and automation solutions aligned with
            your culture, budget, and capabilities. With offices in Silicon Valley and across the
            Indo-Pacific — Singapore, Malaysia, India — we bring global innovation and local insight
            to every engagement.
          </p>

          <div style={styles.checklistWrapper} data-aos="fade-up" data-aos-delay="200">
            {checklist.map((item, index) => (
              <div key={index} style={styles.checklistItem}>
                <span style={styles.checkIcon}>
                  <svg
                    style={styles.checkSvg}
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="#0D9488"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <button
            style={styles.ctaButton}
            onClick={handleCtaClick}
            onMouseEnter={handleCtaMouseEnter}
            onMouseLeave={handleCtaMouseLeave}
            data-aos="fade-up"
            data-aos-delay="250"
          >
            Learn More About Us →
          </button>
        </div>

        {/* Right Column — Stats Card */}
        <div style={styles.rightCol} data-aos="fade-up" data-aos-delay="100">
          <div style={styles.statsCard}>
            {stats.map((stat, index) => (
              <div key={index} style={styles.statItem}>
                <span style={styles.statValue}>{stat.value}</span>
                <span style={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
