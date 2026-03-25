import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SymprioNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'Robotic Process Automation', url: '/services/rpa' },
    { name: 'AI Application Development', url: '/services/ai-development' },
    { name: 'Agentic AI & LLM Solutions', url: '/services/agentic-ai' },
    { name: 'Process Assessment & Consultancy', url: '/services/process-assessment' },
    { name: 'Digital Transformation', url: '/services/digital-transformation' },
    { name: 'ERP & Oracle Services', url: '/services/erp-oracle' },
    { name: 'Custom Software Development', url: '/services/custom-software' },
    { name: 'Digital Workforce', url: '/services/digital-workforce' }
  ];

  const training = [
    { name: 'RPA Training', url: '/training/rpa' },
    { name: 'AI & GenAI Training', url: '/training/ai-genai' },
    { name: 'Corporate Workshops', url: '/training/corporate-workshops' }
  ];

  const handleNavClick = (url, external) => {
    if (external) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(url);
    }
    setActiveDropdown(null);
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        background: scrolled ? 'rgba(255, 255, 255, 0.9)' : '#ffffff',
        backdropFilter: 'blur(10px)',
        borderRadius: '100px',
        padding: '12px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.1)' : '0 4px 15px rgba(0,0,0,0.05)',
        border: '1px solid rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease'
      }}>
        {/* Logo */}
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src="/symprio-logo.png" alt="Symprio" style={{ height: '32px' }} />
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <NavLink label="Home" onClick={() => navigate('/')} />
          
          {/* Services Dropdown */}
          <div 
            onMouseEnter={() => setActiveDropdown('services')} 
            onMouseLeave={() => setActiveDropdown(null)}
            style={{ position: 'relative' }}
          >
            <div style={{
              fontSize: '15px',
              fontWeight: '600',
              color: 'var(--secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 0'
            }}>
              Services <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            {activeDropdown === 'services' && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '-20px',
                width: '280px',
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                padding: '12px',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                animation: 'fadeInUp 0.3s ease'
              }}>
                {services.map(s => (
                  <DropdownLink key={s.name} label={s.name} onClick={() => handleNavClick(s.url)} />
                ))}
              </div>
            )}
          </div>

          {/* Training Dropdown */}
          <div 
            onMouseEnter={() => setActiveDropdown('training')} 
            onMouseLeave={() => setActiveDropdown(null)}
            style={{ position: 'relative' }}
          >
            <div style={{
              fontSize: '15px',
              fontWeight: '600',
              color: 'var(--secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 0'
            }}>
              Training <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            {activeDropdown === 'training' && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '-20px',
                width: '240px',
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                padding: '12px',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                animation: 'fadeInUp 0.3s ease'
              }}>
                {training.map(t => (
                  <DropdownLink key={t.name} label={t.name} onClick={() => handleNavClick(t.url)} />
                ))}
              </div>
            )}
          </div>

          <NavLink label="About Us" onClick={() => navigate('/about')} />
          <NavLink label="Case Studies" onClick={() => navigate('/case-studies')} />
          <NavLink label="Blog" onClick={() => navigate('/blog')} />
          <NavLink label="Careers" onClick={() => navigate('/careers')} />
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/contact')}
          style={{
            background: 'var(--primary)',
            color: '#fff',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '100px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(10, 45, 110, 0.2)'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Get Free Consultation
        </button>
      </div>
    </nav>
  );
}

function NavLink({ label, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{
        fontSize: '15px',
        fontWeight: '600',
        color: 'var(--secondary)',
        cursor: 'pointer',
        opacity: 0.8,
        transition: 'all 0.3s ease',
        padding: '8px 0'
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = 1}
      onMouseLeave={e => e.currentTarget.style.opacity = 0.8}
    >
      {label}
    </div>
  );
}

function DropdownLink({ label, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{
        padding: '10px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        color: 'var(--secondary)',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(10, 45, 110, 0.05)';
        e.currentTarget.style.color = 'var(--primary)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--secondary)';
      }}
    >
      {label}
    </div>
  );
}


