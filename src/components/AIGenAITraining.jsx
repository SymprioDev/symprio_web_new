import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';
import SEO from './SEO';

export default function AIGenAITraining() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  const tracks = [
    { title: 'Generative AI for Business', level: 'Beginner', duration: '1 Day' },
    { title: 'Prompt Engineering Masterclass', level: 'Intermediate', duration: '2 Days' },
    { title: 'Building AI Agents', level: 'Advanced', duration: '4 Days' },
    { title: 'Responsible AI & Ethics', level: 'All Levels', duration: 'Half-Day' }
  ];

  return (
    <div className="bg-white">
      <SEO title="AI & Generative AI Training" description="Practical AI and GenAI training covering ChatGPT, Claude, Manus, n8n, vibe coding and AI agent workflows for business teams." />
      <PageBanner
        title="AI & GenAI Training"
        breadcrumb={[{ label: 'Training', url: '/training' }, { label: 'AI & GenAI' }]}
        backgroundImage="/assets/service%20images/ai%20training.jpg"
      />
      
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-bold text-[#0A2D6E] mb-6" data-aos="fade-up">
              The Future of Work is <span className="text-[#00F5D4] italic font-serif">Augmented</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
              Don't just use AI—understand it. Our Generative AI training tracks empower your workforce 
              to integrate AI into their daily tasks safely and effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tracks.map((track, i) => (
              <div 
                key={i} 
                className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-[#0A2D6E] hover:text-white transition-all duration-500 group"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="text-gray-400 group-hover:text-blue-300 transition-colors text-sm font-bold uppercase mb-4">{track.level}</div>
                <h4 className="text-xl font-bold mb-6 group-hover:text-white leading-tight">{track.title}</h4>
                <div className="flex items-center gap-2 text-sm opacity-60">
                   <span>⏱️</span> {track.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
