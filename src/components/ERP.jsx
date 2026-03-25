import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';

export default function ERP() {
  return (
    <ServicePageTemplate
      title="ERP & Oracle"
      titleAccent="Services"
      subtitle="Transforming complex business operations into streamlined, cloud-native powerhouses."
      heroImage="/assets/images/erp-oracle.jpg"
      breadcrumb="ERP & Oracle"
      seoTitle="Oracle ERP Implementation & Consultancy"
      seoDescription="Expert Oracle Cloud and R12 ERP implementations, upgrades and integrations. Deep APAC expertise with proven delivery methodology."
      introHeading="Oracle Cloud Excellence"
      introBody={[
        "As an Oracle partner, Symprio delivers end-to-end ERP implementations and cloud transformations. We combine certified expertise with deep industry knowledge to maximize ROI and minimize disruption across your enterprise systems.",
        "Complete integration across core business processes, from financial management to supply chain optimization. Our module stack covers Oracle Cloud Infrastructure, Financial Management, Supply Chain, Human Capital, and Manufacturing & Analytics."
      ]}
      features={[
        {
          number: '01',
          title: 'ERP Implementation',
          desc: 'Full Oracle Cloud ERP implementations using our proprietary "RapidPath" methodology with pre-configured industry templates and automated data migration tools to reduce timelines by 30%.',
          highlighted: false
        },
        {
          number: '02',
          title: 'Cloud Migration',
          desc: 'Migrate from legacy on-premise systems to Oracle Cloud ERP with automatic quarterly updates, superior mobile access, and AI-driven analytics — reducing total cost of ownership by up to 40%.',
          highlighted: true
        },
        {
          number: '03',
          title: 'Optimization & Support',
          desc: 'Our Managed Services team provides 24/7 global support, ensuring your systems are always optimized, secure, and compliant with local regulations across all entities.',
          highlighted: false
        }
      ]}
      commitmentHeading="Legacy vs. Oracle ERP"
      commitmentBody="See the dramatic improvements when you modernize to Oracle Cloud ERP. A global manufacturing company across 8 countries achieved transformational results after implementation."
      commitmentBullets={[
        "Financial close cycle reduced from 15-20 days to 3-5 days — 75% faster",
        "Reconciliation accuracy from 30-40% manual to 98%+ automated",
        "Real-time data visibility replacing siloed legacy systems — 24/7 live insights",
        "$2.3M annual operational savings with cloud-based efficiency"
      ]}
      commitmentImage="/assets/images/erp-oracle.jpg"
      faqs={[
        {
          q: 'Why should we choose Oracle Cloud ERP over our legacy on-premise system?',
          a: 'Oracle Cloud ERP offers automatic quarterly updates, superior mobile access, and advanced AI-driven analytics that on-premise systems can\u2019t match, all while reducing total cost of ownership by up to 40%.'
        },
        {
          q: 'How does Symprio accelerate ERP implementation?',
          a: 'We use our proprietary "RapidPath" methodology, which includes pre-configured industry templates and automated data migration tools to reduce implementation timelines by 30%.'
        },
        {
          q: 'Do you provide post-implementation support?',
          a: 'Yes. Our Managed Services team provides 24/7 global support, ensuring your systems are always optimized, secure, and compliant with local regulations.'
        }
      ]}
    />
  );
}
