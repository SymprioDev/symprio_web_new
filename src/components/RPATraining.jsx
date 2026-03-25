import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';
import SEO from './SEO';

export default function RPATraining() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  const modules = [
    { title: 'Introduction to RPA', desc: 'Understanding the automation landscape and Identifying prime candidates for automation.' },
    { title: 'UiPath / Power Automate Basics', desc: 'Hands-on training on the core development environment and basic activity sets.' },
    { title: 'Advanced Automation Logic', desc: 'Working with variables, loops, selectors, and exception handling.' },
    { title: 'Data Manipulation', desc: 'Extracting and processing data from Excel, PDF, and web applications.' },
    { title: 'Enterprise Best Practices', desc: 'Building scalable, maintainable bots using REFramework and coding standards.' }
  ];

  return (
    <div className="bg-white">
      <SEO title="RPA Training — UiPath & Power Automate" description="Hands-on UiPath and Power Automate training. Foundation to advanced level for professionals." />
      <PageBanner
        title="RPA Developer Training"
        breadcrumb={[{ label: 'Training', url: '/training' }, { label: 'RPA' }]}
        backgroundImage="/assets/images/rpa.jpg"
      />
      
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold text-[#0A2D6E] mb-8">
                Master the Art of <span className="text-[#0077B6] italic font-serif">Automation</span>
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Our RPA training program is designed to take you from a complete beginner to a 
                certified developer. We focus on practical, project-based learning using 
                market-leading platforms like UiPath and Microsoft Power Automate.
              </p>
              
              <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100">
                <h4 className="font-bold text-[#0A2D6E] mb-4 text-xl">Course Highlights</h4>
                <ul className="space-y-4">
                  {['30+ Hands-on Exercises', 'Real-world Capstone Project', 'Global Certification Prep', 'Lifetime Alumni Support'].map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                      <span className="text-[#00F5D4] text-xl">✓</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div data-aos="fade-left">
              <h3 className="text-2xl font-bold text-[#0A2D6E] mb-8">Curriculum Overview</h3>
              <div className="space-y-4">
                {modules.map((m, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold text-[#0077B6] uppercase tracking-widest">Module 0{i+1}</span>
                    </div>
                    <h4 className="font-bold text-[#0A2D6E] text-lg mb-1">{m.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
