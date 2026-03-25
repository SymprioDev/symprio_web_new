import React, { useState, useEffect } from 'react';

const MailConfig = ({ token, onNotification }) => {
  const [formData, setFormData] = useState({
    MAILERSEND_API_KEY: '',
    MAILERSEND_DOMAIN: '',
    COMPANY_EMAIL: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch config on mount
  useEffect(() => {
    fetchMailConfig();
  }, []);

  const fetchMailConfig = async () => {
    try {
      const response = await fetch('/api/admin/mail-config', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          MAILERSEND_API_KEY: data.MAILERSEND_API_KEY ? '********' : '',
          MAILERSEND_DOMAIN: data.MAILERSEND_DOMAIN || '',
          COMPANY_EMAIL: data.COMPANY_EMAIL || ''
        });
        setLastUpdated(data.lastUpdated || null);
      }
    } catch (error) {
      console.error('Failed to fetch mail config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If user is editing the API key field and it currently shows masked value, clear it
    if (name === 'MAILERSEND_API_KEY' && formData.MAILERSEND_API_KEY === '********') {
      setFormData({
        ...formData,
        [name]: value
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.MAILERSEND_API_KEY || formData.MAILERSEND_API_KEY === '********') {
      newErrors.MAILERSEND_API_KEY = 'API Key is required';
    }
    
    if (!formData.MAILERSEND_DOMAIN) {
      newErrors.MAILERSEND_DOMAIN = 'Domain is required';
    }
    
    if (!formData.COMPANY_EMAIL) {
      newErrors.COMPANY_EMAIL = 'Company email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.COMPANY_EMAIL)) {
      newErrors.COMPANY_EMAIL = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    
    try {
      // Only send the API key if it's not the masked value
      const payload = {
        MAILERSEND_API_KEY: formData.MAILERSEND_API_KEY === '********' ? '' : formData.MAILERSEND_API_KEY,
        MAILERSEND_DOMAIN: formData.MAILERSEND_DOMAIN,
        COMPANY_EMAIL: formData.COMPANY_EMAIL
      };

      const response = await fetch('/api/admin/mail-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        setLastUpdated(result.lastUpdated);
        // Mask the API key after save
        setFormData({
          ...formData,
          MAILERSEND_API_KEY: '********'
        });
        if (onNotification) {
          onNotification('success', 'Mail configuration saved successfully!');
        }
      } else {
        const errorData = await response.json();
        if (onNotification) {
          onNotification('error', errorData.message || 'Failed to save configuration');
        }
      }
    } catch (error) {
      console.error('Error saving mail config:', error);
      if (onNotification) {
        onNotification('error', 'Error saving configuration');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    // Clear errors first to give immediate feedback
    setErrors({});
    
    try {
      const response = await fetch('http://localhost:5000/api/admin/mail-config', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          MAILERSEND_API_KEY: data.MAILERSEND_API_KEY ? '********' : '',
          MAILERSEND_DOMAIN: data.MAILERSEND_DOMAIN || '',
          COMPANY_EMAIL: data.COMPANY_EMAIL || ''
        });
        setLastUpdated(data.lastUpdated || null);
        
        if (onNotification) {
          onNotification('success', 'Form reset to saved configuration');
        }
      } else {
        // If API call fails, still clear the form fields
        setFormData({
          MAILERSEND_API_KEY: '',
          MAILERSEND_DOMAIN: '',
          COMPANY_EMAIL: ''
        });
        setLastUpdated(null);
        
        if (onNotification) {
          onNotification('success', 'Form cleared');
        }
      }
    } catch (error) {
      console.error('Error resetting form:', error);
      // Clear form even on network error
      setFormData({
        MAILERSEND_API_KEY: '',
        MAILERSEND_DOMAIN: '',
        COMPANY_EMAIL: ''
      });
      setLastUpdated(null);
      
      if (onNotification) {
        onNotification('error', 'Error resetting form');
      }
    }
  };

  const handleTestEmail = async () => {
    // Check if configuration has been saved (lastUpdated exists)
    // The backend has the actual credentials, so we don't need to validate masked form fields
    if (!lastUpdated) {
      if (onNotification) {
        onNotification('error', 'Please save valid configuration first');
      }
      return;
    }

    // Validate email format if user has entered a new company email
    if (formData.COMPANY_EMAIL && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.COMPANY_EMAIL)) {
      if (onNotification) {
        onNotification('error', 'Please enter a valid company email address');
      }
      return;
    }

    try {
      const response = await fetch('/api/admin/mail-config/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        if (onNotification) {
          onNotification('success', 'Test email sent successfully!');
        }
      } else {
        const errorData = await response.json();
        if (onNotification) {
          onNotification('error', errorData.message || 'Failed to send test email');
        }
      }
    } catch (error) {
      console.error('Error testing email:', error);
      if (onNotification) {
        onNotification('error', 'Error sending test email');
      }
    }
  };

  if (loading) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <p style={{ textAlign: 'center', color: '#6b7280' }}>Loading configuration...</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px 0' }}>
          Mail Configuration
        </h2>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Configure MailerSend settings for sending emails
        </p>
      </div>

      {lastUpdated && (
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '6px',
          padding: '12px',
          marginBottom: '24px',
          color: '#166534',
          fontSize: '14px'
        }}>
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* MAILERSEND_API_KEY */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            MAILERSEND_API_KEY
          </label>
          <input
            type="text"
            name="MAILERSEND_API_KEY"
            value={formData.MAILERSEND_API_KEY}
            onChange={handleChange}
            placeholder="Enter MailerSend API Key"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14px',
              border: errors.MAILERSEND_API_KEY ? '2px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '6px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s'
            }}
          />
          {errors.MAILERSEND_API_KEY && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.MAILERSEND_API_KEY}</p>
          )}
          <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>
            Ensure this key is kept secure
          </p>
        </div>

        {/* MAILERSEND_DOMAIN */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            MAILERSEND_DOMAIN
          </label>
          <input
            type="text"
            name="MAILERSEND_DOMAIN"
            value={formData.MAILERSEND_DOMAIN}
            onChange={handleChange}
            placeholder="Enter MailerSend Domain"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14px',
              border: errors.MAILERSEND_DOMAIN ? '2px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '6px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s'
            }}
          />
          {errors.MAILERSEND_DOMAIN && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.MAILERSEND_DOMAIN}</p>
          )}
        </div>

        {/* COMPANY_EMAIL */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            COMPANY_EMAIL
          </label>
          <input
            type="email"
            name="COMPANY_EMAIL"
            value={formData.COMPANY_EMAIL}
            onChange={handleChange}
            placeholder="Enter Company Email"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14px',
              border: errors.COMPANY_EMAIL ? '2px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: '6px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s'
            }}
          />
          {errors.COMPANY_EMAIL && (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.COMPANY_EMAIL}</p>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '12px 24px',
              background: saving ? '#9ca3af' : '#00d4ff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: saving ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {saving ? 'Saving...' : 'Save Configuration'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: '12px 24px',
              background: 'white',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleTestEmail}
            style={{
              padding: '12px 24px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            Test Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default MailConfig;
