import React, { useState, useEffect } from 'react';

const DEFAULT_COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#f59e0b', // amber
  '#eab308', // yellow
  '#84cc16', // lime
  '#22c55e', // green
  '#10b981', // emerald
  '#14b8a6', // teal
  '#06b6d4', // cyan
  '#0ea5e9', // sky
  '#3b82f6', // blue
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#a855f7', // purple
  '#d946ef', // fuchsia
  '#ec4899', // pink
  '#6b7280', // gray
  '#1f2937', // dark gray
];

export default function SubscriptionStatusTypes({ token, onNotification, onRefresh }) {
  const [statusTypes, setStatusTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    status_name: '',
    color: '#6b7280',
    display_order: 0
  });
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    fetchStatusTypes();
  }, []);

  const fetchStatusTypes = async () => {
    try {
      const response = await fetch('/api/admin/subscription-status-types', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStatusTypes(data);
      }
    } catch (error) {
      console.error('Error fetching status types:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.status_name.trim()) {
      onNotification('error', 'Status name is required');
      return;
    }

    try {
      const url = editingId
        ? `/api/admin/subscription-status-types/${editingId}`
        : '/api/admin/subscription-status-types';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        if (editingId) {
          setStatusTypes(prev => prev.map(s => s.id === editingId ? result : s));
          onNotification('success', 'Status type updated successfully');
        } else {
          setStatusTypes(prev => [...prev, result]);
          onNotification('success', 'Status type created successfully');
        }
        if (onRefresh) onRefresh();
        resetForm();
      } else {
        const error = await response.json();
        onNotification('error', error.error || 'Failed to save status type');
      }
    } catch (error) {
      console.error('Error saving status type:', error);
      onNotification('error', 'Error saving status type');
    }
  };

  const handleEdit = (status) => {
    setFormData({
      status_name: status.status_name,
      color: status.color,
      display_order: status.display_order || 0
    });
    setEditingId(status.id);
    setShowForm(true);
    setShowColorPicker(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this status type?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/subscription-status-types/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setStatusTypes(prev => prev.filter(s => s.id !== id));
        onNotification('success', 'Status type deleted successfully');
        if (onRefresh) onRefresh();
      } else {
        const error = await response.json();
        onNotification('error', error.error || 'Failed to delete status type');
      }
    } catch (error) {
      console.error('Error deleting status type:', error);
      onNotification('error', 'Error deleting status type');
    }
  };

  const resetForm = () => {
    setFormData({ status_name: '', color: '#6b7280', display_order: 0 });
    setEditingId(null);
    setShowForm(false);
    setShowColorPicker(false);
  };

  const handleColorSelect = (color) => {
    setFormData(prev => ({ ...prev, color }));
    setShowColorPicker(false);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px 0' }}>
            Subscription Status Types
          </h2>
          <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>
            Configure status types and their colors for subscriptions
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          style={{
            padding: '10px 20px',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: showForm ? 'none' : 'block'
          }}
        >
          + Add Status Type
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{
          background: '#f9fafb',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '24px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
            {editingId ? 'Edit Status Type' : 'Add New Status Type'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr 100px' }}>
              {/* Status Name */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Status Name *
                </label>
                <input
                  type="text"
                  value={formData.status_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, status_name: e.target.value }))}
                  placeholder="e.g., Pending, Reviewed, Approved"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Color Picker */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Color
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '6px',
                      border: '2px solid #d1d5db',
                      background: formData.color,
                      cursor: 'pointer'
                    }}
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    placeholder="#6b7280"
                    pattern="^#[A-Fa-f0-9]{6}$"
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      fontFamily: 'monospace'
                    }}
                  />
                </div>
                {showColorPicker && (
                  <div style={{
                    marginTop: '8px',
                    padding: '12px',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gap: '8px',
                    maxWidth: '300px'
                  }}>
                    {DEFAULT_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleColorSelect(color)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '4px',
                          border: formData.color === color ? '2px solid #1f2937' : '1px solid #e5e7eb',
                          background: color,
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Display Order */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Order
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                  min="0"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Preview */}
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Preview:</span>
              <span style={{
                padding: '4px 12px',
                borderRadius: '12px',
                background: formData.color + '20',
                color: formData.color,
                fontWeight: '600',
                fontSize: '13px'
              }}>
                {formData.status_name || 'Status Name'}
              </span>
            </div>

            {/* Actions */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  background: '#00d4ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {editingId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  padding: '10px 20px',
                  background: 'white',
                  color: '#6b7280',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Status Types List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          Loading status types...
        </div>
      ) : statusTypes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          No status types configured yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {statusTypes.map((status) => (
            <div
              key={status.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: status.color,
                  flexShrink: 0
                }} />
                <div>
                  <div style={{
                    fontWeight: '600',
                    color: '#1f2937',
                    fontSize: '15px'
                  }}>
                    {status.status_name}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    fontFamily: 'monospace'
                  }}>
                    {status.color}
                  </div>
                </div>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  background: status.color + '20',
                  color: status.color,
                  fontWeight: '600',
                  fontSize: '12px',
                  marginLeft: '8px'
                }}>
                  {status.status_name}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleEdit(status)}
                  style={{
                    padding: '8px 16px',
                    background: '#dbeafe',
                    color: '#2563eb',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(status.id)}
                  style={{
                    padding: '8px 16px',
                    background: '#fee2e2',
                    color: '#dc2626',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
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
  );
}
