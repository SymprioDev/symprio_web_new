import React from 'react';

const TeamMembers = () => {
  const team = [
    {
      name: 'Vilhelm Bjermeland',
      position: 'CEO',
      image: '/vilhelm_New.jpg',
      id: 1,
      linkedin: 'https://www.linkedin.com/in/get2vil/'
    },
    {
      name: 'Prabin Vijay',
      position: 'CTO',
      image: '/prabin_New.jpg',
      id: 2,
      linkedin: 'https://www.linkedin.com/in/prabin-vijay-89a2758/'
    },
    {
      name: 'Vivek Krishna',
      position: 'Director - AI/Automation',
      image: '/vivek_New.jpg',
      id: 3,
      linkedin: 'https://www.linkedin.com/in/vivekkkrishna/'
    },
    {
      name: 'Ramalingam Dushyanth',
      position: 'Regional Director - APAC',
      image: '/dushy.jpeg',
      id: 4,
      linkedin: 'https://www.linkedin.com/in/ddr-dushy/'
    }
  ];

  return (
    <section style={{
      width: '100%',
      margin: '0',
      padding: '120px 20px',
      background: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '80px'
      }}>
        <div className="section-tag">Our Team</div>
        <h2 data-aos="fade-up" data-aos-delay="100" data-aos-duration="800" data-aos-offset="50" style={{
          fontSize: '36px',
          fontWeight: '400',
          color: '#010B1D',
          margin: '0 0 15px 0',
          lineHeight: '1.2'
        }}>
          The Experts Behind <em className="accent-text" style={{fontWeight:'400'}}>Our Success</em>
        </h2>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
        maxWidth: '100%',
        margin: '0 auto'
      }}>
        {team.map((member, idx) => (
          <div
            key={member.id}
            data-aos="fade-up"
            data-aos-delay={idx * 120}
            data-aos-duration="700"
            data-aos-offset="50"
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              position: 'relative'
            }}
            onClick={() => window.open(member.linkedin, '_blank')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)';
              const icon = e.currentTarget.querySelector('.linkedin-icon');
              if (icon) icon.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)';
              const icon = e.currentTarget.querySelector('.linkedin-icon');
              if (icon) icon.style.opacity = '0';
            }}
          >
            {/* Image */}
            <div style={{
              width: '100%',
              height: '360px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  display: 'block'
                }}
              />
              {/* LinkedIn hover icon overlay */}
              <div className="linkedin-icon" style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#185ADB"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: '24px', textAlign: 'center' }}>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#010B1D',
                margin: '0 0 6px 0'
              }}>
                {member.name}
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#444444',
                margin: '0'
              }}>
                {member.position}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          section > div > div:last-of-type {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          section > div > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      </div>
    </section>
  );
};

export default TeamMembers;
