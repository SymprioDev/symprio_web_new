import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';

const agenticFaqs = [
  {
    q: 'How does Agentic AI differ from traditional RPA?',
    a: 'While RPA follows fixed rules, Agentic AI uses reasoning to handle semi-structured data and changing environments. It can decide *how* to achieve a goal rather than just following steps.'
  },
  {
    q: 'Can AI agents work with my existing software?',
    a: 'Yes. Our agents are designed to use tools (APIs, web browsers, databases) just like a human would, allowing them to integrate with any legacy or modern system.'
  },
  {
    q: 'What is "Human-in-the-loop" in Agentic AI?',
    a: 'It\'s a safety framework where agents pause for human approval before high-stakes actions, ensuring you maintain full control over the AI\'s output.'
  }
];

export default function AgenticAI() {
  return (
    <ServicePageTemplate
      title="Agentic AI & LLM Solutions"
      titleAccent="Solutions"
      subtitle="The next evolution of AI: autonomous digital agents that reason, decide, and execute complex workflows without constant oversight."
      heroImage="/assets/images/agentic-ai.jpg"
      breadcrumb="Agentic AI"
      introHeading="The Next Stage of Autonomous Enterprise"
      introBody={[
        'Agentic AI represents a paradigm shift from tools that respond to tools that act. Our solutions enable organizations to deploy specialized agents that can browse the web, use internal tools, and collaborate to solve multi-stage problems autonomously.',
        'Agentic AI represents the next stage of AI evolution. While generative AI assists humans, agentic AI agents can reason, make decisions and execute tasks autonomously. They operate as digital team members, planning tasks, monitoring outcomes and adjusting strategies without constant human oversight.'
      ]}
      features={[
        {
          number: '01',
          title: 'Autonomous Decision-Making',
          desc: 'Agents reason through complex scenarios, weighing options and making informed decisions without waiting for human input at every step.',
        },
        {
          number: '02',
          title: 'End-to-End Task Execution',
          desc: 'Unlike chatbots that only suggest, agentic AI completes entire workflows—from data gathering to action—autonomously and reliably.',
          highlighted: true,
        },
        {
          number: '03',
          title: 'Continuous Learning',
          desc: 'Agents improve over time by learning from outcomes, adapting strategies, and becoming more effective with every interaction.',
        },
      ]}
      commitmentHeading="Technology & Platforms"
      commitmentBody="Symprio partners with leading agentic AI platforms, including custom LLMs and workflow orchestration tools. We emphasise integration with your existing ERP, CRM and HR systems."
      commitmentBullets={[
        'Autonomous reasoning, real-time decision making, continuous learning, multi-task orchestration',
        'We tailor agentic AI agents to your processes and governance frameworks, ensuring security, compliance and alignment with your business objectives',
        'Integration with leading agentic AI platforms and workflow orchestration tools',
      ]}
      commitmentImage="/assets/images/ai-development.jpg"
      faqs={agenticFaqs}
    />
  );
}
