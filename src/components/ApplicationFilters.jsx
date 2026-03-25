import React, { useEffect, useCallback, useState } from 'react';

const ApplicationFilters = ({ 
  jobs, 
  onFilterChange, 
  filters,
  onReset 
}) => {
  // Initialize with default values if filters is undefined
  const defaultFilters = {
    search: '',
    jobTitle: '',
    dateFrom: '',
    dateTo: '',
    status: ''
  };
  
  const [localFilters, setLocalFilters] = useState(filters || defaultFilters);
  const [searchValue, setSearchValue] = useState((filters?.search) || '');

  // Update local state when filters prop changes
  useEffect(() => {
    if (filters) {
      setLocalFilters(filters);
      setSearchValue(filters.search || '');
    }
  }, [filters]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== (localFilters?.search || '')) {
        handleFilterChange('search', searchValue);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchValue, localFilters]);

  const handleFilterChange = useCallback((key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  }, [localFilters, onFilterChange]);

  const handleReset = () => {
    setSearchValue('');
    setLocalFilters(defaultFilters);
    onReset();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onFilterChange(localFilters);
    }
  };

  // Get unique job titles from jobs
  const jobTitles = [...new Set(jobs.map(job => job.title).filter(Boolean))];

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: '600',
          color: '#1f2937'
        }}>
          Filter Applications
        </h3>
        <button
          onClick={handleReset}
          style={{
            background: 'none',
            border: 'none',
            color: '#6b7280',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'underline'
          }}
        >
          Reset Filters
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        {/* Search Input */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#374151'
          }}>
            Search (Name, Email, Job)
          </label>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search applicants..."
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

        {/* Job Title Dropdown */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#374151'
          }}>
            Job Title
          </label>
          <select
            value={localFilters.jobTitle}
            onChange={(e) => handleFilterChange('jobTitle', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              background: 'white',
              boxSizing: 'border-box',
              cursor: 'pointer'
            }}
          >
            <option value="">All Job Titles</option>
            {jobTitles.map((title) => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>
        </div>

        {/* Date From */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#374151'
          }}>
            From Date
          </label>
          <input
            type="date"
            value={localFilters.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
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

        {/* Date To */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#374151'
          }}>
            To Date
          </label>
          <input
            type="date"
            value={localFilters.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
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

        {/* Status Dropdown (if needed - placeholder for future) */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#374151'
          }}>
            Status
          </label>
          <select
            value={localFilters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              background: 'white',
              boxSizing: 'border-box',
              cursor: 'pointer'
            }}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFilters;
