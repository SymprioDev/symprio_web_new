import React, { useState, useEffect } from 'react';

const EventPopupBanner = () => {
  const [event, setEvent] = useState(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetchNearestEvent();
  }, []);

  const fetchNearestEvent = async () => {
    try {
      const res = await fetch('/api/events');
      if (!res.ok) return;
      const events = await res.json();
      if (!events || events.length === 0) return;

      // Find the nearest upcoming event (with registration link)
      const now = new Date();
      const upcoming = events
        .filter(e => {
          const eventDate = new Date(e.date);
          return eventDate >= now && (e.registration_link || e.link);
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      if (upcoming.length > 0) {
        // Check if user already dismissed this event
        const dismissedId = sessionStorage.getItem('dismissed_event_popup');
        if (dismissedId === String(upcoming[0].id)) return;

        setEvent(upcoming[0]);
        // Show popup after 3 seconds
        setTimeout(() => setVisible(true), 3000);
      }
    } catch (err) {
      console.error('EventPopup fetch error:', err);
    }
  };

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    if (event) sessionStorage.setItem('dismissed_event_popup', String(event.id));
  };

  const handleRegister = () => {
    if (event) {
      const url = event.registration_link || event.link;
      if (url) window.open(url, '_blank');
    }
  };

  if (!event || dismissed) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleDismiss}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 9998,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transition: 'opacity 0.4s ease'
        }}
      />

      {/* Popup */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: visible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.8)',
        opacity: visible ? 1 : 0,
        zIndex: 9999,
        width: '90%',
        maxWidth: '520px',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: visible ? 'auto' : 'none'
      }}>
        {/* Close button */}
        <button
          onClick={handleDismiss}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.5)',
            border: 'none',
            color: '#fff',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.7)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Banner Image or Gradient */}
        <div style={{
          width: '100%',
          height: event.banner_image ? '240px' : '180px',
          background: 'linear-gradient(135deg, #010B1D 0%, #185ADB 50%, #0D9488 100%)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {event.banner_image ? (
            <img
              src={event.banner_image}
              alt={event.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Upcoming Event
              </div>
            </div>
          )}

          {/* Overlay badge */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            padding: '6px 14px',
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '700',
            color: '#185ADB',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            Upcoming Event
          </div>
        </div>

        {/* Content */}
        <div style={{
          background: '#fff',
          padding: '28px'
        }}>
          <h3 style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#010B1D',
            margin: '0 0 12px 0',
            lineHeight: '1.3'
          }}>
            {event.title}
          </h3>

          {event.description && (
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: '0 0 16px 0',
              lineHeight: '1.6',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {event.description}
            </p>
          )}

          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '20px',
            fontSize: '13px',
            color: '#444'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#185ADB" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span style={{ fontWeight: '600' }}>{event.date}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#185ADB" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span style={{ fontWeight: '600' }}>{event.location}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleRegister}
              style={{
                flex: 1,
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #185ADB, #0D9488)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(24, 90, 219, 0.3)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(24, 90, 219, 0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(24, 90, 219, 0.3)';
              }}
            >
              Register Now
            </button>
            <button
              onClick={handleDismiss}
              style={{
                padding: '14px 20px',
                background: '#f3f4f6',
                color: '#6b7280',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
              onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPopupBanner;
