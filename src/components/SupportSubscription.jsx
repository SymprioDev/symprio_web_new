import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';

export default function SupportSubscription() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  const tiers = [
    { 
      name: 'Essential', 
      price: '$999', 
      period: '/mo',
      desc: 'Bug fixes and environment maintenance for existing bots.',
      features: ['24/7 Monitoring', 'Monthly Hand-holding', 'Standard Response Time', 'Version Control Management']
    },
    { 
      name: 'Professional', 
      price: '$2,499', 
      period: '/mo',
      desc: 'Proactive optimization and minor enhancement work.',
      features: ['Priority Support', 'Bi-weekly Performance Reports', 'Process Optimization', 'Security Patches'],
      popular: true
    },
    { 
      name: 'Enterprise', 
      price: 'Custom', 
      period: '',
      desc: 'Full-scale managed services and innovation partnership.',
      features: ['Dedicated Success Manager', '24/7 Critical Support', 'Custom Bot Development', 'Strategic Roadmap Advisory']
    }
  ];

  return (
    <div className="bg-white">
      <PageBanner 
        title="Managed Services & Support" 
        breadcrumb={[{ label: 'Support' }]} 
        backgroundImage="/assets/images/digital-workforce.jpg"
      />
      
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-bold text-[#0A2D6E] mb-6" data-aos="fade-up">
              Peace of Mind for Your <span className="text-[#0077B6] italic font-serif">Digital Workforce</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
              Automation isn't "set and forget". Our support subscriptions ensure your 
               AI agents and RPA bots continue to deliver value as your systems evolve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-[3rem] border transition-all duration-300 relative flex flex-col ${tier.popular ? 'border-[#0077B6] bg-blue-50/50 shadow-2xl scale-105 z-10' : 'border-gray-100 bg-white hover:shadow-xl hover:-translate-y-2'}`}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                {tier.popular && (
                  <span className="absolute top-0 right-10 translate-y-[-50%] bg-[#00F5D4] text-[#0A2D6E] text-xs font-black uppercase px-6 py-2 rounded-full shadow-lg">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold text-[#0A2D6E] mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-[#0A2D6E]">{tier.price}</span>
                  <span className="text-gray-400 font-bold">{tier.period}</span>
                </div>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed mb-auto">
                   {tier.desc}
                </p>
                <div className="border-t border-gray-100 pt-8 mt-auto">
                  <ul className="space-y-4 mb-10">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                        <span className="text-[#00F5D4]">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => navigate('/contact')}
                    className={`w-full py-4 rounded-xl font-bold transition-all ${tier.popular ? 'bg-[#0A2D6E] text-white hover:bg-[#0077B6]' : 'bg-white border-2 border-[#0A2D6E] text-[#0A2D6E] hover:bg-gray-50'}`}
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
