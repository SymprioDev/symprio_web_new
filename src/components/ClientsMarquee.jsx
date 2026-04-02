import React, { useEffect, useMemo, useRef, useState } from 'react';

const clients = [
  { name: 'Meta', logo: '/clients/meta.png' },
  { name: 'Amway', logo: '/clients/amway.png' },
  { name: 'Coca-Cola', logo: '/clients/cocacola.png' },
  { name: 'SeekAsia', logo: '/clients/seekasia.png' },
  { name: 'YMCA', logo: '/clients/ymca.png' },
  { name: 'Nextracker', logo: '/clients/nextracker.png' },
  { name: 'Uniqlo', logo: '/clients/uniqlo.png' }
];

function chunkItems(items, size) {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function getItemsPerSlide(width) {
  if (width < 640) return 2;
  if (width < 1024) return 3;
  return 4;
}

export default function ClientsMarquee({ theme = 'light' }) {
  const [itemsPerSlide, setItemsPerSlide] = useState(() => getItemsPerSlide(window.innerWidth));
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isPausedByTouch, setIsPausedByTouch] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const trackRef = useRef(null);

  const isDark = theme === 'dark';

  const slides = useMemo(() => chunkItems(clients, itemsPerSlide), [itemsPerSlide]);
  const hasMultipleSlides = slides.length > 1;
  const extendedSlides = hasMultipleSlides
    ? [slides[slides.length - 1], ...slides, slides[0]]
    : slides;

  useEffect(() => {
    const handleResize = () => {
      const nextItemsPerSlide = getItemsPerSlide(window.innerWidth);
      setItemsPerSlide(prev => {
        if (prev === nextItemsPerSlide) return prev;
        return nextItemsPerSlide;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(hasMultipleSlides ? 1 : 0);
    setIsAnimating(false);
    const timer = window.setTimeout(() => setIsAnimating(true), 40);
    return () => window.clearTimeout(timer);
  }, [itemsPerSlide, hasMultipleSlides]);

  useEffect(() => {
    if (!hasMultipleSlides || isHovered || isPausedByTouch) return undefined;

    const autoplay = window.setInterval(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(true);
    }, 4200);

    return () => window.clearInterval(autoplay);
  }, [hasMultipleSlides, isHovered, isPausedByTouch]);

  useEffect(() => {
    if (!hasMultipleSlides) return undefined;

    const track = trackRef.current;
    if (!track) return undefined;

    const handleTransitionEnd = () => {
      if (currentIndex === 0) {
        setIsAnimating(false);
        setCurrentIndex(slides.length);
      } else if (currentIndex === slides.length + 1) {
        setIsAnimating(false);
        setCurrentIndex(1);
      }
    };

    track.addEventListener('transitionend', handleTransitionEnd);
    return () => track.removeEventListener('transitionend', handleTransitionEnd);
  }, [currentIndex, hasMultipleSlides, slides.length]);

  useEffect(() => {
    if (!isAnimating) {
      const timer = window.setTimeout(() => setIsAnimating(true), 40);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [isAnimating]);

  const goToSlide = (index) => {
    if (!hasMultipleSlides) return;
    setCurrentIndex(index + 1);
    setIsAnimating(true);
  };

  const goNext = () => {
    if (!hasMultipleSlides) return;
    setCurrentIndex(prev => prev + 1);
    setIsAnimating(true);
  };

  const goPrev = () => {
    if (!hasMultipleSlides) return;
    setCurrentIndex(prev => prev - 1);
    setIsAnimating(true);
  };

  const handleTouchStart = (event) => {
    setIsPausedByTouch(true);
    setTouchStartX(event.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (event) => {
    if (touchStartX === null) return;
    setTouchDeltaX(event.touches[0].clientX - touchStartX);
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 45;

    if (touchDeltaX <= -swipeThreshold) {
      goNext();
    } else if (touchDeltaX >= swipeThreshold) {
      goPrev();
    }

    setTouchStartX(null);
    setTouchDeltaX(0);
    window.setTimeout(() => setIsPausedByTouch(false), 2400);
  };

  const activeDotIndex = hasMultipleSlides
    ? (currentIndex - 1 + slides.length) % slides.length
    : 0;

  return (
    <section
      style={{
        padding: '96px 0',
        background: isDark
          ? 'linear-gradient(180deg, #07162F 0%, #0A2D6E 100%)'
          : 'linear-gradient(180deg, #F4F8FD 0%, #EEF6F3 100%)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'radial-gradient(circle at top right, rgba(13,148,136,0.14), transparent 34%), radial-gradient(circle at bottom left, rgba(24,90,219,0.2), transparent 30%)'
            : 'radial-gradient(circle at top right, rgba(24,90,219,0.12), transparent 34%), radial-gradient(circle at bottom left, rgba(13,148,136,0.12), transparent 30%)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 42px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              fontWeight: '800',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: isDark ? '#B9FFF3' : '#185ADB',
              background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.72)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(24,90,219,0.10)'}`,
              backdropFilter: 'blur(18px)',
              padding: '10px 18px',
              borderRadius: '999px',
              boxShadow: isDark ? '0 16px 40px rgba(0,0,0,0.2)' : '0 16px 40px rgba(24,90,219,0.08)'
            }}
          >
            Trusted by Industry Leaders
          </span>
          <h2
            style={{
              margin: '22px 0 14px',
              fontSize: 'clamp(2rem, 4vw, 3.45rem)',
              fontWeight: '800',
              lineHeight: 1.12,
              color: isDark ? '#FFFFFF' : '#0A2D6E',
              letterSpacing: '-0.03em'
            }}
          >
            Enterprise teams across APAC trust Symprio to move faster with automation
          </h2>
          <p
            style={{
              margin: '0 auto',
              maxWidth: '700px',
              fontSize: 'clamp(1rem, 2vw, 1.08rem)',
              lineHeight: 1.8,
              color: isDark ? 'rgba(255,255,255,0.72)' : '#5B6474'
            }}
          >
            A refined partner showcase designed for clarity, confidence, and stronger brand presence across every screen.
          </p>
        </div>

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'relative',
            borderRadius: '34px',
            padding: '22px',
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.56)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)'}`,
            boxShadow: isDark
              ? '0 24px 80px rgba(0, 0, 0, 0.28)'
              : '0 30px 90px rgba(16, 45, 110, 0.12)',
            backdropFilter: 'blur(22px)'
          }}
        >
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous logo slide"
            style={navButtonStyle('left', isDark)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div style={{ overflow: 'hidden', borderRadius: '26px' }}>
            <div
              ref={trackRef}
              style={{
                display: 'flex',
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: isAnimating ? 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
                willChange: 'transform'
              }}
            >
              {extendedSlides.map((slide, slideIndex) => (
                <div
                  key={`${slideIndex}-${slide.map(client => client.name).join('-')}`}
                  style={{
                    minWidth: '100%',
                    padding: '6px'
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${slide.length}, minmax(0, 1fr))`,
                      gap: '18px'
                    }}
                  >
                    {slide.map((client) => (
                      <div
                        key={client.name}
                        className="trusted-logo-card"
                        style={{
                          minHeight: '170px',
                          borderRadius: '26px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '28px clamp(18px, 3vw, 34px)',
                          background: isDark
                            ? 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))'
                            : 'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(245,249,255,0.92))',
                          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(214,228,255,0.85)'}`,
                          boxShadow: isDark
                            ? '0 12px 34px rgba(0,0,0,0.16)'
                            : '0 12px 34px rgba(24,90,219,0.09)',
                          transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease'
                        }}
                      >
                        <img
                          src={client.logo}
                          alt={client.name}
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: '100%',
                            maxWidth: '190px',
                            maxHeight: '78px',
                            objectFit: 'contain',
                            objectPosition: 'center',
                            filter: isDark ? 'brightness(0) invert(1)' : 'none'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next logo slide"
            style={navButtonStyle('right', isDark)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {hasMultipleSlides && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                marginTop: '24px'
              }}
            >
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to logo slide ${index + 1}`}
                  style={{
                    width: activeDotIndex === index ? '34px' : '10px',
                    height: '10px',
                    borderRadius: '999px',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeDotIndex === index
                      ? 'linear-gradient(90deg, #185ADB, #0D9488)'
                      : (isDark ? 'rgba(255,255,255,0.26)' : 'rgba(10,45,110,0.16)'),
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .trusted-logo-card:hover {
          transform: translateY(-6px);
          border-color: rgba(24, 90, 219, 0.4) !important;
          box-shadow: 0 24px 50px rgba(24, 90, 219, 0.16) !important;
        }

        @media (max-width: 1023px) {
          .trusted-logo-card {
            min-height: 148px !important;
          }
        }

        @media (max-width: 639px) {
          .trusted-logo-card {
            min-height: 126px !important;
            border-radius: 22px !important;
            padding: 22px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}

function navButtonStyle(side, isDark) {
  return {
    position: 'absolute',
    top: '50%',
    [side]: '12px',
    transform: 'translateY(-50%)',
    width: '48px',
    height: '48px',
    borderRadius: '999px',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(214,228,255,0.9)'}`,
    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.96)',
    color: isDark ? '#FFFFFF' : '#0A2D6E',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 2,
    boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.18)' : '0 10px 30px rgba(24,90,219,0.12)',
    backdropFilter: 'blur(12px)',
    transition: 'transform 0.25s ease, background 0.25s ease'
  };
}
