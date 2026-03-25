import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';

export default function CaseStudiesLanding() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  const cases = [
    { title: 'Global Bank Automation', industry: 'Banking', result: '45% Cost Reduction', image: '/assets/images/rpa.jpg' },
    { title: 'HR Shared Services Transformation', industry: 'Manufacturing', result: '90% Accuracy Boost', image: '/assets/images/process-assessment.jpg' },
    { title: 'AI-Powered Underwriting', industry: 'Insurance', result: '2h to 2min Cycle Time', image: '/assets/images/ai-development.jpg' }
  ];

  return (
    <div className="bg-white">
      <PageBanner 
        title="Success Stories" 
        breadcrumb={[{ label: 'Case Studies' }]} 
        backgroundImage="/assets/images/digital-transformation.jpg"
      />
      
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {cases.map((c, i) => (
              <div 
                key={i} 
                className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-xl"
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-transparent p-12 flex flex-col justify-end">
                  <div className="text-[#00F5D4] text-xs font-bold uppercase tracking-widest mb-4">{c.industry}</div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{c.title}</h3>
                  <div className="flex items-center gap-4 text-white/70 text-sm font-medium">
                    <span className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[#00F5D4] font-black italic">
                       {c.result}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
