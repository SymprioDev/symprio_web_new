import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';
import PageBanner from './PageBanner';

export default function ServicesLanding() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      title: 'Digital Transformation',
      description: 'Accelerate your business evolution with expert strategy and change management.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      link: '/digital-transformation'
    },
    {
      title: 'Agentic AI Solutions',
      description: 'Deploy autonomous AI agents that handle complex tasks and boost team productivity.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      link: '/agentic-ai'
    },
    {
      title: 'Intelligent RPA',
      description: 'Eliminate manual errors and slash operational costs with Robotic Process Automation.',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      link: '/rpa'
    },
    {
      title: 'ERP & Platforms',
      description: 'Optimize your core operations with seamless Oracle and enterprise platform solutions.',
      image: 'https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?auto=format&fit=crop&q=80&w=800',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      ),
      link: '/erp'
    },
    {
      title: 'Digital Workforce',
      description: 'Access elite IT talent and flexible staff augmentation for your enterprise.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      link: '/digital-workforce'
    },
    {
      title: 'Custom Development',
      description: 'Build bespoke, scalable software tailored to your unique business needs.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      link: '/custom-development'
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
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600"
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
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
                alt="Tech Innovation" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#185ADB]/20 backdrop-overlay"></div>
            </div>
          </div>
        </div>
      </section>

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
  );
}
