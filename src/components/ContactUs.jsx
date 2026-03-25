import React, { useState } from 'react';

export default function ContactUs() {
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to submit enquiry');

      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{
      width: '100%',
      padding: '90px 20px 80px',
      background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#0f172a', margin: '0 0 10px' }}>
            Contact Us
          </h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#475569', lineHeight: '1.7' }}>
            Share your requirements and we’ll get back to you quickly with the right solution.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '40px',
          alignItems: 'stretch'
        }}>
          <div style={{
            background: '#0f172a',
            color: '#fff',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: '0 15px 40px rgba(15, 23, 42, 0.25)'
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>Let’s Talk</h3>
              <p style={{ margin: '8px 0 0', color: '#cbd5e1', lineHeight: '1.6' }}>
                Reach out to our team for consultations, demos, or project planning.
              </p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '16px',
              borderRadius: '12px'
            }}>
              <div style={{ fontWeight: '700', marginBottom: '6px' }}>Email</div>
              <div style={{ color: '#e2e8f0' }}>contact@symprio.com</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '16px',
              borderRadius: '12px'
            }}>
              <div style={{ fontWeight: '700', marginBottom: '6px' }}>Phone</div>
              <div style={{ color: '#e2e8f0' }}>+60 13 880 2574</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '16px',
              borderRadius: '12px'
            }}>
              <div style={{ fontWeight: '700', marginBottom: '6px' }}>Office</div>
              <div style={{ color: '#e2e8f0' }}>Kuala Lumpur, Malaysia</div>
            </div>
          </div>

          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08)'
          }}>
            {submitted ? (
              <div style={{
                background: '#ecfdf3',
                color: '#065f46',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                fontWeight: '600'
              }}>
                Thank you! Your message has been received.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {error && (
                  <div style={{
                    background: '#fee2e2',
                    color: '#991b1b',
                    padding: '12px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                    {error}
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company"
                    required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                </div>
                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  placeholder="Service of interest"
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project"
                  rows={4}
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', resize: 'vertical' }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: '#0ea5e9',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
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
