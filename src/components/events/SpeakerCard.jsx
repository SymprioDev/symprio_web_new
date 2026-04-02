import React from 'react';

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function SpeakerCard({ speaker }) {
  return (
    <div className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        {speaker.photo ? (
          <img
            src={speaker.photo}
            alt={speaker.name}
            className="h-16 w-16 rounded-2xl object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#185ADB] to-[#0D9488] text-lg font-bold text-white">
            {getInitials(speaker.name)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-[#0A2D6E]">{speaker.name}</h3>
          <p className="mt-1 text-sm font-medium text-slate-700">{speaker.title}</p>
          <p className="mt-1 text-sm text-slate-500">{speaker.company}</p>
          {speaker.linkedin && (
            <a
              href={speaker.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#185ADB] hover:text-[#0D9488]"
            >
              LinkedIn
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
