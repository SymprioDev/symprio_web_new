import React, { useState, useEffect } from 'react';

const Trainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrainings = async () => {
    try {
      const response = await fetch('/api/trainings');
      if (response.ok) {
        const data = await response.json();
        // Only set if data is not empty, otherwise keep defaults
        if (data && data.length > 0) {
          setTrainings(data);
          console.log('Trainings fetched from backend:', data);
        } else {
          console.log('No trainings in backend, using defaults');
          setTrainings([]);
        }
      } else {
        console.error('Backend response not ok:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch trainings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
    // Poll for new trainings every 2 seconds for real-time updates
    const interval = setInterval(fetchTrainings, 2000);
    return () => clearInterval(interval);
  }, []);

  const defaultTrainings = [
    {
      id: 1,
      title: 'RPA Fundamentals',
      description: 'Learn the basics of Robotic Process Automation',
      instructor: 'John Smith',
      date: 'Dec 20, 2024',
      duration: '4 weeks'
    },
    {
      id: 2,
      title: 'Advanced Automation',
      description: 'Master advanced automation techniques',
      instructor: 'Jane Doe',
      date: 'Jan 5, 2025',
      duration: '6 weeks'
    },
    {
      id: 3,
      title: 'AI & ML for Automation',
      description: 'Integrate AI and Machine Learning with RPA',
      instructor: 'Mike Johnson',
      date: 'Jan 15, 2025',
      duration: '8 weeks'
    }
  ];

  const displayTrainings = trainings;

  return (
    <section id="trainings" style={{
      padding: '80px 20px',
      background: '#fff'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h3 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0'
          }}>
            {displayTrainings.length > 0 ? 'Training Programs' : 'No Trainings'}
          </h3>
        </div>

        {displayTrainings.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 300px)',
            gap: '24px'
          }}>
          {displayTrainings.map((training) => (
            <div key={training.id} style={{
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
              e.currentTarget.style.borderColor = '#16a34a';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(22, 163, 74, 0.15)';
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                padding: '16px',
                minHeight: '60px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <h3 style={{
                  margin: '0',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#fff'
                }}>
                  {training.title}
                </h3>
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{
                  color: '#6b7280',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  margin: '0 0 8px 0'
                }}>
                  {training.description}
                </p>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '12px',
                  marginBottom: '0px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#374151'
                  }}>
                    <span>👨‍🏫</span>
                    <span>{training.instructor}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#374151'
                  }}>
                    <span>📅</span>
                    <span>{training.date}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#374151'
                  }}>
                    <span>⏱️</span>
                    <span>{training.duration}</span>
                  </div>
                </div>

                <button style={{
                  marginTop: 'auto',
                  width: '100%',
                  background: '#16a34a',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '12px',
                  cursor: training.link ? 'pointer' : 'default',
                  transition: 'all 0.3s ease',
                  opacity: training.link ? 1 : 0.5
                }}
                onClick={() => {
                  if (training.link) {
                    window.open(training.link, '_blank');
                  }
                }}>
                  {training.link ? 'Enroll Now' : 'No Link'}
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

export default Trainings;




