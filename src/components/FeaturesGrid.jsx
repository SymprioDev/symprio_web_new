import React from 'react';

const pillars = [
  {
    icon: '/assets/illustrations/fast-implementation.jpg',
    title: 'Automate Operations',
    subtitle: 'RPA',
    desc: 'Eliminate manual tasks across finance, HR, and operations. Deploy bots that execute repetitive workflows with zero errors — in weeks, not months.'
  },
  {
    icon: '/assets/illustrations/ai-engine.jpg',
    title: 'Augment Decisions',
    subtitle: 'AI',
    desc: 'Deploy intelligent AI systems that analyse data, predict outcomes, and support smarter business decisions with real-time insights and analytics.'
  },
  {
    icon: '/assets/illustrations/scalability.jpg',
    title: 'Build Digital Workforce',
    subtitle: 'Agentic AI',
    desc: 'Create autonomous AI agents that run entire operations end-to-end — from processing to decision-making to execution — without human intervention.'
  }
];

const features = [
  {
    icon: '/assets/illustrations/fast-implementation.jpg',
    title: 'RPA Executes Tasks',
    desc: 'Automate repetitive, rules-based processes with intelligent software robots that work 24/7 with zero errors.'
  },
  {
    icon: '/assets/illustrations/enterprise-security.jpg',
    title: 'AI Supports Decisions',
    desc: 'Leverage advanced analytics and machine learning to gain insights and make data-driven business decisions.'
  },
  {
    icon: '/assets/illustrations/realtime-analytics.jpg',
    title: 'Agentic AI Runs Operations',
    desc: 'Deploy autonomous AI agents that reason, plan, and execute complex workflows without constant human oversight.'
  },
  {
    icon: '/assets/illustrations/elite-support.jpg',
    title: 'Enterprise-Grade Security',
    desc: 'ISO-standard security frameworks and robust governance to protect your mission-critical data and operations.'
  },
  {
    icon: '/assets/illustrations/scalability.jpg',
    title: 'Unlimited Scalability',
    desc: 'Scale your digital workforce instantly without hiring overhead. Handle spikes in demand effortlessly.'
  },
  {
    icon: '/assets/illustrations/ai-engine.jpg',
    title: 'AI-Powered Analytics',
    desc: 'Monitor performance, track ROI, and optimize your digital workforce with real-time AI-powered dashboards.'
  }
];

export default function FeaturesGrid() {
  return (
    <section style={{
      padding: '120px 20px',
      background: '#ffffff'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="section-tag">What We Actually Do</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'var(--primary)',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            AI-Powered <em className="accent-text" style={{fontWeight:'400'}}>Digital Workforce</em>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#444444', fontSize: '16px', lineHeight: '1.6' }}>
            RPA executes tasks. AI supports decisions. Agentic AI runs entire operations. Build a digital workforce that never sleeps, never takes breaks, and scales instantly.
          </p>
        </div>

        {/* 3 Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '80px'
        }}>
          {pillars.map((p, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              style={{
                padding: '48px 40px',
                borderRadius: '20px',
                background: '#ffffff',
                border: '2px solid #185ADB',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}
              className="feature-card"
            >
              <span style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#185ADB',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '12px'
              }}>
                {p.subtitle}
              </span>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '16px',
                color: 'var(--primary)'
              }}>
                {p.title}
              </h3>
              <p style={{ color: '#444444', fontSize: '15px', lineHeight: '1.7', margin: '0', flex: 1 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 400, color: 'var(--primary)' }}>
            Enterprise-Grade <em className="accent-text" style={{fontWeight:'400'}}>Capabilities</em>
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px'
        }}>
          {features.map((f, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 50}
              style={{
                padding: '40px',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1px solid #DCDCDC',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
              className="feature-card"
            >
              <div style={{width:'72px', height:'72px', borderRadius:'16px', overflow:'hidden', marginBottom:'24px'}}>
                <img src={f.icon} alt={f.title} style={{width:'100%', height:'100%', objectFit:'cover'}} />
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '600',
                marginBottom: '16px',
                color: 'var(--primary)'
              }}>
                {f.title}
              </h3>
              <p style={{ color: '#444444', fontSize: '15px', lineHeight: '1.7', margin: '0 0 24px 0', flex: 1 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
      `}</style>
    </section>
  );
}
