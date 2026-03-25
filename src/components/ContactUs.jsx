import React, { useState } from 'react';
import SEO from './SEO';
import PageBanner from './PageBanner';

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
    <div className="bg-white text-[#0A192F] font-sans overflow-x-hidden">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Symprio for intelligent automation, AI consulting, and digital transformation solutions. Our experts are ready to help your enterprise scale."
        keywords="contact symprio, automation consultation, AI demo, digital transformation inquiry, symprio support"
      />

      {/* Hero Banner */}
      <PageBanner 
        title="Contact Us" 
        breadcrumb={[{ label: 'Contact' }]} 
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=1600"
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left Column: Contact Info Cards */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-3 block">
                  Get In Touch
                </span>
                <h2 className="text-4xl font-bold mb-6 font-primary text-[#0A192F]">
                  Let's Start a <span className="text-[#185ADB] font-serif-italic">Conversation</span>
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
                </p>
              </div>

              {/* Info Cards */}
              <div className="space-y-6">
                <div className="flex gap-6 p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-[#185ADB] transition-all group">
                  <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#185ADB] group-hover:bg-[#185ADB] group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Email Us</h4>
                    <p className="text-gray-500 font-medium">contact@symprio.com</p>
                  </div>
                </div>

                <div className="flex gap-6 p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-[#185ADB] transition-all group">
                  <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#185ADB] group-hover:bg-[#185ADB] group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Call Us</h4>
                    <p className="text-gray-500 font-medium">+60 13 880 2574</p>
                  </div>
                </div>

                <div className="flex gap-6 p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-[#185ADB] transition-all group">
                  <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#185ADB] group-hover:bg-[#185ADB] group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Headquarters</h4>
                    <p className="text-gray-500 font-medium text-sm">Level 28, Mercu 2, KL Eco City, Kuala Lumpur</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gray-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-10"></div>
                
                {submitted ? (
                  <div className="text-center py-20 animate-fade-in">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-[#0A192F]">Thank You!</h3>
                    <p className="text-gray-500 text-lg">Your message has been received. We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                      <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-center font-bold">
                        {error}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest text-[#0A192F] opacity-60">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. John Doe"
                          required
                          className="w-full p-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#185ADB] transition-shadow duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest text-[#0A192F] opacity-60">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. john@company.com"
                          required
                          className="w-full p-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#185ADB] transition-shadow duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest text-[#0A192F] opacity-60">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +60 12 345 6789"
                          required
                          className="w-full p-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#185ADB] transition-shadow duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-widest text-[#0A192F] opacity-60">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="e.g. Symprio Corp"
                          required
                          className="w-full p-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#185ADB] transition-shadow duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-[#0A192F] opacity-60">Service of Interest</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full p-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#185ADB] transition-shadow duration-300 appearance-none"
                      >
                        <option value="">Select a service</option>
                        <option value="digital-transformation">Digital Transformation</option>
                        <option value="agentic-ai">Agentic AI Solutions</option>
                        <option value="rpa">Intelligent RPA</option>
                        <option value="erp">ERP & Platforms</option>
                        <option value="digital-workforce">Digital Workforce</option>
                        <option value="custom-dev">Custom Development</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-[#0A192F] opacity-60">Your Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project/requirements..."
                        rows={5}
                        required
                        className="w-full p-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#185ADB] transition-shadow duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#185ADB] text-white font-bold py-6 rounded-2xl hover:bg-orange-500 transition-all transform hover:-translate-y-1 shadow-xl text-lg uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[600px] w-full bg-gray-100 relative grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          title="Headquarters"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.916843472097!2d101.67207457597116!3d3.116744096858999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc498642939e69%3A0x6734177ed0428cd5!2sMercu%202!5e0!3m2!1sen!2smy!4v1711354321000!5m2!1sen!2smy" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}
