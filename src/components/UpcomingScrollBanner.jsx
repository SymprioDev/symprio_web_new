import React, { useState, useEffect } from 'react';

export default function UpcomingScrollBanner() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [items, setItems] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const containerWidth = window.innerWidth - 120; // Account for padding
  const cardWidth = 212; // 200px + 12px gap
  const shouldScroll = items.length * cardWidth > containerWidth;
  const totalScrollWidth = items.length * cardWidth;

  const defaultItems = [
    { id: 1, type: 'Event', title: 'AI & Automation Summit 2025', date: 'Jan 15, 2025', icon: '📅', description: 'Join us for an in-depth discussion on AI and automation trends in 2025.' },
    { id: 2, type: 'Training', title: 'RPA Certification Course', date: 'Jan 20, 2025', icon: '🎓', description: 'Comprehensive training program for RPA certification and professional development.' },
    { id: 3, type: 'Event', title: 'Digital Transformation Webinar', date: 'Jan 25, 2025', icon: '📅', description: 'Learn how to transform your business digitally with expert insights and case studies.' },
    { id: 4, type: 'Training', title: 'Microsoft Power Automate Bootcamp', date: 'Feb 01, 2025', icon: '🎓', description: 'Intensive bootcamp covering Microsoft Power Automate best practices and advanced techniques.' },
    { id: 5, type: 'Event', title: 'UiPath User Conference', date: 'Feb 10, 2025', icon: '📅', description: 'Connect with UiPath users and learn about the latest innovations in RPA technology.' },
    { id: 6, type: 'Training', title: 'Advanced RPA Development', date: 'Feb 15, 2025', icon: '🎓', description: 'Master advanced RPA development techniques and build enterprise-scale solutions.' },
  ];

  useEffect(() => {
    fetchUpcomingItems();
    const interval = setInterval(fetchUpcomingItems, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchUpcomingItems = async () => {
    try {
      // Fetch events
      const eventsResponse = await fetch('/api/events');
      const eventsData = eventsResponse.ok ? await eventsResponse.json() : [];
      
      // Fetch trainings
      const trainingsResponse = await fetch('/api/trainings');
      const trainingsData = trainingsResponse.ok ? await trainingsResponse.json() : [];

      // Check if item is recent (within 1 month)
      const isRecent = (dateString) => {
        try {
          const itemDate = new Date(dateString);
          const today = new Date();
          const oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          return itemDate >= oneMonthAgo && itemDate <= today;
        } catch {
          return false;
        }
      };

      // Convert to banner format
      const eventItems = eventsData.map((event, index) => ({
        id: `event-${index}`,
        type: 'Event',
        title: event.title || 'Upcoming Event',
        date: event.date || 'TBA',
        description: event.description || 'No description available',
        icon: '📅',
        isNew: isRecent(event.date)
      }));

      const trainingItems = trainingsData.map((training, index) => ({
        id: `training-${index}`,
        type: 'Training',
        title: training.title || 'Upcoming Training',
        date: training.date || 'TBA',
        description: training.description || 'No description available',
        icon: '🎓',
        isNew: isRecent(training.date)
      }));

      const combinedItems = [...eventItems, ...trainingItems];
      setItems(combinedItems.length > 0 ? combinedItems : defaultItems);
    } catch (error) {
      console.error('Failed to fetch upcoming items:', error);
      setItems(defaultItems);
    }
  };

  useEffect(() => {
    if (!shouldScroll) {
      setScrollPosition(0);
      return;
    }

    const timer = setInterval(() => {
      setScrollPosition((prev) => {
        const newPos = prev + 0.8;
        // Reset when scrolled to the end (start from right again)
        if (newPos > totalScrollWidth) {
          return 0;
        }
        return newPos;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [items.length, shouldScroll, totalScrollWidth]);

  return (
    <div style={{
      position: 'absolute',
      top: '140px',
      left: 0,
      right: 0,
      background: 'transparent',
      overflow: 'visible',
      padding: '12px 20px 16px 0',
      borderBottom: 'none',
      minHeight: '75px',
      zIndex: 100
    }}>
    <style>{`
      @keyframes tagPulse {
        0% {
          box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4);
          transform: scale(1);
        }
        50% {
          box-shadow: 0 0 0 8px rgba(251, 191, 36, 0.1);
          transform: scale(1.05);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4);
          transform: scale(1);
        }
      }
      .banner-tag {
        animation: tagPulse 1.5s ease-in-out infinite;
      }
      .tooltip-container {
        position: relative;
      }
      .tooltip {
        position: absolute;
        top: 100%;
        left: 0;
        transform: none;
        background: rgba(31, 41, 55, 0.85);
        color: #fff;
        padding: 10px 14px;
        border-radius: 6px;
        font-size: 12px;
        line-height: 1.5;
        max-width: 220px;
        white-space: normal;
        z-index: 1001;
        margin-top: 10px;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        pointer-events: none;
      }
      .tooltip::before {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 10px;
        border: 5px solid transparent;
        border-bottom-color: rgba(31, 41, 55, 0.85);
        margin-bottom: -2px;
      }
    `}</style>
      {/* Gradient overlays removed - transparent background */}

      {/* Scrolling container */}
      <div style={{
        display: 'flex',
        gap: '12px',
        transform: `translateX(-${scrollPosition}px)`,
        transition: 'transform 0.02s linear',
        paddingLeft: '0',
        paddingRight: '0',
        whiteSpace: 'nowrap',
        width: 'max-content',
        marginLeft: 'auto',
        position: 'relative',
        zIndex: 50,
        overflow: 'visible'
      }}>
        {/* Single item display for banner */}
        {items.map((item, index) => (
          <div
            key={index}
            className="tooltip-container"
            style={{
              flex: '0 0 200px',
              background: '#fff',
              borderRadius: '5px',
              padding: '10px',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              border: '3px solid #fbbf24',
              position: 'relative'
            }}
            onMouseEnter={() => setHoveredItemId(item.id)}
            onMouseLeave={() => setHoveredItemId(null)}
          >
            {/* NEW Badge */}
            {/* Removed NEW badge per user request */}
            
            {/* Icon */}
            <div style={{
              fontSize: '16px',
              minWidth: '24px',
              textAlign: 'center'
            }}>
              {item.icon}
            </div>

            {/* Content */}
            <div style={{
              flex: 1,
              minWidth: 0
            }}>
              <div className="banner-tag" style={{
                fontSize: '10px',
                fontWeight: '700',
                color: item.type === 'Event' ? '#fff' : '#fff',
                backgroundColor: item.type === 'Event' ? '#1e5eb8' : '#16a34a',
                padding: '2px 6px',
                borderRadius: '3px',
                marginBottom: '1px',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
                fontFamily: 'Segoe UI, Inter, sans-serif',
                display: 'inline-block'
              }}>
                {item.type}
              </div>
              <div style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '2px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontFamily: 'Segoe UI, Inter, sans-serif'
              }}>
                {item.title}
              </div>
              <div style={{
                fontSize: '9px',
                color: '#6b7280',
                fontWeight: '500',
                fontFamily: 'Segoe UI, Inter, sans-serif'
              }}>
                {item.date}
              </div>
            </div>
            {hoveredItemId === item.id && (
              <div className="tooltip">
                {item.description}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
