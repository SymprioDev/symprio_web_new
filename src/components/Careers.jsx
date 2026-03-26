import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';
import SEO from './SEO';

const JOBS = [
  {
    id: 1,
    title: 'Senior RPA Developer',
    department: 'Engineering',
    location: 'Kuala Lumpur, Malaysia',
    type: 'Full-time',
    posted: 'March 2026',
    description: 'Design and deploy enterprise RPA solutions using UiPath and Power Automate. Lead bot development, testing, and go-live support.',
  },
  {
    id: 2,
    title: 'AI Solution Architect',
    department: 'Consulting',
    location: 'Singapore / Remote',
    type: 'Full-time',
    posted: 'March 2026',
    description: 'Architect AI-powered applications including chatbots, RAG systems, and LLM pipelines for enterprise clients.',
  },
  {
    id: 3,
    title: 'Oracle Cloud Consultant',
    department: 'Consulting',
    location: 'India',
    type: 'Contract',
    posted: 'February 2026',
    description: 'Lead Oracle Cloud ERP implementations and migrations for APAC and Middle East clients.',
  },
  {
    id: 4,
    title: 'Business Development Manager',
    department: 'Sales',
    location: 'Kuala Lumpur, Malaysia',
    type: 'Full-time',
    posted: 'March 2026',
    description: 'Drive new business in APAC by identifying prospects and closing AI & automation deals.',
  },
  {
    id: 5,
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    posted: 'February 2026',
    description: "Own Symprio's digital presence across LinkedIn, Google, and content channels.",
  },
  {
    id: 6,
    title: 'UiPath RPA Trainer',
    department: 'Consulting',
    location: 'Remote / On-site',
    type: 'Contract',
    posted: 'March 2026',
    description: 'Deliver hands-on UiPath and Power Automate training to enterprise clients across APAC.',
  },
];

const DEPARTMENTS = ['All', 'Engineering', 'Consulting', 'Sales', 'Marketing', 'Operations'];

const CULTURE_CARDS = [
  { icon: '🤝', title: 'Collaborative Culture', desc: 'Growth-oriented environment where innovation thrives.' },
  { icon: '💼', title: 'Open Roles', desc: 'Hiring across Engineering, Consulting, Sales, Marketing, Operations.' },
  { icon: '📈', title: 'Professional Development', desc: 'Continuous learning, certifications, career growth.' },
];

const PERKS = [
  { icon: '🏠', title: 'Remote First', desc: 'Flexible work arrangements for a better work-life balance.' },
  { icon: '🌍', title: 'Global Impact', desc: 'Work with Fortune 500 clients across 15+ countries.' },
  { icon: '⚡', title: 'Modern Stack', desc: 'Build with the latest AI, RPA, and cloud technologies.' },
  { icon: '🎓', title: 'Learning & Growth', desc: 'Microsoft-certified training, mentorship, and clear career progression paths.' },
];

const TYPE_COLORS = {
  'Full-time': { bg: '#EFF6FF', color: '#0077B6' },
  'Contract': { bg: '#F0FDF4', color: '#0D9488' },
  'Remote': { bg: '#F5F3FF', color: '#7C3AED' },
};

export default function Careers() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalJob, setModalJob] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', linkedin: '', cover: '', cv: null });
  const [submitted, setSubmitted] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data);
        } else {
          // Fallback to hardcoded jobs if no jobs in DB
          setJobs(JOBS);
        }
        setLoadingJobs(false);
      })
      .catch(() => {
        setJobs(JOBS); // Fallback
        setLoadingJobs(false);
      });
  }, []);

  const filteredJobs = activeFilter === 'All' ? jobs : jobs.filter(j => j.department === activeFilter);

  function openModal(job) {
    setModalJob(job);
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', linkedin: '', cover: '', cv: null });
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    setModalJob(null);
    document.body.style.overflow = '';
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append('firstName', formData.name.split(' ')[0] || formData.name);
      fd.append('lastName', formData.name.split(' ').slice(1).join(' ') || '');
      fd.append('email', formData.email);
      fd.append('mobileNumber', formData.phone);
      fd.append('coverLetter', formData.cover);
      fd.append('jobTitle', modalJob.title);
      if (formData.cv) {
        fd.append('cv', formData.cv);
      }

      const res = await fetch('/api/job-applications', {
        method: 'POST',
        body: fd  // No Content-Type header — browser sets multipart/form-data automatically
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error('Application error:', err);
      alert('An error occurred. Please try again.');
    }
  }

  const typeStyle = (type) => TYPE_COLORS[type] || { bg: '#F9FAFB', color: '#374151' };

  return (
    <div className="bg-white">
      <SEO title="Careers at Symprio — Join Our AI & Automation Team" description="Build the future of AI and automation. Join Symprio's expert team across engineering, consulting, sales and operations." />
      <PageBanner
        title="Join Our Team"
        breadcrumb={[{ label: 'Careers' }]}
        backgroundImage="/assets/images/digital-workforce.jpg"
      />

      {/* Intro */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2D6E] mb-6" data-aos="fade-up">
              Build the Future of <span className="text-[#0077B6] italic font-serif">Automation</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
              We are a global team of innovators, dreamers, and doers. At Symprio, you'll work on
              cutting-edge AI projects that redefine how businesses operate.
            </p>
          </div>

          {/* Culture Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
            {CULTURE_CARDS.map((card, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all text-center"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h4 className="text-lg font-bold text-[#0A2D6E] mb-3">{card.title}</h4>
                <p className="text-gray-500 leading-relaxed text-sm">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up">
            {DEPARTMENTS.map(dept => (
              <button
                key={dept}
                onClick={() => setActiveFilter(dept)}
                style={
                  activeFilter === dept
                    ? { backgroundColor: '#0A2D6E', color: '#ffffff', borderColor: '#0A2D6E' }
                    : { backgroundColor: '#ffffff', color: '#374151', borderColor: '#D1D5DB' }
                }
                className="px-5 py-2 rounded-full border text-sm font-semibold transition-all hover:border-[#0A2D6E] hover:text-[#0A2D6E]"
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Cards Grid */}
          {/* No-openings fallback: if filteredJobs.length === 0, render a "No open roles" message here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredJobs.map((job, i) => {
              const ts = typeStyle(job.type);
              return (
                <div
                  key={job.id}
                  className="flex flex-col p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all group"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  {/* Header badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ backgroundColor: ts.bg, color: ts.color }}
                    >
                      {job.type}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{job.posted}</span>
                  </div>

                  {/* Title & Department */}
                  <h3 className="text-xl font-bold text-[#0A2D6E] group-hover:text-[#0077B6] transition-colors mb-1 leading-snug">
                    {job.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#0D9488] uppercase tracking-wide mb-3">
                    {job.department}
                  </span>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                    <span>📍</span>
                    <span>{job.location}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-6">
                    {job.description}
                  </p>

                  {/* Apply Button */}
                  <button
                    onClick={() => openModal(job)}
                    className="w-full py-3 rounded-2xl bg-gray-50 text-[#0A2D6E] font-bold text-sm hover:bg-[#0A2D6E] hover:text-white transition-all"
                  >
                    Apply Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-[#0A2D6E] mb-4">Why Join Symprio?</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">We invest in our people and create an environment where you can do your best work.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">
            {PERKS.map((perk, idx) => (
              <div key={idx} data-aos="zoom-in" data-aos-delay={idx * 100}>
                <div className="text-4xl mb-5">{perk.icon}</div>
                <h4 className="text-lg font-bold text-[#0A2D6E] mb-3">{perk.title}</h4>
                <p className="text-gray-500 leading-relaxed text-sm">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      {modalJob && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.55)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '560px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '40px',
              position: 'relative',
              boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
            }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '24px',
                background: 'none',
                border: 'none',
                fontSize: '22px',
                cursor: 'pointer',
                color: '#6B7280',
                lineHeight: 1,
              }}
              aria-label="Close modal"
            >
              ×
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#0A2D6E', marginBottom: '12px' }}>
                  Application Submitted!
                </h3>
                <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.6 }}>
                  We'll be in touch within 5 business days.
                </p>
                <button
                  onClick={closeModal}
                  style={{
                    marginTop: '28px',
                    padding: '12px 32px',
                    backgroundColor: '#0A2D6E',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '15px',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Modal Header */}
                <div style={{ marginBottom: '28px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#0D9488', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                    Apply for
                  </p>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0A2D6E', lineHeight: 1.3 }}>
                    {modalJob.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '4px' }}>
                    {modalJob.department} · {modalJob.location} · {modalJob.type}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      style={inputStyle}
                    />
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      style={inputStyle}
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+60 12 345 6789"
                      style={inputStyle}
                    />
                  </div>

                  {/* LinkedIn */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>LinkedIn Profile URL</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      style={inputStyle}
                    />
                  </div>

                  {/* Cover Letter */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Cover Letter</label>
                    <textarea
                      name="cover"
                      value={formData.cover}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us why you're excited about this role..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                    />
                  </div>

                  {/* Upload CV */}
                  <div style={{ marginBottom: '28px' }}>
                    <label style={labelStyle}>Upload CV *</label>
                    <input
                      type="file"
                      name="cv"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleChange}
                      style={{
                        display: 'block',
                        width: '100%',
                        fontSize: '14px',
                        color: '#374151',
                        padding: '10px 0',
                        cursor: 'pointer',
                      }}
                    />
                    <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
                      Accepted formats: PDF, DOC, DOCX
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: '#0A2D6E',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '14px',
                      fontSize: '15px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0077B6'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#0A2D6E'; }}
                  >
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* Shared inline styles for modal form elements */
const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: '#374151',
  marginBottom: '6px',
};

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid #D1D5DB',
  borderRadius: '10px',
  fontSize: '14px',
  color: '#111827',
  outline: 'none',
  boxSizing: 'border-box',
  backgroundColor: '#F9FAFB',
};
