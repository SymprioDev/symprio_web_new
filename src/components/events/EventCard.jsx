import React from 'react';
import TrackBadge from './TrackBadge';
import AgendaTimeline from './AgendaTimeline';
import { formatEventMeta } from '../../data/events';

export default function EventCard({ event, onRegister, onViewDetails }) {
  return (
    <article className="rounded-[2rem] border border-[#DCE7F7] bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(10,45,110,0.08)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <TrackBadge track={event.track} />
            {event.isLiveStreamed && (
              <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-red-600">
                Live on YouTube
              </span>
            )}
          </div>

          <h3 className="mt-5 text-2xl md:text-3xl font-semibold tracking-tight text-[#0A2D6E]">
            {event.title}
          </h3>

          <p className="mt-4 text-sm md:text-base font-medium text-slate-600">{formatEventMeta(event)}</p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{event.description}</p>
        </div>

        <div className="flex flex-col gap-3 lg:min-w-[220px]">
          <button
            type="button"
            onClick={() => onRegister(event)}
            className="inline-flex items-center justify-center rounded-full bg-[#0A2D6E] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#185ADB]"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => onViewDetails(event)}
            className="inline-flex items-center justify-center rounded-full border border-[#D6E4FF] bg-white px-5 py-3 text-sm font-bold text-[#0A2D6E] transition hover:border-[#185ADB] hover:text-[#185ADB]"
          >
            View Event Details
          </button>
        </div>
      </div>

      <div className="mt-8">
        <AgendaTimeline agenda={event.agenda} defaultMobileOpen />
      </div>
    </article>
  );
}
