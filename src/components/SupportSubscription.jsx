import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SupportSubscription() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    contactNumber: '',
    message: '',
    hours: 50
  });
  
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const totalAmount = formData.hours * rate;
  
  // Fetch rate from backend
  useEffect(() => {
    const fetchRate = async () => {
      try {
        console.log('Fetching subscription rate from backend...');
        const res = await fetch('/api/admin/subscription-config');
        const data = await res.json();
        
        console.log('API Response:', data);
        console.log('Rate value:', data.rate);
        
        if (data.rate !== undefined && data.rate !== null) {
          setRate(data.rate);
          console.log('Rate set to:', data.rate);
        } else {
          console.warn('Rate not found in response, using default 50');
          setRate(50);
        }
      } catch (err) {
        console.error('Error fetching subscription config:', err);
        setRate(50); // Fallback default
      } finally {
        setLoading(false);
      }
    };
    
    fetchRate();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleHoursChange = (newHours) => {
    const hours = Math.max(50, parseInt(newHours) || 50);
    setFormData(prev => ({
      ...prev,
      hours
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    // Validation
    if (!formData.name || !formData.companyName || !formData.contactNumber || !formData.email) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    if (formData.hours < 50) {
      setErrorMessage('Minimum subscription hours is 50');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          companyName: formData.companyName,
          email: formData.email,
          contactNumber: formData.contactNumber,
          message: formData.message,
          hours: formData.hours,
          rate: rate,
          totalAmount: totalAmount
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccessMessage('Subscription request submitted successfully');
        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(''), 5000);
        // Reset form
        setFormData({
          name: '',
          companyName: '',
          contactNumber: '',
          message: '',
          hours: 50
        });
      } else {
        setErrorMessage(data.message || 'Failed to submit subscription');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div style={{
      background: '#fff',
      color: '#1f2937',
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #0891b2 100%)',
        padding: '80px 20px 60px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '700',
          color: '#fff',
          margin: 0,
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Support Hours Subscription
        </h1>
        <p style={{
          fontSize: '18px',
          color: 'rgba(255,255,255,0.9)',
          marginTop: '16px',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Get dedicated support hours for your business needs. Flexible and affordable.
        </p>
      </div>
      
      {/* Form Container */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '40px 24px 60px'
      }}>
        <form onSubmit={handleSubmit} style={{
          background: '#f9fafb',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          {/* Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0891b2'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
          
          {/* Company Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Company Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0891b2'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
          
          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Email <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@company.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0891b2'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
          
          {/* Contact Number with Country Code */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Contact Number <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select
                style={{
                  padding: '12px 8px',
                  fontSize: '14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: '#fff',
                  outline: 'none',
                  minWidth: '80px'
                }}
                defaultValue="+60"
              >
                <option value="+60">+60</option>
                <option value="+65">+65</option>
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                placeholder="XXXXXXXXX"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0891b2'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </div>
          
          {/* Message */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Message <span style={{ color: '#9ca3af' }}>(Optional)</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                outline: 'none',
                resize: 'vertical',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0891b2'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
          
          {/* Subscription Hours */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Subscription Hours <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={() => handleHoursChange(formData.hours - 1)}
                style={{
                  width: '40px',
                  height: '40px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: '#fff',
                  color: '#374151',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                −
              </button>
              <input
                type="number"
                name="hours"
                value={formData.hours}
                onChange={(e) => handleHoursChange(e.target.value)}
                min={50}
                step={1}
                readOnly
                style={{
                  width: '100px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  textAlign: 'center',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => handleHoursChange(formData.hours + 1)}
                style={{
                  width: '40px',
                  height: '40px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: '#fff',
                  color: '#374151',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                +
              </button>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>
                (Min: 50 hours)
              </span>
            </div>
          </div>
          
          {/* Total Amount */}
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #10b981',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                Rate per hour:
              </span>
              <span style={{ fontSize: '14px', color: '#374151' }}>
                ${rate}
              </span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: '8px',
              paddingTop: '8px',
              borderTop: '1px solid #10b981'
            }}>
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937' }}>
                Total Amount:
              </span>
              <span style={{ fontSize: '20px', fontWeight: '700', color: '#0891b2' }}>
                ${totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
          
          {/* Error Message */}
          {errorMessage && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              color: '#ef4444',
              fontSize: '14px'
            }}>
              {errorMessage}
            </div>
          )}
          
          {/* Success Message */}
          {successMessage && (
            <div style={{
              background: '#ecfdf5',
              border: '1px solid #10b981',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              color: '#10b981',
              fontSize: '14px'
            }}>
              {successMessage}
            </div>
          )}
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || loading}
            style={{
              width: '100%',
              padding: '14px 24px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#fff',
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
              background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
              border: 'none',
              borderRadius: '8px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1,
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 6px rgba(8, 145, 178, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!submitting && !loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 12px rgba(8, 145, 178, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(8, 145, 178, 0.3)';
            }}
          >
            {submitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
