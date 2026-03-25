import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SymprioNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'About', url: '/about' },
    { name: 'Blog', url: 'https://symprioideas.medium.com/', external: true },
    { name: 'Contact', url: '/enquiry' }
  ];

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
        background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '100px',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.1)' : '0 4px 15px rgba(0,0,0,0.05)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease'
      }}>
        {/* Logo */}
        <div onClick={() => navigate('/')} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer'
        }}>
          <img 
            src="/symprio-logo.png" 
            alt="Symprio Logo" 
            style={{
              height: '35px',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* Links */}
        <div style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center'
        }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              onClick={(e) => {
                if (!link.external) {
                  e.preventDefault();
                  navigate(link.url);
                }
              }}
              target={link.external ? '_blank' : '_self'}
              rel={link.external ? 'noopener noreferrer' : ''}
              style={{
                fontSize: '15px',
                fontWeight: '600',
                color: 'var(--secondary)',
                textDecoration: 'none',
                opacity: 0.8,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.target.style.opacity = 1; e.target.style.color = 'var(--primary)'; }}
              onMouseLeave={(e) => { e.target.style.opacity = 0.8; e.target.style.color = 'var(--secondary)'; }}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {!user ? (
            <button
              onClick={() => navigate('/enquiry')}
              style={{
                background: 'var(--primary)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '100px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 15px rgba(24, 90, 219, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(24, 90, 219, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(24, 90, 219, 0.3)';
              }}
            >
              Let's Talk 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          ) : (
            <button
              onClick={() => { logout(); navigate('/'); }}
              style={{
                background: '#ef4444',
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}


