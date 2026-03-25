import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';

export default function AIApplicationDevelopment() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  const features = [
    {
      title: 'Conversational AI & Chatbots',
      description: 'Next-gen chatbots with multi-language support, guided responses, and live-chat integration.',
      icon: '💬',
      bg: 'rgba(10, 45, 110, 0.05)'
    },
    {
      title: 'Autonomous AI Agents',
      description: 'AI agents that can take actions, use tools, and complete complex workflows independently.',
      icon: '🤖',
      bg: 'rgba(0, 119, 182, 0.05)'
    },
    {
      title: 'Document Intelligence',
      description: 'Automated data extraction and understanding from structured and unstructured documents.',
      icon: '📄',
      bg: 'rgba(0, 245, 212, 0.05)'
    },
    {
      title: 'Computer Vision',
      description: 'Custom AI models for image recognition, object detection, and visual inspection.',
      icon: '👁️',
      bg: 'rgba(10, 45, 110, 0.05)'
    },
    {
      title: 'LLM Fine-tuning',
      description: 'Adapting open-source LLMs to your specific business data and domain requirements.',
      icon: '🧠',
      bg: 'rgba(0, 119, 182, 0.05)'
    },
    {
      title: 'RAG Implementation',
      description: 'Retrieval-Augmented Generation for accurate, data-backed AI responses.',
      icon: '🔍',
      bg: 'rgba(0, 245, 212, 0.05)'
    }
  ];

  return (
    <div className="bg-white">
      <PageBanner 
        title="AI Application Development" 
        breadcrumb={[{ label: 'Services', url: '/services' }, { label: 'AI Development' }]} 
        backgroundImage="/assets/images/ai-development.jpg"
      />

      {/* Intro Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#0A2D6E] mb-8" data-aos="fade-up">
              Future-Proof Your Business with <span className="text-[#0077B6] italic font-serif">Intelligent AI</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12" data-aos="fade-up" data-aos-delay="100">
              Symprio specializes in building custom AI applications that solve real-world business challenges. 
              From intelligent chatbots to autonomous agents, we help you leverage the power of Generative AI 
              and Machine Learning to drive efficiency and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div 
                key={i} 
                className="p-10 rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="text-4xl mb-6">{f.icon}</div>
                <h3 className="text-2xl font-bold text-[#0A2D6E] mb-4 group-hover:text-[#0077B6] transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-24 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2" data-aos="fade-right">
              <h2 className="text-4xl font-bold text-[#0A2D6E] mb-6">
                Seamless <span className="text-[#00F5D4] drop-shadow-sm">Integrations</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Your AI applications shouldn't live in a silo. We integrate our solutions with your existing 
                Ecosystem—CRM, ERP, Messaging platforms, and Cloud infrastructure.
              </p>
              <ul className="space-y-4">
                {['WhatsApp & Messaging', 'Microsoft Teams & Slack', 'Salesforce & Oracle', 'AWS, Azure & Google Cloud'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700 font-semibold">
                    <svg className="w-5 h-5 text-[#00F5D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2" data-aos="fade-left">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="/assets/images/custom-dev.jpg" alt="AI Integration" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0A2D6E] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Build Your AI Future?</h2>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-[#00F5D4] text-[#0A2D6E] font-bold px-12 py-5 rounded-2xl hover:scale-105 transition-transform"
          >
            Schedule a Demo
          </button>
        </div>
      </section>
    </div>
  );
}
