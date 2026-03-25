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
      minHeight: '100vh',
      background: '#f8fafc',
      padding: '48px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '32px',
        alignItems: 'start'
      }}>
        {/* LEFT: Form Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            Subscribe Support Hours
          </h2>

          {successMessage ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              minHeight: '300px',
              padding: '40px 0'
            }}>
              <div style={{ fontSize: '64px', color: '#10b981' }}>✓</div>
              <div style={{
                background: '#d1fae5',
                color: '#065f46',
                padding: '24px',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '16px',
                width: '100%'
              }}>
                {successMessage}
              </div>
            </div>
          ) : (
            <>
              {errorMessage && (
                <div style={{
                  background: '#fee2e2',
                  color: '#991b1b',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  textAlign: 'center',
                  fontWeight: '500',
                  fontSize: '14px'
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
                    placeholder="Your name"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0891b2';
                      e.target.style.boxShadow = '0 0 0 3px rgba(8, 145, 178, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
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
                    placeholder="Your company"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0891b2';
                      e.target.style.boxShadow = '0 0 0 3px rgba(8, 145, 178, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
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
                    marginBottom: '6px'
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
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0891b2';
                      e.target.style.boxShadow = '0 0 0 3px rgba(8, 145, 178, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
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
                    marginBottom: '6px'
                  }}>
                    Contact Number <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select
                      defaultValue="+60"
                      style={{
                        padding: '12px 8px',
                        fontSize: '14px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        background: '#fff',
                        minWidth: '80px',
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
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s, box-shadow 0.2s'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0891b2';
                        e.target.style.boxShadow = '0 0 0 3px rgba(8, 145, 178, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
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
                        fontSize: '18px',
                        fontWeight: 'bold',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        background: '#f3f4f6',
                        color: '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s'
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
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        background: '#fff',
                        boxSizing: 'border-box'
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
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        background: '#f3f4f6',
                        color: '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s'
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
                    marginBottom: '6px'
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
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      minHeight: '100px',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0891b2';
                      e.target.style.boxShadow = '0 0 0 3px rgba(8, 145, 178, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Total Amount */}
                <div style={{
                  background: '#f3f4f6',
                  borderRadius: '8px',
                  padding: '16px',
                  marginTop: '4px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      Rate per hour:
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                      ${rate}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
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
                    opacity: submitting ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(8, 145, 178, 0.3)';
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

        {/* RIGHT: Content Section */}
        <div style={{
          paddingTop: '8px'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Support Hours Subscription
          </h1>
          
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            lineHeight: '1.7',
            marginBottom: '24px'
          }}>
            Get dedicated support hours for your business needs. Flexible and affordable support packages tailored to your requirements. Our support subscription service ensures you have the help you need, when you need it.
          </p>

          {/* Features List */}
          <div style={{
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '16px'
            }}>
              What's Included
            </h3>
            <ul style={{
              listStyleType: 'disc',
              paddingLeft: '20px',
              color: '#6b7280',
              lineHeight: '2',
              margin: 0
            }}>
              <li>Flexible support hours that scale with your needs</li>
              <li>Pay only for what you use</li>
              <li>Minimum 50 hours to get started</li>
              <li>Dedicated support team</li>
              <li>Priority response times</li>
              <li>Email and phone support</li>
            </ul>
          </div>

          {/* Rate Highlight */}
          <div style={{
            background: 'white',
            border: '2px solid #0891b2',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              Current Rate
            </div>
            <div style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#0891b2'
            }}>
              ${rate}<span style={{ fontSize: '18px', fontWeight: '500', color: '#6b7280' }}>/hour</span>
            </div>
            <div style={{
              fontSize: '14px',
              color: '#6b7280',
              marginTop: '8px'
            }}>
              Contact us for custom packages
            </div>
          </div>

          {/* Contact Info */}
          <div style={{
            background: '#0f172a',
            borderRadius: '12px',
            padding: '24px',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              marginBottom: '16px'
            }}>
              Get in Touch
            </h3>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '12px'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Phone / WhatsApp</div>
              <div style={{ color: '#cbd5e1' }}>+60 13 880 2574</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '16px',
              borderRadius: '8px'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Email</div>
              <div style={{ color: '#cbd5e1' }}>contact@symprio.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles for mobile */}
      <style>{`
        @media (max-width: 768px) {
          .subscription-grid {
            grid-template-columns: 1fr !important;
          }
          .subscription-content {
            order: -1;
          }
        }
      `}</style>
    </div>
  );
}
