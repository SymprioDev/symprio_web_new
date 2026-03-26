import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ApplicationViewModal from './ApplicationViewModal';
import ApplicationFilters from './ApplicationFilters';
import MailConfig from './MailConfig';
import SubscriptionViewModal from './SubscriptionViewModal';
import SubscriptionStatusTypes from './SubscriptionStatusTypes';
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  Mail,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Calendar,
  GraduationCap,
  MapPin,
  CheckCircle,
  Clock,
  TrendingUp,
  Plus,
  X,
  Brain
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [jobAppsLoading, setJobAppsLoading] = useState(true);
  const [jobAppsError, setJobAppsError] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showTrainingForm, setShowTrainingForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  
  // Modal state for job application view
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  
  // Filter state for job applications
  const [filters, setFilters] = useState({
    search: '',
    jobTitle: '',
    dateFrom: '',
    dateTo: '',
    status: ''
  });

  // Notification state
  const [notification, setNotification] = useState(null);

  // Subscription config state
  const [subscriptionRate, setSubscriptionRate] = useState('');
  const [loadingSubscriptionRate, setLoadingSubscriptionRate] = useState(true);

  // Subscriptions state
  const [subscriptions, setSubscriptions] = useState([]);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(true);
  const [subscriptionStatusTypes, setSubscriptionStatusTypes] = useState([]);
  
  // Subscription modal state
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // AI Conversations state
  const [conversations, setConversations] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [expandedConversation, setExpandedConversation] = useState(null);

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };
  
  const navigate = useNavigate();
  const { user, logout, token } = useAuth();

  // Event form state
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    type: 'event',
    link: '',
    registration_link: ''
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
    fetchSubscriptionConfig();
    fetchConversations();
  }, []);

  // Fetch subscriptions after auth is loaded
  useEffect(() => {
    if (token) {
      fetchSubscriptions();
      fetchSubscriptionStatusTypes();
    }
  }, [token]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
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
      const response = await fetch('/api/trainings');
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
      const response = await fetch('/api/jobs');
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
      const response = await fetch('/api/enquiries', {
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
      const response = await fetch('/api/locations');
      if (response.ok) {
        const data = await response.json();
        setLocations(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  };

  const fetchJobApplications = async () => {
    setJobAppsLoading(true);
    setJobAppsError(null);
    try {
      const response = await fetch('/api/job-applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setJobApplications(Array.isArray(data) ? data : []);
      } else if (response.status === 401) {
        setJobAppsError('Session expired. Please log in again.');
      } else {
        setJobAppsError('Failed to load job applications');
      }
    } catch (error) {
      console.error('Failed to fetch job applications:', error);
      setJobAppsError('Failed to load job applications. Please try again.');
    } finally {
      setJobAppsLoading(false);
    }
  };

  const fetchSubscriptionConfig = async () => {
    setLoadingSubscriptionRate(true);
    try {
      const response = await fetch('/api/admin/subscription-config', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSubscriptionRate(data.rate || 50);
      }
    } catch (error) {
      console.error('Failed to fetch subscription config:', error);
    } finally {
      setLoadingSubscriptionRate(false);
    }
  };

  const fetchSubscriptions = async () => {
    if (!token) {
      console.warn('No token available, skipping fetch');
      return;
    }
    setLoadingSubscriptions(true);
    try {
      const response = await fetch('/api/subscription', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubscriptions(Array.isArray(data) ? data : []);
      } else if (response.status === 401) {
        console.error('Unauthorized - token may be expired');
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoadingSubscriptions(false);
    }
  };

  const fetchSubscriptionStatusTypes = async () => {
    if (!token) return;
    try {
      const response = await fetch('/api/admin/subscription-status-types', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSubscriptionStatusTypes(data);
      }
    } catch (error) {
      console.error('Error fetching subscription status types:', error);
    }
  };

  const fetchConversations = async () => {
    setLoadingConversations(true);
    try {
      const response = await fetch('/api/ai-conversations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setConversations(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to fetch AI conversations:', error);
    } finally {
      setLoadingConversations(false);
    }
  };

  const handleDeleteConversation = async (id) => {
    if (!window.confirm('Are you sure you want to delete this conversation?')) return;
    try {
      const response = await fetch(`/api/ai-conversations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setConversations(prev => prev.filter(c => c.id !== id));
        showNotification('success', 'Conversation deleted successfully');
      } else {
        showNotification('error', 'Failed to delete conversation');
      }
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      showNotification('error', 'Error deleting conversation');
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '-';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  // Helper function to get status color
  const getSubscriptionStatusColor = (statusName) => {
    const status = subscriptionStatusTypes.find(s => s.status_name === statusName);
    if (status) {
      return {
        background: status.color + '20',
        color: status.color,
        border: `1px solid ${status.color}40`
      };
    }
    // Default colors if not found
    const defaultColors = {
      'Pending': { background: '#fef3c7', color: '#d97706', border: '#f59e0b40' },
      'Reviewed': { background: '#d1fae5', color: '#059669', border: '#10b98140' },
      'Rejected': { background: '#fee2e2', color: '#dc2626', border: '#ef444440' }
    };
    return defaultColors[statusName] || { background: '#f3f4f6', color: '#6b7280', border: '#d1d5db40' };
  };

  const handleDeleteSubscription = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subscription?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/subscription/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        showNotification('success', 'Subscription deleted successfully');
        setSubscriptions(prev => prev.filter(sub => sub.id !== id));
      } else {
        showNotification('error', 'Failed to delete subscription');
      }
    } catch (error) {
      console.error('Error deleting subscription:', error);
      showNotification('error', 'Error deleting subscription');
    }
  };

  // Handle subscription status change
  const handleSubscriptionStatusChange = async (id, newStatus) => {
    setSubscriptions(prev =>
      prev.map(sub =>
        sub.id === id ? { ...sub, status: newStatus } : sub
      )
    );
    
    try {
      const response = await fetch(`/api/subscriptions/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) {
        showNotification('error', 'Failed to update subscription status');
      } else {
        showNotification('success', 'Status updated successfully');
      }
    } catch (error) {
      console.error('Error updating subscription status:', error);
    }
  };

  const handleViewSubscription = (sub) => {
    setSelectedSubscription(sub);
    setShowSubscriptionModal(true);
  };

  const handleSaveSubscriptionConfig = async (e) => {
    e.preventDefault();
    
    if (!subscriptionRate || subscriptionRate <= 0) {
      showNotification('error', 'Rate must be greater than 0');
      return;
    }

    try {
      const response = await fetch('/api/admin/subscription-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rate: parseInt(subscriptionRate) })
      });

      if (response.ok) {
        showNotification('success', 'Subscription config saved successfully');
      } else {
        showNotification('error', 'Failed to save subscription config');
      }
    } catch (error) {
      console.error('Failed to save subscription config:', error);
      showNotification('error', 'Failed to save subscription config');
    }
  };

  const handleDeleteJobApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      const response = await fetch(`/api/job-applications/${id}`, {
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

  const handleStatusChange = async (id, newStatus) => {
    setJobApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
    
    setFilters(prev => ({ ...prev }));
    
    try {
      const response = await fetch(`/api/job-applications/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteEnquiry = async (id) => {
    try {
      const response = await fetch(`/api/enquiries/${id}`, {
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
      const response = await fetch(`/api/enquiries/${id}`, {
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
      const response = await fetch('/api/events', {
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
      const response = await fetch('/api/trainings', {
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
      const response = await fetch('/api/jobs', {
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

      const response = await fetch('/api/locations', {
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
      const response = await fetch(`/api/locations/${locationId}`, {
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
      const response = await fetch(`/api/events/${eventId}`, {
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
      const response = await fetch(`/api/trainings/${trainingId}`, {
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
      const response = await fetch(`/api/jobs/${jobId}`, {
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

  // Filter job applications using useMemo for performance
  const filteredApplications = useMemo(() => {
    return jobApplications.filter(app => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          (app.firstName?.toLowerCase().includes(searchLower)) ||
          (app.lastName?.toLowerCase().includes(searchLower)) ||
          (app.email?.toLowerCase().includes(searchLower)) ||
          (app.jobTitle?.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      if (filters.jobTitle && app.jobTitle !== filters.jobTitle) {
        return false;
      }

      if (filters.dateFrom) {
        const appDate = new Date(app.submittedDate);
        const fromDate = new Date(filters.dateFrom);
        appDate.setHours(0, 0, 0, 0);
        fromDate.setHours(0, 0, 0, 0);
        if (appDate < fromDate) return false;
      }

      if (filters.dateTo) {
        const appDate = new Date(app.submittedDate);
        const toDate = new Date(filters.dateTo);
        appDate.setHours(23, 59, 59, 999);
        toDate.setHours(23, 59, 59, 999);
        if (appDate > toDate) return false;
      }

      if (filters.status) {
        const appStatus = app.status || 'pending';
        if (appStatus !== filters.status) {
          return false;
        }
      }

      return true;
    });
  }, [jobApplications, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      jobTitle: '',
      dateFrom: '',
      dateTo: '',
      status: ''
    });
  };

  // Calculate dashboard stats (case-insensitive)
  const pendingEnquiries = enquiries.filter(e => (e.status || '').toLowerCase() === 'new').length;
  const pendingApplications = jobApplications.filter(a => !a.status || (a.status || '').toLowerCase() === 'pending').length;
  const pendingSubscriptions = subscriptions.filter(s => !s.status || (s.status || '').toLowerCase() === 'pending').length;

  // Sidebar menu items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'trainings', label: 'Trainings', icon: GraduationCap },
    { id: 'jobs', label: 'Job Listings', icon: Briefcase },
    { id: 'jobApplications', label: 'Job Applications', icon: Users, badge: pendingApplications },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare, badge: pendingEnquiries },
    { id: 'subscriptions', label: 'Support Subscriptions', icon: CheckCircle, badge: pendingSubscriptions },
    { id: 'aiConversations', label: 'AI Conversations', icon: Brain },
    { id: 'subscriptionConfig', label: 'Subscription Config', icon: Settings },
    { id: 'statusTypes', label: 'Status Types', icon: TrendingUp },
    { id: 'mailConfig', label: 'Mail Configuration', icon: Mail },
  ];

  // Status badge component
  const StatusBadge = ({ status, type = 'default' }) => {
    // Normalize status to lowercase for consistent color mapping
    const normalizedStatus = (status || '').toLowerCase();
    
    const colors = {
      new: 'bg-yellow-100 text-yellow-700',
      replied: 'bg-green-100 text-green-700',
      resolved: 'bg-blue-100 text-blue-700',
      pending: 'bg-yellow-100 text-yellow-700',
      reviewed: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      default: 'bg-gray-100 text-gray-700'
    };
    
    // Capitalize first letter for display
    const displayStatus = status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : '';
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[normalizedStatus] || colors.default}`}>
        {displayStatus}
      </span>
    );
  };

  // Card component
  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between min-w-0">
      <div className="min-w-0 flex-1">
        <p className="text-gray-500 text-sm truncate">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        {trend && (
          <p className="text-xs text-green-600 mt-1 flex items-center">
            <TrendingUp size={12} className="mr-1 shrink-0" />
            <span className="truncate">{trend}</span>
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg shrink-0 ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 flex flex-col h-screen overflow-hidden`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0a2d6e] to-[#0d9488] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20">
              <span className="text-white font-black text-xl">S</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-extrabold text-[#0a2d6e] text-lg tracking-tight">Symprio</h1>
                <p className="text-[10px] font-bold text-teal-600 uppercase letter-spacing-widest">Admin Control</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                  ${isActive 
                    ? 'bg-[#0a2d6e] text-white font-bold shadow-lg shadow-[#0a2d6e]/20' 
                    : 'hover:bg-[#0a2d6e]/5 text-gray-500 hover:text-[#0a2d6e]'}
                `}
              >
                <Icon size={20} className={`shrink-0 ${isActive ? 'text-teal-400' : ''}`} />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {item.badge > 0 && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${isActive ? 'bg-white text-[#0a2d6e]' : 'bg-red-500 text-white'}`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-200 space-y-2 shrink-0">
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-all"
          >
            <LogOut size={20} className="shrink-0" />
            {sidebarOpen && <span className="truncate">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Right Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow shrink-0 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                {menuItems.find(m => m.id === activeTab)?.label || 'Dashboard'}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-800">{user?.name || user?.email}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-[#0a2d6e] to-[#0d9488] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/10">
              <span className="text-white font-black text-xs">
                {(user?.name || user?.email || 'A')[0].toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 overflow-y-auto flex-1 bg-gray-100">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard 
                  title="Total Enquiries" 
                  value={enquiries.length} 
                  icon={MessageSquare}
                  color="bg-[#0a2d6e]"
                  trend={`${pendingEnquiries} pending`}
                />
                <StatCard 
                  title="Job Applications" 
                  value={jobApplications.length} 
                  icon={Briefcase}
                  color="bg-[#0d9488]"
                  trend={`${pendingApplications} pending`}
                />
                <StatCard 
                  title="Subscriptions" 
                  value={subscriptions.length} 
                  icon={Users}
                  color="bg-[#0a2d6e]"
                  trend={`${pendingSubscriptions} pending`}
                />
                <StatCard
                  title="AI Conversations"
                  value={conversations.length}
                  icon={Brain}
                  color="bg-purple-600"
                />
                <StatCard
                  title="Upcoming Events"
                  value={events.length}
                  icon={Calendar}
                  color="bg-[#0d9488]"
                />
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <button 
                    onClick={() => setActiveTab('enquiries')}
                    className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
                  >
                    <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">View Enquiries</p>
                  </button>
                  <button 
                    onClick={() => setActiveTab('jobApplications')}
                    className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center"
                  >
                    <Briefcase className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">Review Applications</p>
                  </button>
                  <button 
                    onClick={() => setActiveTab('subscriptions')}
                    className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center"
                  >
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">Manage Subscriptions</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('mailConfig')}
                    className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center"
                  >
                    <Mail className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">Mail Settings</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('aiConversations')}
                    className="p-4 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors text-center"
                  >
                    <Brain className="w-8 h-8 text-violet-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">View AI Conversations</p>
                  </button>
                </div>
              </div>

              {/* Recent Activity Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Enquiries */}
                <div className="bg-white rounded-xl shadow">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800">Recent Enquiries</h2>
                    <button 
                      onClick={() => setActiveTab('enquiries')}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      View All <ChevronRight size={14} className="inline" />
                    </button>
                  </div>
                  <div className="p-4">
                    {enquiries.slice(0, 3).map((enquiry) => (
                      <div key={enquiry.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="font-medium text-gray-800">{enquiry.name}</p>
                          <p className="text-sm text-gray-500">{enquiry.email}</p>
                        </div>
                        <StatusBadge status={enquiry.status} />
                      </div>
                    ))}
                    {enquiries.length === 0 && (
                      <p className="text-center text-gray-500 py-4">No enquiries yet</p>
                    )}
                  </div>
                </div>

                {/* Recent Applications */}
                <div className="bg-white rounded-xl shadow">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800">Recent Applications</h2>
                    <button 
                      onClick={() => setActiveTab('jobApplications')}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      View All <ChevronRight size={14} className="inline" />
                    </button>
                  </div>
                  <div className="p-4">
                    {jobApplications.slice(0, 3).map((app) => (
                      <div key={app.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="font-medium text-gray-800">{app.firstName}</p>
                          <p className="text-sm text-gray-500">{app.jobTitle || 'General Application'}</p>
                        </div>
                        <StatusBadge status={app.status || 'pending'} />
                      </div>
                    ))}
                    {jobApplications.length === 0 && (
                      <p className="text-center text-gray-500 py-4">No applications yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enquiries Tab */}
          {activeTab === 'enquiries' && (
            <div className="bg-white rounded-xl shadow">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">
                  Customer Enquiries ({enquiries.length})
                </h2>
              </div>
              <div className="p-4">
                {enquiries.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No enquiries received yet.</p>
                ) : (
                  <div className="space-y-4">
                    {enquiries.map((enquiry) => (
                      <div
                        key={enquiry.id}
                        className="bg-gray-50 p-4 rounded-lg border-l-4"
                        style={{ borderLeftColor: enquiry.status === 'new' ? '#f59e0b' : enquiry.status === 'replied' ? '#10b981' : '#6b7280' }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold">Name</p>
                            <p className="font-medium text-gray-800">{enquiry.name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                            <p className="text-blue-600">{enquiry.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold">Phone</p>
                            <p className="text-gray-700">{enquiry.phone}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold">Company</p>
                            <p className="text-gray-700">{enquiry.company}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold">Service</p>
                            <p className="text-gray-700">{enquiry.service}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold">Date</p>
                            <p className="text-gray-700">{new Date(enquiry.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg mb-3">
                          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Message</p>
                          <p className="text-gray-700 text-sm">{enquiry.message}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <select
                            value={enquiry.status}
                            onChange={(e) => handleUpdateEnquiryStatus(enquiry.id, e.target.value)}
                            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="new">New</option>
                            <option value="replied">Replied</option>
                            <option value="resolved">Resolved</option>
                          </select>
                          <button
                            onClick={() => handleDeleteEnquiry(enquiry.id)}
                            className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Job Applications Tab */}
          {activeTab === 'jobApplications' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Job Applications ({filteredApplications.length}{jobApplications.length > 0 && ` of ${jobApplications.length}`})
                  </h2>
                </div>
                <div className="p-4">
                  {jobAppsLoading && (
                    <div className="text-center py-8 text-gray-500">Loading job applications...</div>
                  )}
                  
                  {!jobAppsLoading && jobAppsError && (
                    <div className="text-center py-8 text-red-600 bg-red-50 rounded-lg">{jobAppsError}</div>
                  )}
                  
                  {!jobAppsLoading && !jobAppsError && jobApplications.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No job applications yet.</div>
                  )}
                  
                  {!jobAppsLoading && !jobAppsError && jobApplications.length > 0 && (
                    <>
                      <ApplicationFilters
                        jobs={jobs}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onReset={handleResetFilters}
                      />
                      
                      {filteredApplications.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          No applications found matching your filters.
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full border rounded-lg overflow-hidden min-w-[600px]">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">First Name</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">Mobile</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">Job Title</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">Submitted</th>
                                <th className="p-3 text-center text-sm font-semibold text-gray-700">Status</th>
                                <th className="p-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredApplications.map((app) => (
                                <tr key={app.id} className="border-t hover:bg-gray-50">
                                  <td className="p-3 text-gray-800">{app.firstName}</td>
                                  <td className="p-3 text-gray-800">{app.mobileNumber}</td>
                                  <td className="p-3 text-gray-800">{app.jobTitle || '-'}</td>
                                  <td className="p-3 text-gray-800">
                                    {app.submittedDate ? new Date(app.submittedDate).toLocaleDateString() : '-'}
                                  </td>
                                  <td className="p-3 text-center">
                                    <select
                                      value={app.status || 'pending'}
                                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                      className={`px-2 py-1 rounded text-xs font-medium border-0 ${
                                        app.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                                        app.status === 'reviewed' ? 'bg-green-100 text-green-700' : 
                                        'bg-yellow-100 text-yellow-700'
                                      }`}
                                    >
                                      <option value="pending">Pending</option>
                                      <option value="reviewed">Reviewed</option>
                                      <option value="rejected">Rejected</option>
                                    </select>
                                  </td>
                                  <td className="p-3 text-center">
                                    <div className="flex gap-2 justify-center">
                                      <button
                                        onClick={() => {
                                          setSelectedApplication(app);
                                          setShowApplicationModal(true);
                                        }}
                                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                      >
                                        View
                                      </button>
                                      <button
                                        onClick={() => handleDeleteJobApplication(app.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Subscriptions Tab */}
          {activeTab === 'subscriptions' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Support Subscriptions ({subscriptions.length})
                  </h2>
                </div>
                <div className="p-4">
                  {loadingSubscriptions && (
                    <div className="text-center py-8 text-gray-500">Loading subscriptions...</div>
                  )}
                  
                  {!loadingSubscriptions && subscriptions.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No subscriptions found.</div>
                  )}
                  
                  {!loadingSubscriptions && subscriptions.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full border rounded-lg overflow-hidden min-w-[800px]">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="p-3 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-700">Company</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Hours</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Total</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-700">Date</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Status</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subscriptions.map((sub) => {
                            // Normalize status to handle case mismatch
                            const displayStatus = sub.status 
                              ? sub.status.charAt(0).toUpperCase() + sub.status.slice(1).toLowerCase()
                              : 'Pending';
                            const normalizedStatus = (sub.status || 'Pending').toLowerCase();
                            
                            return (
                              <tr key={sub.id} className="border-t hover:bg-gray-50">
                                <td className="p-3 text-gray-800">{sub.name || '-'}</td>
                                <td className="p-3 text-gray-800">{sub.companyName || '-'}</td>
                                <td className="p-3 text-gray-800">{sub.contactNumber || '-'}</td>
                                <td className="p-3 text-center text-gray-800">{sub.hours || 0}</td>
                                <td className="p-3 text-center text-cyan-600 font-semibold">${sub.totalAmount || 0}</td>
                                <td className="p-3 text-gray-800">
                                  {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('en-GB') : '-'}
                                </td>
                                <td className="p-3 text-center">
                                  <div className="flex flex-col items-center gap-2">
                                    <span 
                                      className={`px-2 py-1 rounded text-xs font-semibold ${
                                        normalizedStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                        normalizedStatus === 'reviewed' ? 'bg-green-100 text-green-700' :
                                        normalizedStatus === 'rejected' ? 'bg-red-100 text-red-700' :
                                        'bg-gray-100 text-gray-700'
                                      }`}
                                    >
                                      {displayStatus}
                                    </span>
                                    <select
                                      value={displayStatus}
                                      onChange={(e) => handleSubscriptionStatusChange(sub.id, e.target.value)}
                                      className="px-2 py-1 border border-gray-300 rounded text-xs"
                                    >
                                      {subscriptionStatusTypes.length > 0 ? (
                                        subscriptionStatusTypes.map(status => (
                                          <option key={status.id} value={status.status_name}>{status.status_name}</option>
                                        ))
                                      ) : (
                                        <>
                                          <option value="Pending">Pending</option>
                                          <option value="Reviewed">Reviewed</option>
                                          <option value="Rejected">Rejected</option>
                                        </>
                                      )}
                                    </select>
                                  </div>
                                </td>
                                <td className="p-3 text-center">
                                  <div className="flex gap-2 justify-center">
                                    <button
                                      onClick={() => handleViewSubscription(sub)}
                                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                    >
                                      View
                                    </button>
                                    <button
                                      onClick={() => handleDeleteSubscription(sub.id)}
                                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* AI Conversations Tab */}
          {activeTab === 'aiConversations' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    AI Conversations
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      {conversations.length}
                    </span>
                  </h2>
                </div>
                <div className="p-4">
                  {loadingConversations && (
                    <div className="text-center py-8 text-gray-500">Loading AI conversations...</div>
                  )}

                  {!loadingConversations && conversations.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No AI conversations yet.</div>
                  )}

                  {!loadingConversations && conversations.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full border rounded-lg overflow-hidden min-w-[800px]">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="p-3 text-left text-sm font-semibold text-gray-700">Date</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Status</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Language</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Duration</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-700">Summary</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {conversations.map((conv) => (
                            <React.Fragment key={conv.id}>
                              <tr className="border-t hover:bg-gray-50">
                                <td className="p-3 text-gray-800 text-sm">
                                  {conv.created_at ? new Date(conv.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                                </td>
                                <td className="p-3 text-center">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    conv.status === 'done' || conv.status === 'completed'
                                      ? 'bg-green-100 text-green-700'
                                      : conv.status === 'in-progress' || conv.status === 'processing'
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {conv.status || 'unknown'}
                                  </span>
                                </td>
                                <td className="p-3 text-center text-gray-800 text-sm">{conv.language || '-'}</td>
                                <td className="p-3 text-center text-gray-800 text-sm">{formatDuration(conv.duration_seconds)}</td>
                                <td className="p-3 text-gray-600 text-sm max-w-xs">
                                  {conv.summary
                                    ? conv.summary.length > 100
                                      ? conv.summary.substring(0, 100) + '...'
                                      : conv.summary
                                    : '-'}
                                </td>
                                <td className="p-3 text-center">
                                  <div className="flex gap-2 justify-center">
                                    <button
                                      onClick={() => setExpandedConversation(expandedConversation === conv.id ? null : conv.id)}
                                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                    >
                                      {expandedConversation === conv.id ? 'Hide' : 'View'}
                                    </button>
                                    <button
                                      onClick={() => handleDeleteConversation(conv.id)}
                                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              {expandedConversation === conv.id && (
                                <tr>
                                  <td colSpan="6" className="p-0">
                                    <div className="bg-gray-50 p-4 border-t border-gray-200">
                                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Full Transcript</h4>
                                      <div
                                        className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 max-h-96 overflow-y-auto"
                                        style={{ whiteSpace: 'pre-wrap' }}
                                      >
                                        {conv.transcript || 'No transcript available.'}
                                      </div>
                                      {conv.summary && (
                                        <>
                                          <h4 className="text-sm font-semibold text-gray-700 mt-4 mb-2">Summary</h4>
                                          <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700" style={{ whiteSpace: 'pre-wrap' }}>
                                            {conv.summary}
                                          </div>
                                        </>
                                      )}
                                      {conv.conversation_id && (
                                        <p className="text-xs text-gray-400 mt-3">Conversation ID: {conv.conversation_id}</p>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Subscription Config Tab */}
          {activeTab === 'subscriptionConfig' && (
            <div className="bg-white rounded-xl shadow p-6 max-w-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Subscription Rate Configuration</h2>
              <p className="text-gray-600 mb-6">Set the rate per hour for support hours subscription.</p>
              <form onSubmit={handleSaveSubscriptionConfig}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rate ($ per hour)</label>
                  <input
                    type="number"
                    value={subscriptionRate}
                    onChange={(e) => setSubscriptionRate(e.target.value)}
                    placeholder="Enter rate per hour"
                    min="1"
                    required
                    disabled={loadingSubscriptionRate}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loadingSubscriptionRate}
                  className="w-full bg-cyan-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-cyan-600 disabled:opacity-50"
                >
                  {loadingSubscriptionRate ? 'Loading...' : 'Save Configuration'}
                </button>
              </form>
            </div>
          )}

          {/* Status Types Tab */}
          {activeTab === 'statusTypes' && (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <SubscriptionStatusTypes 
                token={token} 
                onNotification={showNotification}
                onRefresh={fetchSubscriptionStatusTypes}
              />
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Events ({events.length})</h2>
                  <button
                    onClick={() => setShowEventForm(!showEventForm)}
                    className="flex items-center gap-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600"
                  >
                    {showEventForm ? <X size={18} /> : <Plus size={18} />}
                    {showEventForm ? 'Cancel' : 'Add Event'}
                  </button>
                </div>
                
                {showEventForm && (
                  <form onSubmit={handleAddEvent} className="p-4 border-b border-gray-100 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                          value={eventForm.title}
                          onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                          placeholder="Event title"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                          type="date"
                          value={eventForm.date}
                          onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        value={eventForm.location}
                        onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                        placeholder="Event location"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={eventForm.description}
                        onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                        placeholder="Event description"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Registration Link</label>
                      <input
                        value={eventForm.registration_link}
                        onChange={(e) => setEventForm({ ...eventForm, registration_link: e.target.value })}
                        placeholder="https://example.com/register"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-400 mt-1">AI will auto-generate a banner image from event content</p>
                    </div>
                    <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600">
                      Add Event
                    </button>
                  </form>
                )}
                
                <div className="p-4">
                  {events.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No events yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {events.map((event) => (
                        <div key={event.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          {event.banner_image && (
                            <img src={event.banner_image} alt={event.title} className="w-full h-32 object-cover" />
                          )}
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-800 mb-2">{event.title}</h3>
                            <p className="text-sm text-gray-600 mb-1">📅 {event.date}</p>
                            <p className="text-sm text-gray-600 mb-2">📍 {event.location}</p>
                            {event.registration_link && (
                              <p className="text-xs text-blue-500 mb-2 truncate">🔗 {event.registration_link}</p>
                            )}
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{event.description}</p>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Trainings Tab */}
          {activeTab === 'trainings' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Trainings ({trainings.length})</h2>
                  <button
                    onClick={() => setShowTrainingForm(!showTrainingForm)}
                    className="flex items-center gap-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600"
                  >
                    {showTrainingForm ? <X size={18} /> : <Plus size={18} />}
                    {showTrainingForm ? 'Cancel' : 'Add Training'}
                  </button>
                </div>
                
                {showTrainingForm && (
                  <form onSubmit={handleAddTraining} className="p-4 border-b border-gray-100 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                          value={trainingForm.title}
                          onChange={(e) => setTrainingForm({ ...trainingForm, title: e.target.value })}
                          placeholder="Training title"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                        <input
                          value={trainingForm.instructor}
                          onChange={(e) => setTrainingForm({ ...trainingForm, instructor: e.target.value })}
                          placeholder="Instructor name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                          type="date"
                          value={trainingForm.date}
                          onChange={(e) => setTrainingForm({ ...trainingForm, date: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <input
                          value={trainingForm.duration}
                          onChange={(e) => setTrainingForm({ ...trainingForm, duration: e.target.value })}
                          placeholder="e.g., 2 hours"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                        <input
                          type="number"
                          value={trainingForm.capacity}
                          onChange={(e) => setTrainingForm({ ...trainingForm, capacity: e.target.value })}
                          placeholder="50"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={trainingForm.description}
                        onChange={(e) => setTrainingForm({ ...trainingForm, description: e.target.value })}
                        placeholder="Training description"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600">
                      Add Training
                    </button>
                  </form>
                )}
                
                <div className="p-4">
                  {trainings.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No trainings yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {trainings.map((training) => (
                        <div key={training.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <h3 className="font-semibold text-gray-800 mb-2">{training.title}</h3>
                          <p className="text-sm text-gray-600 mb-1">📅 {training.date}</p>
                          <p className="text-sm text-gray-600 mb-1">⏱️ {training.duration}</p>
                          <p className="text-sm text-gray-600 mb-1">👤 {training.instructor}</p>
                          <p className="text-sm text-gray-600 mb-3">👥 Capacity: {training.capacity}</p>
                          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{training.description}</p>
                          <button
                            onClick={() => handleDeleteTraining(training.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === 'jobs' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Job Listings ({jobs.length})</h2>
                  <button
                    onClick={() => setShowJobForm(!showJobForm)}
                    className="flex items-center gap-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600"
                  >
                    {showJobForm ? <X size={18} /> : <Plus size={18} />}
                    {showJobForm ? 'Cancel' : 'Post Job'}
                  </button>
                </div>
                
                {showJobForm && (
                  <form onSubmit={handleAddJob} className="p-4 border-b border-gray-100 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input
                          value={jobForm.title}
                          onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                          placeholder="Job title"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <select
                          value={jobForm.department}
                          onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                        <select
                          value={jobForm.type}
                          onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          value={jobForm.location}
                          onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                          placeholder="e.g., Remote, New York"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                      <textarea
                        value={jobForm.description}
                        onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                        placeholder="Enter detailed job description..."
                        rows="4"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600">
                      Post Job
                    </button>
                  </form>
                )}
                
                <div className="p-4">
                  {jobs.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No job listings yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {jobs.map((job) => (
                        <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow" style={{ borderTopColor: '#3b82f6', borderTopWidth: '4px' }}>
                          <h3 className="font-semibold text-gray-800 mb-1">{job.title}</h3>
                          <p className="text-sm text-cyan-600 font-medium mb-2">{job.department}</p>
                          <p className="text-sm text-gray-600 mb-1">📋 {job.type}</p>
                          <p className="text-sm text-gray-600 mb-3">📍 {job.location}</p>
                          <p className="text-sm text-gray-500 mb-4 line-clamp-3">{job.description}</p>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Locations Tab */}
          {activeTab === 'locations' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Locations ({locations.length})</h2>
                  <button
                    onClick={() => setShowLocationForm(!showLocationForm)}
                    className="flex items-center gap-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600"
                  >
                    {showLocationForm ? <X size={18} /> : <Plus size={18} />}
                    {showLocationForm ? 'Cancel' : 'Add Location'}
                  </button>
                </div>
                
                {showLocationForm && (
                  <form onSubmit={handleAddLocation} className="p-4 border-b border-gray-100 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
                        <input
                          value={locationForm.name}
                          onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                          placeholder="Location name"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          value={locationForm.phone}
                          onChange={(e) => setLocationForm({ ...locationForm, phone: e.target.value })}
                          placeholder="Phone number"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        value={locationForm.address}
                        onChange={(e) => setLocationForm({ ...locationForm, address: e.target.value })}
                        placeholder="Full address"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                        <input
                          type="email"
                          value={locationForm.email}
                          onChange={(e) => setLocationForm({ ...locationForm, email: e.target.value })}
                          placeholder="contact@company.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL (optional)</label>
                        <input
                          value={locationForm.imageUrl}
                          onChange={(e) => setLocationForm({ ...locationForm, imageUrl: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Background Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setLocationForm({ ...locationForm, imageFile: e.target.files?.[0] || null })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600">
                      Save Location
                    </button>
                  </form>
                )}
                
                <div className="p-4">
                  {locations.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No locations yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {locations.map((location) => (
                        <div key={location.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <h3 className="font-semibold text-gray-800 mb-2">{location.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">📍 {location.address}</p>
                          <p className="text-sm text-gray-600 mb-1">📞 {location.phone}</p>
                          {location.email && <p className="text-sm text-gray-600 mb-3">✉️ {location.email}</p>}
                          <button
                            onClick={() => handleDeleteLocation(location.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Mail Configuration Tab */}
          {activeTab === 'mailConfig' && (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <MailConfig 
                token={token} 
                onNotification={showNotification} 
              />
            </div>
          )}
        </main>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.message}
        </div>
      )}
      
      {/* Application View Modal */}
      {showApplicationModal && selectedApplication && (
        <ApplicationViewModal
          application={selectedApplication}
          onClose={() => {
            setShowApplicationModal(false);
            setSelectedApplication(null);
          }}
        />
      )}

      {/* Subscription View Modal */}
      {showSubscriptionModal && selectedSubscription && (
        <SubscriptionViewModal
          subscription={selectedSubscription}
          onClose={() => {
            setShowSubscriptionModal(false);
            setSelectedSubscription(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
