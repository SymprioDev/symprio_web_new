import React, { useState, useEffect, useRef, useCallback } from 'react';
import AOS from 'aos';

/**
 * ClientStoriesCarousel Component
 * 
 * A self-contained carousel component for displaying client testimonials/stories
 * with auto-scrolling and pause-on-hover functionality.
 * 
 * Features:
 * - Auto-scrolling with configurable speed
 * - Pause-on-hover functionality
 * - Configurable number of visible slides
 * - Responsive breakpoints for different screen sizes
 * - Navigation controls (prev/next arrows and dots)
 * - Infinite loop scrolling
 * - Touch/swipe support for mobile devices
 * 
 * Configuration Options:
 * - scrollSpeed: Time in ms between slides (default: 4000)
 * - visibleSlides: Number of slides visible at once (default: 3)
 * - responsive: Object defining visible slides at different breakpoints
 * - showArrows: Show prev/next navigation arrows (default: true)
 * - showDots: Show pagination dots (default: true)
 * - autoPlay: Enable auto-scrolling (default: true)
 * - pauseOnHover: Pause auto-scroll on hover (default: true)
 * 
 * Integration with Admin:
 * - Fetches data from /api/client-stories endpoint
 * - Automatically displays all active client stories
 * - No manual content updates required
 */

// Default configuration - adjust these values to customize the carousel
const DEFAULT_CONFIG = {
  // Auto-scroll speed in milliseconds (time between slide transitions)
  scrollSpeed: 4000,
  
  // Number of visible slides at different breakpoints
  visibleSlides: {
    mobile: 1,      // < 640px
    tablet: 2,      // 640px - 1024px
    desktop: 3,     // > 1024px
  },
  
  // Navigation settings
  showArrows: true,
  showDots: true,
  
  // Auto-play settings
  autoPlay: true,
  pauseOnHover: true,
  
  // Slide transition duration in milliseconds
  transitionDuration: 500,
};

// Star rating component
const StarRating = ({ rating = 5 }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      {[...Array(5)].map((_, idx) => (
        <span 
          key={idx} 
          style={{ 
            color: idx < rating ? '#185ADB' : '#e5e7eb', 
            fontSize: '16px',
            marginRight: '2px'
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// Individual story card component
const StoryCard = ({ story, style }) => {
  return (
    <div
      style={{
        padding: '32px',
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '20px',
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        height: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(24,90,219,0.08)';
        e.currentTarget.style.borderColor = '#185ADB';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#e5e7eb';
      }}
    >
      {/* Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        {story.avatar_url ? (
          <img 
            src={story.avatar_url} 
            alt={story.client_name}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #185ADB, #0D9488)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '20px',
            fontWeight: 700
          }}>
            {story.client_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Star Rating */}
      <StarRating rating={story.rating || 5} />

      {/* Quote */}
      <p style={{
        fontSize: '15px',
        color: '#444444',
        lineHeight: 1.7,
        marginBottom: '24px',
        fontStyle: 'italic'
      }}>
        "{story.quote}"
      </p>

      {/* Client Info */}
      <div style={{
        paddingTop: '20px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <p style={{
          fontSize: '15px',
          fontWeight: 600,
          color: '#010B1D',
          marginBottom: '4px'
        }}>
          {story.role}, {story.company}
        </p>
        {story.industry && (
          <p style={{
            fontSize: '13px',
            color: '#6b7280'
          }}>
            {story.industry}
          </p>
        )}
      </div>
    </div>
  );
};

// Navigation Arrow Component
const NavigationArrow = ({ direction, onClick, disabled }) => {
  const isLeft = direction === 'left';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        position: 'absolute',
        [isLeft ? 'left' : 'right']: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        zIndex: 10,
      }}
      onMouseEnter={e => {
        if (!disabled) {
          e.currentTarget.style.background = '#185ADB';
          e.currentTarget.style.borderColor = '#185ADB';
          e.currentTarget.style.color = '#ffffff';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#ffffff';
        e.currentTarget.style.borderColor = '#e5e7eb';
        e.currentTarget.style.color = '#010B1D';
      }}
      aria-label={isLeft ? 'Previous slide' : 'Next slide'}
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ transform: isLeft ? 'rotate(180deg)' : 'none' }}
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
};

// Pagination Dots Component
const PaginationDots = ({ total, current, onClick }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '40px'
    }}>
      {[...Array(total)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => onClick(idx)}
          style={{
            width: idx === current ? '32px' : '10px',
            height: '10px',
            borderRadius: '5px',
            background: idx === current ? '#185ADB' : '#e5e7eb',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            padding: 0,
          }}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
  );
};

// Main Carousel Component
export default function ClientStoriesCarousel({ config = {} }) {
  // Merge default config with provided config
  const settings = { ...DEFAULT_CONFIG, ...config };
  
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(settings.visibleSlides.desktop);
  const [containerWidth, setContainerWidth] = useState(0);
  
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch client stories from API
  const fetchClientStories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/client-stories');
      if (response.ok) {
        const data = await response.json();
        setStories(data);
      } else {
        setError('Failed to load client stories');
      }
    } catch (err) {
      setError('Error loading client stories');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize AOS and fetch data
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
    fetchClientStories();
  }, [fetchClientStories]);

  // Calculate visible slides based on screen size
  const updateVisibleCount = useCallback(() => {
    if (carouselRef.current) {
      setContainerWidth(carouselRef.current.offsetWidth);
    }
    
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleCount(settings.visibleSlides.mobile);
    } else if (width < 1024) {
      setVisibleCount(settings.visibleSlides.tablet);
    } else {
      setVisibleCount(settings.visibleSlides.desktop);
    }
  }, [settings.visibleSlides]);

  // Handle window resize
  useEffect(() => {
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [updateVisibleCount]);

  // Auto-scroll logic
  useEffect(() => {
    if (!settings.autoPlay || stories.length <= visibleCount || isPaused) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        // Calculate max index based on visible count
        const maxIndex = Math.max(0, stories.length - visibleCount);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, settings.scrollSpeed);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [settings.autoPlay, settings.scrollSpeed, stories.length, visibleCount, isPaused]);

  // Navigation handlers
  const goToSlide = useCallback((index) => {
    const maxIndex = Math.max(0, stories.length - visibleCount);
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(newIndex);
  }, [stories.length, visibleCount]);

  const goToPrevious = useCallback(() => {
    const maxIndex = Math.max(0, stories.length - visibleCount);
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  }, [stories.length, visibleCount]);

  const goToNext = useCallback(() => {
    const maxIndex = Math.max(0, stories.length - visibleCount);
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  }, [stories.length, visibleCount]);

  // Touch handlers for swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Mouse handlers for pause on hover
  const handleMouseEnter = () => {
    if (settings.pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Calculate total pages
  const totalPages = Math.max(1, stories.length - visibleCount + 1);

  // Loading state
  if (loading) {
    return (
      <section style={{ padding: '100px 20px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                width: '350px',
                height: '280px',
                background: '#f3f4f6',
                borderRadius: '16px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }} />
            ))}
          </div>
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </section>
    );
  }

  // Error or empty state
  if (error || stories.length === 0) {
    return null;
  }

  return (
    <section 
      style={{ 
        padding: '100px 20px', 
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <div 
          style={{ textAlign: 'center', marginBottom: '60px' }}
          data-aos="fade-up"
        >
          <div className="section-tag">Client Stories</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#010B1D',
            marginBottom: '16px',
            fontWeight: 400,
            lineHeight: 1.2
          }}>
            Feedback from <em className="accent-text" style={{ fontWeight: '400' }}>Real Teams</em>
          </h2>
        </div>

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          style={{ position: 'relative' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Arrows */}
          {settings.showArrows && stories.length > visibleCount && (
            <>
              <NavigationArrow 
                direction="left" 
                onClick={goToPrevious}
                disabled={stories.length <= visibleCount}
              />
              <NavigationArrow 
                direction="right" 
                onClick={goToNext}
                disabled={stories.length <= visibleCount}
              />
            </>
          )}

          {/* Carousel Track */}
          <div 
            style={{
              overflow: 'hidden',
              margin: '0 60px',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              style={{
                display: 'flex',
                transition: `transform ${settings.transitionDuration}ms ease-in-out`,
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {stories.map((story, idx) => (
                <div
                  key={story.id || idx}
                  style={{
                    flex: `0 0 ${100 / visibleCount}%`,
                    padding: '0 12px',
                    boxSizing: 'border-box',
                  }}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <StoryCard story={story} />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          {settings.showDots && totalPages > 1 && (
            <PaginationDots 
              total={totalPages}
              current={currentIndex}
              onClick={goToSlide}
            />
          )}
        </div>

        {/* Pause Indicator */}
        {isPaused && settings.pauseOnHover && (
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(24, 90, 219, 0.9)',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
            Paused
          </div>
        )}
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .carousel-track {
            margin: 0 20px !important;
          }
        }
        
        @media (max-width: 640px) {
          .carousel-container {
            padding: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

// Named export for easier imports
export { ClientStoriesCarousel };
