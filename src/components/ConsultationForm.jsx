import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConsultationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const serviceOptions = [
    'Select a service',
    'Robotic Process Automation (RPA)',
    'AI Application Development',
    'Agentic AI & LLM Solutions',
    'Process Assessment & Consultancy',
    'Digital Transformation',
    'ERP & Oracle Services',
    'Custom Software Development',
    'Digital Workforce / Staff Augmentation',
    'Training (RPA / AI / Workshops)',
    'Other Enquiry'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message
        })
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (err) {
      console.error('Enquiry error:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    fontSize: 15,
    border: '1.5px solid #e2e8f0',
    borderRadius: 12,
    outline: 'none',
    fontFamily: 'inherit',
    color: '#1f2937',
    backgroundColor: '#f8fafc',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    fontSize: 14,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 6
  };

  const fieldWrap = {
    marginBottom: 20
  };

  return (
    <section style={{
      backgroundColor: '#010B1D',
      padding: '100px 20px',
      width: '100%'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 60,
        alignItems: 'center'
      }}>
        {/* Left Column — Text + Image */}
        <div style={{ flex: '1 1 460px', minWidth: 280 }}>
          <div className="section-tag" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Connect with Us
          </div>

          <h2 style={{
            color: '#fff',
            fontSize: 40,
            fontWeight: 700,
            lineHeight: 1.2,
            margin: '16px 0 20px'
          }}>
            Book a Business{' '}
            <em className="accent-text" style={{ fontWeight: '400', color: '#60a5fa' }}>Consultation</em>
          </h2>

          <p style={{
            fontSize: 16,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.6)',
            margin: '0 0 32px'
          }}>
            Schedule a free consultation with our experts. We'll study your business and recommend
            the right automation strategy.
          </p>

          <img
            src="/assets/images/contact-bg.jpg"
            alt="Business consultation"
            style={{
              width: '100%',
              maxHeight: 350,
              objectFit: 'cover',
              borderRadius: 20,
              display: 'block'
            }}
          />
        </div>

        {/* Right Column — Form Card */}
        <div style={{ flex: '1 1 440px', minWidth: 280 }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 24,
            padding: 40
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#1f2937', marginBottom: 8 }}>
                  Message Sent!
                </h3>
                <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.6 }}>
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#185ADB'; }}
                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; }}
                  />
                </div>

                <div style={fieldWrap}>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#185ADB'; }}
                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; }}
                  />
                </div>

                <div style={fieldWrap}>
                  <label style={labelStyle}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+60 12-345 6789"
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#185ADB'; }}
                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; }}
                  />
                </div>

                <div style={fieldWrap}>
                  <label style={labelStyle}>Service</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, appearance: 'auto', cursor: 'pointer' }}
                    onFocus={e => { e.target.style.borderColor = '#185ADB'; }}
                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; }}
                  >
                    {serviceOptions.map((opt, i) => (
                      <option key={i} value={i === 0 ? '' : opt} disabled={i === 0}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={fieldWrap}>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your project or challenge..."
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => { e.target.style.borderColor = '#185ADB'; }}
                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    backgroundColor: loading ? '#93b4f5' : '#185ADB',
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: 999,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#1249b8'; }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#185ADB'; }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
