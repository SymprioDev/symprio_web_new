import React from 'react';
import FAQSection from './FAQSection';
import ConsultationForm from './ConsultationForm';

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
    <circle cx="11" cy="11" r="11" fill="#E8F0FE" />
    <path d="M7 11.5L10 14.5L15.5 8.5" stroke="#185ADB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ServicePageTemplate({
  title,
  titleAccent,
  subtitle,
  heroImage,
  breadcrumb,
  introHeading,
  introBody = [],
  features = [],
  commitmentHeading,
  commitmentBody,
  commitmentBullets = [],
  commitmentImage,
  faqs,
  children,
}) {
  // Helper: wrap the accent word in the heading with italic serif styling
  const renderHeadingWithAccent = (text, accentWord) => {
    if (!accentWord || !text) return text;
    const idx = text.lastIndexOf(accentWord);
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <em className="accent-text" style={{ fontWeight: '400' }}>{accentWord}</em>
        {text.slice(idx + accentWord.length)}
      </>
    );
  };

  // For introHeading and commitmentHeading, accent the last word by default
  const getLastWord = (str) => {
    if (!str) return '';
    const words = str.trim().split(/\s+/);
    return words[words.length - 1];
  };

  // Build the hero H1 with accent on titleAccent
  const renderHeroTitle = () => {
    if (!titleAccent) return title;
    const idx = title.indexOf(titleAccent);
    if (idx === -1) return title;
    return (
      <>
        {title.slice(0, idx)}
        <em className="accent-text" style={{ fontWeight: '400' }}>{titleAccent}</em>
        {title.slice(idx + titleAccent.length)}
      </>
    );
  };

  // Render drop-cap paragraph
  const renderDropCapParagraph = (text) => {
    if (!text || text.length === 0) return null;
    const firstLetter = text.charAt(0);
    const rest = text.slice(1);
    return (
      <p style={{ fontSize: 16, color: '#444444', lineHeight: 1.8, margin: '0 0 24px 0' }}>
        <span
          style={{
            fontSize: 64,
            float: 'left',
            color: '#185ADB',
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
            marginRight: 8,
            marginTop: 4,
          }}
        >
          {firstLetter}
        </span>
        {rest}
      </p>
    );
  };

  return (
    <>
      {/* ── Section 1: Hero Banner ── */}
      <section
        style={{
          minHeight: 500,
          padding: '160px 20px 100px',
          backgroundImage: heroImage
            ? `linear-gradient(to bottom, rgba(1,11,29,0.75), rgba(1,11,29,0.85)), url(${heroImage})`
            : 'linear-gradient(to bottom, rgba(1,11,29,0.85), rgba(1,11,29,0.95))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <h1
          style={{
            color: '#ffffff',
            fontSize: 52,
            fontWeight: 400,
            maxWidth: 800,
            lineHeight: 1.2,
            marginBottom: 20,
          }}
        >
          {renderHeroTitle()}
        </h1>
        <p
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 18,
            maxWidth: 600,
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>

        {/* Breadcrumb */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            left: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          <span>Home</span>
          <span>/</span>
          <span>Services</span>
          <span>/</span>
          <span style={{ color: '#ffffff' }}>{breadcrumb}</span>
        </div>
      </section>

      {/* ── Section 3: Intro Text ── */}
      <section style={{ padding: '100px 20px', background: '#ffffff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'left' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="section-tag">{breadcrumb}</div>
            <h2 style={{ marginTop: 16, color: '#010B1D', fontWeight: 400 }}>
              {renderHeadingWithAccent(introHeading, getLastWord(introHeading))}
            </h2>
          </div>

          {introBody.map((para, i) =>
            i === 0
              ? <React.Fragment key={i}>{renderDropCapParagraph(para)}</React.Fragment>
              : (
                <p
                  key={i}
                  style={{
                    fontSize: 16,
                    color: '#444444',
                    lineHeight: 1.8,
                    margin: '0 0 24px 0',
                  }}
                >
                  {para}
                </p>
              )
          )}
        </div>
      </section>

      {/* ── Section 4: Feature Cards ── */}
      <section style={{ padding: '100px 20px', background: '#F1F7F3' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 30,
          }}
        >
          {features.map((feat, i) => {
            const isHighlighted = feat.highlighted;
            return (
              <div
                key={i}
                style={{
                  background: isHighlighted ? '#185ADB' : '#ffffff',
                  borderRadius: 20,
                  padding: 40,
                  border: isHighlighted ? 'none' : '1px solid #DCDCDC',
                  transition: 'border-color 0.3s, transform 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  if (!isHighlighted) {
                    e.currentTarget.style.borderColor = '#185ADB';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isHighlighted) {
                    e.currentTarget.style.borderColor = '#DCDCDC';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 200,
                    color: isHighlighted ? 'rgba(255,255,255,0.6)' : '#185ADB',
                    marginBottom: 20,
                  }}
                >
                  {feat.number}
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: isHighlighted ? '#ffffff' : '#010B1D',
                    marginBottom: 12,
                  }}
                >
                  {feat.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: isHighlighted ? 'rgba(255,255,255,0.85)' : '#444444',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Section 5: Commitment (2-column) ── */}
      <section style={{ padding: '100px 20px', background: '#ffffff' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'center',
          }}
        >
          {/* Left: Image */}
          <div>
            <img
              src={commitmentImage}
              alt={commitmentHeading || 'Our commitment'}
              style={{
                width: '100%',
                maxHeight: 400,
                objectFit: 'cover',
                borderRadius: 20,
                display: 'block',
              }}
            />
          </div>

          {/* Right: Content */}
          <div>
            <h2 style={{ color: '#010B1D', fontWeight: 400, marginBottom: 20 }}>
              {renderHeadingWithAccent(commitmentHeading, getLastWord(commitmentHeading))}
            </h2>
            <p style={{ fontSize: 16, color: '#444444', lineHeight: 1.8, marginBottom: 30 }}>
              {commitmentBody}
            </p>
            <div>
              {commitmentBullets.map((bullet, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'start',
                    marginBottom: 16,
                  }}
                >
                  <CheckIcon />
                  <span style={{ fontSize: 15, color: '#333333', lineHeight: 1.6 }}>
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Optional children ── */}
      {children}

      {/* ── Section 7: FAQ ── */}
      <FAQSection faqs={faqs} />

      {/* ── Section 8: Consultation Form ── */}
      <ConsultationForm />
    </>
  );
}
