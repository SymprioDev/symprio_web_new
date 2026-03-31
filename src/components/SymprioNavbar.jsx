import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SymprioNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

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
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.06)' : '0 10px 30px rgba(0,0,0,0.03)',
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
              color: '#010B1D',
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
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
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
              color: '#010B1D',
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
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
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

        </div>

        {/* CTA + AI Mode + Hamburger */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/ai')}
            className="hide-on-mobile"
            style={{
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #0a0a1a, #185ADB)',
              color: '#fff',
              border: 'none',
              borderRadius: '9999px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              letterSpacing: '0.02em',
              transition: 'all 0.3s ease'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0D9488', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
            AI Mode
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="btn-pill btn-primary hide-on-mobile"
            style={{ padding: '12px 28px', fontSize: '14px' }}
          >
            Let's Talk &rarr;
          </button>
          <a
            href="https://wa.me/60138802574"
            target="_blank"
            rel="noopener noreferrer"
            className="hide-on-mobile"
            aria-label="Chat on WhatsApp"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#25D366',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 24px rgba(37, 211, 102, 0.28)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              flexShrink: 0
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 14px 30px rgba(37, 211, 102, 0.34)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(37, 211, 102, 0.28)';
            }}
          >
            <img
              src="/assets/service%20images/whatsapp.png"
              alt="WhatsApp"
              style={{ width: '22px', height: '22px', objectFit: 'contain' }}
            />
          </a>
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="hamburger-btn"
            aria-label="Toggle menu"
            style={{
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              width: '44px',
              height: '44px',
              background: 'rgba(1,11,29,0.07)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              padding: '0'
            }}
          >
            <span style={{ display: 'block', width: '20px', height: '2px', background: '#010B1D', borderRadius: '2px', transition: 'all 0.3s ease', transform: mobileOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ display: 'block', width: '20px', height: '2px', background: '#010B1D', borderRadius: '2px', transition: 'all 0.3s ease', opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '20px', height: '2px', background: '#010B1D', borderRadius: '2px', transition: 'all 0.3s ease', transform: mobileOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 999
        }} onClick={() => setMobileOpen(false)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '300px',
              height: '100%',
              background: '#fff',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.15)',
              padding: '32px 24px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <img src="/symprio-logo.png" alt="Symprio" style={{ height: '28px' }} />
              <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#010B1D', lineHeight: 1 }}>×</button>
            </div>

            <MobileNavLink label="Home" onClick={() => { navigate('/'); setMobileOpen(false); }} />

            {/* Solutions accordion */}
            <div>
              <div
                onClick={() => setMobileExpanded(e => e === 'services' ? null : 'services')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '15px', color: '#010B1D' }}
              >
                Solutions
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ transform: mobileExpanded === 'services' ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              {mobileExpanded === 'services' && (
                <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {services.map(s => (
                    <MobileNavLink key={s.name} label={s.name} small onClick={() => { navigate(s.url); setMobileOpen(false); }} />
                  ))}
                </div>
              )}
            </div>

            {/* Academy accordion */}
            <div>
              <div
                onClick={() => setMobileExpanded(e => e === 'training' ? null : 'training')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '15px', color: '#010B1D' }}
              >
                Academy
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ transform: mobileExpanded === 'training' ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              {mobileExpanded === 'training' && (
                <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {training.map(t => (
                    <MobileNavLink key={t.name} label={t.name} small onClick={() => { navigate(t.url); setMobileOpen(false); }} />
                  ))}
                </div>
              )}
            </div>

            <MobileNavLink label="About" onClick={() => { navigate('/about'); setMobileOpen(false); }} />
            <MobileNavLink label="Case Studies" onClick={() => { navigate('/case-studies'); setMobileOpen(false); }} />
            <MobileNavLink label="Blog" onClick={() => { navigate('/blog'); setMobileOpen(false); }} />
            <MobileNavLink label="Careers" onClick={() => { navigate('/careers'); setMobileOpen(false); }} />

            <div style={{ marginTop: '24px' }}>
              <button
                onClick={() => { navigate('/contact'); setMobileOpen(false); }}
                style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #185ADB, #0D9488)', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}
              >
                Let's Talk &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 991px) {
          .d-lg-flex { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .hide-on-mobile { display: none !important; }
        }
        @media (min-width: 992px) {
          .d-lg-flex { display: flex !important; }
          .hamburger-btn { display: none !important; }
        }
        .hover-opacity-100:hover { opacity: 1 !important; color: #185ADB !important; }
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
        color: '#010B1D',
        cursor: 'pointer',
        opacity: 0.8,
        transition: 'all 0.3s ease',
        padding: '12px 0'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.opacity = 1;
        e.currentTarget.style.color = '#185ADB';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.opacity = 0.8;
        e.currentTarget.style.color = '#010B1D';
      }}
    >
      {label}
    </div>
  );
}

function MobileNavLink({ label, onClick, small }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: small ? '10px 16px' : '14px 16px',
        borderRadius: '12px',
        fontSize: small ? '14px' : '15px',
        fontWeight: '600',
        color: small ? '#374151' : '#010B1D',
        cursor: 'pointer',
        transition: 'background 0.2s'
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(24,90,219,0.06)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
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
        color: '#010B1D',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(24, 90, 219, 0.06)';
        e.currentTarget.style.color = '#185ADB';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = '#010B1D';
      }}
    >
      {label}
    </div>
  );
}
