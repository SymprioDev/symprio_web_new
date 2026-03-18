import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showTrainingForm, setShowTrainingForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const navigate = useNavigate();
  const { user, logout, token } = useAuth();

  // Event form state
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    type: 'event',
    link: ''
  });

  // Training form state
  const [trainingForm, setTrainingForm] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
    instructor: '',
    capacity: '50',
    link: ''
  });

  // Job form state
  const [jobForm, setJobForm] = useState({
    title: '',
    department: 'Engineering',
    type: 'Full-time',
    description: '',
    location: 'Remote'
  });

  // Location form state
  const [locationForm, setLocationForm] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    imageFile: null,
    imageUrl: ''
  });

  // Fetch events, trainings, and jobs
  useEffect(() => {
    fetchEvents();
    fetchTrainings();
    fetchJobs();
    fetchEnquiries();
    fetchLocations();
    fetchJobApplications();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const fetchTrainings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/trainings');
      if (response.ok) {
        const data = await response.json();
        setTrainings(data);
      }
    } catch (error) {
      console.error('Failed to fetch trainings:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/enquiries', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setEnquiries(data.enquiries || []);
      }
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/locations');
      if (response.ok) {
        const data = await response.json();
        setLocations(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  };

  const fetchJobApplications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/job-applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setJobApplications(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to fetch job applications:', error);
    }
  };

  const handleDeleteJobApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/job-applications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchJobApplications();
      }
    } catch (error) {
      console.error('Failed to delete job application:', error);
    }
  };

  const handleDeleteEnquiry = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/enquiries/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchEnquiries();
      }
    } catch (error) {
      console.error('Failed to delete enquiry:', error);
    }
  };

  const handleUpdateEnquiryStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchEnquiries();
      }
    } catch (error) {
      console.error('Failed to update enquiry:', error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(eventForm)
      });

      if (response.ok) {
        setEventForm({ title: '', description: '', date: '', location: '', type: 'event', link: '' });
        setShowEventForm(false);
        fetchEvents();
      } else {
        alert('Failed to add event');
      }
    } catch (error) {
      alert('Error adding event: ' + error.message);
    }
  };

  const handleAddTraining = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/trainings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(trainingForm)
      });

      if (response.ok) {
        setTrainingForm({ title: '', description: '', date: '', duration: '', instructor: '', capacity: '50', link: '' });
        setShowTrainingForm(false);
        fetchTrainings();
      } else {
        alert('Failed to add training');
      }
    } catch (error) {
      alert('Error adding training: ' + error.message);
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jobForm)
      });

      if (response.ok) {
        setJobForm({ title: '', department: 'Engineering', type: 'Full-time', description: '', location: 'Remote' });
        setShowJobForm(false);
        fetchJobs();
        alert('Job posted successfully!');
      } else {
        alert('Failed to post job');
      }
    } catch (error) {
      alert('Error posting job: ' + error.message);
    }
  };

  const handleAddLocation = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', locationForm.name);
      formData.append('address', locationForm.address);
      formData.append('phone', locationForm.phone);
      formData.append('email', locationForm.email);
      if (locationForm.imageFile) {
        formData.append('image', locationForm.imageFile);
      }
      if (locationForm.imageUrl) {
        formData.append('imageUrl', locationForm.imageUrl);
      }

      const response = await fetch('http://localhost:5000/api/locations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setLocationForm({ name: '', address: '', phone: '', email: '', imageFile: null, imageUrl: '' });
        setShowLocationForm(false);
        fetchLocations();
      } else {
        alert('Failed to add location');
      }
    } catch (error) {
      alert('Error adding location: ' + error.message);
    }
  };

  const handleDeleteLocation = async (locationId) => {
    if (!window.confirm('Are you sure you want to delete this location?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/locations/${locationId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchLocations();
      } else {
        alert('Failed to delete location');
      }
    } catch (error) {
      alert('Error deleting location: ' + error.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchEvents();
      } else {
        alert('Failed to delete event');
      }
    } catch (error) {
      alert('Error deleting event: ' + error.message);
    }
  };

  const handleDeleteTraining = async (trainingId) => {
    if (!window.confirm('Are you sure you want to delete this training?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/trainings/${trainingId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchTrainings();
      } else {
        alert('Failed to delete training');
      }
    } catch (error) {
      alert('Error deleting training: ' + error.message);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchJobs();
      } else {
        alert('Failed to delete job');
      }
    } catch (error) {
      alert('Error deleting job: ' + error.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #00d4ff 0%, #3b82f6 100%)',
      padding: '30px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '32px', margin: '0 0 10px 0', color: '#1f2937' }}>
              Admin Dashboard
            </h1>
            <p style={{ color: '#6b7280', margin: 0 }}>
              Welcome, {user?.name || user?.email}
            </p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#b91c1c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#dc2626';
            }}
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '30px',
          background: 'white',
          padding: '12px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <button
            onClick={() => setActiveTab('events')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'events' ? '#00d4ff' : 'transparent',
              color: activeTab === 'events' ? 'white' : '#6b7280',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('trainings')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'trainings' ? '#00d4ff' : 'transparent',
              color: activeTab === 'trainings' ? 'white' : '#6b7280',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Trainings
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'jobs' ? '#00d4ff' : 'transparent',
              color: activeTab === 'jobs' ? 'white' : '#6b7280',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Post Jobs
          </button>
          <button
            onClick={() => setActiveTab('jobApplications')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'jobApplications' ? '#00d4ff' : 'transparent',
              color: activeTab === 'jobApplications' ? 'white' : '#6b7280',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Posted Jobs ({jobApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('locations')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'locations' ? '#00d4ff' : 'transparent',
              color: activeTab === 'locations' ? 'white' : '#6b7280',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Locations ({locations.length})
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'enquiries' ? '#00d4ff' : 'transparent',
              color: activeTab === 'enquiries' ? 'white' : '#6b7280',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Enquiries ({enquiries.length})
          </button>
        </div>

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <button
              onClick={() => setShowEventForm(!showEventForm)}
              style={{
                background: 'white',
                color: '#00d4ff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '30px'
              }}
            >
              {showEventForm ? '✕ Cancel' : '+ Add Event'}
            </button>

            {showEventForm && (
              <form
                onSubmit={handleAddEvent}
                style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '8px',
                  marginBottom: '30px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Title</label>
                  <input
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    placeholder="Event title"
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Description</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    placeholder="Event description"
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      boxSizing: 'border-box',
                      minHeight: '100px'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Date</label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Location</label>
                  <input
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    placeholder="Event location"
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Registration Link (Optional)</label>
                  <input
                    type="url"
                    value={eventForm.link}
                    onChange={(e) => setEventForm({ ...eventForm, link: e.target.value })}
                    placeholder="https://example.com/register"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: '#00d4ff',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Add Event
                </button>
              </form>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {events.map((event) => (
                <div
                  key={event.id}
                  style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <h3 style={{ margin: '0 0 8px 0' }}>{event.title}</h3>
                  <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>{event.description}</p>
                  <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>📅 {event.date}</p>
                  <p style={{ color: '#6b7280', margin: '0 0 16px 0' }}>📍 {event.location}</p>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    style={{
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trainings Tab */}
        {activeTab === 'trainings' && (
          <div>
            <button
              onClick={() => setShowTrainingForm(!showTrainingForm)}
              style={{
                background: 'white',
                color: '#00d4ff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '30px'
              }}
            >
              {showTrainingForm ? '✕ Cancel' : '+ Add Training'}
            </button>

            {showTrainingForm && (
              <form
                onSubmit={handleAddTraining}
                style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '8px',
                  marginBottom: '30px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Title</label>
                  <input
                    value={trainingForm.title}
                    onChange={(e) => setTrainingForm({ ...trainingForm, title: e.target.value })}
                    placeholder="Training title"
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Description</label>
                  <textarea
                    value={trainingForm.description}
                    onChange={(e) => setTrainingForm({ ...trainingForm, description: e.target.value })}
                    placeholder="Training description"
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      boxSizing: 'border-box',
                      minHeight: '100px'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Date</label>
                  <input
                    type="date"
                    value={trainingForm.date}
                    onChange={(e) => setTrainingForm({ ...trainingForm, date: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Duration</label>
                  <input
                    value={trainingForm.duration}
                    onChange={(e) => setTrainingForm({ ...trainingForm, duration: e.target.value })}
                    placeholder="e.g., 2 hours"
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Instructor</label>
                  <input
                    value={trainingForm.instructor}
                    onChange={(e) => setTrainingForm({ ...trainingForm, instructor: e.target.value })}
                    placeholder="Instructor name"
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Capacity</label>
                  <input
                    type="number"
                    value={trainingForm.capacity}
                    onChange={(e) => setTrainingForm({ ...trainingForm, capacity: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Enrollment Link (Optional)</label>
                  <input
                    type="url"
                    value={trainingForm.link}
                    onChange={(e) => setTrainingForm({ ...trainingForm, link: e.target.value })}
                    placeholder="https://example.com/enroll"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: '#00d4ff',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Add Training
                </button>
              </form>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {trainings.map((training) => (
                <div
                  key={training.id}
                  style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <h3 style={{ margin: '0 0 8px 0' }}>{training.title}</h3>
                  <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>{training.description}</p>
                  <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>📅 {training.date}</p>
                  <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>⏱️ {training.duration}</p>
                  <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>👨‍🏫 {training.instructor}</p>
                  <p style={{ color: '#6b7280', margin: '0 0 16px 0' }}>👥 Capacity: {training.capacity}</p>
                  <button
                    onClick={() => handleDeleteTraining(training.id)}
                    style={{
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div>
            <button
              onClick={() => setShowJobForm(!showJobForm)}
              style={{
                background: 'white',
                color: '#00d4ff',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              {showJobForm ? '✕ Close' : '+ Post New Job'}
            </button>

            {showJobForm && (
              <form
                onSubmit={handleAddJob}
                style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: '8px',
                  marginBottom: '30px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1f2937' }}>Job Title *</label>
                    <input
                      type="text"
                      placeholder="e.g., Senior React Developer"
                      value={jobForm.title}
                      onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1f2937' }}>Department *</label>
                    <select
                      value={jobForm.department}
                      onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Product">Product</option>
                      <option value="Design">Design</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1f2937' }}>Job Type *</label>
                    <select
                      value={jobForm.type}
                      onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1f2937' }}>Location</label>
                    <input
                      type="text"
                      placeholder="e.g., Remote, New York"
                      value={jobForm.location}
                      onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1f2937' }}>Job Description *</label>
                  <textarea
                    placeholder="Enter detailed job description..."
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    required
                    rows="6"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: '#00d4ff',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Post Job
                </button>
              </form>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    borderTop: `4px solid #${['3b82f6', '8b5cf6', 'f59e0b', 'ec4899', '10b981', '06b6d4'][['Engineering', 'Sales', 'Marketing', 'Product', 'Design', 'Operations'].indexOf(job.department)] || '3b82f6'}`
                  }}
                >
                  <h3 style={{ margin: '0 0 8px 0' }}>{job.title}</h3>
                  <p style={{ color: '#6b7280', margin: '0 0 8px 0', fontWeight: '600' }}>{job.department}</p>
                  <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>📋 {job.type}</p>
                  <p style={{ color: '#6b7280', margin: '0 0 16px 0' }}>📍 {job.location}</p>
                  <p style={{ color: '#4b5563', margin: '0 0 16px 0', fontSize: '14px' }}>{job.description}</p>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    style={{
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'jobApplications' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#1f2937' }}>
              Job Applications ({jobApplications.length})
            </h2>
            
            {jobApplications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                No job applications yet.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>First Name</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Last Name</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Mobile</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Job Title</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Cover Letter</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>CV</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Submitted</th>
                      <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobApplications.map((app) => (
                      <tr key={app.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '16px', color: '#374151' }}>{app.firstName}</td>
                        <td style={{ padding: '16px', color: '#374151' }}>{app.lastName}</td>
                        <td style={{ padding: '16px', color: '#374151' }}>{app.mobileNumber}</td>
                        <td style={{ padding: '16px', color: '#374151' }}>{app.jobTitle || '-'}</td>
                        <td style={{ padding: '16px', color: '#374151', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {app.coverLetter || '-'}
                        </td>
                        <td style={{ padding: '16px' }}>
                          {app.cvFilePath ? (
                            <a 
                              href={app.cvFilePath} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: '#00d4ff', textDecoration: 'none', fontWeight: '600' }}
                            >
                              Download CV
                            </a>
                          ) : '-'}
                        </td>
                        <td style={{ padding: '16px', color: '#374151' }}>
                          {app.submittedDate ? new Date(app.submittedDate).toLocaleDateString() : '-'}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <button
                            onClick={() => handleDeleteJobApplication(app.id)}
                            style={{
                              background: '#fee2e2',
                              color: '#dc2626',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: '600'
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'locations' && (
          <div>
            <button
              onClick={() => setShowLocationForm(!showLocationForm)}
              style={{
                background: 'white',
                color: '#00d4ff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '30px'
              }}
            >
              {showLocationForm ? '✕ Cancel' : '+ Add Location'}
            </button>

            {showLocationForm && (
              <form
                onSubmit={handleAddLocation}
                style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '8px',
                  marginBottom: '30px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Location Name</label>
                    <input
                      type="text"
                      value={locationForm.name}
                      onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                      placeholder="Location name"
                      required
                      style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Phone</label>
                    <input
                      type="text"
                      value={locationForm.phone}
                      onChange={(e) => setLocationForm({ ...locationForm, phone: e.target.value })}
                      placeholder="Phone number"
                      required
                      style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Address</label>
                  <input
                    type="text"
                    value={locationForm.address}
                    onChange={(e) => setLocationForm({ ...locationForm, address: e.target.value })}
                    placeholder="Full address"
                    required
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Email (optional)</label>
                    <input
                      type="email"
                      value={locationForm.email}
                      onChange={(e) => setLocationForm({ ...locationForm, email: e.target.value })}
                      placeholder="contact@company.com"
                      style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Background Image URL (optional)</label>
                    <input
                      type="text"
                      value={locationForm.imageUrl}
                      onChange={(e) => setLocationForm({ ...locationForm, imageUrl: e.target.value })}
                      placeholder="https://..."
                      style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Upload Background Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLocationForm({ ...locationForm, imageFile: e.target.files?.[0] || null })}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: '24px',
                    background: '#00d4ff',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Save Location
                </button>
              </form>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {locations.map((location) => (
                <div key={location.id} style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                  <div style={{ fontWeight: '700', color: '#1f2937', marginBottom: '6px' }}>{location.name}</div>
                  <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>{location.address}</div>
                  <div style={{ color: '#6b7280', fontSize: '14px' }}>📞 {location.phone}</div>
                  {location.email && <div style={{ color: '#6b7280', fontSize: '14px' }}>✉️ {location.email}</div>}
                  <button
                    onClick={() => handleDeleteLocation(location.id)}
                    style={{
                      marginTop: '12px',
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      padding: '8px 14px',
                      borderRadius: '6px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enquiries Tab */}
        {activeTab === 'enquiries' && (
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '24px', color: '#1f2937' }}>
              Customer Enquiries ({enquiries.length})
            </h2>
            {enquiries.length === 0 ? (
              <p style={{ color: '#6b7280' }}>No enquiries received yet.</p>
            ) : (
              <div style={{
                display: 'grid',
                gap: '16px'
              }}>
                {enquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    style={{
                      background: '#f9fafb',
                      padding: '16px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      borderLeft: `4px solid ${enquiry.status === 'new' ? '#f59e0b' : enquiry.status === 'replied' ? '#10b981' : '#6b7280'}`
                    }}
                  >
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '16px',
                      marginBottom: '12px'
                    }}>
                      <div>
                        <p style={{ margin: '0 0 4px 0', color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Name</p>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{enquiry.name}</p>
                      </div>
                      <div>
                        <p style={{ margin: '0 0 4px 0', color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Email</p>
                        <p style={{ margin: 0, fontSize: '14px', color: '#00d4ff' }}>{enquiry.email}</p>
                      </div>
                      <div>
                        <p style={{ margin: '0 0 4px 0', color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Phone</p>
                        <p style={{ margin: 0, fontSize: '14px' }}>{enquiry.phone}</p>
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '16px',
                      marginBottom: '12px'
                    }}>
                      <div>
                        <p style={{ margin: '0 0 4px 0', color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Company</p>
                        <p style={{ margin: 0, fontSize: '14px' }}>{enquiry.company}</p>
                      </div>
                      <div>
                        <p style={{ margin: '0 0 4px 0', color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Service</p>
                        <p style={{ margin: 0, fontSize: '14px' }}>{enquiry.service}</p>
                      </div>
                      <div>
                        <p style={{ margin: '0 0 4px 0', color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Submitted</p>
                        <p style={{ margin: 0, fontSize: '14px' }}>{new Date(enquiry.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div style={{
                      background: 'white',
                      padding: '12px',
                      borderRadius: '6px',
                      marginBottom: '12px'
                    }}>
                      <p style={{ margin: '0 0 4px 0', color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Message</p>
                      <p style={{ margin: 0, fontSize: '14px', color: '#4b5563', lineHeight: '1.6' }}>{enquiry.message}</p>
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center'
                    }}>
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleUpdateEnquiryStatus(enquiry.id, e.target.value)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          background: 'white',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      >
                        <option value="new">New</option>
                        <option value="replied">Replied</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button
                        onClick={() => handleDeleteEnquiry(enquiry.id)}
                        style={{
                          background: '#dc2626',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;




