import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TransformCTA() {
  const navigate = useNavigate();
  return (
    <section style={{
      background: '#010B1D',
      color: '#fff',
      padding: '120px 40px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <h2
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-offset="50"
          style={{
            fontSize: '42px',
            fontWeight: '400',
            marginBottom: '20px',
            lineHeight: '1.3',
            color: '#ffffff'
          }}>
          Ready to Transform Your <em className="accent-text" style={{fontWeight:'400', color:'#fff'}}>Business?</em>
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="800"
          data-aos-offset="50"
          style={{
            fontSize: '18px',
            lineHeight: '1.6',
            marginBottom: '40px',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '700px',
            margin: '0 auto 40px'
          }}>
          Let us help you navigate your digital transformation journey with proven strategies and innovative solutions
        </p>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '20px'
          }}>
          <button
            className="btn-pill btn-primary"
            onClick={() => navigate('/contact')}
            data-aos="fade-up"
            data-aos-delay="150"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              padding: '16px 48px',
              borderRadius: '9999px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: 'none'
            }}>
            Get a Free Consultation →
          </button>

          <button
            className="btn-pill btn-outline"
            onClick={() => navigate('/services')}
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              background: 'transparent',
              color: '#fff',
              border: '2px solid #fff',
              padding: '16px 48px',
              borderRadius: '9999px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}>
            View Our Services
          </button>
        </div>
      </div>
    </section>
  );
}
