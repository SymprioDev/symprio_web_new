import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SymprioNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'Digital Transformation', url: '/digital-transformation' },
    { name: 'Robotic Process Automation', url: '/rpa' },
    { name: 'ERP Practice (Oracle)', url: '/erp' },
    { name: 'Chatbots', url: '/chatbots' },
    { name: 'Custom Development', url: '/custom-development' },
    { name: 'Digital Workforce', url: '/digital-workforce' }
  ];

  return (
    <>
      {/* Top Info Bar - Symprio Design */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(135deg, #0f172a 0%, #0891b2 100%)',
        padding: '20px 60px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottom: '3px solid #ffffff',
        zIndex: 10001,
        transform: scrolled ? 'translateY(-80px)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '80px'
      }}>
        {/* Center: Symprio Logo */}
        <div onClick={() => navigate('/')} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer'
        }}>
          <div
            role="img"
            aria-label="Symprio Logo"
            style={{
              height: '60px',
              width: '220px',
              background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 100%)',
              WebkitMaskImage: 'url(/symprio-logo.png)',
              maskImage: 'url(/symprio-logo.png)',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskPosition: 'center',
              maskPosition: 'center'
            }}
          />
        </div>
      </div>

      {/* Main Navigation Bar - Blue Background */}
      <nav style={{
        position: 'fixed',
        top: scrolled ? '0px' : '80px',
        left: 0,
        right: 0,
        height: '58px',
        background: 'linear-gradient(90deg, rgba(15, 140, 200, 0.95) 0%, rgba(25, 181, 254, 0.9) 100%)',
        zIndex: 10001,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '60px',
        paddingRight: '60px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'top 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onMouseEnter={() => setShowLogin(true)}
      onMouseLeave={() => setShowLogin(false)}>
        {/* Navigation Links */}
        <div style={{
          display: 'flex',
          gap: '35px',
          alignItems: 'center',
          position: 'relative'
        }}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#fff',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
            cursor: 'pointer',
            fontFamily: 'Segoe UI, Inter, sans-serif',
            letterSpacing: '0.3px'
          }}
          onMouseEnter={(e) => e.target.style.color = '#bfdbfe'}
          onMouseLeave={(e) => e.target.style.color = '#fff'}
          >
            Home
          </a>

          <a href="/services" onClick={(e) => { e.preventDefault(); navigate('/services'); }} style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#fff',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
            cursor: 'pointer',
            fontFamily: 'Segoe UI, Inter, sans-serif',
            letterSpacing: '0.3px'
          }}
          onMouseEnter={(e) => e.target.style.color = '#bfdbfe'}
          onMouseLeave={(e) => e.target.style.color = '#fff'}
          >
            Services
          </a>

          <a href="https://symprioideas.medium.com/" target="_blank" rel="noopener noreferrer" style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#fff',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
            cursor: 'pointer',
            fontFamily: 'Segoe UI, Inter, sans-serif',
            letterSpacing: '0.3px'
          }}
          onMouseEnter={(e) => e.target.style.color = '#bfdbfe'}
          onMouseLeave={(e) => e.target.style.color = '#fff'}
          >
            Blog
          </a>

          <a href="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }} style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#fff',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
            cursor: 'pointer',
            fontFamily: 'Segoe UI, Inter, sans-serif',
            letterSpacing: '0.3px'
          }}
          onMouseEnter={(e) => e.target.style.color = '#bfdbfe'}
          onMouseLeave={(e) => e.target.style.color = '#fff'}
          >
            About
          </a>

          <a href="/enquiry" onClick={(e) => { e.preventDefault(); navigate('/enquiry'); }} style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#fff',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
            cursor: 'pointer',
            fontFamily: 'Segoe UI, Inter, sans-serif',
            letterSpacing: '0.3px'
          }}
          onMouseEnter={(e) => e.target.style.color = '#bfdbfe'}
          onMouseLeave={(e) => e.target.style.color = '#fff'}
          >
            Contact Us
          </a>

          <a href="/support-subscription" onClick={(e) => { e.preventDefault(); navigate('/support-subscription'); }} style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#fff',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
            cursor: 'pointer',
            fontFamily: 'Segoe UI, Inter, sans-serif',
            letterSpacing: '0.3px'
          }}
          onMouseEnter={(e) => e.target.style.color = '#bfdbfe'}
          onMouseLeave={(e) => e.target.style.color = '#fff'}
          >
            Subscription
          </a>
        </div>

        {/* Right Side Auth */}
        {!user ? (
          <button onClick={() => navigate('/admin')} style={{
            background: '#fff',
            color: 'rgba(25, 181, 254, 1)',
            border: 'none',
            padding: '10px 24px',
            fontSize: '13px',
            fontWeight: '700',
            borderRadius: '3px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'Segoe UI, Inter, sans-serif',
            letterSpacing: '0.3px',
            opacity: showLogin ? 1 : 0,
            pointerEvents: showLogin ? 'auto' : 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#bfdbfe';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
          }}
          >
            Login
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => {
              logout();
              navigate('/');
            }} style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: '700',
              borderRadius: '3px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#dc2626'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#ef4444'}
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div style={{ height: '138px' }} />
    </>
  );
}


