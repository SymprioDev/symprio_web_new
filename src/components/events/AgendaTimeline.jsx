import React, { useEffect, useState } from 'react';

export default function AgendaTimeline({ agenda = [], title = 'Agenda', defaultMobileOpen = false }) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  const [mobileOpen, setMobileOpen] = useState(defaultMobileOpen);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        setMobileOpen(true);
      } else if (!defaultMobileOpen) {
        setMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [defaultMobileOpen]);

  const isOpen = isDesktop || mobileOpen;

  return (
    <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/80 overflow-hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left lg:cursor-default"
        onClick={() => {
          if (!isDesktop) setMobileOpen((prev) => !prev);
        }}
        aria-expanded={isOpen}
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#185ADB]">{title}</p>
          <p className="mt-1 text-sm text-slate-500">
            {agenda.length} session{agenda.length === 1 ? '' : 's'}
          </p>
        </div>
        <span className="lg:hidden text-[#0A2D6E]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5">
          <div className="relative pl-5">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-[#185ADB] via-[#0D9488] to-slate-200" />
            <div className="space-y-5">
              {agenda.map((item, index) => (
                <div key={`${item.time}-${item.title}-${index}`} className="relative">
                  <span className="absolute -left-5 top-2 h-[14px] w-[14px] rounded-full border-[3px] border-white bg-[#0D9488] shadow-[0_0_0_4px_rgba(13,148,136,0.15)]" />
                  <div className="rounded-2xl bg-white px-4 py-4 shadow-sm border border-white/80">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-bold text-[#0A2D6E]">{item.time}</span>
                      {item.tag && (
                        <span className="rounded-full bg-[#EEF6F3] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0D9488]">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <h4 className="mt-3 text-base font-semibold text-slate-900">{item.title}</h4>
                    {item.description && (
                      <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
