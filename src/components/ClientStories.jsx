import React, { useState, useEffect } from 'react';
import AOS from 'aos';

export default function ClientStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
    fetchClientStories();
  }, []);

  const fetchClientStories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/client-stories');
      if (response.ok) {
        const data = await response.json();
        setStories(data);
      } else {
        setError('Failed to load client stories');
      }
    } catch (err) {
      setError('Error loading client stories');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section style={{ padding: '100px 20px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                width: '350px',
                height: '280px',
                background: '#f3f4f6',
                borderRadius: '16px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }} />
            ))}
          </div>
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </section>
    );
  }

  if (error || stories.length === 0) {
    return null;
  }

  return (
    <section style={{ padding: '100px 20px', background: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-tag" data-aos="fade-up">Client Stories</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#010B1D',
            marginBottom: '16px',
            fontWeight: 400,
            lineHeight: 1.2
          }} data-aos="fade-up" data-aos-delay="100">
            Feedback from <em className="accent-text" style={{ fontWeight: '400' }}>Real Teams</em>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {stories.slice(0, 3).map((story, i) => (
            <div
              key={story.id}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              style={{
                padding: '32px',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '20px',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(24,90,219,0.08)';
                e.currentTarget.style.borderColor = '#185ADB';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                {story.avatar_url ? (
                  <img 
                    src={story.avatar_url} 
                    alt={story.client_name}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #185ADB, #0D9488)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '20px',
                    fontWeight: 700
                  }}>
                    {story.client_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '16px' }}>
                {'★'.repeat(story.rating || 5).split('').map((star, idx) => (
                  <span key={idx} style={{ color: '#185ADB', fontSize: '16px' }}>{star}</span>
                ))}
              </div>

              <p style={{
                fontSize: '15px',
                color: '#444444',
                lineHeight: 1.7,
                marginBottom: '24px',
                fontStyle: 'italic'
              }}>
                "{story.quote}"
              </p>

              <div style={{
                paddingTop: '20px',
                borderTop: '1px solid #e5e7eb'
              }}>
                <p style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#010B1D',
                  marginBottom: '4px'
                }}>
                  {story.role}, {story.company}
                </p>
                {story.industry && (
                  <p style={{
                    fontSize: '13px',
                    color: '#6b7280'
                  }}>
                    {story.industry}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
