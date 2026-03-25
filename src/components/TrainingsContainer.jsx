import React, { useState, useEffect } from 'react';

export default function TrainingsContainer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch('/api/trainings');
        if (response.ok) {
          const data = await response.json();
          setTrainings(data);
        }
      } catch (error) {
        console.error('Error fetching trainings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
    const interval = setInterval(fetchTrainings, 3000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    { icon: '💼', title: 'Consulting', description: 'Expert guidance and strategy' },
    { icon: '🛠️', title: 'Support', description: 'Ongoing technical assistance' },
    { icon: '🎓', title: 'Training/Coaching', description: 'Focused on UiPath, Microsoft Power Automate' },
    { icon: '🤖', title: 'Data & AI', description: 'Training on Data services & AI Machine Learning' }
  ];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % trainings.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + trainings.length) % trainings.length);
  };

  const getVisibleCards = () => {
    return [
      trainings[currentIndex],
      trainings[(currentIndex + 1) % trainings.length]
    ];
  };

  return (
    <section style={{
      padding: '60px 20px',
      background: '#f3f4f6',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 10px 0'
          }}>
            Helping Organizations
          </h2>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#3b82f6',
            margin: '0 0 30px 0'
          }}>
            Realize Their Intelligent Automation Journey
          </h2>
          
          {/* Services Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {services.map((service, idx) => (
              <div key={idx} style={{
                padding: '20px',
                background: '#f3f4f6',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>
                  {service.icon}
                </div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: '0 0 8px 0'
                }}>
                  {service.title}
                </h4>
                <p style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Training Cards Carousel */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            Loading trainings...
          </div>
        ) : trainings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            No trainings available at the moment.
          </div>
        ) : (
        <>
        <div style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Left Side - Cards Carousel */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            {/* Previous Button */}
            {trainings.length > 2 && (
              <button
                onClick={prevCard}
                style={{
                  background: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  fontSize: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.3s ease, transform 0.3s ease',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#2563eb';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#3b82f6';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                ‹
              </button>
            )}

            {/* Cards Container */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
              flex: 1,
              overflow: 'hidden'
            }}>
              {getVisibleCards().map((training, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                    borderRadius: '12px',
                    padding: '30px 25px',
                    color: '#fff',
                    textAlign: 'center',
                    minHeight: '250px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)',
                    animation: `slideIn 0.5s ease-out`,
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    margin: '0 0 12px 0',
                    color: '#fff'
                  }}>
                    {training.title}
                  </h3>

                  <p style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    margin: '0 0 6px 0',
                    color: '#e0e7ff'
                  }}>
                    {training.date}
                  </p>

                  <p style={{
                    fontSize: '12px',
                    color: '#c7d2fe',
                    margin: '0 0 20px 0'
                  }}>
                    {training.timezone}
                  </p>

                  <a
                    href={training.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#fff',
                      color: '#3b82f6',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '12px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      border: 'none',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#e0e7ff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#fff';
                    }}
                  >
                    Register Now
                  </a>
                </div>
              ))}
            </div>

            {/* Next Button */}
            {trainings.length > 2 && (
              <button
                onClick={nextCard}
                style={{
                  background: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  fontSize: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.3s ease, transform 0.3s ease',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#2563eb';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#3b82f6';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                ›
              </button>
            )}
          </div>

          {/* Right Side - AIAD Logo */}
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px'
          }}>
            <img
              src="/aiad-logo.png"
              alt="Automation In a Day"
              style={{
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '350px',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>

        {/* Indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '30px'
        }}>
          {trainings.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                border: 'none',
                background: idx === currentIndex ? '#3b82f6' : '#d1d5db',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
        </>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
