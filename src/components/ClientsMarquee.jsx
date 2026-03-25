import React from 'react';

const clients = [
  { name: 'Meta', logo: '/meta-logo.png' },
  { name: 'Amway', logo: null },
  { name: 'JPA', logo: null },
  { name: 'HRDF', logo: null },
  { name: 'Coca-Cola', logo: '/clients/cocacola.png' },
  { name: 'Averis', logo: null },
  { name: 'SeekAsia', logo: null },
  { name: 'Chemopharm', logo: null },
  { name: 'YMCA', logo: null },
  { name: 'Nextracker', logo: null },
  { name: 'CXL', logo: null },
  { name: 'Mitsubishi Motors', logo: null },
  { name: 'Uniqlo', logo: '/clients/uniqlo.png' }
];

export default function ClientsMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section style={{ padding: '50px 0', background: '#F1F7F3', overflow: 'hidden' }}>
      {/* Section label */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span style={{
          fontSize: '12px',
          fontWeight: '700',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#185ADB'
        }}>
          Trusted by Industry Leaders
        </span>
        <div style={{
          width: '48px',
          height: '2px',
          background: 'linear-gradient(90deg, #185ADB, #0D9488)',
          margin: '10px auto 0',
          borderRadius: '2px'
        }} />
      </div>

      {/* Marquee — scrolls RIGHT (reverse) */}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div className="clients-marquee-track" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          width: 'max-content'
        }}>
          {doubled.map((client, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: client.logo ? '12px 20px' : '12px 28px',
                background: '#ffffff',
                border: '1px solid #DCDCDC',
                borderRadius: '14px',
                whiteSpace: 'nowrap',
                minWidth: client.logo ? '120px' : 'auto',
                height: '56px',
                cursor: 'default',
                transition: 'all 0.2s ease'
              }}
              className="client-chip"
            >
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  style={{ height: '28px', objectFit: 'contain', maxWidth: '100px' }}
                />
              ) : (
                <span style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#010B1D',
                  letterSpacing: '0.01em'
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
          animation: marqueeReverse 35s linear infinite;
        }
        .clients-marquee-track:hover {
          animation-play-state: paused;
        }
        .client-chip:hover {
          border-color: #185ADB !important;
          box-shadow: 0 4px 14px rgba(24, 90, 219, 0.1);
        }
      `}</style>
    </section>
  );
}
