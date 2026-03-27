import ServicePageTemplate from './ServicePageTemplate';

const features = [
  {
    number: '01',
    title: 'Talent Augmentation',
    desc: 'Quickly scale your internal teams with specialized external expertise.',
  },
  {
    number: '02',
    title: 'Managed Teams',
    desc: 'Dedicated Symprio teams managing end-to-end delivery of your roadmap.',
    highlighted: true,
  },
  {
    number: '03',
    title: 'Strategic Outsourcing',
    desc: 'Complete ownership of business functions for long-term operational success.',
  },
];

const faqs = [
  {
    q: 'How do you ensure the quality of the talent you provide?',
    a: 'We use a rigorous 5-stage vetting process that includes technical assessments, behavioral interviews, and reference checks. Only the top 5% of applicants are accepted into our talent pool.',
  },
  {
    q: 'What is the average time to deploy a team?',
    a: 'Depending on the complexity of the roles, we can typically deploy individual specialists within 5-10 business days and full managed teams within 3-4 weeks.',
  },
  {
    q: 'Can we transition Symprio talent to our internal payroll?',
    a: 'Yes. We offer flexible "Contract-to-Hire" models that allow you to evaluate talent on-site before making a long-term commitment.',
  },
];

export default function DigitalWorkforce() {
  return (
    <ServicePageTemplate
      title="Digital Workforce & Staff Augmentation"
      titleAccent="Augmentation"
      subtitle="Augmenting your success with elite, vetted global talent."
      heroImage="/assets/images/digital-workforce.jpg"
      breadcrumb="Digital Workforce"
      seoTitle="IT Staff Augmentation & Digital Workforce Services"
      seoDescription="Access expert RPA, AI, and IT talent with flexible engagement models. Staff augmentation, managed teams, and full outsourcing."
      introHeading="Flexible Talent Augmentation"
      introBody={[
        'Symprio provides flexible and transparent talent solutions to support large organizations. We deliver skilled professionals across IT, software development, project management, and business functions, serving global enterprises like Meta, AXA, and AIA.',
      ]}
      features={features}
      commitmentHeading="Talent Categories"
      commitmentBody="We provide vetted professionals across four key domains to ensure your teams have the right expertise for every challenge."
      commitmentBullets={[
        'IT & Infrastructure: Security consultants, cloud architects, and Oracle DBAs',
        'Software Excellence: Full-stack developers and technical leads with modern expertise',
        'Project Leadership: Scrum masters and PMs who deliver high-impact results',
        'Business Functions: Strategic roles in HR, digital marketing, and operations',
      ]}
      commitmentImage="/assets/images/digital-workforce.jpg"
      faqs={faqs}
    />
  );
}
