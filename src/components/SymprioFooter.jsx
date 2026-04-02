import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const industryCaseStudiesUrl = (industry) => `/case-studies?industry=${encodeURIComponent(industry)}#industries`;

export default function SymprioFooter() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribeState, setSubscribeState] = useState({ loading: false, type: '', message: '' });

  const footerSections = [
    {
      title: 'SERVICES',
      links: [
        { name: 'Robotic Process Automation', url: '/services/rpa' },
        { name: 'AI Application Development', url: '/services/ai-development' },
        { name: 'Agentic AI & LLM Solutions', url: '/services/agentic-ai' },
        { name: 'Process Assessment & Consultancy', url: '/services/process-assessment' },
        { name: 'Digital Transformation', url: '/services/digital-transformation' },
        { name: 'ERP & Oracle Services', url: '/services/erp-oracle' },
        { name: 'Custom Software Development', url: '/services/custom-software' },
        { name: 'Digital Workforce', url: '/services/digital-workforce' }
      ]
    },
    {
      title: 'TRAINING',
      links: [
        { name: 'RPA Training', url: '/training/rpa' },
        { name: 'AI & GenAI Training', url: '/training/ai-genai' },
        { name: 'Corporate Workshops', url: '/training/corporate-workshops' }
      ]
    },
    {
      title: 'COMPANY',
      links: [
        { name: 'About Us', url: '/about' },
        { name: 'Case Studies', url: '/case-studies' },
        { name: 'Blog', url: '/blog' },
        { name: 'Careers', url: '/careers' },
        { name: 'Contact Us', url: '/contact' },
        { name: 'Staff Login', url: '/admin' }
      ]
    },
    {
      title: 'INDUSTRIES',
      links: [
        { name: 'Banking & Finance', url: industryCaseStudiesUrl('Banking & Finance') },
        { name: 'Insurance', url: industryCaseStudiesUrl('Insurance') },
        { name: 'Fintech', url: industryCaseStudiesUrl('Fintech') },
        { name: 'Healthcare', url: industryCaseStudiesUrl('Healthcare') },
        { name: 'Telecom', url: industryCaseStudiesUrl('Telecom') },
        { name: 'Manufacturing', url: industryCaseStudiesUrl('Manufacturing') },
        { name: 'Retail', url: industryCaseStudiesUrl('Retail') },
        { name: 'Government', url: industryCaseStudiesUrl('Government') }
      ]
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    const submit = async () => {
      setSubscribeState({ loading: true, type: '', message: '' });

      try {
        const response = await fetch('/api/newsletter-subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, source: 'footer' })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data.message || 'Failed to subscribe');
        }

        setEmail('');
        setSubscribeState({
          loading: false,
          type: 'success',
          message: 'You are subscribed to our newsletter.'
        });
      } catch (error) {
        setSubscribeState({
          loading: false,
          type: 'error',
          message: error.message || 'Subscription failed. Please try again.'
        });
      }
    };

    submit();
  };

  return (
    <footer style={{
      background: '#010B1D',
      color: '#e5e7eb',
      padding: '80px 20px 40px',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Newsletter Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '60px',
          paddingBottom: '40px',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div>
            <p style={{ fontSize: '18px', fontWeight: '600', color: '#fff', margin: 0 }}>
              Subscribe to our Newsletter
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: '4px 0 0' }}>
              Stay updated with our latest insights and news.
            </p>
          </div>
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '12px 20px',
                color: '#fff',
                fontSize: '14px',
                minWidth: '260px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={subscribeState.loading}
              style={{
                background: '#185ADB',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: subscribeState.loading ? 0.7 : 1
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              {subscribeState.loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {subscribeState.message && (
            <p
              style={{
                width: '100%',
                margin: '8px 0 0',
                fontSize: '13px',
                color: subscribeState.type === 'success' ? '#86EFAC' : '#FCA5A5'
              }}
            >
              {subscribeState.message}
            </p>
          )}
        </div>

        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr repeat(4, 1fr)',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* Column 1 - Brand */}
          <div>
            <img
              src="/symprio-logo.png"
              alt="Symprio"
              style={{ height: '32px', marginBottom: '24px', filter: 'brightness(0) invert(1)' }}
            />
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '16px'
            }}>
              Your AI Transformation Partner. We build AI-powered digital workforces that automate operations, augment decisions, and scale your business.
            </p>
            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '24px'
            }}>
              Mon - Fri: 9am - 6pm
            </p>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <SocialIcon icon={<FaLinkedin />} url="https://www.linkedin.com/company/symprio/" />
              <SocialIcon icon={<FaYoutube />} url="https://www.youtube.com/@symprioautomation1485" />
              <SocialIcon icon={<FaWhatsapp />} url="https://wa.me/60138802574" />
            </div>
            <a
              href="https://wa.me/60138802574"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#fff',
                borderRadius: '10px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              <FaWhatsapp style={{ fontSize: '18px' }} /> Chat With Us
            </a>
          </div>

          {/* Dynamic Columns */}
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h5 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#fff',
                marginBottom: '24px',
                letterSpacing: '0.08em'
              }}>
                {section.title}
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.links.map((link, lIdx) => (
                  <li key={lIdx} style={{ marginBottom: '12px' }}>
                    <a
                      href={link.url}
                      onClick={(e) => {
                        if (!link.url.startsWith('http')) {
                          e.preventDefault();
                          navigate(link.url);
                        }
                      }}
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={e => {
                        e.target.style.color = '#fff';
                        e.target.style.paddingLeft = '4px';
                      }}
                      onMouseLeave={e => {
                        e.target.style.color = 'rgba(255,255,255,0.5)';
                        e.target.style.paddingLeft = '0';
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            &copy; 2026 Symprio. All Rights Reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="/privacy-policy" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Terms of Service</a>
          </div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            contact@symprio.com | +60 13 880 2574
          </p>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

function SocialIcon({ icon, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.5)',
        fontSize: '18px',
        transition: 'all 0.3s ease',
        textDecoration: 'none'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#185ADB';
        e.currentTarget.style.color = '#fff';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {icon}
    </a>
  );
}
