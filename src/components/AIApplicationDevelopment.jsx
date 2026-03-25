import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';
import CurvedDivider from './CurvedDivider';
import FAQSection from './FAQSection';

const aiFaqs = [
  {
    q: 'What kind of data do I need for a custom AI model?',
    a: 'We work with your existing structured (databases) and unstructured (documents, emails) data. If needed, we help you implement data collection and cleaning pipelines.'
  },
  {
    q: 'How long does it take to build a chatbot?',
    a: 'A production-ready intelligent chatbot usually takes 4-8 weeks to develop, including integration with your messaging channels and backend systems.'
  },
  {
    q: 'Is my data secure with your AI solutions?',
    a: 'Yes. We prioritize security and privacy, often deploying models within your own virtual private cloud (VPC) to ensure data never leaves your infrastructure.'
  }
];

export default function AIApplicationDevelopment() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  const features = [
    {
      title: 'Conversational AI & Chatbots',
      description: 'Next-gen chatbots with multi-language support, guided responses, and live-chat integration.',
      icon: '💬'
    },
    {
      title: 'Autonomous AI Agents',
      description: 'AI agents that can take actions, use tools, and complete complex workflows independently.',
      icon: '🤖'
    },
    {
      title: 'Document Intelligence',
      description: 'Automated data extraction and understanding from structured and unstructured documents.',
      icon: '📄'
    },
    {
      title: 'Computer Vision',
      description: 'Custom AI models for image recognition, object detection, and visual inspection.',
      icon: '👁️'
    },
    {
      title: 'LLM Fine-tuning',
      description: 'Adapting open-source LLMs to your specific business data and domain requirements.',
      icon: '🧠'
    },
    {
      title: 'RAG Implementation',
      description: 'Retrieval-Augmented Generation for accurate, data-backed AI responses.',
      icon: '🔍'
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
            <h2 className="text-5xl font-extrabold text-[#0A2D6E] mb-8" data-aos="fade-up">
              Future-Proof Your Business with <span className="gradient-text">Intelligent AI</span>
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
                className="p-12 rounded-[2rem] bg-white shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="text-5xl mb-8 transform group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-2xl font-bold text-[#0A2D6E] mb-4 group-hover:text-[#0077B6] transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Journey Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">Our AI Development Lifecycle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { step: '01', title: 'Discovery', icon: '🎯', desc: 'Identifying high-ROI AI use cases.' },
              { step: '02', title: 'Data Prep', icon: '📊', desc: 'Cleaning and structuring your data.' },
              { step: '03', title: 'Modeling', icon: '🧪', desc: 'Selecting and fine-tuning AI models.' },
              { step: '04', title: 'Pipeline', icon: '⛓️', desc: 'Building RAG and API integrations.' },
              { step: '05', title: 'Test', icon: '✅', desc: 'Validation and user acceptance labs.' },
              { step: '06', title: 'Scale', icon: '🚀', desc: 'Deployment and ongoing optimization.' }
            ].map((s, i) => (
              <div key={i} className="text-center" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="w-16 h-16 rounded-full bg-[#0A2D6E] text-white flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-lg border-4 border-white">
                  {s.step}
                </div>
                <h4 className="font-bold text-[#0A2D6E] mb-2">{s.title}</h4>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2" data-aos="fade-right">
              <h2 className="text-4xl font-bold text-[#0A2D6E] mb-6">
                Seamless <span className="gradient-text">Integrations</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our AI solutions are built to talk to your existing stack. We don't just build models; we build production-ready systems that drive value from day one.
              </p>
              <ul className="space-y-4">
                {['WhatsApp & Messaging Channels', 'Microsoft 365 & Teams', 'SAP, Oracle & Salesforce', 'Enterprise Data Warehouses'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700 font-semibold text-lg">
                    <div className="w-6 h-6 rounded-full bg-[#00F5D4] flex items-center justify-center text-[#0A2D6E]">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2" data-aos="fade-left">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img src="/assets/images/custom-dev.jpg" alt="AI Integration" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={aiFaqs} />

      {/* CTA */}
      <section className="py-24 bg-[#0A2D6E] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl font-black mb-8">Ready to Unleash AI?</h2>
          <p className="text-xl mb-12 opacity-80 max-w-2xl mx-auto">
            Book a discovery call today and let our experts show you how AI can transform your bottom line.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="btn-pill btn-primary text-lg !px-12 !py-5"
          >
            Start Your Discovery Phase 🚀
          </button>
        </div>
      </section>
    </div>
  );
}
