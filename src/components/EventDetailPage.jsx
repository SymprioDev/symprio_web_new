import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import AgendaTimeline from './events/AgendaTimeline';
import RegisterModal from './events/RegisterModal';
import SpeakerCard from './events/SpeakerCard';
import TrackBadge from './events/TrackBadge';
import {
  canUseInternalRegistration,
  fetchAdminEvents,
  formatEventMeta,
  getRegistrationStatusLabel,
  isPastEvent
} from '../data/events';

export default function EventDetailPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const adminEvents = await fetchAdminEvents();
        setEvents(adminEvents);
      } catch (error) {
        console.error('Failed to load event detail:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const event = useMemo(() => events.find((item) => item.slug === slug), [events, slug]);

  const relatedEvents = useMemo(() => {
    if (!event) return [];
    return events.filter((item) => item.slug !== event.slug).slice(0, 3);
  }, [event, events]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7FAFD] pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="h-[420px] animate-pulse rounded-[2rem] bg-slate-200" />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#F7FAFD] pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h1 className="text-4xl font-semibold text-[#0A2D6E]">Event not found</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            We couldn’t find that event page. Head back to the events hub to explore current and past sessions.
          </p>
          <button
            type="button"
            onClick={() => navigate('/events')}
            className="mt-8 rounded-full bg-[#0A2D6E] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#185ADB]"
          >
            Go to Events Hub
          </button>
        </div>
      </div>
    );
  }

  const past = isPastEvent(event);
  const canRegisterInternally = canUseInternalRegistration(event);

  return (
    <>
      <Helmet>
        <title>Events — Isai Alai Community</title>
        <meta
          name="description"
          content="Join UiPath Malaysia Chapter, Claude Malaysia Chapter, and Students AI Workshops hosted by Isai Alai in Kuala Lumpur."
        />
        <meta property="og:title" content="Isai Alai Community Events" />
        <meta property="og:image" content="/og-events.png" />
      </Helmet>

      <div className="bg-white">
        <section className="relative overflow-hidden bg-[#07162F] pt-36 pb-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,148,136,0.24),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(24,90,219,0.24),transparent_35%)]" />
          <div className="container relative z-10 mx-auto px-6">
            <div className="max-w-4xl">
              <TrackBadge track={event.track} />
              <h1 className="mt-6 text-5xl md:text-6xl font-semibold leading-[1.05] text-white">{event.title}</h1>
              <p className="mt-5 text-lg leading-8 text-white/74">{formatEventMeta(event)}</p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#B9FFF3]">
                {event.eventMode === 'virtual' ? 'Virtual event' : 'Physical event'} · {getRegistrationStatusLabel(event)}
              </p>
              <p className="mt-6 max-w-3xl text-base md:text-lg leading-8 text-white/72">{event.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                {!past && canRegisterInternally && (
                  <button
                    type="button"
                    onClick={() => setRegisterModalOpen(true)}
                    className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#0A2D6E] transition hover:bg-[#E6F1FB]"
                  >
                    Register for this event
                  </button>
                )}
                {!past && event.useExternalRegistration && event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#0A2D6E] transition hover:bg-[#E6F1FB]"
                  >
                    Register externally
                  </a>
                )}
                {past && event.youtubeUrl && (
                  <a
                    href={event.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#0A2D6E] transition hover:bg-[#E6F1FB]"
                  >
                    Watch recording
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => navigate('/events')}
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/15"
                >
                  Back to Events
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F7FAFD]">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
              <AgendaTimeline agenda={event.agenda} title="Full Agenda" defaultMobileOpen />

              <div className="space-y-6">
                <div className="rounded-[2rem] border border-[#DCE7F7] bg-white p-6 md:p-8 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#185ADB]">Speakers</p>
                  <div className="mt-5 space-y-4">
                    {event.speakers.map((speaker) => (
                      <SpeakerCard key={`${event.slug}-${speaker.name}`} speaker={speaker} />
                    ))}
                  </div>
                </div>
                <div className="rounded-[2rem] border border-[#DCE7F7] bg-white p-6 md:p-8 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#185ADB]">Event Details</p>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    {event.eventMode === 'physical' ? (
                      <p><span className="font-semibold text-slate-900">Location:</span> {event.location || 'To be announced'}</p>
                    ) : (
                      <>
                        <p><span className="font-semibold text-slate-900">Platform:</span> {event.virtualPlatform || 'Online'}</p>
                        {event.virtualUrl && (
                          <p>
                            <span className="font-semibold text-slate-900">Join URL:</span>{' '}
                            <a href={event.virtualUrl} target="_blank" rel="noopener noreferrer" className="text-[#185ADB] hover:underline">
                              {event.virtualUrl}
                            </a>
                          </p>
                        )}
                      </>
                    )}
                    {event.registrationCloseAt && (
                      <p><span className="font-semibold text-slate-900">Registration closes:</span> {new Date(event.registrationCloseAt).toLocaleString('en-GB')}</p>
                    )}
                    {event.seatingCapacity != null && (
                      <p><span className="font-semibold text-slate-900">Capacity:</span> {event.registrationsCount} / {event.seatingCapacity} registered</p>
                    )}
                  </div>
                </div>
                {!!event.sponsors?.length && (
                  <div className="rounded-[2rem] border border-[#DCE7F7] bg-white p-6 md:p-8 shadow-sm">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#185ADB]">Sponsors</p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      {event.sponsors.map((sponsor, index) => (
                        <a
                          key={`${event.slug}-sponsor-${index}`}
                          href={sponsor.website || '#'}
                          target={sponsor.website ? '_blank' : undefined}
                          rel={sponsor.website ? 'noopener noreferrer' : undefined}
                          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                        >
                          {sponsor.logo ? (
                            <img src={sponsor.logo} alt={sponsor.name} className="h-12 w-12 rounded-xl object-contain bg-white p-2" />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xs font-bold text-slate-500">
                              {sponsor.name?.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-slate-900">{sponsor.name}</p>
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{sponsor.tier || 'Partner'}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {past && event.youtubeUrl && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#0D9488]">Recording</p>
                <h2 className="mt-3 text-4xl font-semibold text-[#0A2D6E]">Watch the session</h2>
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-sm">
                <iframe
                  title={`${event.title} recording`}
                  src={toEmbedUrl(event.youtubeUrl)}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-[#F7FAFD]">
          <div className="container mx-auto px-6">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#185ADB]">Related Events</p>
              <h2 className="mt-3 text-4xl font-semibold text-[#0A2D6E]">Explore more community sessions</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedEvents.map((related) => (
                <button
                  key={related.slug}
                  type="button"
                  onClick={() => navigate(`/events/${related.slug}`)}
                  className="rounded-[1.8rem] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(10,45,110,0.10)]"
                >
                  <TrackBadge track={related.track} />
                  <h3 className="mt-4 text-xl font-semibold text-[#0A2D6E]">{related.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{formatEventMeta(related)}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <RegisterModal
          open={registerModalOpen}
          eventSlug={event.slug}
          onClose={() => setRegisterModalOpen(false)}
        />
      </div>
    </>
  );
}

function toEmbedUrl(url) {
  if (!url) return '';

  if (url.includes('embed/')) return url;

  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  const shortMatch = url.match(/youtu\.be\/([^?&/]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  if (url.includes('youtube.com/@')) return 'https://www.youtube.com/embed?listType=user_uploads&list=isai-alai';

  return url;
}
