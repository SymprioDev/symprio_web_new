import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Breadcrumb Component
 * 
 * A reusable breadcrumb navigation component that displays the current page hierarchy.
 * Each breadcrumb item (except the last/current one) is a clickable link.
 * 
 * @param {Array} items - Array of breadcrumb items [{ label: string, path: string }]
 *                       The last item will be displayed as the current page (non-clickable)
 * @param {Object} style - Optional custom styles for the container
 * @param {string} separator - Separator character between items (default: '/')
 */
const Breadcrumb = ({ 
  items = [], 
  style = {},
  separator = '/'
}) => {
  const location = useLocation();

  // Default breadcrumb items if none provided
  const breadcrumbItems = items.length > 0 ? items : [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
        ...style
      }}
    >
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        const isActive = location.pathname === item.path;

        return (
          <React.Fragment key={index}>
            {/* Separator */}
            {index > 0 && (
              <span 
                style={{ 
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: 12
                }}
              >
                {separator}
              </span>
            )}
            
            {/* Breadcrumb Item */}
            {isLast || isActive ? (
              // Current page - not clickable
              <span
                style={{
                  color: isLast ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  fontWeight: isLast ? 500 : 400,
                  cursor: 'default',
                }}
              >
                {item.label}
              </span>
            ) : (
              // Clickable link
              <Link
                to={item.path}
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                }}
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
