import React, { useState, useEffect } from 'react';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        // Only set if data is not empty, otherwise keep defaults
        if (data && data.length > 0) {
          setEvents(data);
          console.log('Events fetched from backend:', data);
        } else {
          console.log('No events in backend, using defaults');
          setEvents([]);
        }
      } else {
        console.error('Backend response not ok:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultEvents = [
    {
      id: 0,
      title: 'RPA Summit 2024',
      date: 'Dec 15, 2024',
      location: 'Virtual Event',
      description: 'Join industry leaders discussing the future of automation',
      type: 'Featured'
    },
    {
      id: -1,
      title: 'Automation Workshop',
      date: 'Dec 20, 2024',
      location: 'New York, USA',
      description: 'Hands-on training for RPA best practices',
      type: 'Live'
    },
    {
      id: -2,
      title: 'AI & Automation Conference',
      date: 'Jan 10, 2025',
      location: 'San Francisco, USA',
      description: 'Explore the latest in AI-powered automation',
      type: 'Featured'
    },
    {
      id: -3,
      title: 'RPA Best Practices Webinar',
      date: 'Jan 15, 2025',
      location: 'Virtual Event',
      description: 'Learn industry best practices from our experts',
      type: 'Live'
    }
  ];

  const displayEvents = events;

  return (
    <section style={{
      padding: '80px 20px',
      background: '#f3f4f6'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '38px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0'
          }}>
            {displayEvents.length > 0 ? 'Upcoming Events' : 'No Events'}
          </h2>
        </div>

        {displayEvents.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 300px)',
            gap: '24px'
          }}>
          {displayEvents.map((event) => (
            <div key={event.id} style={{
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
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.15)';
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
                  background: event.type === 'Featured' 
                    ? '#fef08a'
                    : event.type === 'Live'
                    ? '#fecaca'
                    : '#e0f2fe',
                  color: event.type === 'Featured' 
                    ? '#b45309'
                    : event.type === 'Live'
                    ? '#dc2626'
                    : '#0891b2',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {event.type}
                </div>

                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: '0 0 8px 0',
                  lineHeight: '1.4'
                }}>
                  {event.title}
                </h3>

                {event.description && (
                  <p style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    margin: '0 0 8px 0',
                    lineHeight: '1.5'
                  }}>
                    {event.description}
                  </p>
                )}

                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '0px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <div style={{ marginBottom: '4px' }}>📅 {event.date}</div>
                  <div>📍 {event.location}</div>
                </div>

                <button style={{
                  marginTop: 'auto',
                  width: '100%',
                  padding: '8px 12px',
                  background: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '12px',
                  cursor: event.link ? 'pointer' : 'default',
                  transition: 'all 0.3s ease',
                  opacity: event.link ? 1 : 0.5
                }}
                onClick={() => {
                  if (event.link) {
                    window.open(event.link, '_blank');
                  }
                }}>
                  {event.link ? 'Register Now' : 'No Link'}
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}

export default Events;

