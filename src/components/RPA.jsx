import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';

export default function RPA() {
  return (
    <ServicePageTemplate
      title="Robotic Process"
      titleAccent="Automation"
      subtitle="Intelligent bots created to automate high-volume, repetitive tasks—enhancing accuracy and scaling your digital workforce."
      heroImage="/assets/images/rpa.jpg"
      breadcrumb="RPA"
      breadcrumbPath="/services/rpa"
      seoTitle="RPA Services — UiPath & Power Automate Experts"
      seoDescription="Comprehensive RPA services from assessment to deployment. UiPath, Power Automate, Automation Anywhere. 400+ bots deployed across APAC."
      introHeading="Robotic Process Automation Services"
      introBody={[
        "Symprio provides end-to-end RPA services from assessment through delivery, including ongoing support, training, and establishment of an RPA Center of Excellence. Our experienced architects and developers leverage leading platforms like UiPath and Microsoft Power Automate to deliver enterprise-grade automation solutions.",
        "Robotic Process Automation (RPA) is the automation of repetitive, rules-based tasks across departments to boost accuracy, speed and compliance. By deploying intelligent software robots, organizations can eliminate manual work, reduce errors, and free up employees to focus on high-value strategic activities."
      ]}
      features={[
        {
          number: '01',
          title: 'Assessment & Planning',
          desc: 'Evaluate processes and spot high-impact automation opportunities. Develop roadmap, set priorities and establish governance framework.',
          highlighted: false
        },
        {
          number: '02',
          title: 'Bot Development & Deployment',
          desc: 'Design and develop bots with UiPath or Power Automate. Test, validate and deploy bots to production environment.',
          highlighted: true
        },
        {
          number: '03',
          title: 'Managed Support & Optimization',
          desc: '24/7 monitoring, optimization and continuous improvement. Establish CoE, train teams and build internal capability.',
          highlighted: false
        }
      ]}
      commitmentHeading="Manual vs Automated"
      commitmentBody="A clear side-by-side comparison of outcomes before and after automation. Our track record includes 400+ robots deployed, 45+ customers served across 15 countries."
      commitmentBullets={[
        "Processing time reduced from 8-10 hours/day to minutes — 90% faster",
        "Error rate drops from 5-10% to less than 0.1% — 99% reduction",
        "24/7 availability without breaks — 100% uptime",
        "Cost reduced from $15,000-20,000/month to $2,000-3,000 — 85% savings"
      ]}
      commitmentImage="/assets/images/rpa.jpg"
      faqs={[
        {
          q: 'What types of processes can be automated with RPA?',
          a: 'RPA is ideal for high-volume, rules-based, repetitive tasks such as invoice processing, employee onboarding, order-to-cash processes, and regulatory reporting.'
        },
        {
          q: 'Which RPA platforms do you work with?',
          a: 'Our experienced architects and developers leverage leading platforms like UiPath and Microsoft Power Automate to deliver enterprise-grade automation solutions.'
        },
        {
          q: 'How long does a typical RPA implementation take?',
          a: 'Assessment takes 2-4 weeks, planning 2-3 weeks, and bot build time varies by complexity. Deployment typically takes 1-2 weeks, with ongoing training and optimization.'
        }
      ]}
    />
  );
}
