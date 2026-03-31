import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';

const dtFaqs = [
  {
    q: 'How long does a typical digital transformation take?',
    a: 'While quick wins can be achieved in 3-6 months, a full enterprise-wide transformation usually spans 12-24 months, depending on the scope and organizational maturity.'
  },
  {
    q: 'What is the "Digital Maturity Assessment"?',
    a: 'It\u2019s our proprietary framework to evaluate your current technology, culture, and processes, resulting in a colored-coded scorecard and a prioritized roadmap.'
  },
  {
    q: 'Can you work with our existing legacy systems?',
    a: 'Absolutely. We specialize in bridged transformation\u2014modernizing your workflows while ensuring your legacy core systems remain stable and integrated.'
  }
];

export default function DigitalTransformation() {
  return (
    <ServicePageTemplate
      title="Digital Transformation"
      titleAccent="Transformation"
      subtitle="Partnering with enterprise leaders to evolve their culture, technology, and operations for the digital age."
      heroImage="/assets/service%20images/digital-transformation.jpg"
      breadcrumb="Digital Transformation"
      seoTitle="Digital Transformation Services — Strategy to Execution"
      seoDescription="End-to-end digital transformation: strategy, roadmap, change management and execution. Proven methodology across APAC, US and UK."
      introHeading="Your Digital Transformation Partner"
      introBody={[
        'Symprio helps leading organizations such as Facebook (Meta), Amway, JPA, HRDF and many others in digital transformation initiatives focused on AI, Automation, Process improvements & application rationalization.',
        'Comprehensive solutions designed to accelerate your digital journey and drive sustainable business growth. We address every dimension of your digital transformation journey with holistic solutions.'
      ]}
      features={[
        {
          number: '01',
          title: 'Assess',
          desc: 'Evaluate current state, capabilities, and digital maturity across organization. Comprehensive assessment of your organization\u2019s current digital maturity.',
        },
        {
          number: '02',
          title: 'Plan',
          desc: 'Develop comprehensive strategy with clear milestones and technology roadmap. Evaluate organizational readiness and technology adoption capabilities.',
          highlighted: true,
        },
        {
          number: '03',
          title: 'Transform',
          desc: 'Execute transformation with continuous optimization and stakeholder alignment. Develop strategic digital roadmap with actionable recommendations.',
        },
      ]}
      commitmentHeading="Comprehensive Coverage Areas"
      commitmentBody="We address every dimension of your digital transformation journey with holistic solutions."
      commitmentBullets={[
        'Ecosystem, organization culture, and change management frameworks',
        'Data-driven decision making and advanced analytics for business intelligence',
        'Customer experience, innovation, and scalable technology platforms',
        'Workforce development and digital-first talent strategies',
      ]}
      commitmentImage="/assets/service%20images/digital-transformation.jpg"
      faqs={dtFaqs}
    />
  );
}
