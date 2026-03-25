import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReadyToStartCTA from './ReadyToStartCTA';

export default function Careers() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [openPositions, setOpenPositions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    coverLetter: ''
  });
  const [cvFile, setCvFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
      offset: 100
    });
    return () => AOS.refresh();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setOpenPositions(data);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      // Fallback to default positions if API fails
      setOpenPositions([
        {
          id: 1,
          title: 'Senior AI/ML Engineer',
          department: 'Engineering',
          location: 'Remote',
          type: 'Full-time',
          description: 'Develop and deploy cutting-edge AI/ML solutions for enterprise clients. Work with agentic AI, RPA, and intelligent automation technologies.'
        },
        {
          id: 2,
          title: 'Consulting Manager',
          department: 'Consulting',
          location: 'Multiple Locations',
          type: 'Full-time',
          description: 'Lead digital transformation initiatives for Fortune 500 companies. Guide clients through AI adoption and process optimization.'
        },
        {
          id: 3,
          title: 'Solutions Architect',
          department: 'Engineering',
          location: 'Hybrid',
          type: 'Full-time',
          description: 'Design scalable AI and automation solutions. Collaborate with clients to understand requirements and deliver impactful implementations.'
        },
        {
          id: 4,
          title: 'Business Development Executive',
          department: 'Sales',
          location: 'Remote',
          type: 'Full-time',
          description: 'Drive growth by identifying and closing enterprise opportunities. Build strong client relationships and expand market presence.'
        },
        {
          id: 5,
          title: 'Data Analytics Specialist',
          department: 'Operations',
          location: 'Hybrid',
          type: 'Full-time',
          description: 'Analyze business data to drive strategic decisions. Create dashboards and reports for stakeholders and executives.'
        },
        {
          id: 6,
          title: 'Marketing Manager',
          department: 'Marketing',
          location: 'Remote',
          type: 'Full-time',
          description: 'Lead marketing campaigns and build brand presence. Create content and strategies to showcase our AI and automation expertise.'
        }
      ]);
    }
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'Engineering': '#3b82f6',
      'Sales': '#8b5cf6',
      'Marketing': '#f59e0b',
      'Product': '#ec4899',
      'Design': '#10b981',
      'Operations': '#06b6d4',
      'Consulting': '#3b82f6'
    };
    return colors[department] || '#3b82f6';
  };

  const handleApplyNow = (job) => {
    setSelectedRole(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRole(null);
    setApplicationData({
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      coverLetter: ''
    });
    setCvFile(null);
    setSubmitSuccess(false);
    setSubmitError('');
  };

  const handleApplicationChange = (e) => {
    const { name, value } = e.target;
    // For mobile number, only allow numbers
    if (name === 'mobileNumber') {
      const filtered = value.replace(/[^0-9]/g, '');
      setApplicationData(prev => ({ ...prev, [name]: filtered }));
    } else {
      setApplicationData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type (PDF only)
      if (file.type !== 'application/pdf') {
        setSubmitError('Only PDF files are allowed');
        return;
      }
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('File size must be less than 5MB');
        return;
      }
      setCvFile(file);
      setSubmitError('');
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', applicationData.firstName);
      formDataToSend.append('lastName', applicationData.lastName);
      formDataToSend.append('mobileNumber', applicationData.mobileNumber);
      formDataToSend.append('email', applicationData.email);
      formDataToSend.append('coverLetter', applicationData.coverLetter);
      formDataToSend.append('jobTitle', selectedRole?.title || '');
      formDataToSend.append('cv', cvFile);

      const response = await fetch('http://localhost:5000/api/job-applications', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmitSuccess(true);
      // Reset form after success
      setApplicationData({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        coverLetter: ''
      });
      setCvFile(null);
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const defaultOpenPositions = [];

  const benefits = [
    {
      icon: '💡',
      title: 'Innovation Culture',
      description: 'Work on cutting-edge AI and automation technologies that transform enterprises'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'Partner with world-class teams across consulting, engineering, and operations'
    },
    {
      icon: '📚',
      title: 'Learning & Development',
      description: 'Annual L&D budget and access to training programs, certifications, and conferences'
    },
    {
      icon: '⏰',
      title: 'Flexible Working',
      description: 'Work remotely or from our offices with flexible arrangements'
    },
    {
      icon: '🌍',
      title: 'Global Opportunities',
      description: 'Project opportunities across multiple continents and diverse industries'
    },
    {
      icon: '💼',
      title: 'Competitive Compensation',
      description: 'Attractive salary, performance bonuses, and comprehensive benefits package'
    }
  ];

  const diversityInitiatives = [
    {
      title: 'Equal Opportunity Employer',
      description: 'We are committed to creating an inclusive workplace where all employees are valued and respected.'
    },
    {
      title: 'Women in Tech',
      description: 'Support programs to attract and develop women in engineering, AI/ML, and leadership roles.'
    },
    {
      title: 'Global Diversity',
      description: 'We celebrate diverse backgrounds, perspectives, and experiences from our employees worldwide.'
    },
    {
      title: 'Mentorship Programs',
      description: 'Formal mentorship connecting underrepresented groups with senior leaders for guidance and growth.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc' }}>
      {/* Hero Banner */}
      <section style={{
        width: '100%',
        height: '400px',
        backgroundImage: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(8, 145, 178, 0.6) 100%), url("https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        <div>
          <h1 style={{
            fontSize: '56px',
            fontWeight: '700',
            margin: '0 0 20px 0',
            letterSpacing: '-1px',
            color: '#ffffff'
          }}>
            Join Our Team
          </h1>
          <p style={{
            fontSize: '20px',
            fontWeight: '300',
            margin: 0,
            opacity: 0.95
          }}>
            Build the future of enterprise AI and automation
          </p>
        </div>
      </section>

      {/* Working at Symprio Section - Enhanced */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 20px',
        backgroundColor: '#ffffff'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h2 
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#1f2937',
              margin: '0 0 12px 0',
              lineHeight: '1.2'
            }}>
            Working at Symprio
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              fontSize: '16px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.5'
            }}>
            Experience a workplace culture that values innovation, collaboration, and continuous growth
          </p>
        </div>

        {/* Benefits Timeline - Horizontal one-line layout */}
        <div 
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-offset="50"
          style={{
            position: 'relative',
            marginBottom: '80px',
            paddingTop: '20px',
            paddingBottom: '20px'
          }}>
          {/* Timeline items grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '20px',
            position: 'relative',
            zIndex: 1
          }}>
            {benefits.map((benefit, idx) => {
              const colors = [
                { primary: '#3b82f6', light: 'rgba(59, 130, 246, 0.08)' },
                { primary: '#8b5cf6', light: 'rgba(139, 92, 246, 0.08)' },
                { primary: '#f59e0b', light: 'rgba(245, 158, 11, 0.08)' },
                { primary: '#ec4899', light: 'rgba(236, 72, 153, 0.08)' },
                { primary: '#10b981', light: 'rgba(16, 185, 129, 0.08)' },
                { primary: '#06b6d4', light: 'rgba(6, 182, 212, 0.08)' }
              ];
              const color = colors[idx % colors.length];

              return (
                <div
                  key={idx}
                  data-aos="zoom-in"
                  data-aos-delay={`${idx * 100}`}
                  data-aos-duration="800"
                  data-aos-offset="50"
                  style={{
                    textAlign: 'center'
                  }}
                >
                  {/* Timeline dot/circle */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: color.light,
                    border: `4px solid ${color.primary}`,
                    borderRadius: '50%',
                    margin: '0 auto 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '36px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: `0 4px 12px ${color.primary}15`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = `0 12px 24px ${color.primary}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = `0 4px 12px ${color.primary}15`;
                  }}
                  >
                    {benefit.icon}
                  </div>

                  {/* Benefit number badge */}
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    background: `${color.primary}20`,
                    color: color.primary,
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    letterSpacing: '0.5px'
                  }}>
                    BENEFIT {idx + 1}
                  </div>

                  {/* Benefit title */}
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: '800',
                    color: '#1f2937',
                    margin: '8px 0 6px 0',
                    lineHeight: '1.3'
                  }}>
                    {benefit.title}
                  </h3>

                  {/* Benefit description */}
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Culture Section */}
        <div 
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-offset="50"
          style={{
            marginTop: '80px',
            padding: '40px',
            background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.08) 0%, rgba(25, 181, 254, 0.08) 100%)',
            border: '2px solid #0891b2',
            borderRadius: '12px',
            color: '#1f2937',
            textAlign: 'center'
          }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            margin: '0 0 15px 0',
            color: '#0891b2'
          }}>
            Our Culture
          </h3>
          <p style={{
            fontSize: '15px',
            lineHeight: '1.8',
            margin: 0,
            color: '#4b5563',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            At Symprio, we promote a culture that values innovation, collaboration, and continuous learning. We believe in empowering our employees to take ownership of their work, share ideas freely, and grow professionally. Our team is diverse, driven, and passionate about transforming enterprises through cutting-edge technology.
          </p>
        </div>
      </section>

      {/* Open Positions Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 20px',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h2 
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#1f2937',
              margin: '0 0 15px 0',
              lineHeight: '1.3'
            }}>
            Open Positions
          </h2>
          <div style={{
            width: '80px',
            height: '5px',
            background: 'linear-gradient(90deg, #19b5fe, #0f8cc8)',
            margin: '20px auto 30px',
            borderRadius: '3px'
          }} />
          <p 
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
            Explore exciting career opportunities across our organization
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {openPositions.map((position, idx) => {
            const deptColor = getDepartmentColor(position.department);

            return (
              <div
                key={position.id}
                data-aos="fade-up"
                data-aos-delay={`${idx * 80}`}
                data-aos-duration="800"
                data-aos-offset="50"
                style={{
                  background: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = deptColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                {/* Header with department color */}
                <div style={{
                  height: '4px',
                  background: deptColor
                }} />

                <div style={{
                  padding: '24px'
                }}>
                  {/* Department & Type Badges */}
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '16px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      background: `${deptColor}15`,
                      color: deptColor,
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '700',
                      border: `1px solid ${deptColor}30`
                    }}>
                      {position.department}
                    </span>
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      background: '#e2e8f0',
                      color: '#4b5563',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '700'
                    }}>
                      {position.type}
                    </span>
                  </div>

                  {/* Position Title */}
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: '0 0 12px 0',
                    lineHeight: '1.4'
                  }}>
                    {position.title}
                  </h3>

                  {/* Brief Description */}
                  <p style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    margin: '0 0 16px 0',
                    lineHeight: '1.6',
                    minHeight: '40px'
                  }}>
                    {position.description || `Join our ${position.department} team and make an impact.`}
                  </p>

                  {/* Learn More Button */}
                  <button
                    onClick={() => {
                      const expanded = openPositions[idx].expanded;
                      const newPositions = [...openPositions];
                      newPositions[idx].expanded = !expanded;
                      setOpenPositions(newPositions);
                    }}
                    style={{
                      background: `linear-gradient(135deg, ${deptColor}, ${deptColor}dd)`,
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = `0 8px 16px ${deptColor}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {openPositions[idx]?.expanded ? 'Close Details' : 'View Details'}
                  </button>
                </div>

                {/* Expanded Content */}
                {openPositions[idx]?.expanded && (
                  <div style={{
                    padding: '24px',
                    borderTop: `2px solid ${deptColor}15`,
                    background: `${deptColor}05`
                  }}>
                    <p style={{
                      fontSize: '14px',
                      color: '#4b5563',
                      margin: '0 0 16px 0',
                      lineHeight: '1.8'
                    }}>
                      {position.fullDescription || position.description}
                    </p>
                    <button
                      style={{
                        background: `${deptColor}15`,
                        color: deptColor,
                        border: `2px solid ${deptColor}`,
                        padding: '10px 20px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = deptColor;
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${deptColor}15`;
                        e.currentTarget.style.color = deptColor;
                      }}
                      onClick={() => handleApplyNow(position)}
                    >
                      Apply Now
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Graduate & Internship Programs */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 20px',
        backgroundColor: '#ffffff'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h2 
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#1f2937',
              margin: '0 0 15px 0',
              lineHeight: '1.3'
            }}>
            Graduate & Internship Programs
          </h2>
          <div style={{
            width: '80px',
            height: '5px',
            background: 'linear-gradient(90deg, #19b5fe, #0f8cc8)',
            margin: '20px auto 30px',
            borderRadius: '3px'
          }} />
          <p 
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
            Kickstart your career with our comprehensive graduate and internship programs designed for fresh talent
          </p>
        </div>

        {/* Alternating Layout - Graduate on Left, Internship on Right */}
        <div style={{
          marginBottom: '60px'
        }}>
          {/* Graduate Program */}
          <div 
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '60px',
              alignItems: 'center',
              marginBottom: '100px'
            }}>
            <div>
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                marginBottom: '20px'
              }}>
                12 MONTHS PROGRAM
              </div>
              <h3 style={{
                fontSize: '36px',
                fontWeight: '800',
                color: '#1f2937',
                margin: '0 0 20px 0',
                lineHeight: '1.2'
              }}>
                Graduate Program
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                lineHeight: '1.8',
                margin: '0 0 30px 0'
              }}>
                Join our structured 12-month graduate program designed for recent graduates to gain hands-on experience in AI, automation, and enterprise solutions.
              </p>
              <ul style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
                marginBottom: '30px'
              }}>
                {['Structured mentorship from industry experts', 'Real project ownership & impact', 'Comprehensive learning budget', 'Potential permanent role transition'].map((item, idx) => (
                  <li key={idx} style={{
                    fontSize: '14px',
                    color: '#4b5563',
                    margin: '15px 0',
                    paddingLeft: '28px',
                    position: 'relative',
                    lineHeight: '1.6'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#3b82f6',
                      fontWeight: '700',
                      fontSize: '18px'
                    }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button style={{
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleApplyNow({ title: 'Graduate Program' })}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                Apply Now
              </button>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 100%)',
              border: '2px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '16px',
              padding: '60px 40px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '64px',
                marginBottom: '20px'
              }}>
                🎓
              </div>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.8',
                margin: 0
              }}>
                Perfect for recent graduates eager to make their mark in enterprise AI, automation, and consulting.
              </p>
            </div>
          </div>

          {/* Internship Program - Reversed */}
          <div 
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '60px',
              alignItems: 'center'
            }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.02) 100%)',
              border: '2px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '16px',
              padding: '60px 40px',
              textAlign: 'center',
              order: '-1'
            }}>
              <div style={{
                fontSize: '64px',
                marginBottom: '20px'
              }}>
                💼
              </div>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.8',
                margin: 0
              }}>
                Ideal for students seeking flexible, practical experience while advancing their education.
              </p>
            </div>
            <div>
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'rgba(139, 92, 246, 0.1)',
                color: '#8b5cf6',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                marginBottom: '20px'
              }}>
                FLEXIBLE DURATION
              </div>
              <h3 style={{
                fontSize: '36px',
                fontWeight: '800',
                color: '#1f2937',
                margin: '0 0 20px 0',
                lineHeight: '1.2'
              }}>
                Internship Program
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                lineHeight: '1.8',
                margin: '0 0 30px 0'
              }}>
                Short-term and long-term opportunities across engineering, consulting, marketing, and operations.
              </p>
              <ul style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
                marginBottom: '30px'
              }}>
                {['Flexible duration (3-6 months or longer)', 'Competitive stipend', 'Flexible working hours', 'Strong career growth opportunity'].map((item, idx) => (
                  <li key={idx} style={{
                    fontSize: '14px',
                    color: '#4b5563',
                    margin: '15px 0',
                    paddingLeft: '28px',
                    position: 'relative',
                    lineHeight: '1.6'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#8b5cf6',
                      fontWeight: '700',
                      fontSize: '18px'
                    }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button style={{
                background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                color: 'white',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleApplyNow({ title: 'Internship Program' })}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 92, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Diversity & Inclusion */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 20px',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h2 
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#1f2937',
              margin: '0 0 15px 0',
              lineHeight: '1.3'
            }}>
            Diversity & Inclusion
          </h2>
          <div style={{
            width: '80px',
            height: '5px',
            background: 'linear-gradient(90deg, #19b5fe, #0f8cc8)',
            margin: '20px auto 30px',
            borderRadius: '3px'
          }} />
          <p 
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="800"
            data-aos-offset="50"
            style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
            We're committed to building an inclusive workplace where diverse talents thrive and grow
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {diversityInitiatives.map((initiative, idx) => {
            const colors = [
              { primary: '#f59e0b', light: 'rgba(245, 158, 11, 0.05)' },
              { primary: '#10b981', light: 'rgba(16, 185, 129, 0.05)' },
              { primary: '#06b6d4', light: 'rgba(6, 182, 212, 0.05)' },
              { primary: '#ec4899', light: 'rgba(236, 72, 153, 0.05)' }
            ];
            const color = colors[idx % colors.length];

            return (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={`${idx * 80}`}
                data-aos-duration="800"
                data-aos-offset="50"
                style={{
                  background: color.light,
                  border: `2px solid ${color.primary}`,
                  borderRadius: '12px',
                  padding: '32px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${color.primary}20`;
                  e.currentTarget.style.borderColor = color.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = color.primary;
                }}
              >
                {/* Color accent bar */}
                <div style={{
                  width: '4px',
                  height: '40px',
                  background: color.primary,
                  borderRadius: '2px',
                  marginBottom: '16px'
                }} />

                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: color.primary,
                  margin: '0 0 12px 0',
                  lineHeight: '1.3'
                }}>
                  {initiative.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {initiative.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <ReadyToStartCTA />

      {/* Job Application Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }} onClick={handleCloseModal}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '40px',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#6b7280',
                lineHeight: 1
              }}
            >
              ×
            </button>

            {/* Header */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>
                Apply for Position
              </h2>
              {selectedRole && (
                <p style={{
                  fontSize: '16px',
                  color: '#3b82f6',
                  margin: 0,
                  fontWeight: '600'
                }}>
                  {selectedRole.title}
                </p>
              )}
            </div>

            {/* Success Message */}
            {submitSuccess ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px'
              }}>
                <div style={{
                  fontSize: '60px',
                  marginBottom: '20px'
                }}>✅</div>
                <h3 style={{
                  fontSize: '24px',
                  color: '#1f2937',
                  marginBottom: '10px'
                }}>
                  Application Submitted!
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#6b7280',
                  marginBottom: '30px'
                }}>
                  Thank you for applying. We'll review your application and get back to you soon.
                </p>
                <button
                  onClick={handleCloseModal}
                  style={{
                    background: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 30px',
                    fontSize: '16px',
                    fontWeight: '600',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit}>
                {/* Error Message */}
                {submitError && (
                  <div style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    fontSize: '14px'
                  }}>
                    {submitError}
                  </div>
                )}

                {/* First Name */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={applicationData.firstName}
                    onChange={handleApplicationChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Last Name */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={applicationData.lastName}
                    onChange={handleApplicationChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Mobile Number */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={applicationData.mobileNumber}
                    onChange={handleApplicationChange}
                    required
                    pattern="[0-9]*"
                    inputMode="numeric"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Email */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={applicationData.email}
                    onChange={handleApplicationChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* CV Upload */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Upload CV (PDF only, max 5MB) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: '#fff'
                    }}
                  />
                  {cvFile && (
                    <p style={{
                      fontSize: '14px',
                      color: '#10b981',
                      marginTop: '8px'
                    }}>
                      Selected: {cvFile.name}
                    </p>
                  )}
                </div>

                {/* Cover Letter */}
                <div style={{ marginBottom: '30px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Cover Letter *
                  </label>
                  <textarea
                    name="coverLetter"
                    value={applicationData.coverLetter}
                    onChange={handleApplicationChange}
                    required
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: submitting ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6 0%, #0891b2 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
