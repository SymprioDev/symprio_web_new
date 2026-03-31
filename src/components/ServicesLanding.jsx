import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';
import PageBanner from './PageBanner';
import Industries from './Industries';
import PowerfulFeatures from './PowerfulFeatures';
import VideoInsights from './VideoInsights';

export default function ServicesLanding() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      title: 'Robotic Process Automation',
      description: 'Automate repetitive tasks with UiPath, Power Automate & Automation Anywhere.',
      image: '/assets/service%20images/rpa.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      link: '/services/rpa'
    },
    {
      title: 'AI Application Development',
      description: 'Chatbots, AI agents, document intelligence & computer vision.',
      image: '/assets/service%20images/ai-development.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      link: '/services/ai-development'
    },
    {
      title: 'Agentic AI & LLM Solutions',
      description: 'Autonomous agents, LLM fine-tuning & RAG implementation.',
      image: '/assets/service%20images/agentic-ai.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      link: '/services/agentic-ai'
    },
    {
      title: 'Process Assessment & Consultancy',
      description: 'We study your processes and recommend the best path forward.',
      image: '/assets/service%20images/consult.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      link: '/services/process-assessment'
    },
    {
      title: 'Digital Transformation',
      description: 'Strategy, roadmap, change management and execution.',
      image: '/assets/service%20images/digital-transformation.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      link: '/services/digital-transformation'
    },
    {
      title: 'ERP & Oracle Services',
      description: 'Oracle Cloud & R12 implementations, integrations and upgrades.',
      image: '/assets/service%20images/erp.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      link: '/services/erp-oracle'
    },
    {
      title: 'Custom Software Development',
      description: 'Full-stack web, mobile and cloud-native solutions.',
      image: '/assets/service%20images/custom-dev.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      link: '/services/custom-software'
    },
    {
      title: 'Digital Workforce',
      description: 'Expert IT talent with flexible engagement models.',
      image: '/assets/service%20images/digital-workforce.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      link: '/services/digital-workforce'
    }
  ];

  return (
    <div className="bg-white text-[#0A192F] font-sans">
      <SEO 
        title="Our Services" 
        description="Comprehensive automation, AI, and digital transformation services. From RPA to Agentic AI, Symprio delivers tailored solutions for enterprise success."
        keywords="automation services, AI consulting, digital workforce, ERP implementation, software development"
      />

      {/* Hero Banner */}
      <PageBanner 
        title="Our Services" 
        breadcrumb={[{ label: 'Services' }]} 
        backgroundImage="/assets/service%20images/services.png"
      />

      {/* Services Grid Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-3 block">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] mb-6 font-primary">
              Innovative <span className="text-[#185ADB] font-serif-italic">Solutions</span> for Your Business
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We provide a suite of intelligent services designed to streamline your operations 
              and drive sustainable digital growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col h-full"
                onClick={() => navigate(service.link)}
              >
                {/* Card Image Wrapper */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Icon Overlay Badge */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#185ADB] group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Card Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-[#0A192F] mb-4 group-hover:text-[#185ADB] transition-colors font-primary">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                    {service.description}
                  </p>
                  
                  {/* Explore Link */}
                  <div className="flex items-center text-[#185ADB] font-bold uppercase tracking-wider text-sm group-hover:text-orange-500 transition-colors">
                    <span>Explore More</span>
                    <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Added for richness */}
      <section className="py-24 bg-[#0A192F] text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-3 block">
                Our Advantage
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-primary">
                Why Partner with <span className="text-[#185ADB] font-serif-italic">Symprio?</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-orange-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Proven Track Record</h4>
                    <p className="text-gray-400">Over a decade of experience delivering enterprise-grade automation solutions globally.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-orange-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Cutting-Edge AI</h4>
                    <p className="text-gray-400">Pioneers in Agentic AI and autonomous workforce deployment for future-proof growth.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/assets/images/about-bg.jpg" 
                alt="Tech Innovation" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#185ADB]/20 backdrop-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      <Industries />
      <PowerfulFeatures />
      <VideoInsights />

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-[#185ADB] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-primary italic">
                Ready to <span className="text-orange-400 font-serif-italic not-italic">Automate</span> Your Future?
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
                Contact us today for a free consultation and discover how our solutions can transform your organization.
              </p>
              <button 
                onClick={() => navigate('/enquiry')}
                className="bg-white text-[#185ADB] font-bold px-12 py-5 rounded-2xl hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg text-lg uppercase tracking-wider"
              >
                Get Started Now
              </button>
            </div>
            {/* Background Decorations */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full"></div>
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/5 rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
