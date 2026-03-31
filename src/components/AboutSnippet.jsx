import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const checklist = [
  'RPA executes tasks — automate repetitive processes instantly',
  'AI supports decisions — data-driven insights at scale',
  'Agentic AI runs operations — autonomous end-to-end workflows',
  'Enterprise-focused — built for large organizations',
  'Global delivery — Silicon Valley, Singapore, Malaysia, India',
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
      flex: isMobile ? 'unset' : '0 0 580px',
      width: isMobile ? '100%' : '580px',
    },
    imageWrapper: {
      width: '100%',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
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
            We Build Your{' '}
            <em className="accent-text" style={{fontWeight:'400'}}>AI-Powered Digital Workforce</em>
          </h2>

          <p style={styles.body} data-aos="fade-up" data-aos-delay="150">
            Symprio is an AI-powered Digital Workforce consultancy for enterprises. We combine RPA for task automation, AI for decision support, and Agentic AI for autonomous operations — creating digital workers that work 24/7, scale instantly, and deliver measurable ROI. With offices in Silicon Valley and across the Indo-Pacific — Singapore, Malaysia, India — we bring global innovation and local insight to every engagement.
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

        {/* Right Column — Image */}
        <div style={styles.rightCol} data-aos="fade-up" data-aos-delay="100">
          <div style={styles.imageWrapper}>
            <img
              src="/assets/service%20images/about-bg.jpg"
              alt="Symprio Team"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
