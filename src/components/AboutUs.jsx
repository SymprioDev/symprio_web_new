import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';
import PageBanner from './PageBanner';
import MeetOurExperts from './MeetOurExperts';

export default function AboutUs() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);

  const coreValues = [
    {
      title: 'Expertise',
      description: 'Years of experience in high-performance computing and enterprise automation.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Innovation',
      description: 'Pushing boundaries with Agentic AI and autonomous workforce solutions.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-1.003L8.86 17.2z" />
        </svg>
      )
    },
    {
      title: 'Integrity',
      description: 'Building transparent partnerships focused on long-term client success.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Quality',
      description: 'Delivering precision-engineered solutions that meet global standards.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
        </svg>
      )
    }
  ];

  const defaultLocations = [
    { name: 'Silicon Valley', region: 'North America', emoji: '🇺🇸', image_url: 'https://images.unsplash.com/photo-1549194388-2469d59ec75c?auto=format&fit=crop&q=80&w=800' },
    { name: 'Kuala Lumpur', region: 'APAC', emoji: '🇲🇾', image_url: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&q=80&w=800' },
    { name: 'Singapore', region: 'APAC', emoji: '🇸🇬', image_url: 'https://images.unsplash.com/photo-1525625232717-121dbde44b02?auto=format&fit=crop&q=80&w=800' },
    { name: 'India', region: 'APAC', emoji: '🇮🇳', image_url: 'https://images.unsplash.com/photo-1524492707947-2f85a643199c?auto=format&fit=crop&q=80&w=800' }
  ];

  const locationsToRender = locations.length > 0 ? locations : defaultLocations;

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        if (response.ok) {
          const data = await response.json();
          setLocations(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="bg-white text-[#0A192F] font-sans overflow-x-hidden">
      <SEO 
        title="About Us" 
        description="Learn about Symprio, a global leader in intelligent automation and digital transformation. Our mission is to empower businesses with cutting-edge AI solutions."
        keywords="about symprio, automation company, digital transformation experts, AI solutions provider, silicon valley tech"
      />

      {/* Hero Banner */}
      <PageBanner 
        title="About Our Company" 
        breadcrumb={[{ label: 'About Us' }]} 
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600"
      />

      {/* Who We Are & Counters Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-3 block">
                Who We Are
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-primary italic text-[#185ADB]">
                Pioneering the Future of <span className="text-[#0A192F] font-serif-italic not-italic">Digital Intelligence</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Symprio is a global digital transformation and AI consultancy. We believe every customer, business problem and solution is unique. We help organisations identify the root cause of challenges—whether related to people, process or technology—and design optimal solutions that consider culture, cost and capability.
              </p>
              
              {/* Counters */}
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-orange-500 transition-colors">
                  <div className="text-4xl font-bold text-[#185ADB] mb-2">12+</div>
                  <div className="text-gray-500 font-medium">Years Experience</div>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-orange-500 transition-colors">
                  <div className="text-4xl font-bold text-[#185ADB] mb-2">250+</div>
                  <div className="text-gray-500 font-medium">Successful Projects</div>
                </div>
              </div>
            </div>

            {/* Right Image Mockup */}
            <div className="relative">
              <div className="bg-[#185ADB]/5 absolute inset-0 -rotate-3 rounded-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Synergy" 
                className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3]"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl z-20 hidden md:block border-b-4 border-orange-500">
                <div className="text-5xl font-bold text-[#0A192F] mb-1">99%</div>
                <div className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Orbixa Style */}
      <section className="py-24 bg-[#0A192F] text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-12 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-6 font-primary">Our Mission</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                To empower enterprises with intelligent automation, AI and digital innovations that unlock productivity and growth for the modern age.
              </p>
            </div>
            <div className="p-12 bg-[#185ADB] rounded-3xl shadow-2xl group">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-6 font-primary">Our Vision</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                To create a world where people and autonomous technologies collaborate seamlessly, enabling organisations to adapt and thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-3 block">
              Our Principles
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] mb-6 font-primary">
              Core <span className="text-[#185ADB] font-serif-italic">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => (
              <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border-b-4 border-transparent hover:border-[#185ADB] box-border h-full">
                <div className="text-[#185ADB] mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-[#0A192F] font-primary">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-3 block">
              Global Network
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] mb-6 font-primary">
              Where We <span className="text-[#185ADB] font-serif-italic">Operate</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {locationsToRender.map((location, idx) => (
              <div key={idx} className="group relative h-[300px] rounded-3xl overflow-hidden shadow-lg">
                <img 
                  src={location.image_url} 
                  alt={location.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <div className="text-3xl mb-2">{location.emoji || '📍'}</div>
                  <h4 className="text-xl font-bold text-white mb-1">{location.name}</h4>
                  <p className="text-gray-300 text-sm font-medium uppercase tracking-widest">{location.region}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Experts Section */}
      <MeetOurExperts />

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-[#185ADB] rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center md:text-left">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-2/3">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-primary">
                  Ready to Join Our <span className="text-orange-400 font-serif-italic">Digital Revolution?</span>
                </h2>
                <p className="text-blue-100 text-lg max-w-xl">
                  We're always looking for exceptional talent to join our global team. Explore open roles and start your journey with Symprio.
                </p>
              </div>
              <div className="md:w-1/3 text-center md:text-right">
                <button 
                  onClick={() => navigate('/careers')}
                  className="bg-white text-[#185ADB] font-bold px-10 py-5 rounded-2xl hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl text-lg uppercase tracking-wider"
                >
                  Explore Careers
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
