import FAQSection from './FAQSection';

const paFaqs = [
  {
    q: 'How long does a process assessment take?',
    a: 'A typical assessment for a single department takes 2-4 weeks, while an enterprise-wide automation roadmap can take 6-8 weeks.'
  },
  {
    q: 'What do you need from our team during the assessment?',
    a: 'We usually require 2-3 hours of interview time with each process owner and access to any existing SOP (Standard Operating Procedure) documents.'
  },
  {
    q: 'What is the "Automation Scorecard"?',
    a: 'It’s our proprietary scoring system that ranks processes based on volume, complexity, standardisation, and potential ROI to help you prioritise your roadmap.'
  }
];

export default function ProcessAssessment() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  const steps = [
    {
      title: 'Discovery & Mapping',
      description: 'We interview stakeholders and document your current "as-is" processes in detail.',
      icon: '🔍'
    },
    {
      title: 'Bottleneck Analysis',
      description: 'Identifying manual handoffs, repetitive tasks, and operational inefficiencies.',
      icon: '📊'
    },
    {
      title: 'ROI Estimation',
      description: 'We calculate the potential cost savings and efficiency gains for each automation opportunity.',
      icon: '💰'
    },
    {
      title: 'Roadmap Design',
      description: 'Prioritized list of automation projects with clear timelines and resource requirements.',
      icon: '🗺️'
    }
  ];

  return (
    <div className="bg-white">
      <PageBanner 
        title="Process Assessment & Consultancy" 
        breadcrumb={[{ label: 'Services', url: '/services' }, { label: 'Consultancy' }]} 
        backgroundImage="/assets/images/process-assessment.jpg"
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div data-aos="fade-right">
              <h2 className="text-5xl font-extrabold text-[#0A2D6E] mb-8 leading-tight">
                Don't Automate <span className="gradient-text">Chaos</span>.<br />Optimize First.
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Before deploying technology, it is critical to understand if a process is truly "automation-ready". 
                Symprio's assessment methodology helps you identify the high-impact areas where AI and RPA 
                can deliver maximum ROI.
              </p>
              <div className="space-y-6">
                <div className="flex gap-6 p-8 rounded-[2rem] bg-blue-50/50 border border-blue-100 hover:shadow-lg transition-shadow">
                  <div className="text-3xl">🏆</div>
                  <div>
                    <h4 className="font-extrabold text-[#0A2D6E] text-xl mb-1">Strategic Alignment</h4>
                    <p className="text-gray-600">Ensuring automation goals match your long-term business objectives.</p>
                  </div>
                </div>
                <div className="flex gap-6 p-8 rounded-[2rem] bg-teal-50/50 border border-teal-100 hover:shadow-lg transition-shadow">
                  <div className="text-3xl">📈</div>
                  <div>
                    <h4 className="font-extrabold text-[#0A2D6E] text-xl mb-1">Data-Driven Decisions</h4>
                    <p className="text-gray-600">Moving beyond intuition with clear process metrics and ROI analysis.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6" data-aos="fade-left">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-8 items-center p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 group">
                  <div className="w-20 h-20 rounded-3xl bg-[#0A2D6E] flex items-center justify-center text-4xl text-white flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#0A2D6E] mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Center of Excellence section */}
      <section className="py-24 bg-[#0A2D6E] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 Z" fill="white" />
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-8">CoE Setup & Governance</h2>
            <p className="text-2xl text-white/80 mb-12 leading-relaxed">
              We help you build an internal Center of Excellence capable of 
              governing, scaling, and maintaining your digital workforce independently.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="btn-pill btn-primary !px-12 !py-5"
            >
              Start Your CoE Journey 🚀
            </button>
          </div>
        </div>
      </section>

      <FAQSection faqs={paFaqs} />
    </div>
  );
}
