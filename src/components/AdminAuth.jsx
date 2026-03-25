import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(email, password);
      } else {
        result = await register(email, password, name);
      }

      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        boxShadow: '0 40px 80px rgba(10, 45, 110, 0.3)',
        width: '100%',
        maxWidth: '440px',
        padding: '56px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <img 
            src="/symprio-logo.png" 
            alt="Symprio" 
            style={{ height: '36px', marginBottom: '32px' }} 
          />
          <h1 style={{
            fontSize: '32px',
            fontWeight: '900',
            color: 'var(--primary)',
            margin: '0 0 12px 0',
            letterSpacing: '-0.02em'
          }}>
            {isLogin ? 'Admin Portal' : 'Create Account'}
          </h1>
          <p style={{
            fontSize: '15px',
            color: '#64748b',
            margin: 0,
            fontWeight: '500'
          }}>
            {isLogin
              ? 'Secure access for Symprio staff'
              : 'Enterprise account registration'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '14px 18px',
            borderRadius: '12px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '600',
            border: '1px solid #fecaca'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
          {!isLogin && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '700',
                color: 'var(--primary)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required={!isLogin}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  background: '#f8fafc',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '700',
              color: 'var(--primary)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@symprio.com"
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '15px',
                boxSizing: 'border-box',
                background: '#f8fafc',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '700',
              color: 'var(--primary)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              style={{
                width: '100%',
                padding: '14px 18px',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '15px',
                boxSizing: 'border-box',
                background: '#f8fafc',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-pill btn-primary"
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Authenticating...' : isLogin ? 'Access Dashboard' : 'Create Account'}
          </button>
        </form>

        {/* Toggle */}
        <div style={{
          textAlign: 'center',
          paddingTop: '24px',
          borderTop: '1px solid #f1f5f9'
        }}>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#64748b',
            fontWeight: '500'
          }}>
            {isLogin ? "Staff member without access?" : 'Already registered?'}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--secondary)',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                textDecoration: 'underline',
                marginLeft: '6px'
              }}
            >
              {isLogin ? 'Register account' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;




