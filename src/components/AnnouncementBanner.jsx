import React, { useState, useEffect } from 'react';

export default function AnnouncementBanner() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Use default items immediately
    setItems(getDefaultItems());
    
    // Try to fetch live data
    fetchItems();
    const interval = setInterval(fetchItems, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchItems = async () => {
    try {
      const [eventsRes, trainingsRes] = await Promise.all([
        fetch('/api/events', { timeout: 3000 }),
        fetch('/api/trainings', { timeout: 3000 })
      ]);

      if (!eventsRes.ok || !trainingsRes.ok) {
        return; // Keep using default items
      }

      const events = await eventsRes.json();
      const trainings = await trainingsRes.json();

      const combined = [
        ...events.slice(0, 3).map(e => ({ ...e, type: 'Event', icon: '📅' })),
        ...trainings.slice(0, 3).map(t => ({ ...t, type: 'Training', icon: '🎓' }))
      ];

      if (combined.length > 0) {
        setItems(combined);
      }
    } catch (error) {
      console.log('Using default banner items');
      // Keep using default items
    }
  };

  const getDefaultItems = () => [
    { id: 1, title: 'RPA Summit 2024', date: 'Dec 15, 2024', type: 'Event', icon: '📅' },
    { id: 2, title: 'Advanced RPA Training', date: 'Dec 20, 2024', type: 'Training', icon: '🎓' },
    { id: 3, title: 'AI & Automation Conference', date: 'Jan 10, 2025', type: 'Event', icon: '📅' },
    { id: 4, title: 'Automation Workshop', date: 'Jan 15, 2025', type: 'Training', icon: '🎓' },
  ];

  const scrollItems = items.length > 0 ? [...items, ...items] : [...getDefaultItems(), ...getDefaultItems()];

  return (
    <div style={{
      position: 'relative',
      zIndex: 10,
      background: '#f5f5f5',
      padding: '12px 0',
      overflow: 'hidden',
      borderBottom: '1px solid #e0e0e0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        animation: 'scroll 45s linear infinite'
      }}>
        {scrollItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0 20px',
              minWidth: 'max-content',
              color: '#555555',
              fontSize: '13px',
              fontWeight: '500',
              borderRight: '1px solid #ddd'
            }}
          >
            <span style={{ fontSize: '16px' }}>{item.icon}</span>
            <div>
              <span style={{ fontWeight: '600' }}>{item.title}</span>
              <span style={{ marginLeft: '8px', opacity: 0.7 }}>• {item.date}</span>
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
      `}</style>
    </div>
  );
}


