import React from 'react';
import { getTrackStyle } from '../../data/events';

export default function TrackBadge({ track, className = '' }) {
  const style = getTrackStyle(track);

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${className}`}
      style={{
        backgroundColor: style.background,
        color: style.color
      }}
    >
      {style.label}
    </span>
  );
}
