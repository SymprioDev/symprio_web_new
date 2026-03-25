import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const COLORS = {
  primary: '#0A2D6E',
  teal: '#0D9488',
  accent: '#0077B6',
  bg: '#f9fafb',
  cardBg: '#ffffff',
  textDark: '#111827',
  textMid: '#374151',
  textLight: '#6B7280',
  border: '#E5E7EB',
};

function stripHtml(html) {
  return html ? html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').trim() : '';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function SkeletonCard() {
  return (
    <div style={{
      background: COLORS.cardBg,
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Image skeleton */}
      <div style={{
        width: '100%',
        height: '200px',
        background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }} />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ width: '70px', height: '22px', borderRadius: '999px', background: '#e5e7eb', animation: 'shimmer 1.5s infinite' }} />
        <div style={{ width: '100%', height: '20px', borderRadius: '6px', background: '#e5e7eb', animation: 'shimmer 1.5s infinite' }} />
        <div style={{ width: '80%', height: '20px', borderRadius: '6px', background: '#e5e7eb', animation: 'shimmer 1.5s infinite' }} />
        <div style={{ width: '90px', height: '16px', borderRadius: '6px', background: '#e5e7eb', animation: 'shimmer 1.5s infinite' }} />
        <div style={{ width: '100%', height: '14px', borderRadius: '6px', background: '#e5e7eb', animation: 'shimmer 1.5s infinite' }} />
        <div style={{ width: '100%', height: '14px', borderRadius: '6px', background: '#e5e7eb', animation: 'shimmer 1.5s infinite' }} />
        <div style={{ width: '60%', height: '14px', borderRadius: '6px', background: '#e5e7eb', animation: 'shimmer 1.5s infinite' }} />
      </div>
    </div>
  );
}

function PostCard({ post, index }) {
  const [imgError, setImgError] = useState(false);
  const category = (post.categories && post.categories.length > 0) ? post.categories[0] : 'Article';
  const excerpt = stripHtml(post.description || post.content || '').slice(0, 320);
  const hasImage = post.thumbnail && !imgError;

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      style={{
        background: COLORS.cardBg,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s, transform 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,45,110,0.13)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.07)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Thumbnail */}
      <div style={{ width: '100%', height: '200px', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
        {hasImage ? (
          <img
            src={post.thumbnail}
            alt={post.title || 'Blog post'}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 50%, ${COLORS.teal} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16v16H4z" />
              <path d="M4 9h16" />
              <path d="M8 4v5" />
            </svg>
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
        {/* Category tag */}
        <div style={{
          display: 'inline-block',
          alignSelf: 'flex-start',
          background: `rgba(13,148,136,0.1)`,
          color: COLORS.teal,
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          borderRadius: '999px',
          padding: '3px 11px',
          lineHeight: '1.6',
        }}>
          {category}
        </div>

        {/* Title — 2-line clamp */}
        <h3 style={{
          margin: 0,
          fontSize: '17px',
          fontWeight: 700,
          color: COLORS.textDark,
          lineHeight: '1.45',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {post.title}
        </h3>

        {/* Date */}
        <p style={{
          margin: 0,
          fontSize: '13px',
          color: COLORS.textLight,
          fontWeight: 500,
        }}>
          {formatDate(post.pubDate)}
        </p>

        {/* Excerpt — 3-line clamp */}
        <p style={{
          margin: 0,
          fontSize: '14px',
          color: COLORS.textMid,
          lineHeight: '1.65',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flex: 1,
        }}>
          {excerpt}
        </p>

        {/* Read More */}
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: '4px',
            alignSelf: 'flex-start',
            fontSize: '14px',
            fontWeight: 600,
            color: COLORS.accent,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = COLORS.teal; }}
          onMouseLeave={e => { e.currentTarget.style.color = COLORS.accent; }}
        >
          Read More →
        </a>
      </div>
    </div>
  );
}

export default function BlogLatestPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40symprioideas')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        if (cancelled) return;
        if (data.status === 'ok' && Array.isArray(data.items)) {
          setPosts(data.items.slice(0, 3));
        } else {
          throw new Error('Invalid feed data');
        }
        setLoading(false);
      })
      .catch(err => {
        if (cancelled) return;
        setError('Unable to load blog posts at this time. Please try again later.');
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return (
    <>
      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <section style={{
        background: COLORS.bg,
        padding: '80px 20px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{
          maxWidth: '1140px',
          margin: '0 auto',
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }} data-aos="fade-up">
            {/* Tag */}
            <span style={{
              display: 'inline-block',
              background: `rgba(13,148,136,0.1)`,
              color: COLORS.teal,
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '999px',
              padding: '5px 16px',
              marginBottom: '16px',
            }}>
              Insights
            </span>

            {/* Heading */}
            <h2 style={{
              margin: '0 0 16px',
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 800,
              color: COLORS.textDark,
              lineHeight: '1.2',
            }}>
              Latest from{' '}
              <span style={{
                background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.teal})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Our Blog
              </span>
            </h2>

            <p style={{
              margin: '0 auto',
              maxWidth: '520px',
              fontSize: '16px',
              color: COLORS.textLight,
              lineHeight: '1.7',
            }}>
              Stay up to date with our latest thinking on AI, automation, and digital transformation.
            </p>
          </div>

          {/* Grid */}
          {error ? (
            <div style={{
              textAlign: 'center',
              padding: '48px 20px',
              color: COLORS.textLight,
              fontSize: '15px',
            }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>📰</div>
              <p style={{ margin: 0 }}>{error}</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '28px',
            }}>
              {loading
                ? [0, 1, 2].map(i => <SkeletonCard key={i} />)
                : posts.map((post, i) => <PostCard key={post.guid || post.link || i} post={post} index={i} />)
              }
            </div>
          )}

          {/* CTA */}
          {!error && (
            <div style={{ textAlign: 'center', marginTop: '44px' }} data-aos="fade-up">
              <button
                onClick={() => navigate('/blog')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '13px 32px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.01em',
                  transition: 'opacity 0.2s, transform 0.2s',
                  boxShadow: `0 4px 18px rgba(10,45,110,0.2)`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = '0.88';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                View All Posts →
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
