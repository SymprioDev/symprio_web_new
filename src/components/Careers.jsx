import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';

export default function Careers() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  const jobs = [
    { title: "Senior RPA Developer", type: "Full-time", location: "Kuala Lumpur, Malaysia", icon: "🤖" },
    { title: "AI Solution Architect", type: "Full-time", location: "Singapore / Remote", icon: "🧠" },
    { title: "Oracle Cloud Consultant", type: "Contract", location: "India", icon: "☁️" },
    { title: "UX/UI Designer", type: "Full-time", location: "Remote", icon: "🎨" }
  ];

  return (
    <div className="bg-white">
      <PageBanner 
        title="Join Our Team" 
        breadcrumb={[{ label: 'Careers' }]} 
        backgroundImage="/assets/images/digital-workforce.jpg"
      />
      
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-bold text-[#0A2D6E] mb-6" data-aos="fade-up">
              Build the Future of <span className="text-[#0077B6] italic font-serif">Automation</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
              We are a global team of innovators, dreamers, and doers. At Symprio, you'll work on 
              cutting-edge AI projects that redefine how businesses operate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {jobs.map((job, i) => (
              <div 
                key={i} 
                className="p-10 rounded-[3rem] border border-gray-100 bg-white shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="absolute top-0 right-0 p-8 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">
                   {job.icon}
                </div>
                <div className="flex flex-col h-full">
                  <div className="mb-8">
                    <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-[#0077B6] text-xs font-bold uppercase tracking-widest mb-4">
                      {job.type}
                    </span>
                    <h3 className="text-2xl font-bold text-[#0A2D6E] group-hover:text-[#0077B6] transition-colors mb-2">
                       {job.title}
                    </h3>
                    <div className="text-gray-400 flex items-center gap-2">
                      <span>📍</span> {job.location}
                    </div>
                  </div>
                  <button className="mt-auto w-full py-5 rounded-2xl bg-gray-50 text-[#0A2D6E] font-bold hover:bg-[#0A2D6E] hover:text-white transition-all transform group-hover:scale-[1.02]">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { title: 'Remote First', desc: 'Flexible work arrangements for a better work-life balance.', icon: '🏠' },
              { title: 'Global Impact', desc: 'Work with Fortune 500 clients across 15+ countries.', icon: '🌍' },
              { title: 'Modern Stack', desc: 'Build with the latest AI, RPA, and cloud technologies.', icon: '⚡' }
            ].map((perk, idx) => (
              <div key={idx} data-aos="zoom-in" data-aos-delay={idx * 100}>
                <div className="text-4xl mb-6">{perk.icon}</div>
                <h4 className="text-xl font-bold text-[#0A2D6E] mb-4">{perk.title}</h4>
                <p className="text-gray-600 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
