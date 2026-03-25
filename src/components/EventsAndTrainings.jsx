import React, { useState, useEffect } from 'react';

const EventsAndTrainings = () => {
  const [events, setEvents] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, trainingsRes] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/trainings')
      ]);

      if (eventsRes.ok) {
        const eventData = await eventsRes.json();
        if (eventData && eventData.length > 0) {
          setEvents(eventData);
        } else {
          setEvents([]);
        }
      }

      if (trainingsRes.ok) {
        const trainingData = await trainingsRes.json();
        if (trainingData && trainingData.length > 0) {
          setTrainings(trainingData);
        } else {
          setTrainings([]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Combine and sort by date
  const allItems = [
    ...events.map(e => ({ ...e, itemType: 'event', badgeType: 'Featured', badgeColor: '#fef08a', badgeTextColor: '#b45309' })),
    ...trainings.map(t => ({ ...t, itemType: 'training', badgeType: 'Live', badgeColor: '#fecaca', badgeTextColor: '#dc2626' }))
  ];

  const hasData = allItems.length > 0;

  return (
    <section style={{
      padding: '80px 20px',
      background: '#f3f4f6'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#3b82f6',
            margin: '0 0 8px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Upcoming Events
          </p>
          <h2 style={{
            fontSize: '38px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0'
          }}>
            {hasData ? 'Events & Webinars' : 'No Events or Webinars'}
          </h2>
        </div>

        {hasData && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 300px)',
            gap: '24px'
          }}>
            {allItems.map((item, idx) => (
              <div key={`${item.itemType}-${item.id}`} data-aos="fade-up" data-aos-delay={idx * 100} data-aos-duration="700" data-aos-offset="50" style={{
                background: '#fff',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                cursor: 'pointer',
                width: '300px',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = item.itemType === 'event' ? '#3b82f6' : '#16a34a';
                e.currentTarget.style.boxShadow = item.itemType === 'event' 
                  ? '0 8px 20px rgba(59, 130, 246, 0.15)'
                  : '0 8px 20px rgba(22, 163, 74, 0.15)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  padding: '20px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '10px',
                    fontWeight: '700',
                    marginBottom: '12px',
                    background: item.badgeColor,
                    color: item.badgeTextColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    width: 'fit-content'
                  }}>
                    {item.badgeType}
                  </div>

                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: '0 0 8px 0',
                    lineHeight: '1.4'
                  }}>
                    {item.title}
                  </h3>

                  {item.description && (
                    <p style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      margin: '0 0 8px 0',
                      lineHeight: '1.5'
                    }}>
                      {item.description}
                    </p>
                  )}

                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginBottom: '0px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    {item.itemType === 'event' ? (
                      <>
                        <div style={{ marginBottom: '4px' }}>📅 {item.date}</div>
                        <div>📍 {item.location}</div>
                      </>
                    ) : (
                      <>
                        <div style={{ marginBottom: '4px' }}>👨‍🏫 {item.instructor}</div>
                        <div style={{ marginBottom: '4px' }}>📅 {item.date}</div>
                        <div>⏱️ {item.duration}</div>
                      </>
                    )}
                  </div>

                  <button style={{
                    marginTop: 'auto',
                    width: '100%',
                    padding: '8px 12px',
                    background: item.itemType === 'event' ? '#3b82f6' : '#16a34a',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '12px',
                    cursor: item.link ? 'pointer' : 'default',
                    transition: 'all 0.3s ease',
                    opacity: item.link ? 1 : 0.5
                  }}
                  onClick={() => {
                    if (item.link) {
                      window.open(item.link, '_blank');
                    }
                  }}>
                    {item.link ? (item.itemType === 'event' ? 'Register Now' : 'Enroll Now') : 'No Link'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsAndTrainings;
