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
    <section style={{
      minHeight: '100vh',
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 20px',
      position: 'relative'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'stretch'
      }}>
        {/* Left: Info Panel */}
        <div style={{
          background: '#0f172a',
          color: '#fff',
          borderRadius: '16px',
          padding: '50px 40px',
          boxShadow: '0 20px 60px rgba(15, 23, 42, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          justifyContent: 'center'
        }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '800', color: '#ffffff' }}>
            Support Subscription
          </h2>
          <p style={{ margin: '0 0 12px 0', color: '#cbd5e1', lineHeight: '1.7' }}>
            Get dedicated support hours for your business needs. Flexible and affordable support packages tailored to your requirements.
          </p>
          
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontWeight: '700', marginBottom: '6px' }}>📋 How It Works</div>
            <div style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
              1. Choose your preferred hours<br/>
              2. Get dedicated support<br/>
              3. Flexible scheduling
            </div>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontWeight: '700', marginBottom: '6px' }}>💰 Transparent Pricing</div>
            <div style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
              Pay only for what you need.<br/>
              No hidden fees.
            </div>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontWeight: '700', marginBottom: '6px' }}>📞 Contact Us</div>
            <div style={{ color: '#e2e8f0' }}>+60 13 880 2574</div>
            <div style={{ color: '#e2e8f0' }}>contact@symprio.com</div>
          </div>
        </div>

        {/* Right: Form Container */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '48px 40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          position: 'relative',
          zIndex: 1,
          justifySelf: 'start'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#1f2937',
            margin: '0 0 8px 0',
            textAlign: 'center'
          }}>
            Subscribe Now
          </h1>

          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            textAlign: 'center',
            margin: '0 0 32px 0',
            lineHeight: '1.6'
          }}>
            Fill out the form below and we'll get back to you with a customized support package.
          </p>

          {successMessage ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              minHeight: '300px'
            }}>
              <div style={{ fontSize: '80px' }}>✓</div>
              <div style={{
                background: 'linear-gradient(135deg, #d1fae5 0%, #d1fae5 100%)',
                color: '#065f46',
                padding: '24px',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '18px',
                width: '100%'
              }}>
                {successMessage}
              </div>
            </div>
          ) : (
            <>
              {errorMessage && (
                <div style={{
                  background: 'linear-gradient(135deg, #fee2e2 0%, #fee2e2 100%)',
                  color: '#991b1b',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  textAlign: 'center',
                  fontWeight: '600'
                }}>
                  ✗ {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Name */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0891b2';
                      e.target.style.boxShadow = '0 0 0 3px rgba(8, 145, 178, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    Company Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="Your company"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0891b2';
                      e.target.style.boxShadow = '0 0 0 3px rgba(8, 145, 178, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    Email Address <span style={{ color: '#ef4444' }}>*</span>
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
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0891b2';
                      e.target.style.boxShadow = '0 0 0 3px rgba(8, 145, 178, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    Contact Number <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select
                      defaultValue="+60"
                      style={{
                        padding: '12px 8px',
                        fontSize: '14px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        background: '#fff',
                        minWidth: '80px',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box'
                      }}
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
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontFamily: 'inherit',
                        transition: 'all 0.3s ease',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0891b2';
                        e.target.style.boxShadow = '0 0 0 3px rgba(8, 145, 178, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Subscription Hours */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
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
                        fontSize: '18px',
                        fontWeight: 'bold',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        background: '#f3f4f6',
                        color: '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#e5e7eb';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#f3f4f6';
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
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        background: '#fff'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleHoursChange(formData.hours + 1)}
                      style={{
                        width: '40px',
                        height: '40px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        background: '#f3f4f6',
                        color: '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#e5e7eb';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#f3f4f6';
                      }}
                    >
                      +
                    </button>
                    <span style={{ color: '#6b7280', fontSize: '14px' }}>
                      (Min: 50 hours)
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    Message <span style={{ color: '#9ca3af', fontWeight: '400' }}>(Optional)</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your support needs..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      minHeight: '100px',
                      resize: 'vertical',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0891b2';
                      e.target.style.boxShadow = '0 0 0 3px rgba(8, 145, 178, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Total Amount */}
                <div style={{
                  background: '#f3f4f6',
                  borderRadius: '12px',
                  padding: '20px',
                  marginTop: '4px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>
                      Rate per hour:
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                      ${rate}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>
                      Hours:
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                      {formData.hours}
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: '1px solid #d1d5db'
                  }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937' }}>
                      Total Amount:
                    </span>
                    <span style={{ fontSize: '24px', fontWeight: '800', color: '#0891b2' }}>
                      ${totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: 'linear-gradient(135deg, #0891b2, #3b82f6)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    marginTop: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    opacity: submitting ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 24px rgba(8, 145, 178, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {submitting ? 'Submitting...' : 'Subscribe Now'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      
      {/* Responsive styles for mobile */}
      <style>{`
        @media (max-width: 768px) {
          section > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
