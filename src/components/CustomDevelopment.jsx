import ServicePageTemplate from './ServicePageTemplate';

const features = [
  {
    number: '01',
    title: 'Custom Portals & Dashboards',
    desc: 'Executive dashboards and customer portals with real-time analytics and intuitive UX.',
  },
  {
    number: '02',
    title: 'Mobile Applications',
    desc: 'iOS and Android applications with native performance and offline capabilities.',
    highlighted: true,
  },
  {
    number: '03',
    title: 'Cloud Migrations',
    desc: 'Seamless migration from on-premises systems to Oracle Cloud, AWS, or Azure.',
  },
];

const faqs = [
  {
    q: 'What technologies do you specialize in for custom development?',
    a: 'We are platform-agnostic but specialize in modern stacks including React/Next.js for frontends, Node.js and .NET for backends, and AWS/Azure for cloud infrastructure.',
  },
  {
    q: 'How do you ensure the security of custom-built applications?',
    a: 'Security is baked into our "DevSecOps" pipeline. We perform regular static and dynamic code analysis, dependency scanning, and follow OWASP best practices for all builds.',
  },
  {
    q: 'Can you take over and modernize our existing legacy application?',
    a: 'Yes. We offer legacy modernization services where we refactor outdated codebases into scalable microservices architectures while maintaining data integrity.',
  },
];

export default function CustomDevelopment() {
  return (
    <ServicePageTemplate
      title="Custom Software Development"
      titleAccent="Development"
      subtitle="Full-stack excellence from initial concept to global scale."
      heroImage="/assets/images/custom-dev.jpg"
      breadcrumb="Custom Software"
      introHeading="Agile & DevOps Excellence"
      introBody={[
        'Symprio is your trusted partner for building bespoke solutions that align with your unique business objectives. We specialize in full-stack development leveraging modern technologies, agile methodologies, and DevOps practices to deliver scalable, secure, and innovative solutions.',
      ]}
      features={features}
      commitmentHeading="Technology Expertise"
      commitmentBody="We leverage a modern, battle-tested technology stack across every layer of your application to ensure performance, scalability, and maintainability."
      commitmentBullets={[
        'Front End: React, Angular, Vue.js, Next.js',
        'Back End: Node.js, .NET Core, Java, Python',
        'Data: PostgreSQL, MongoDB, Redis, Kafka',
        'Cloud/DevOps: AWS, Azure, Docker, Kubernetes',
      ]}
      commitmentImage="/assets/images/custom-dev.jpg"
      faqs={faqs}
    />
  );
}
