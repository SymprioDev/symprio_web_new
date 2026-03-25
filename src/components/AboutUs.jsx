import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AboutUs() {
  const navigate = useNavigate();
  const [visibleOffices, setVisibleOffices] = useState({});
  const officeRefs = useRef({});
  const [locations, setLocations] = useState([]);
  const [locationsLoaded, setLocationsLoaded] = useState(false);

  const coreValues = [
    {
      title: 'Client Success First',
      description: 'We measure our impact by the value delivered to our clients.'
    },
    {
      title: 'Innovation & Excellence',
      description: 'We continuously learn and adopt cutting‑edge technologies and practices.'
    },
    {
      title: 'Integrity & Transparency',
      description: 'We build lasting relationships through honesty, accountability and respect.'
    },
    {
      title: 'Diversity & Inclusion',
      description: 'Our teams and solutions reflect the diverse clients and communities we serve.'
    }
  ];

  const offices = [
    { location: 'Silicon Valley', region: 'North America', emoji: '🌉' },
    { location: 'Kuala Lumpur', region: 'APAC', emoji: '🏙️' },
    { location: 'Singapore', region: 'APAC', emoji: '🌴' },
    { location: 'India', region: 'APAC', emoji: '🎌' }
  ];

  const defaultLocations = [
    {
      name: 'Silicon Valley',
      region: 'North America',
      emoji: '🇺🇸',
      address: 'California, USA',
      phone: '+1 (408) 555-0123',
      email: 'usa@symprio.com',
      image_url: '/locations/silicon-valley.jpg'
    },
    {
      name: 'India',
      region: 'APAC',
      emoji: '🇮🇳',
      address: 'Multiple Cities, India',
      phone: '+91 80 5555 0123',
      email: 'india@symprio.com',
      image_url: '/locations/taj-mahal.jpg'
    },
    {
      name: 'Kuala Lumpur',
      region: 'APAC',
      emoji: '🇲🇾',
      address: 'Kuala Lumpur, Malaysia',
      phone: '+60 3 5555 0123',
      email: 'my@symprio.com',
      image_url: '/locations/malaysia-skyline.jpg'
    },
    {
      name: 'Singapore',
      region: 'APAC',
      emoji: '🇸🇬',
      address: 'Singapore',
      phone: '+65 6123 4567',
      email: 'sg@symprio.com',
      image_url: '/locations/singapore.jpg'
    }
  ];

  const resolveImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/uploads/')) return imageUrl;
    return imageUrl;
  };

  const locationsToRender = locations.length > 0 ? locations : defaultLocations;

  useEffect(() => {
    const observers = {};
    
    offices.forEach((office, idx) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleOffices(prev => ({ ...prev, [idx]: true }));
          }
        },
        { threshold: 0.3 }
      );

      if (officeRefs.current[idx]) {
        observer.observe(officeRefs.current[idx]);
      }
      observers[idx] = observer;
    });

    return () => {
      Object.values(observers).forEach(observer => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        if (response.ok) {
          const data = await response.json();
          setLocations(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      } finally {
        setLocationsLoaded(true);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div style={{
      background: '#fff',
      color: '#1f2937',
      fontFamily: "'Poppins', sans-serif"
    }}>
      {/* Who We Are Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '40px',
          fontWeight: '700',
          color: '#1f2937',
          margin: '0 0 30px 0'
        }}>
          Who We Are
        </h1>
        
        <p style={{
          fontSize: '18px',
          color: '#6b7280',
          lineHeight: '1.8',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          Symprio is a global digital transformation and AI consultancy. We believe every customer, business problem and solution is unique. We help organisations identify the root cause of challenges—whether related to people, process or technology—and design optimal solutions that consider culture, cost and capability.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 20px',
        backgroundColor: '#f9fafb'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#1f2937',
          textAlign: 'center',
          margin: '0 0 60px 0'
        }}>
          Mission & Vision
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px'
        }}>
          <div style={{
            padding: '40px',
            background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(190, 230, 253, 0.3)',
            transition: 'all 0.4s ease',
            cursor: 'pointer',
            transform: 'translateY(0)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 50px rgba(190, 230, 253, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(190, 230, 253, 0.3)';
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#0c4a6e',
              margin: '0 0 20px 0'
            }}>
              Mission
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#1e3a8a',
              lineHeight: '1.8',
              margin: '0'
            }}>
              To empower enterprises with intelligent automation, AI and digital innovations that unlock productivity and growth.
            </p>
          </div>

          <div style={{
            padding: '40px',
            background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(251, 207, 232, 0.3)',
            transition: 'all 0.4s ease',
            cursor: 'pointer',
            transform: 'translateY(0)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 50px rgba(251, 207, 232, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(251, 207, 232, 0.3)';
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#831843',
              margin: '0 0 20px 0'
            }}>
              Vision
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#500724',
              lineHeight: '1.8',
              margin: '0'
            }}>
              To create a world where people and autonomous technologies collaborate seamlessly, enabling organisations to adapt and thrive in the digital era.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 20px'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#1f2937',
          textAlign: 'center',
          margin: '0 0 60px 0'
        }}>
          Core Values
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px'
        }}>
          {coreValues.map((value, idx) => (
            <div
              key={idx}
              style={{
                padding: '40px',
                background: idx === 0 ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)' :
                           idx === 1 ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)' :
                           idx === 2 ? 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' :
                           'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
                borderRadius: '12px',
                transition: 'all 0.4s ease',
                position: 'relative',
                cursor: 'pointer',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
                transform: 'scale(1)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.transform = 'translateY(-8px)';
                const titleElement = e.currentTarget.querySelector('h3');
                const descElement = e.currentTarget.querySelector('p');
                if (titleElement) {
                  titleElement.style.transform = 'scale(1.1)';
                }
                if (descElement) {
                  descElement.style.transform = 'scale(1.1)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                const titleElement = e.currentTarget.querySelector('h3');
                const descElement = e.currentTarget.querySelector('p');
                if (titleElement) {
                  titleElement.style.transform = 'scale(1)';
                }
                if (descElement) {
                  descElement.style.transform = 'scale(1)';
                }
              }}
            >
              {/* Icon logo in top right */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '140px',
                height: '140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.15,
                zIndex: 0,
                pointerEvents: 'none'
              }}>
                {idx === 0 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width: '100%', height: '100%', color: '#ffffff'}}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                ) : idx === 1 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width: '100%', height: '100%', color: '#ffffff'}}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    <circle cx="9" cy="10" r="1" fill="currentColor"/>
                    <circle cx="12" cy="10" r="1" fill="currentColor"/>
                    <circle cx="15" cy="10" r="1" fill="currentColor"/>
                  </svg>
                ) : idx === 2 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width: '100%', height: '100%', color: '#ffffff'}}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width: '100%', height: '100%', color: '#ffffff'}}>
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                )}
              </div>

              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#000000',
                margin: '0 0 12px 0',
                transition: 'all 0.4s ease',
                transformOrigin: 'center'
              }}>
                {value.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#ffffff',
                lineHeight: '1.7',
                margin: '0',
                opacity: 0.95,
                transition: 'all 0.4s ease',
                transformOrigin: 'center'
              }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Presence Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 20px',
        backgroundColor: 'transparent'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#1f2937',
          textAlign: 'center',
          margin: '0 0 20px 0'
        }}>
          Global Presence
        </h2>

        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto 60px auto',
          lineHeight: '1.8'
        }}>
          With offices across the globe, we combine global know-how with local insight to deliver tailor-made solutions.
        </p>

        {/* Map Container */}
        <div style={{
          width: '100%',
          borderRadius: '12px',
          marginBottom: '60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          {locationsToRender.map((location, idx) => (
            <div
              key={location.id || `${location.name}-${idx}`}
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.55) 100%), url(${resolveImageUrl(location.image_url)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '40px 30px',
                borderRadius: '12px',
                color: '#fff',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                transform: 'translateY(0)',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
              }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>{location.emoji || '📍'}</div>
              <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0', color: '#fff' }}>{location.name}</h3>
              {location.region && (
                <p style={{ fontSize: '14px', margin: '0 0 16px 0', color: '#fff' }}>{location.region}</p>
              )}
              <div style={{ fontSize: '13px', lineHeight: '1.8', opacity: '0.9' }}>
                {location.address && <p style={{ margin: '5px 0' }}>📍 {location.address}</p>}
                {location.phone && <p style={{ margin: '5px 0' }}>📞 {location.phone}</p>}
                {location.email && <p style={{ margin: '5px 0' }}>✉️ {location.email}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Careers & Culture Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 20px'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#1f2937',
          textAlign: 'center',
          margin: '0 0 60px 0'
        }}>
          Careers & Culture
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          <div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 20px 0'
            }}>
              Collaborative Culture
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              lineHeight: '1.8',
              margin: '0'
            }}>
              We foster a collaborative, growth-oriented culture where innovation thrives and every team member contributes to our shared success.
            </p>
          </div>

          <div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 20px 0'
            }}>
              Open Roles
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              lineHeight: '1.8',
              margin: '0'
            }}>
              We're hiring across Engineering, Consulting, Sales, Marketing, and Operations. Join our team and grow with us.
            </p>
          </div>

          <div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 20px 0'
            }}>
              Professional Development
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              lineHeight: '1.8',
              margin: '0'
            }}>
              We invest in your growth through continuous learning, certifications, and career development opportunities.
            </p>
          </div>
        </div>

        <div style={{
          textAlign: 'center'
        }}>
          <button onClick={() => navigate('/careers')} style={{
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            padding: '14px 40px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#2563eb';
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 10px 20px rgba(59, 130, 246, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#3b82f6';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
          >
            Explore Careers
          </button>
        </div>
      </section>

      <style>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
