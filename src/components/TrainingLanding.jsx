import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';

export default function TrainingLanding() {
  const navigate = useNavigate();

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
    </div>
  );
}
