import React, { useState, useEffect } from 'react';
import { fetchAdminEvents, formatEventDate, getTrackStyle } from '../data/events';

const EventsAndTrainings = () => {
  const [events, setEvents] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventData, trainingsRes] = await Promise.all([
        fetchAdminEvents(),
        fetch('/api/trainings')
      ]);

      setEvents(eventData && eventData.length > 0 ? eventData : []);

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
    ...events.map((e) => {
      const trackStyle = getTrackStyle(e.track);
      return {
        ...e,
        itemType: 'event',
        badgeType: trackStyle.label,
        badgeColor: trackStyle.background,
        badgeTextColor: trackStyle.color
      };
    }),
    ...trainings.map(t => ({ ...t, itemType: 'training', badgeType: 'Live', badgeColor: '#fecaca', badgeTextColor: '#dc2626' }))
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  const hasData = allItems.length > 0;

  return (
    <section style={{
      padding: '80px 20px',
      background: '#F1F7F3'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-tag">Upcoming Events</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: '900',
            color: '#0A2D6E',
            margin: '0'
          }}>
            Events & <span className="accent-text">Webinars</span>
          </h2>
        </div>

        {!hasData && (
          <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ fontSize: '56px', marginBottom: '24px' }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#0A2D6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0A2D6E', marginBottom: '12px' }}>
              No upcoming events at this time
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '32px', lineHeight: '1.6' }}>
              Subscribe below and we'll notify you when new events, webinars, and workshops are announced.
            </p>
            {subscribed ? (
              <div style={{ padding: '20px 32px', background: 'rgba(13,148,136,0.08)', borderRadius: '16px', color: '#0D9488', fontWeight: '700' }}>
                You're on the list! We'll be in touch soon.
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); if (subscribeEmail) setSubscribed(true); }}
                style={{ display: 'flex', gap: '12px', maxWidth: '420px', margin: '0 auto' }}
              >
                <input
                  type="email"
                  required
                  value={subscribeEmail}
                  onChange={e => setSubscribeEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{
                    flex: 1, padding: '14px 20px', borderRadius: '12px',
                    border: '1px solid #e5e7eb', fontSize: '15px', outline: 'none',
                    background: '#fff'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '14px 24px', background: 'linear-gradient(135deg, #0A2D6E, #0D9488)',
                    color: '#fff', border: 'none', borderRadius: '12px',
                    fontWeight: '700', fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap'
                  }}
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>
        )}

        {hasData && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
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
                {/* Banner Image */}
                {item.banner_image && (
                  <div style={{
                    width: '100%',
                    height: '160px',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #0A2D6E 0%, #185ADB 50%, #0D9488 100%)'
                  }}>
                    <img
                      src={item.banner_image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}

                {/* Gradient placeholder if no banner */}
                {!item.banner_image && (
                  <div style={{
                    width: '100%',
                    height: '120px',
                    background: item.itemType === 'event'
                      ? 'linear-gradient(135deg, #0A2D6E 0%, #185ADB 50%, #0D9488 100%)'
                      : 'linear-gradient(135deg, #065f46 0%, #16a34a 50%, #4ade80 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px'
                  }}>
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', fontWeight: '700', textAlign: 'center', lineHeight: '1.3' }}>
                      {item.title}
                    </span>
                  </div>
                )}

                <div style={{
                  padding: '20px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
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
                      margin: '0 0 12px 0',
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {item.description}
                    </p>
                  )}

                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginBottom: '12px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    {item.itemType === 'event' ? (
                      <>
                        <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          {item.itemType === 'event' ? formatEventDate(item.date) : item.date}
                        </div>
                        {item.time && (
                          <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            {item.endTime ? `${item.time} - ${item.endTime}` : item.time}
                          </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {item.location}
                        </div>
                        {item.isLiveStreamed && (
                          <div style={{ marginTop: '4px', color: '#dc2626', fontWeight: '700' }}>
                            Live on YouTube
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          {item.instructor}
                        </div>
                        <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          {item.date}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {item.duration}
                        </div>
                      </>
                    )}
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                    {/* Registration link takes priority */}
                    {(item.registration_link || item.link) ? (
                      <button style={{
                        flex: 1,
                        padding: '10px 12px',
                        background: item.itemType === 'event'
                          ? 'linear-gradient(135deg, #185ADB, #0D9488)'
                          : 'linear-gradient(135deg, #065f46, #16a34a)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => {
                        const url = item.registration_link || item.link;
                        window.open(url, '_blank');
                      }}>
                        {item.itemType === 'event' ? 'Register Now' : 'Enroll Now'}
                      </button>
                    ) : (
                      <button style={{
                        flex: 1,
                        padding: '10px 12px',
                        background: '#e5e7eb',
                        color: '#9ca3af',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '13px',
                        cursor: 'default'
                      }} disabled>
                        Coming Soon
                      </button>
                    )}
                  </div>
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
