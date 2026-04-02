import React from 'react';
import TrackBadge from './TrackBadge';
import { formatEventDate } from '../../data/events';

function getSpeakerInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function PastEventCard({ event, onViewDetails }) {
  const primarySpeaker = event.speakers[0];

  return (
    <article className="flex h-full flex-col rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(10,45,110,0.10)]">
      <div className="flex items-start justify-between gap-3">
        <TrackBadge track={event.track} />
        <span className="text-sm font-medium text-slate-500">{formatEventDate(event.date)}</span>
      </div>

      <h3 className="mt-5 text-xl font-semibold leading-8 text-[#0A2D6E]">{event.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{event.recap || event.description}</p>

      {primarySpeaker && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
          {primarySpeaker.photo ? (
            <img src={primarySpeaker.photo} alt={primarySpeaker.name} className="h-11 w-11 rounded-xl object-cover" />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#185ADB] to-[#0D9488] text-sm font-bold text-white">
              {getSpeakerInitials(primarySpeaker.name)}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{primarySpeaker.name}</p>
            <p className="truncate text-xs text-slate-500">{primarySpeaker.title}</p>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        {event.youtubeUrl && (
          <a
            href={event.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#0A2D6E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#185ADB]"
          >
            Watch Recording
          </a>
        )}
        {event.slidesUrl && (
          <a
            href={event.slidesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[#D6E4FF] px-4 py-2.5 text-sm font-semibold text-[#0A2D6E] transition hover:border-[#185ADB] hover:text-[#185ADB]"
          >
            View Slides
          </a>
        )}
        <button
          type="button"
          onClick={() => onViewDetails(event)}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#0D9488] hover:text-[#0D9488]"
        >
          Event Details
        </button>
      </div>
    </article>
  );
}
