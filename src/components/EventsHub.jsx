import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import EventCard from './events/EventCard';
import PastEventCard from './events/PastEventCard';
import RegisterModal from './events/RegisterModal';
import {
  fetchAdminEvents,
  formatEventDate,
  getPastEvents,
  getUpcomingEvents
} from '../data/events';

const communityLinks = [
  { label: 'WhatsApp Community', href: 'https://chat.whatsapp.com/' },
  { label: 'LinkedIn Page', href: 'https://www.linkedin.com/' },
  { label: 'YouTube Channel', href: 'https://youtube.com/@isai-alai' }
];

export default function EventsHub() {
  const navigate = useNavigate();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedEventSlug, setSelectedEventSlug] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [events, setEvents] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loadingContent, setLoadingContent] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [adminEvents, trainingsResponse] = await Promise.all([
          fetchAdminEvents(),
          fetch('/api/trainings')
        ]);

        setEvents(adminEvents);

        if (trainingsResponse.ok) {
          const trainingsData = await trainingsResponse.json();
          setTrainings(Array.isArray(trainingsData) ? trainingsData.map(normalizeTrainingSession) : []);
        } else {
          setTrainings([]);
        }
      } catch (error) {
        console.error('Failed to load sessions:', error);
        setEvents([]);
        setTrainings([]);
      } finally {
        setLoadingContent(false);
      }
    };

    loadContent();
  }, []);

  const upcomingItems = useMemo(
    () => sortSessionsByDate([
      ...getUpcomingEvents(events).map((event) => ({ ...event, itemType: 'event' })),
      ...trainings.filter((training) => !training.isPast).map((training) => ({ ...training, itemType: 'training' }))
    ]),
    [events, trainings]
  );

  const pastItems = useMemo(
    () => sortSessionsByDate([
      ...getPastEvents(events).map((event) => ({ ...event, itemType: 'event' })),
      ...trainings.filter((training) => training.isPast).map((training) => ({ ...training, itemType: 'training' }))
    ]).reverse(),
    [events, trainings]
  );

  const openRegisterModal = (event) => {
    setSelectedEventSlug(event.slug);
    setRegisterModalOpen(true);
  };

  const handleHeroCta = () => {
    document.getElementById('upcoming-events')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    setNewsletterMessage(`Thanks for signing up, ${newsletterEmail}. We'll keep you posted on future sessions.`);
    setNewsletterEmail('');
  };

  return (
    <>
      <Helmet>
        <title>Events — Isai Alai Community</title>
        <meta
          name="description"
          content="Join UiPath Malaysia Chapter, Claude Malaysia Chapter, and Students AI Workshops hosted by Isai Alai in Kuala Lumpur."
        />
        <meta property="og:title" content="Isai Alai Community Events" />
        <meta
          property="og:description"
          content="Join UiPath Malaysia Chapter, Claude Malaysia Chapter, and Students AI Workshops hosted by Isai Alai in Kuala Lumpur."
        />
        <meta property="og:image" content="/og-events.png" />
      </Helmet>

      <div className="bg-white">
        <section className="relative overflow-hidden bg-[#07162F] pt-36 pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,148,136,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(24,90,219,0.24),transparent_30%)]" />
          <div className="container relative z-10 mx-auto px-6">
            <div className="max-w-4xl">
              <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#B9FFF3] backdrop-blur-xl">
                Events Hub
              </span>
              <h1 className="mt-6 text-5xl md:text-6xl font-semibold leading-[1.05] text-white">
                Community Events
              </h1>
              <p className="mt-6 max-w-3xl text-lg md:text-xl leading-8 text-white/72">
                UiPath Malaysia Chapter · Claude Malaysia Chapter · Students & Kids Workshops
              </p>
              <p className="mt-6 max-w-3xl text-base md:text-lg leading-8 text-white/70">
                Explore upcoming events and training sessions together in one place, organized so the next opportunity to join is easy to spot.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handleHeroCta}
                  className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#0A2D6E] transition hover:bg-[#E6F1FB]"
                >
                  View Upcoming Sessions
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/events/register')}
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/15"
                >
                  Open Registration Page
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="upcoming-events" className="py-20 bg-[#F7FAFD]">
          <div className="container mx-auto px-6">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#185ADB]">Upcoming Sessions</p>
                <h2 className="mt-3 text-4xl font-semibold text-[#0A2D6E]">Events and training in one timeline</h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                See the next live event, meetup, webinar, or training session in one combined chronological list.
              </p>
            </div>

            {loadingContent ? (
              <div className="grid gap-8">
                {[0, 1].map((index) => (
                  <div key={index} className="h-[420px] animate-pulse rounded-[2rem] border border-[#DCE7F7] bg-white shadow-sm" />
                ))}
              </div>
            ) : upcomingItems.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-[#D6E4FF] bg-white px-8 py-14 text-center shadow-sm">
                <h3 className="text-2xl font-semibold text-[#0A2D6E]">No upcoming sessions — check back soon</h3>
                <p className="mt-3 text-base text-slate-600">
                  We are planning the next event or training session now. Join the newsletter below and we'll let you know first.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {upcomingItems.map((item) => (
                  item.itemType === 'event' ? (
                    <EventCard
                      key={`event-${item.slug}`}
                      event={item}
                      onRegister={openRegisterModal}
                      onViewDetails={(selectedEvent) => navigate(`/events/${selectedEvent.slug}`)}
                    />
                  ) : (
                    <TrainingSessionCard key={`training-${item.id}`} training={item} />
                  )
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#0D9488]">Past Sessions</p>
                <h2 className="mt-3 text-4xl font-semibold text-[#0A2D6E]">A combined archive</h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                Catch up on past events and completed training sessions from one shared archive.
              </p>
            </div>

            {loadingContent ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="h-[320px] animate-pulse rounded-[1.9rem] border border-slate-200 bg-slate-100" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {pastItems.map((item) => (
                  item.itemType === 'event' ? (
                    <PastEventCard
                      key={`event-${item.slug}`}
                      event={item}
                      onViewDetails={(selectedEvent) => navigate(`/events/${selectedEvent.slug}`)}
                    />
                  ) : (
                    <PastTrainingCard key={`training-${item.id}`} training={item} />
                  )
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-[#07162F]">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#B9FFF3]">Stay in the loop</p>
                <h2 className="mt-4 text-4xl font-semibold text-white">Stay in the loop</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
                  Get notified about upcoming events, training sessions, speaker announcements, and recordings.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {communityLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/12 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/14"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="rounded-[2rem] border border-white/10 bg-white/10 p-6 md:p-8 backdrop-blur-xl">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-white/88">Email address</span>
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#185ADB] focus:ring-4 focus:ring-[#185ADB]/15"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-4 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0A2D6E] transition hover:bg-[#E6F1FB]"
                >
                  Subscribe
                </button>
                {newsletterMessage && <p className="mt-4 text-sm text-[#B9FFF3]">{newsletterMessage}</p>}
              </form>
            </div>
          </div>
        </section>

        <RegisterModal
          open={registerModalOpen}
          eventSlug={selectedEventSlug}
          onClose={() => setRegisterModalOpen(false)}
        />
      </div>
    </>
  );
}

function normalizeTrainingSession(training) {
  return {
    ...training,
    isPast: new Date(`${training.date}T23:59:59`) < new Date()
  };
}

function sortSessionsByDate(items) {
  return [...items].sort((a, b) => new Date(a.date) - new Date(b.date));
}

function TrainingSessionCard({ training }) {
  return (
    <article className="rounded-[2rem] border border-emerald-100 bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(13,148,136,0.08)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
            Training Session
          </span>
          <h3 className="mt-5 text-2xl md:text-3xl font-semibold tracking-tight text-[#0A2D6E]">
            {training.title}
          </h3>
          <p className="mt-4 text-sm md:text-base font-medium text-slate-600">
            {formatEventDate(training.date)} · {training.duration || 'Duration to be announced'}
          </p>
          {training.instructor && (
            <p className="mt-2 text-sm font-medium text-emerald-700">Instructor: {training.instructor}</p>
          )}
          {training.capacity && (
            <p className="mt-2 text-sm text-slate-500">Capacity: {training.capacity}</p>
          )}
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{training.description}</p>
        </div>

        <div className="flex flex-col gap-3 lg:min-w-[220px]">
          {training.link ? (
            <a
              href={training.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Enroll Now
            </a>
          ) : Number(training.registrations_count || 0) < Number(training.capacity || 0) ? (
            <a
              href={`/events/register?training=${training.id}`}
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Register for Training
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex items-center justify-center rounded-full bg-slate-200 px-5 py-3 text-sm font-bold text-slate-500"
            >
              Training Full
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function PastTrainingCard({ training }) {
  return (
    <article className="flex h-full flex-col rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(13,148,136,0.10)]">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
          Training Session
        </span>
        <span className="text-sm font-medium text-slate-500">{formatEventDate(training.date)}</span>
      </div>

      <h3 className="mt-5 text-xl font-semibold leading-8 text-[#0A2D6E]">{training.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{training.description}</p>
      {training.instructor && (
        <p className="mt-4 text-sm font-medium text-emerald-700">Instructor: {training.instructor}</p>
      )}
      {training.duration && (
        <p className="mt-2 text-sm text-slate-500">Duration: {training.duration}</p>
      )}
      <div className="mt-6">
        {training.link ? (
          <a
            href={training.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:border-emerald-500 hover:text-emerald-800"
          >
            View Training Info
          </a>
        ) : (
          <span className="text-sm text-slate-400">No additional link</span>
        )}
      </div>
    </article>
  );
}
