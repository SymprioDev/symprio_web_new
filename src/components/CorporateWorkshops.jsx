import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';
import SEO from './SEO';

export default function CorporateWorkshops() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  return (
    <div className="bg-white">
      <SEO title="Corporate Digital Transformation Workshops" description="Bespoke digital transformation and AI strategy workshops for C-suite and senior leadership. Online and on-site across APAC and globally." />
      <PageBanner
        title="Corporate Workshops"
        breadcrumb={[{ label: 'Training', url: '/training' }, { label: 'Workshops' }]}
        backgroundImage="/assets/images/process-assessment.jpg"
      />
      
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2" data-aos="fade-right">
              <h2 className="text-4xl font-bold text-[#0A2D6E] mb-8">
                Strategic <span className="text-[#0077B6] italic font-serif">Executive</span> Enablement
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We provide high-impact workshops specifically tailored for leadership teams and 
                department heads. These sessions focus on strategic alignment, governance models, 
                and building a business case for automation.
              </p>
              <ul className="space-y-6">
                {[
                  { title: 'AI Governance', desc: 'Setting the rules for ethical and compliant AI usage.' },
                  { title: 'Ideation Bootcamps', desc: 'Identify 50+ automation use cases in a single day.' },
                  { title: 'Change Management', desc: 'Helping employees embrace the digital coworker.' }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#00F5D4] flex-shrink-0 mt-1"></div>
                    <div>
                      <h4 className="font-bold text-[#0A2D6E]">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:w-1/2 relative" data-aos="fade-left">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl">
                 <img src="/assets/images/process-assessment.jpg" alt="Corporate Workshop" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[#00F5D4] text-[#0A2D6E] p-10 rounded-[2rem] shadow-xl drop-shadow-2xl max-w-xs">
                <div className="text-3xl font-black mb-2 italic shrink-0">100%</div>
                <div className="font-bold text-sm uppercase tracking-tighter shrink-0 leading-tight">Tailored to your industry and business goals</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
