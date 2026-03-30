import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const checklist = [
  'We eliminate manual work across departments',
  'We build AI systems that run operations autonomously',
  'We reduce processing time from days to hours',
  '45+ enterprise clients across 15+ countries',
  'End-to-end delivery from assessment to scale',
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
      padding: '120px 20px',
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
    heading: {
      fontSize: isMobile ? '28px' : '38px',
      fontWeight: '400',
      lineHeight: '1.25',
      color: '#0A2D6E',
      margin: '0 0 24px 0',
    },
    body: {
      fontSize: '16px',
      lineHeight: '1.7',
      color: '#444444',
      margin: '0 0 32px 0',
    },
    checklistWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '40px',
    },
    checklistItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '15px',
      color: '#444444',
      fontWeight: '500',
      lineHeight: '1.5',
    },
    checkDot: {
      flexShrink: '0',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#185ADB',
    },
    rightCol: {
      flex: isMobile ? 'unset' : '0 0 360px',
      width: isMobile ? '100%' : '360px',
    },
    statsCard: {
      background: 'linear-gradient(135deg, #185ADB 0%, #0D9488 100%)',
      borderRadius: '20px',
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
      fontSize: '48px',
      fontWeight: '700',
      color: '#ffffff',
      lineHeight: '1',
      marginBottom: '8px',
      letterSpacing: '-0.02em',
    },
    statLabel: {
      fontSize: '13px',
      fontWeight: '400',
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: '1.4',
      textAlign: 'center',
    },
  };

  const handleCtaClick = () => {
    navigate('/about');
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Left Column */}
        <div style={styles.leftCol} data-aos="fade-up">
          <div className="section-tag">About Us</div>

          <h2 style={styles.heading} data-aos="fade-up" data-aos-delay="100">
            Your AI Transformation{' '}
            <em className="accent-text" style={{fontWeight:'400'}}>Partner.</em>
          </h2>

          <p style={styles.body} data-aos="fade-up" data-aos-delay="150">
            Symprio is not just an automation vendor — we are your strategic AI transformation partner.
            We study your operations, identify bottlenecks, and deploy intelligent automation that
            delivers measurable outcomes. From RPA that executes tasks, to AI that supports decisions,
            to Agentic AI that runs entire operations — we build the digital workforce your business needs.
            With offices in Silicon Valley, Singapore, Malaysia, and India, we bring global expertise
            with local insight.
          </p>

          <div style={styles.checklistWrapper} data-aos="fade-up" data-aos-delay="200">
            {checklist.map((item, index) => (
              <div key={index} style={styles.checklistItem}>
                <span style={styles.checkDot} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <button
            className="btn-pill btn-primary"
            onClick={handleCtaClick}
            data-aos="fade-up"
            data-aos-delay="250"
          >
            Learn More &rarr;
          </button>
        </div>

        {/* Right Column — Stats Card */}
        <div style={styles.rightCol} data-aos="fade-up" data-aos-delay="100">
          <img
            src="/assets/images/about-bg.jpg"
            alt="Symprio Team"
            style={{
              width: '100%',
              borderRadius: '20px',
              marginBottom: '24px',
              objectFit: 'cover',
              maxHeight: '280px'
            }}
          />
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
