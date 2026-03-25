import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';

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
  return (
    <ServicePageTemplate
      title="AI Application Development"
      titleAccent="Development"
      subtitle="Custom AI applications that solve real-world business challenges, from intelligent chatbots to autonomous agents."
      heroImage="/assets/images/ai-development.jpg"
      breadcrumb="AI Development"
      introHeading="Future-Proof Your Business with Intelligent AI"
      introBody={[
        'Symprio specializes in building custom AI applications that solve real-world business challenges. From intelligent chatbots to autonomous agents, we help you leverage the power of Generative AI and Machine Learning to drive efficiency and innovation.',
        'Our AI solutions are built to talk to your existing stack. We don\'t just build models; we build production-ready systems that drive value from day one.'
      ]}
      features={[
        {
          number: '01',
          title: 'Conversational AI & Chatbots',
          desc: 'Next-gen chatbots with multi-language support, guided responses, and live-chat integration.',
        },
        {
          number: '02',
          title: 'Autonomous AI Agents',
          desc: 'AI agents that can take actions, use tools, and complete complex workflows independently.',
          highlighted: true,
        },
        {
          number: '03',
          title: 'Document Intelligence',
          desc: 'Automated data extraction and understanding from structured and unstructured documents.',
        },
      ]}
      commitmentHeading="Seamless Integrations"
      commitmentBody="Our AI solutions are built to talk to your existing stack. We don't just build models; we build production-ready systems that drive value from day one."
      commitmentBullets={[
        'WhatsApp & Messaging Channels',
        'Microsoft 365 & Teams',
        'SAP, Oracle & Salesforce',
        'Enterprise Data Warehouses',
      ]}
      commitmentImage="/assets/images/custom-dev.jpg"
      faqs={aiFaqs}
    />
  );
}
