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
        backgroundImage="/assets/service%20images/about-bg.jpg"
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

      <section
        className="py-24"
        style={{ background: 'linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)' }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14" data-aos="fade-up">
              <span className="inline-flex items-center rounded-full border border-[#D6E4FF] bg-white px-5 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#185ADB] shadow-sm">
                Purpose & Direction
              </span>
              <h2 className="mt-6 text-4xl md:text-5xl font-bold text-[#0A2D6E] leading-tight">
                The principles that shape
                <span className="block text-[#0077B6]">how Symprio builds for the future</span>
              </h2>
              <p className="mt-5 max-w-3xl mx-auto text-lg leading-8 text-slate-600">
                Our mission and vision guide every transformation program we deliver, balancing practical execution
                with a long-term view of intelligent, scalable growth.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
              <article
                className="group relative overflow-hidden rounded-[2.5rem] border border-[#D9E6FF] bg-white p-8 md:p-12 shadow-[0_20px_60px_rgba(10,45,110,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(10,45,110,0.14)]"
                data-aos="fade-up"
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(135deg, rgba(24,90,219,0.06), rgba(13,148,136,0.06))' }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4 mb-10">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] text-[#0A2D6E] shadow-sm"
                      style={{ background: 'linear-gradient(135deg, #E8F1FF 0%, #D8FFF8 100%)' }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
                        <path d="M9.5 12l1.7 1.7L15 10" />
                      </svg>
                    </div>
                    <span className="rounded-full border border-[#D6E4FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#185ADB]">
                      Our Mission
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-[2.1rem] font-semibold tracking-tight text-[#0A2D6E] mb-6">
                    Deliver practical digital workforce solutions that create measurable progress.
                  </h3>
                  <p className="text-lg leading-8 text-slate-600 mb-8">
                    We help organizations solve operational bottlenecks with automation, AI, and transformation programs
                    that are designed for real adoption, sustainable ROI, and confident execution.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Built around real business outcomes',
                      'Focused on adoption, not just deployment',
                      'Designed for scalable enterprise delivery',
                      'Aligned to cost, culture, and capability'
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-4 transition-colors duration-300 group-hover:bg-white"
                      >
                        <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#0D9488]" />
                        <span className="text-sm font-medium leading-6 text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <article
                className="group relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 text-white shadow-[0_24px_70px_rgba(10,45,110,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(10,45,110,0.24)]"
                data-aos="fade-up"
                data-aos-delay="120"
                style={{ background: 'linear-gradient(145deg, #0A2D6E 0%, #185ADB 56%, #0D9488 100%)' }}
              >
                <div
                  className="absolute -right-16 -top-16 h-44 w-44 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                />
                <div
                  className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4 mb-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-white/12 text-white backdrop-blur-sm">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                        <path d="M4 15l5-5 4 4 7-7" />
                        <path d="M14 7h6v6" />
                      </svg>
                    </div>
                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white/90">
                      Our Vision
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-[2.1rem] font-semibold tracking-tight mb-6">
                    Empower enterprises through intelligent automation and modern digital transformation.
                  </h3>
                  <p className="text-lg leading-8 text-blue-50/90 mb-10 max-w-2xl">
                    We envision a future where organizations operate with more clarity, speed, and resilience by
                    combining human expertise with AI-powered systems that continuously improve how work gets done.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Smarter', value: 'Decision-making at scale' },
                      { label: 'Faster', value: 'Execution across complex workflows' },
                      { label: 'Stronger', value: 'Teams augmented by digital intelligence' }
                    ].map((item) => (
                      <div key={item.label} className="rounded-[1.75rem] border border-white/12 bg-white/10 px-5 py-5 backdrop-blur-sm">
                        <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#B9FFF3]">{item.label}</div>
                        <div className="mt-3 text-base leading-7 text-white/90">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
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
