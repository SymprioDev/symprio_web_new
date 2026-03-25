import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaYoutube, FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';

export default function SymprioFooter() {
  const navigate = useNavigate();
  
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
        { name: 'Support Subscription', url: '/support-subscription' },
        { name: 'Staff Login', url: '/admin' }
      ]
    },
    {
      title: 'REGIONS',
      links: [
        { name: 'Malaysia (HQ)', url: '#' },
        { name: 'Singapore', url: '#' },
        { name: 'India', url: '#' },
        { name: 'Silicon Valley, USA', url: '#' },
        { name: 'United Kingdom', url: '#' },
        { name: 'Middle East', url: '#' }
      ]
    }
  ];

  return (
    <footer style={{
      background: '#0a192f',
      color: '#e5e7eb',
      padding: '80px 20px 40px',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
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
              color: '#9ca3af',
              marginBottom: '24px'
            }}>
              Intelligent AI & Automation Solutions for the Modern Enterprise. Helping organizations automate intelligently, build AI-powered products, and transform digitally.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <SocialIcon icon={<FaLinkedin />} url="https://www.linkedin.com/company/symprio/" />
              <SocialIcon icon={<FaYoutube />} url="https://www.youtube.com/@symprioautomation1485" />
              <SocialIcon icon={<FaFacebook />} url="#" />
              <SocialIcon icon={<FaTwitter />} url="#" />
              <SocialIcon icon={<FaWhatsapp />} url="https://wa.me/60138802574" />
            </div>
          </div>

          {/* Dynamic Columns */}
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h5 style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '24px',
                letterSpacing: '0.05em'
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
                        color: '#9ca3af',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={e => {
                        e.target.style.color = '#fff';
                        e.target.style.paddingLeft = '4px';
                      }}
                      onMouseLeave={e => {
                        e.target.style.color = '#9ca3af';
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
            © 2025 Symprio. All Rights Reserved.
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
        color: '#9ca3af',
        fontSize: '18px',
        transition: 'all 0.3s ease',
        textDecoration: 'none'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--primary)';
        e.currentTarget.style.color = '#fff';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.color = '#9ca3af';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {icon}
    </a>
  );
}


