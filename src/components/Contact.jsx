import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';
import SEO from './SEO';
import FAQSection from './FAQSection';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    howDidYouHear: '',
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
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
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

  const countries = [
    'Malaysia',
    'Singapore',
    'United States',
    'United Kingdom',
    'India',
    'Australia',
    'UAE',
    'Saudi Arabia',
    'Indonesia',
    'Philippines',
    'Thailand',
    'Other'
  ];

  const howDidYouHearOptions = [
    'Google / Search Engine',
    'LinkedIn',
    'Referral / Word of Mouth',
    'Social Media',
    'Industry Event',
    'Microsoft Partner Program',
    'Other'
  ];

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

  const regionalOffices = [
    {
      flag: '🇺🇸',
      label: 'Silicon Valley, USA',
      phone: '+1 (408) 555-0123',
      email: 'usa@symprio.com'
    },
    {
      flag: '🇲🇾',
      label: 'Kuala Lumpur, Malaysia',
      phone: '+60 3 5555 0123',
      email: 'my@symprio.com'
    },
    {
      flag: '🇸🇬',
      label: 'Singapore',
      phone: '+65 6123 4567',
      email: 'sg@symprio.com'
    },
    {
      flag: '🇮🇳',
      label: 'India',
      phone: '+91 80 5555 0123',
      email: 'india@symprio.com'
    },
    {
      flag: '🇬🇧',
      label: 'UK & Middle East',
      phone: null,
      email: null,
      note: 'Remote delivery'
    }
  ];

  const selectClass =
    'w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#0077B6] transition-all appearance-none';

  return (
    <div className="bg-white">
      <SEO title="Contact Symprio — Free AI & Automation Consultation" description="Contact Symprio for a free consultation on AI, RPA, digital transformation or training. We respond within 1 business day." />
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
                Let's Start a{' '}
                <span className="text-[#0077B6] italic font-serif">Conversation</span>
              </h2>
              <p className="text-lg text-gray-600 mb-12">
                Whether you're looking to automate a single process or transform your entire
                enterprise, our team is ready to help you navigate the future of AI.
              </p>

              <div className="space-y-8">
                {[
                  {
                    icon: '📍',
                    label: 'Global Headquarters',
                    detail: 'Tower B, 8-05, Kuala Lumpur, Malaysia'
                  },
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

              {/* Regional Presence */}
              <div className="mt-16 p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
                <h4 className="font-bold text-[#0A2D6E] mb-6">Regional Presence</h4>
                <div className="space-y-5">
                  {regionalOffices.map((office, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-xl leading-none mt-0.5">{office.flag}</span>
                      <div>
                        <p className="font-semibold text-[#0A2D6E] text-sm">{office.label}</p>
                        {office.note ? (
                          <p className="text-gray-400 text-sm">{office.note}</p>
                        ) : (
                          <p className="text-gray-500 text-sm">
                            {office.phone}
                            {office.email && (
                              <>
                                {' '}
                                &middot;{' '}
                                <a
                                  href={`mailto:${office.email}`}
                                  className="text-[#0077B6] hover:underline"
                                >
                                  {office.email}
                                </a>
                              </>
                            )}
                          </p>
                        )}
                      </div>
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
                  <p className="text-gray-600">
                    Thank you for reaching out. One of our experts will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-[#0077B6] font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-blue-900/5 border border-gray-100"
                >
                  {/* Row 1: Full Name | Work Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#0077B6] transition-all"
                        placeholder="John Doe"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-2">
                        Work Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#0077B6] transition-all"
                        placeholder="john@company.com"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone | Company Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#0077B6] transition-all"
                        placeholder="+60 12 345 6789"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#0077B6] transition-all"
                        placeholder="Acme Corp"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Row 3: Country | How did you hear */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-2">
                        Country
                      </label>
                      <select name="country" className={selectClass} onChange={handleChange}>
                        <option value="">Select a country</option>
                        {countries.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-2">
                        How did you hear about us?
                      </label>
                      <select
                        name="howDidYouHear"
                        className={selectClass}
                        onChange={handleChange}
                      >
                        <option value="">Select an option</option>
                        {howDidYouHearOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Interested In */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-2">
                      Interested In
                    </label>
                    <select name="service" className={selectClass} onChange={handleChange}>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt === 'Select a service' ? '' : opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 5: Message */}
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-[#0A2D6E] mb-2 px-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#0077B6] transition-all resize-none"
                      placeholder="How can we help you?"
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Submit */}
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
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
    </div>
  );
}
