import React, { useEffect } from 'react';

const ApplicationViewModal = ({ application, onClose }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle ESC key for accessibility
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!application) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid #e5e7eb'
          }}
        >
          <h2
            id="modal-title"
            style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: '700',
              color: '#1f2937'
            }}
          >
            Job Application Details
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '4px 8px',
              lineHeight: 1,
              borderRadius: '4px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Personal Information Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#00d4ff',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '16px',
                paddingBottom: '8px',
                borderBottom: '2px solid #00d4ff'
              }}
            >
              Personal Information
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>First Name:</span>
                <span style={{ color: '#1f2937', textAlign: 'right' }}>{application.firstName || '-'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>Last Name:</span>
                <span style={{ color: '#1f2937', textAlign: 'right' }}>{application.lastName || '-'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>Email:</span>
                <span style={{ color: '#1f2937', textAlign: 'right' }}>{application.email || '-'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>Phone Number:</span>
                <span style={{ color: '#1f2937', textAlign: 'right' }}>{application.mobileNumber || '-'}</span>
              </div>
            </div>
          </div>

          {/* Application Details Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#00d4ff',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '16px',
                paddingBottom: '8px',
                borderBottom: '2px solid #00d4ff'
              }}
            >
              Application Details
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>Job Title:</span>
                <span style={{ color: '#1f2937', textAlign: 'right' }}>{application.jobTitle || '-'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>Applied Date:</span>
                <span style={{ color: '#1f2937', textAlign: 'right' }}>
                  {application.submittedDate ? formatDate(application.submittedDate) : '-'}
                </span>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#00d4ff',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '16px',
                paddingBottom: '8px',
                borderBottom: '2px solid #00d4ff'
              }}
            >
              Documents
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>Resume/CV:</span>
                {application.cvFilePath ? (
                  <a
                    href={application.cvFilePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#00d4ff',
                      textDecoration: 'none',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    📄 View/Download CV
                  </a>
                ) : (
                  <span style={{ color: '#9ca3af' }}>-</span>
                )}
              </div>
            </div>
          </div>

          {/* Cover Letter / Message Section */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#00d4ff',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '16px',
                paddingBottom: '8px',
                borderBottom: '2px solid #00d4ff'
              }}
            >
              Cover Letter / Message
            </h3>
            <div
              style={{
                background: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                color: '#374151',
                lineHeight: '1.6'
              }}
            >
              {application.coverLetter || 'No cover letter provided.'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: '#00d4ff',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#00b8e6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#00d4ff';
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationViewModal;
