import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';
import PageBanner from './PageBanner';
import MeetOurExperts from './MeetOurExperts';
import KeyBenefits from './KeyBenefits';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AboutUs() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  const coreValues = [
    {
      title: 'Expertise',
      description: 'Years of experience in high-performance computing and enterprise automation.',
      icon: '🏆'
    },
    {
      title: 'Innovation',
      description: 'Pushing boundaries with Agentic AI and autonomous workforce solutions.',
      icon: '💡'
    },
    {
      title: 'Integrity',
      description: 'Building transparent partnerships focused on long-term client success.',
      icon: '🤝'
    },
    {
      title: 'Quality',
      description: 'Delivering precision-engineered solutions that meet global standards.',
      icon: '✨'
    }
  ];

  const defaultLocations = [
    { name: 'Kuala Lumpur', region: 'APAC', emoji: '🇲🇾', image: '/assets/images/digital-transformation.jpg' },
    { name: 'Singapore', region: 'APAC', emoji: '🇸🇬', image: '/assets/images/custom-dev.jpg' },
    { name: 'United Kingdom', region: 'EMEA', emoji: '🇬🇧', image: '/assets/images/rpa.jpg' },
    { name: 'Australia', region: 'APAC', emoji: '🇦🇺', image: '/assets/images/ai-development.jpg' }
  ];

  return (
    <div className="bg-white">
      <SEO
        title="About Symprio — AI & Automation Consultancy"
        description="Learn about Symprio, a global AI and RPA consultancy. Serving 45+ enterprise clients across 15+ countries."
      />

      <PageBanner 
        title="About Symprio" 
        breadcrumb={[{ label: 'About Us' }]} 
        backgroundImage="/assets/images/about-bg.jpg"
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div data-aos="fade-right">
              <span className="text-[#0077B6] font-bold tracking-widest text-sm uppercase mb-4 block">Who We Are</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A2D6E] mb-8">
                Pioneering the Future of <span className="text-[#0077B6] italic font-serif">Digital Intelligence</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Symprio is a global digital transformation and AI consultancy. We help organisations identify 
                the root cause of challenges and design optimal solutions that consider culture, cost, and capability.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
                  <div className="text-4xl font-bold text-[#0A2D6E] mb-1">12+</div>
                  <div className="text-sm font-bold text-gray-400 uppercase">Years Experience</div>
                </div>
                <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
                  <div className="text-4xl font-bold text-[#0A2D6E] mb-1">250+</div>
                  <div className="text-sm font-bold text-gray-400 uppercase">Projects Delivered</div>
                </div>
              </div>
            </div>
            <div className="relative" data-aos="fade-left">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="/assets/images/hero-bg.jpg" alt="Team" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[#00F5D4] text-[#0A2D6E] p-10 rounded-[2rem] shadow-xl">
                 <div className="text-4xl font-black mb-1">99%</div>
                 <div className="text-xs font-bold uppercase tracking-widest">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0A2D6E] text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-12 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <h3 className="text-3xl font-bold mb-6 font-serif italic text-[#00F5D4]">Our Mission</h3>
              <p className="text-xl text-blue-100/70 leading-relaxed">
                To be the global leader in providing innovative and effective digital workforce solutions.
              </p>
            </div>
            <div className="p-12 rounded-[3rem] bg-[#0077B6] shadow-2xl">
              <h3 className="text-3xl font-bold mb-6 font-serif italic text-white">Our Vision</h3>
              <p className="text-xl text-blue-50 leading-relaxed">
                Empowering Enterprises through Intelligent Automation and Digital Transformations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2D6E]">Core <span className="text-[#0077B6] italic font-serif">Values</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {coreValues.map((v, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:shadow-xl transition-all text-center">
                <div className="text-4xl mb-6">{v.icon}</div>
                <h4 className="text-xl font-bold text-[#0A2D6E] mb-4">{v.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KeyBenefits />

      <MeetOurExperts />
    </div>
  );
}
