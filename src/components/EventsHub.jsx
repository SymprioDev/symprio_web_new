import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import EventCard from './events/EventCard';
import PastEventCard from './events/PastEventCard';
import RegisterModal from './events/RegisterModal';
import {
  communityEvents,
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

  const upcomingEvents = useMemo(() => getUpcomingEvents(communityEvents), []);
  const pastEvents = useMemo(() => getPastEvents(communityEvents), []);

  const openRegisterModal = (event) => {
    setSelectedEventSlug(event.slug);
    setRegisterModalOpen(true);
  };

  const handleHeroCta = () => {
    document.getElementById('upcoming-events')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    setNewsletterMessage(`Thanks for signing up, ${newsletterEmail}. We'll keep you posted on future events.`);
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
                A warm, professional space for builders, students, and community members to learn together, watch live demos,
                and connect around practical AI and automation.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handleHeroCta}
                  className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#0A2D6E] transition hover:bg-[#E6F1FB]"
                >
                  Register for Next Event
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
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#185ADB]">Upcoming Events</p>
                <h2 className="mt-3 text-4xl font-semibold text-[#0A2D6E]">Join the next session</h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                Register for our next live gathering and explore practical AI use cases, community conversations, and speaker-led demos.
              </p>
            </div>

            {upcomingEvents.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-[#D6E4FF] bg-white px-8 py-14 text-center shadow-sm">
                <h3 className="text-2xl font-semibold text-[#0A2D6E]">No upcoming events — check back soon</h3>
                <p className="mt-3 text-base text-slate-600">
                  We are planning the next chapter meetup now. Join the newsletter below and we’ll let you know first.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.slug}
                    event={event}
                    onRegister={openRegisterModal}
                    onViewDetails={(selectedEvent) => navigate(`/events/${selectedEvent.slug}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#0D9488]">Past Events</p>
                <h2 className="mt-3 text-4xl font-semibold text-[#0A2D6E]">Recordings, slides, and recaps</h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                Catch up on the sessions you missed and revisit recordings, speaker highlights, and resources from recent community events.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pastEvents.map((event) => (
                <PastEventCard
                  key={event.slug}
                  event={event}
                  onViewDetails={(selectedEvent) => navigate(`/events/${selectedEvent.slug}`)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#07162F]">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#B9FFF3]">Stay in the loop</p>
                <h2 className="mt-4 text-4xl font-semibold text-white">Stay in the loop</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
                  Get notified about upcoming events, speaker announcements, and recordings.
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
