import React from 'react';

const clients = [
  { name: 'Meta', logo: '/clients/meta.png' },
  { name: 'Amway', logo: '/clients/amway.png' },
  { name: 'HRDF', logo: '/clients/hrdf.png' },
  { name: 'Coca-Cola', logo: '/clients/cocacola.png' },
  { name: 'SeekAsia', logo: '/clients/seekasia.png' },
  { name: 'YMCA', logo: '/clients/ymca.png' },
  { name: 'Nextracker', logo: '/clients/nextracker.png' },
  { name: 'Uniqlo', logo: '/clients/uniqlo.png' }
];

export default function ClientsMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section style={{ padding: '60px 0', background: '#F8FAFB', overflow: 'hidden' }}>
      {/* Section label */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{
          fontSize: '13px',
          fontWeight: '700',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#185ADB',
          background: 'rgba(24, 90, 219, 0.08)',
          padding: '8px 20px',
          borderRadius: '24px'
        }}>
          Trusted by Industry Leaders
        </span>
        <div style={{
          width: '56px',
          height: '3px',
          background: 'linear-gradient(90deg, #185ADB, #0D9488)',
          margin: '14px auto 0',
          borderRadius: '3px'
        }} />
      </div>

      {/* Marquee — scrolls RIGHT (reverse) */}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div className="clients-marquee-track" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          width: 'max-content'
        }}>
          {doubled.map((client, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: client.logo ? '18px 36px' : '16px 36px',
                background: '#ffffff',
                border: '1.5px solid #E5E7EB',
                borderRadius: '16px',
                whiteSpace: 'nowrap',
                minWidth: client.logo ? '160px' : 'auto',
                height: '72px',
                cursor: 'default',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
              className="client-chip"
            >
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  style={{ height: '38px', objectFit: 'contain', maxWidth: '130px', filter: 'brightness(1)' }}
                />
              ) : (
                <span style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#1f2937',
                  letterSpacing: '0.02em'
                }}>
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeReverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .clients-marquee-track {
          animation: marqueeReverse 30s linear infinite;
        }
        .clients-marquee-track:hover {
          animation-play-state: paused;
        }
        .client-chip:hover {
          border-color: #185ADB !important;
          box-shadow: 0 8px 24px rgba(24, 90, 219, 0.15);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
