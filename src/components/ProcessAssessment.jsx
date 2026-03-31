import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';

export default function ProcessAssessment() {
  return (
    <ServicePageTemplate
      title="Process Assessment &"
      titleAccent="Consultancy"
      subtitle="Understand your processes before you automate them."
      heroImage="/assets/service%20images/process-assessment.jpg"
      breadcrumb="Process Assessment"
      seoTitle="Process Assessment & Consultancy Services"
      seoDescription="Symprio studies your business processes and recommends the best automation strategy. Domain-agnostic consultancy for SMEs and enterprises."
      introHeading="Don't Automate Chaos. Optimize First."
      introBody={[
        "Before deploying technology, it is critical to understand if a process is truly \"automation-ready\". Symprio's assessment methodology helps you identify the high-impact areas where AI and RPA can deliver maximum ROI.",
        "We help you build an internal Center of Excellence capable of governing, scaling, and maintaining your digital workforce independently. Our approach ensures strategic alignment and data-driven decisions with clear process metrics and ROI analysis."
      ]}
      features={[
        {
          number: '01',
          title: 'Discovery & Mapping',
          desc: 'We interview stakeholders and document your current "as-is" processes in detail, identifying manual handoffs, repetitive tasks, and operational inefficiencies.',
          highlighted: false
        },
        {
          number: '02',
          title: 'ROI Estimation',
          desc: 'We calculate the potential cost savings and efficiency gains for each automation opportunity using our proprietary Automation Scorecard that ranks processes based on volume, complexity, standardisation, and potential ROI.',
          highlighted: true
        },
        {
          number: '03',
          title: 'Roadmap Design',
          desc: 'Prioritized list of automation projects with clear timelines and resource requirements, ensuring automation goals match your long-term business objectives.',
          highlighted: false
        }
      ]}
      commitmentHeading="CoE Setup & Governance"
      commitmentBody="We help you build an internal Center of Excellence capable of governing, scaling, and maintaining your digital workforce independently."
      commitmentBullets={[
        "Strategic alignment — ensuring automation goals match your long-term business objectives",
        "Data-driven decisions — moving beyond intuition with clear process metrics and ROI analysis",
        "Bottleneck analysis — identifying manual handoffs, repetitive tasks, and operational inefficiencies",
        "Prioritized roadmap — clear timelines, resource requirements, and governance framework"
      ]}
      commitmentImage="/assets/service%20images/process-assessment.jpg"
      faqs={[
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
          a: 'It\u2019s our proprietary scoring system that ranks processes based on volume, complexity, standardisation, and potential ROI to help you prioritise your roadmap.'
        }
      ]}
    />
  );
}
