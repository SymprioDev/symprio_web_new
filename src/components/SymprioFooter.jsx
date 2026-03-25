import React from 'react';
import { FaLinkedin, FaYoutube, FaWhatsapp } from 'react-icons/fa';

export default function SymprioFooter() {
  return (
    <>
      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #0891b2 100%)',
        color: '#e5e7eb',
        padding: '60px 20px 30px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '50px'
          }}>
            {/* Column 1 - About Company */}
            <div>
              <h5 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#fff',
                margin: '0 0 20px 0'
              }}>
                ABOUT COMPANY
              </h5>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.8',
                margin: '0',
                color: '#d1d5db'
              }}>
                We at Symprio understand that every customer, every business problem, and every solution is unique. That's why we help organizations identify the root cause of a problem whether this be related to people, process or technology and then to define and deliver optimal solutions considering culture, cost and capability. AI enabled Automation: Chatbots, RPA, Integration and Orchestration, Process and ERP consulting With offices in Silicon Valley and in the fast -growing economies in Indo-Pacific region including Singapore, Malaysia and India, we bring the latest innovations to our clients.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h5 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#fff',
                margin: '0 0 20px 0'
              }}>
                QUICK LINKS
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  { name: 'Latest Blogs', url: 'https://symprioideas.medium.com/' },
                  { name: 'Careers', url: '/careers' },
                  { name: 'Privacy Policy', url: '/privacy-policy' }
                ].map((link, idx) => (
                  <li key={idx} style={{ marginBottom: '10px' }}>
                    <a href={link.url} {...((link.url.startsWith('http') || link.url.includes('privacy')) && { target: '_blank', rel: 'noopener noreferrer' })} style={{
                      color: '#d1d5db',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                    onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Services */}
            <div>
              <h5 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#fff',
                margin: '0 0 20px 0'
              }}>
                SERVICES
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  { name: 'Digital Transformation', url: '/digital-transformation' },
                  { name: 'Robotic Process Automation', url: '/rpa' },
                  { name: 'ERP Practice (Oracle)', url: '/erp' },
                  { name: 'Chatbots', url: '/chatbots' },
                  { name: 'Custom Development', url: '/custom-development' },
                  { name: 'Digital Workforce', url: '/digital-workforce' }
                ].map((service, idx) => (
                  <li key={idx} style={{ marginBottom: '10px' }}>
                    <a href={service.url} style={{
                      color: '#d1d5db',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                    onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Connect with us */}
            <div>
              <h5 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#fff',
                margin: '0 0 20px 0'
              }}>
                CONNECT WITH US
              </h5>
              <div style={{ display: 'flex', gap: '16px' }}>
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/company/symprio/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#d1d5db',
                    fontSize: '20px',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0077b5';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#d1d5db';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <FaLinkedin />
                </a>

                {/* YouTube */}
                <a 
                  href="https://www.youtube.com/@symprioautomation1485" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#d1d5db',
                    fontSize: '20px',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff0000';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#d1d5db';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <FaYoutube />
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://web.whatsapp.com/send?phone=60138802574&text=Hello!%20Welcome%20to%20Symprio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#d1d5db',
                    fontSize: '20px',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#25d366';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#d1d5db';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom - Copyright */}
          <div style={{
            borderTop: '1px solid #374151',
            paddingTop: '30px',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#9ca3af',
              margin: '0'
            }}>
              Copyright © 2024 <a href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>Symprio</a>. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}


