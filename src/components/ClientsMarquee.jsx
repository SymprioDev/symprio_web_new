import React from 'react';

const logos = [
  'Meta', 'Amway', 'JPA', 'HRDF', 'Coca-Cola', 'Averis',
  'SeekAsia', 'Chemopharm', 'YMCA', 'Nextracker', 'CXL',
  'Mitsubishi Motors', 'Uniqlo'
];

export default function ClientsMarquee() {
  const doubled = [...logos, ...logos];

  return (
    <section style={{ padding: '60px 0', background: '#f9fafb', overflow: 'hidden' }}>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Section label */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span style={{
          display: 'inline-block',
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#0D9488',
          marginBottom: '10px',
        }}>
          Trusted by Industry Leaders
        </span>
        <div style={{
          width: '48px',
          height: '2px',
          background: 'linear-gradient(90deg, #0A2D6E, #0D9488)',
          margin: '0 auto',
          borderRadius: '2px',
        }} />
      </div>

      {/* Marquee row */}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            width: 'max-content',
          }}
        >
          {doubled.map((name, index) => (
            <div
              key={index}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 24px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
                boxShadow: '0 1px 4px rgba(10, 45, 110, 0.06)',
                cursor: 'default',
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(10, 45, 110, 0.12)';
                e.currentTarget.style.borderColor = '#0D9488';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(10, 45, 110, 0.06)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <span style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#0A2D6E',
                letterSpacing: '0.02em',
              }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
