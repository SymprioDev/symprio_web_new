import React, { useEffect } from 'react';

const SubscriptionViewModal = ({ subscription, onClose }) => {
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

  if (!subscription) return null;

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

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '-';
    return `$${amount}`;
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
            Subscription Details
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
              Contact Information
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>Name:</span>
                <span style={{ color: '#1f2937', textAlign: 'right' }}>{subscription.name || '-'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>Company Name:</span>
                <span style={{ color: '#1f2937', textAlign: 'right' }}>{subscription.companyName || '-'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>Contact Number:</span>
                <span style={{ color: '#1f2937', textAlign: 'right' }}>{subscription.contactNumber || '-'}</span>
              </div>
            </div>
          </div>

          {/* Subscription Details Section */}
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
              Subscription Details
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>Subscription Hours:</span>
                <span style={{ color: '#1f2937', textAlign: 'right' }}>{subscription.hours || '-'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>Rate:</span>
                <span style={{ color: '#1f2937', textAlign: 'right' }}>{formatCurrency(subscription.rate)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>Total Amount:</span>
                <span style={{ color: '#0891b2', textAlign: 'right', fontWeight: '600' }}>{formatCurrency(subscription.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Status & Date Section */}
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
              Status & Date
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>Status:</span>
                <span style={{ 
                  color: 'white', 
                  textAlign: 'right',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: subscription.status === 'Reviewed' ? '#10b981' : subscription.status === 'Rejected' ? '#ef4444' : '#f59e0b'
                }}>
                  {subscription.status || 'Pending'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>Created Date:</span>
                <span style={{ color: '#1f2937', textAlign: 'right' }}>
                  {subscription.createdAt ? formatDate(subscription.createdAt) : '-'}
                </span>
              </div>
            </div>
          </div>

          {/* Message Section */}
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
              Message
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
              {subscription.message || 'No message provided.'}
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

export default SubscriptionViewModal;
