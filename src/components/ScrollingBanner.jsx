import React, { useState, useEffect } from 'react';

export default function ScrollingBanner() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
    const interval = setInterval(fetchItems, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchItems = async () => {
    try {
      const [eventsRes, trainingsRes] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/trainings')
      ]);

      const events = eventsRes.ok ? await eventsRes.json() : [];
      const trainings = trainingsRes.ok ? await trainingsRes.json() : [];

      // Combine and format items
      const combined = [
        ...events.slice(0, 3).map(e => ({ ...e, type: 'Event', icon: '📅' })),
        ...trainings.slice(0, 3).map(t => ({ ...t, type: 'Training', icon: '🎓' }))
      ];

      setItems(combined.length > 0 ? combined : getDefaultItems());
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch items:', error);
      setItems(getDefaultItems());
      setLoading(false);
    }
  };

  const getDefaultItems = () => [
    { id: 1, title: 'RPA Summit 2024', date: 'Dec 15, 2024', type: 'Event', icon: '📅' },
    { id: 2, title: 'Advanced RPA Training', date: 'Dec 20, 2024', type: 'Training', icon: '🎓' },
    { id: 3, title: 'AI & Automation Conference', date: 'Jan 10, 2025', type: 'Event', icon: '📅' },
    { id: 4, title: 'Automation Workshop', date: 'Jan 15, 2025', type: 'Training', icon: '🎓' },
    { id: 5, title: 'RPA Best Practices Webinar', date: 'Jan 20, 2025', type: 'Event', icon: '📅' },
  ];

  // Duplicate items for seamless loop
  const scrollItems = [...items, ...items];

  return (
    <div style={{
      position: 'relative',
      zIndex: 10,
      background: 'linear-gradient(90deg, #00d4ff, #0891b2)',
      padding: '16px 0',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0, 212, 255, 0.2)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        animation: 'scroll 40s linear infinite'
      }}>
        {scrollItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0 24px',
              minWidth: 'max-content',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '500',
              borderRight: '2px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <div>
              <div style={{ fontWeight: '700', fontSize: '13px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                {item.date} • {item.type}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (max-width: 768px) {
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-60%);
            }
          }
        }
      `}</style>
    </div>
  );
}


