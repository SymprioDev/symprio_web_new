import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';
import SEO from './SEO';

const INDUSTRIES = [
  'All',
  'Banking & Finance',
  'Insurance',
  'Fintech',
  'Healthcare',
  'Telecom',
  'Manufacturing',
  'Retail',
  'Government',
];

const SERVICES = [
  'All',
  'RPA',
  'AI Development',
  'Agentic AI',
  'Digital Transformation',
  'ERP',
  'Custom Software',
];

const CASE_STUDIES = [
  {
    title: 'Invoice Processing Automation',
    industry: 'Banking & Finance',
    service: 'RPA',
    client: 'Major Southeast Asian Bank',
    stats: ['60% faster processing', '15 bots deployed', '$3M annual savings', '99.8% accuracy'],
    challenge: 'Manual invoice processing across 8 branches causing delays and errors.',
    solution: 'Deployed 15 UiPath bots to automate end-to-end invoice capture, validation, and posting.',
    image: '/assets/images/rpa.jpg',
  },
  {
    title: 'AI Claims Processing Platform',
    industry: 'Insurance',
    service: 'AI Development',
    client: 'Regional Insurance Group',
    stats: ['2hrs to 4min', '85% automation rate', '40% cost reduction'],
    challenge: 'Claims assessors spending hours per claim on data extraction and validation.',
    solution: 'Built an AI document intelligence platform using Claude and custom LLM pipelines.',
    image: '/assets/images/ai-development.jpg',
  },
  {
    title: 'Autonomous Customer Service Agent',
    industry: 'Telecom',
    service: 'Agentic AI',
    client: 'APAC Telco (Confidential)',
    stats: ['24/7 autonomous support', '70% ticket deflection', '4.8/5 CSAT score'],
    challenge: 'Tier-1 support overwhelmed with repetitive queries, high agent turnover.',
    solution: 'Deployed an Agentic AI system with tool-use capabilities, connected to CRM and billing systems.',
    image: '/assets/images/digital-transformation.jpg',
  },
  {
    title: 'Oracle Cloud ERP Migration',
    industry: 'Manufacturing',
    service: 'ERP',
    client: 'Global Auto Parts Manufacturer',
    stats: ['18-month project, on time', '35% reporting time saved', 'Unified 6 subsidiaries'],
    challenge: 'Fragmented legacy ERP systems across 6 subsidiaries causing data inconsistency.',
    solution: 'Full Oracle Cloud ERP implementation with custom integrations and change management program.',
    image: '/assets/images/erp.jpg',
  },
  {
    title: 'Digital Transformation Roadmap',
    industry: 'Government',
    service: 'Digital Transformation',
    client: 'Malaysian Government Agency',
    stats: ['200+ processes mapped', '60% digitised in Year 1', 'RM 12M cost avoidance'],
    challenge: 'Legacy manual workflows slowing citizen service delivery across 15 departments.',
    solution: 'End-to-end digital transformation strategy, process mapping, and phased implementation.',
    image: '/assets/images/process-assessment.jpg',
  },
  {
    title: 'E-Commerce AI Personalisation Engine',
    industry: 'Retail',
    service: 'AI Development',
    client: 'Southeast Asian E-Commerce Platform',
    stats: ['32% higher conversion', '28% increase in AOV', '2.1M products catalogued'],
    challenge: 'Generic product recommendations leading to poor user experience and low conversion.',
    solution: 'Built a real-time AI recommendation engine using collaborative filtering and LLM product descriptions.',
    image: '/assets/images/rpa.jpg',
  },
  {
    title: 'Healthcare RPA Back-Office',
    industry: 'Healthcare',
    service: 'RPA',
    client: 'Private Hospital Group',
    stats: ['8,000 hrs/year saved', 'Zero billing errors', 'Full audit trail'],
    challenge: 'Billing, patient record updates, and insurance claims done manually by admin staff.',
    solution: 'Deployed Power Automate bots to automate billing, records management, and insurance submissions.',
    image: '/assets/images/ai-development.jpg',
  },
  {
    title: 'Fintech Custom Lending Platform',
    industry: 'Fintech',
    service: 'Custom Software',
    client: 'Digital Lending Startup',
    stats: ['Launch in 14 weeks', '10K+ users in Month 1', 'Integrated 5 APIs'],
    challenge: 'Needed a scalable lending platform integrating credit bureaus, e-KYC, and payment gateways.',
    solution: 'Built a full-stack cloud-native lending platform with React frontend and Node.js microservices.',
    image: '/assets/images/digital-transformation.jpg',
  },
];

const STATS_BANNER = [
  { number: '45+', label: 'Enterprise Clients' },
  { number: '400+', label: 'Bots Deployed' },
  { number: '$50M+', label: 'Client Savings' },
  { number: '15+', label: 'Countries' },
];

function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: active ? '#0A2D6E' : '#F1F5F9',
        color: active ? '#FFFFFF' : '#475569',
        border: 'none',
        borderRadius: '9999px',
        padding: '6px 18px',
        fontSize: '0.8125rem',
        fontWeight: active ? 600 : 400,
        cursor: 'pointer',
        transition: 'background-color 0.2s, color 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

function CaseStudyCard({ study, index }) {
  const visibleStats = study.stats.slice(0, 3);

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-md bg-white flex flex-col"
      data-aos="fade-up"
      data-aos-delay={index * 100}
      style={{ border: '1px solid #E2E8F0' }}
    >
      {/* Image */}
      <div style={{ height: '220px', overflow: 'hidden', borderRadius: '1rem 1rem 0 0' }}>
        <img
          src={study.image}
          alt={study.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span
            style={{
              backgroundColor: '#CCFBF1',
              color: '#0D9488',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {study.industry}
          </span>
          <span
            style={{
              backgroundColor: '#DBEAFE',
              color: '#0077B6',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {study.service}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            color: '#0A2D6E',
            fontSize: '1.05rem',
            fontWeight: 700,
            lineHeight: 1.35,
            margin: 0,
          }}
        >
          {study.title}
        </h3>

        {/* Client */}
        <p
          style={{
            color: '#94A3B8',
            fontSize: '0.8rem',
            fontStyle: 'italic',
            margin: 0,
          }}
        >
          {study.client}
        </p>

        {/* Challenge */}
        <p
          style={{
            color: '#475569',
            fontSize: '0.825rem',
            margin: 0,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
          title={study.challenge}
        >
          <span style={{ fontWeight: 600, color: '#334155' }}>Challenge: </span>
          {study.challenge}
        </p>

        {/* Stats chips */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {visibleStats.map((stat, i) => (
            <span
              key={i}
              style={{
                backgroundColor: '#F0F9FF',
                color: '#0A2D6E',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid #BAE6FD',
              }}
            >
              {stat}
            </span>
          ))}
        </div>

        {/* View link */}
        <div className="pt-2">
          <span
            style={{
              color: '#0077B6',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#0077B6')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
          >
            View Case Study &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudiesLanding() {
  const [activeIndustry, setActiveIndustry] = useState('All');
  const [activeService, setActiveService] = useState('All');

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [activeIndustry, activeService]);

  const filtered = CASE_STUDIES.filter(c => {
    const industryMatch = activeIndustry === 'All' || c.industry === activeIndustry;
    const serviceMatch = activeService === 'All' || c.service === activeService;
    return industryMatch && serviceMatch;
  });

  return (
    <div className="bg-white">
      <SEO title="Case Studies — AI & Automation Success Stories" description="Real-world results: see how Symprio helped enterprises reduce costs, save time, and grow with AI and RPA." />
      <PageBanner
        title="Success Stories"
        breadcrumb={[{ label: 'Case Studies' }]}
        backgroundImage="/assets/images/digital-transformation.jpg"
      />

      {/* Stats Banner */}
      <section
        style={{
          backgroundColor: '#0A2D6E',
          padding: '40px 0',
        }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS_BANNER.map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: '2.25rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.1,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: '#93C5FD',
                    marginTop: '6px',
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">

          {/* Filter rows */}
          <div className="mb-10 flex flex-col gap-4">
            {/* Industry row */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  marginRight: '4px',
                  minWidth: '62px',
                }}
              >
                Industry
              </span>
              {INDUSTRIES.map(ind => (
                <FilterPill
                  key={ind}
                  label={ind}
                  active={activeIndustry === ind}
                  onClick={() => setActiveIndustry(ind)}
                />
              ))}
            </div>

            {/* Service row */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  marginRight: '4px',
                  minWidth: '62px',
                }}
              >
                Service
              </span>
              {SERVICES.map(svc => (
                <FilterPill
                  key={svc}
                  label={svc}
                  active={activeService === svc}
                  onClick={() => setActiveService(svc)}
                />
              ))}
            </div>
          </div>

          {/* Count line */}
          <p
            style={{
              fontSize: '0.875rem',
              color: '#64748B',
              marginBottom: '28px',
              fontWeight: 500,
            }}
          >
            Showing{' '}
            <span style={{ color: '#0A2D6E', fontWeight: 700 }}>{filtered.length}</span> of{' '}
            <span style={{ color: '#0A2D6E', fontWeight: 700 }}>{CASE_STUDIES.length}</span> case
            studies
          </p>

          {/* Grid or empty state */}
          {filtered.length === 0 ? (
            <div
              className="text-center py-20"
              style={{ color: '#94A3B8', fontSize: '1rem' }}
            >
              No case studies match your filters. Try adjusting.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((study, i) => (
                <CaseStudyCard key={study.title} study={study} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
