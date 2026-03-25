import React, { useState } from 'react';

export default function Enquiry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      console.log('Enquiry submitted:', data);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'stretch'
      }}>
        {/* Left: Contact Info */}
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
          <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '800', color: '#ffffff' }}>Contact Information</h2>
          <p style={{ margin: '0 0 12px 0', color: '#cbd5e1', lineHeight: '1.7' }}>
            Reach out to Symprio for consultations, partnerships, and project discussions.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontWeight: '700', marginBottom: '6px' }}>Phone / WhatsApp</div>
            <div style={{ color: '#e2e8f0' }}>+60 13 880 2574</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontWeight: '700', marginBottom: '6px' }}>Email</div>
            <div style={{ color: '#e2e8f0' }}>contact@symprio.com</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontWeight: '700', marginBottom: '6px' }}>Address</div>
            <div style={{ color: '#e2e8f0' }}>Symprio Sdn Bhd, Tower B, 8-05<br />Kuala Lumpur, Malaysia</div>
          </div>
        </div>

        {/* Right: Form Container */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '60px 40px',
            maxWidth: '600px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            zIndex: 1,
            justifySelf: 'end'
          }}
        >
        <h1
          style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#1f2937',
            margin: '0 0 12px 0',
            textAlign: 'center'
          }}
        >
          Get in Touch
        </h1>

        <p
          style={{
            fontSize: '16px',
            color: '#6b7280',
            textAlign: 'center',
            margin: '0 0 32px 0',
            lineHeight: '1.6'
          }}
        >
          Have a question or project in mind? We'd love to hear from you. Fill out the form below and we'll get back to you soon.
        </p>

        {submitted ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              minHeight: '400px'
            }}
          >
            <div
              style={{
                fontSize: '80px',
                animation: 'scaleIn 0.5s ease-out'
              }}
            >
              ✓
            </div>
            <div
              style={{
                background: 'linear-gradient(135deg, #d1fae5 0%, #d1fae5 100%)',
                color: '#065f46',
                padding: '24px',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '18px',
                width: '100%'
              }}
            >
              Thank you for your enquiry!
            </div>
            <p
              style={{
                color: '#6b7280',
                textAlign: 'center',
                margin: 0,
                fontSize: '16px'
              }}
            >
              We'll review your message and get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #fee2e2 0%, #fee2e2 100%)',
                  color: '#991b1b',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  textAlign: 'center',
                  fontWeight: '600'
                }}
              >
                ✗ {error}
              </div>
            )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Name */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '8px'
              }}
            >
              Full Name
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
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '8px'
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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
              placeholder="your@email.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '8px'
              }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
              placeholder="+1 (555) 000-0000"
            />
          </div>

          {/* Company */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '8px'
              }}
            >
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
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
              placeholder="Your company"
            />
          </div>

          {/* Service */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '8px'
              }}
            >
              Service Interested In
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                backgroundColor: '#ffffff'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#0891b2';
                e.target.style.boxShadow = '0 0 0 3px rgba(8, 145, 178, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">Select a service</option>
              <option value="digital-transformation">Digital Transformation</option>
              <option value="rpa">Robotic Process Automation</option>
              <option value="erp">ERP Practice (Oracle)</option>
              <option value="chatbots">Chatbots</option>
              <option value="ai">AI & Agentic AI Solutions</option>
              <option value="custom-development">Custom Development</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '8px'
              }}
            >
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                minHeight: '120px',
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
              placeholder="Tell us more about your project..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #0891b2, #3b82f6)',
              color: '#ffffff',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              opacity: loading ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(8, 145, 178, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {loading ? 'Submitting...' : 'Submit Enquiry'}
          </button>
        </form>
          </>
        )}

        <style>{`
          @keyframes scaleIn {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
        </div>
      </div>
    </section>
  );
}
