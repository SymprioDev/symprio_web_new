import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';

export default function Contact() {
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

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-white">
      <PageBanner 
        title="Get in Touch" 
        breadcrumb={[{ label: 'Contact' }]} 
        backgroundImage="/assets/images/contact-bg.jpg"
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold text-[#0A2D6E] mb-8">
                Let's Start a <span className="text-[#0077B6] italic font-serif">Conversation</span>
              </h2>
              <p className="text-lg text-gray-600 mb-12">
                Whether you're looking to automate a single process or transform your entire enterprise, 
                our team is ready to help you navigate the future of AI.
              </p>

              <div className="space-y-8">
                {[
                  { icon: '📍', label: 'Global Headquarters', detail: 'Tower B, 8-05, Kuala Lumpur, Malaysia' },
                  { icon: '📧', label: 'Email Us', detail: 'contact@symprio.com' },
                  { icon: '📱', label: 'WhatsApp / Phone', detail: '+60 13 880 2574' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A2D6E] text-lg">{item.label}</h4>
                      <p className="text-gray-500">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Regional Offices */}
              <div className="mt-16 p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
                <h4 className="font-bold text-[#0A2D6E] mb-6">Regional Presence</h4>
                <div className="grid grid-cols-2 gap-6">
                  {['Singapore', 'United Kingdom', 'Australia', 'India'].map((office, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-600 font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#00F5D4]"></span>
                      {office}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div data-aos="fade-left">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-teal-50 rounded-[3rem] border border-teal-100">
                  <div className="w-20 h-20 bg-[#00F5D4] rounded-full flex items-center justify-center text-white text-4xl mb-6 shadow-lg shadow-teal-200">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A2D6E] mb-4">Message Received!</h3>
                  <p className="text-gray-600">Thank you for reaching out. One of our experts will contact you within 24 hours.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-[#0077B6] font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-blue-900/5 border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-2">Name</label>
                      <input 
                        type="text" name="name" required
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#0077B6] transition-all"
                        placeholder="John Doe"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-2">Work Email</label>
                      <input 
                        type="email" name="email" required
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#0077B6] transition-all"
                        placeholder="john@company.com"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-2">Interested In</label>
                    <select 
                      name="service"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#0077B6] transition-all appearance-none"
                      onChange={handleChange}
                    >
                      <option>Select a service</option>
                      <option>RPA & Automation</option>
                      <option>AI & GenAI Solutions</option>
                      <option>Digital Transformation</option>
                      <option>Training & Enablement</option>
                      <option>Other Enquiry</option>
                    </select>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-2">Message</label>
                    <textarea 
                      name="message" required rows="4"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#0077B6] transition-all resize-none"
                      placeholder="How can we help you?"
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-5 rounded-2xl bg-[#0A2D6E] text-white font-bold text-lg hover:bg-[#0077B6] transition-all flex items-center justify-center gap-3 drop-shadow-xl shadow-blue-900/20"
                  >
                    {loading ? (
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </>
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
