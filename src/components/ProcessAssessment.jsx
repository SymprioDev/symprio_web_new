import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';

export default function ProcessAssessment() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  const steps = [
    {
      title: 'Discovery & Mapping',
      description: 'We interview stakeholders and document your current "as-is" processes in detail.',
      icon: '🔍'
    },
    {
      title: 'Bottleneck Analysis',
      description: 'Identifying manual handoffs, repetitive tasks, and operational inefficiencies.',
      icon: '📊'
    },
    {
      title: 'ROI Estimation',
      description: 'We calculate the potential cost savings and efficiency gains for each automation opportunity.',
      icon: '💰'
    },
    {
      title: 'Roadmap Design',
      description: 'Prioritized list of automation projects with clear timelines and resource requirements.',
      icon: '🗺️'
    }
  ];

  return (
    <div className="bg-white">
      <PageBanner 
        title="Process Assessment & Consultancy" 
        breadcrumb={[{ label: 'Services', url: '/services' }, { label: 'Consultancy' }]} 
        backgroundImage="/assets/images/process-assessment.jpg"
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold text-[#0A2D6E] mb-8">
                Don't Automate <span className="text-[#0077B6] italic font-serif">Chaos</span>. Optimize First.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Before deploying technology, it is critical to understand if a process is truly "automation-ready". 
                Symprio's assessment methodology helps you identify the high-impact areas where AI and RPA 
                can deliver maximum ROI.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 p-6 rounded-2xl bg-blue-50 border border-blue-100">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <h4 className="font-bold text-[#0A2D6E]">Strategic Alignment</h4>
                    <p className="text-gray-600">Ensuring automation goals match your long-term business objectives.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 rounded-2xl bg-teal-50 border border-teal-100">
                  <div className="text-2xl">📈</div>
                  <div>
                    <h4 className="font-bold text-[#0A2D6E]">Data-Driven Decisions</h4>
                    <p className="text-gray-600">Moving beyond intuition with clear process metrics and ROI analysis.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6" data-aos="fade-left">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6 items-center p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-2xl bg-[#0A2D6E] flex items-center justify-center text-3xl text-white flex-shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A2D6E] mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Center of Excellence section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-8">Center of Excellence (CoE) Setup</h2>
            <p className="text-xl text-gray-400 mb-10">
              We don't just deliver a project; we help you build an internal team capable of 
              governing, scaling, and maintaining your automation workforce.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-[#00F5D4] text-[#0A2D6E] font-bold px-10 py-4 rounded-xl hover:bg-white transition-colors"
            >
              Learn More About CoE
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 Z" fill="url(#grad)" />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#00F5D4', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#0077B6', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </div>
  );
}
