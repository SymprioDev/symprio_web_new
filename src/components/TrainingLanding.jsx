import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';

export default function TrainingLanding() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    country: '',
    trainingType: '',
    participants: '',
    preferredDate: '',
    deliveryMode: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  const programs = [
    {
      title: 'RPA Training',
      subtitle: 'Master UiPath & Power Automate',
      description: 'Comprehensive hands-on training for developers and business users to build and manage digital workforces.',
      image: '/assets/images/rpa.jpg',
      link: '/training/rpa'
    },
    {
      title: 'AI & GenAI Training',
      subtitle: 'The Future of Productivity',
      description: 'Learn how to leverage LLMs, Prompt Engineering, and Agentic AI to transform your daily workflows.',
      image: '/assets/images/ai-development.jpg',
      link: '/training/ai-genai'
    },
    {
      title: 'Corporate Workshops',
      subtitle: 'Strategic AI Adoption',
      description: 'Executive-level workshops on AI strategy, governance, and building an automation-first culture.',
      image: '/assets/images/process-assessment.jpg',
      link: '/training/corporate-workshops'
    }
  ];

  return (
    <div className="bg-white">
      <PageBanner 
        title="Training & Enablement" 
        breadcrumb={[{ label: 'Training' }]} 
        backgroundImage="/assets/images/training-bg.jpg"
      />

      {/* Intro */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#0A2D6E] mb-6" data-aos="fade-up">
            Empower Your Team with <span className="text-[#0077B6] italic font-serif">Future Skills</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            At Symprio, we believe that technology is only as good as the people who use it. Our training programs 
            are designed to bridge the skills gap and ensure your organization can scale its digital transformation efforts.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {programs.map((p, i) => (
              <div 
                key={i} 
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2D6E]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => navigate(p.link)}
                      className="bg-[#00F5D4] text-[#0A2D6E] font-bold px-8 py-3 rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-all"
                    >
                      View Program
                    </button>
                  </div>
                </div>
                <div className="p-10">
                  <span className="text-[#0077B6] font-bold text-sm uppercase tracking-widest mb-2 block">{p.subtitle}</span>
                  <h3 className="text-2xl font-bold text-[#0A2D6E] mb-4">{p.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-8">{p.description}</p>
                  <div 
                    onClick={() => navigate(p.link)}
                    className="flex items-center gap-2 text-[#0A2D6E] font-bold cursor-pointer hover:text-[#0077B6] transition-colors"
                  >
                    Explore Course Details
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Symprio Training */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-[#0A2D6E] rounded-[3rem] p-16 text-white relative overflow-hidden">
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                {[
                  { label: 'Hands-on Lab', desc: 'Real-world scenarios and sandbox environments.' },
                  { label: 'Expert Coaches', desc: 'Taught by certified senior consultants.' },
                  { label: 'Global Certs', desc: 'Preparing you for industry-leading certifications.' },
                  { label: 'Post-Training', desc: 'On-demand mentorship and project support.' }
                ].map((item, idx) => (
                  <div key={idx} data-aos="zoom-in" data-aos-delay={idx * 100}>
                    <div className="text-3xl mb-4">✨</div>
                    <h4 className="text-xl font-bold mb-2">{item.label}</h4>
                    <p className="text-blue-100/70 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>
             {/* Decorative circles */}
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full"></div>
             <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#00F5D4]/10 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Training Enquiry Form */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — Info */}
            <div data-aos="fade-right">
              <span className="inline-block text-[#0077B6] font-bold text-sm uppercase tracking-widest mb-4">
                Get In Touch
              </span>
              <h2 className="text-4xl font-bold text-[#0A2D6E] mb-6 leading-tight">
                Enquire About Our{' '}
                <span className="text-[#0077B6] italic font-serif">Training Programs</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-10">
                Tell us about your team and we'll design a training program that fits. All enquiries receive a response within 1 business day.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: '🗓️', text: 'Flexible scheduling — online, on-site, or blended' },
                  { icon: '🌏', text: 'Delivered across APAC, US, UK & Middle East' },
                  { icon: '🎓', text: 'Microsoft Official Partner certification programs' }
                ].map((chip, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-gray-50 rounded-2xl px-6 py-4 border border-gray-100"
                    data-aos="fade-right"
                    data-aos-delay={i * 100}
                  >
                    <span className="text-2xl">{chip.icon}</span>
                    <span className="text-gray-700 font-medium">{chip.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div data-aos="fade-left">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center p-12 bg-teal-50 rounded-[2.5rem] border border-teal-100">
                  <div className="w-20 h-20 bg-[#00F5D4] rounded-full flex items-center justify-center text-white text-4xl mb-6 shadow-lg shadow-teal-200">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A2D6E] mb-4">Enquiry Received!</h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. One of our training consultants will contact you within 1 business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-[#0077B6] font-bold hover:underline"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleEnquirySubmit}
                  className="bg-white rounded-[2.5rem] p-12 shadow-xl shadow-blue-900/5 border border-gray-100"
                >
                  {/* Row 1: Full Name | Work Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Jane Smith"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-1">Work Email</label>
                      <input
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        required
                        placeholder="jane@company.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] transition"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company | Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-1">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder="Acme Corp"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-1">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] transition appearance-none"
                      >
                        <option value="" disabled>Select country</option>
                        {['Malaysia', 'Singapore', 'USA', 'UK', 'India', 'Australia', 'UAE', 'Indonesia', 'Other'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Training Type | No. of Participants */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-1">Training Type</label>
                      <select
                        name="trainingType"
                        value={formData.trainingType}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] transition appearance-none"
                      >
                        <option value="" disabled>Select type</option>
                        {[
                          'RPA Training — UiPath',
                          'RPA Training — Power Automate',
                          'AI & GenAI Training',
                          'Vibe Coding & n8n',
                          'Corporate Workshop',
                          'Other'
                        ].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-1">No. of Participants</label>
                      <input
                        type="number"
                        name="participants"
                        value={formData.participants}
                        onChange={handleChange}
                        required
                        min={1}
                        placeholder="e.g. 10"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] transition"
                      />
                    </div>
                  </div>

                  {/* Row 4: Preferred Date | Delivery Mode */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-1">Preferred Date</label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-1">Delivery Mode</label>
                      <select
                        name="deliveryMode"
                        value={formData.deliveryMode}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] transition appearance-none"
                      >
                        <option value="" disabled>Select mode</option>
                        {['Online', 'On-site', 'Blended'].map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Message */}
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-1">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your team's current skill level and goals..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] transition resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0A2D6E] text-white font-bold py-4 rounded-xl hover:bg-[#0077B6] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      'Send Enquiry →'
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
