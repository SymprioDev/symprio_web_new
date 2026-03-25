import React from 'react';

const words = ['AI', 'AUTOMATION', 'RPA', 'DIGITAL', 'TRANSFORMATION', 'AGENTIC', 'ENTERPRISE'];

export default function TextMarquee() {
  const doubled = [...words, ...words];

  const textStyle = (i) => ({
    fontSize: 'clamp(4rem, 10vw, 8rem)',
    fontWeight: 800,
    color: '#0A2D6E',
    textTransform: 'uppercase',
    letterSpacing: '-0.03em',
    lineHeight: 1,
    opacity: i % 2 === 0 ? 1 : 0.15,
    flexShrink: 0,
  });

  const separatorStyle = {
    fontSize: 'clamp(1.6rem, 4vw, 3.2rem)',
    color: '#0D9488',
    margin: '0 clamp(1rem, 2vw, 2rem)',
    flexShrink: 0,
    lineHeight: 1,
  };

  return (
    <section style={{ padding: '60px 0', overflow: 'hidden', background: '#ffffff' }}>
      <div
        className="text-marquee-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {doubled.map((word, i) => (
          <React.Fragment key={i}>
            <span style={textStyle(i)}>{word}</span>
            <span style={separatorStyle}>&#10022;</span>
          </React.Fragment>
        ))}
      </div>
      <style>{`
        @keyframes marquee-text {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .text-marquee-track {
          animation: marquee-text 25s linear infinite;
        }
        .text-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
