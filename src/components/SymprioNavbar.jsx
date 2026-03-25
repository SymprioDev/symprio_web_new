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
      padding: scrolled ? '15px 20px' : '25px 20px',
      display: 'flex',
      justifyContent: 'center',
      transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1300px',
        background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '100px',
        padding: '10px 10px 10px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: scrolled ? '0 20px 40px rgba(10, 45, 110, 0.08)' : '0 10px 30px rgba(0,0,0,0.03)',
        border: scrolled ? '1px solid rgba(10, 45, 110, 0.1)' : '1px solid rgba(0,0,0,0.05)',
        transition: 'all 0.4s ease'
      }}>
        {/* Logo */}
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src="/symprio-logo.png" alt="Symprio" style={{ height: '34px', objectFit: 'contain' }} />
        </div>

        {/* Links */}
        <div style={{ display: 'none', gap: '32px', alignItems: 'center', marginLeft: 'auto', marginRight: '32px' }} className="d-lg-flex">
          <NavLink label="Home" onClick={() => navigate('/')} />
          
          {/* Services Dropdown */}
          <div 
            onMouseEnter={() => setActiveDropdown('services')} 
            onMouseLeave={() => setActiveDropdown(null)}
            style={{ position: 'relative' }}
          >
            <div style={{
              fontSize: '15px',
              fontWeight: '700',
              color: 'var(--primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 0'
            }}>
              Solutions <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            {activeDropdown === 'services' && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '-40px',
                width: '320px',
                background: '#ffffff',
                borderRadius: '24px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
                padding: '16px',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
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
              fontWeight: '700',
              color: 'var(--primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 0'
            }}>
              Academy <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            {activeDropdown === 'training' && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '-20px',
                width: '240px',
                background: '#ffffff',
                borderRadius: '24px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
                padding: '16px',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                animation: 'fadeInUp 0.3s ease'
              }}>
                {training.map(t => (
                  <DropdownLink key={t.name} label={t.name} onClick={() => handleNavClick(t.url)} />
                ))}
              </div>
            )}
          </div>

          <NavLink label="About" onClick={() => navigate('/about')} />
          <NavLink label="Insights" onClick={() => navigate('/blog')} />
          
          {/* Subtle Admin Link */}
          <Link to="/admin" style={{
            color: 'var(--primary)',
            opacity: 0.5,
            fontSize: '12px',
            textDecoration: 'none',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }} className="hover-opacity-100">
            Staff
          </Link>
        </div>

        {/* CTA Group */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/contact')}
            className="btn-pill btn-primary"
            style={{ padding: '12px 28px', fontSize: '14px' }}
          >
            Connect Now
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .d-lg-flex { display: none !important; }
        }
        @media (min-width: 992px) {
          .d-lg-flex { display: flex !important; }
        }
        .hover-opacity-100:hover { opacity: 1 !important; color: var(--secondary) !important; }
      `}</style>
    </nav>
  );
}

function NavLink({ label, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{
        fontSize: '15px',
        fontWeight: '700',
        color: 'var(--primary)',
        cursor: 'pointer',
        opacity: 0.8,
        transition: 'all 0.3s ease',
        padding: '12px 0'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.opacity = 1;
        e.currentTarget.style.color = 'var(--secondary)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.opacity = 0.8;
        e.currentTarget.style.color = 'var(--primary)';
      }}
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
        padding: '12px 20px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '600',
        color: 'var(--primary)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(0, 119, 182, 0.08)';
        e.currentTarget.style.color = 'var(--secondary)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--primary)';
      }}
    >
      {label}
    </div>
  );
}


