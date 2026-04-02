export const TRACK_STYLES = {
  uipath: {
    label: 'UiPath Chapter',
    background: '#E6F1FB',
    color: '#0C447C'
  },
  claude: {
    label: 'Claude Chapter',
    background: '#E1F5EE',
    color: '#085041'
  },
  students: {
    label: 'Students Workshop',
    background: '#FAEEDA',
    color: '#633806'
  },
  event: {
    label: 'General Event',
    background: '#EEF2FF',
    color: '#3730A3'
  }
};

export const supplementalEvents = [
  {
    slug: 'uipath-apr-2026',
    track: 'uipath',
    agenda: [
      { time: '4:30 PM', title: 'Arrival & Registration', tag: '10 min' },
      {
        time: '4:40 PM',
        title: 'Welcome & Chapter Intro',
        description: "What the UiPath Malaysia Chapter is building and what’s coming next.",
        tag: '5 min'
      },
      {
        time: '4:45 PM',
        title: 'Agentic AI Demo',
        description: 'Live walkthrough of agentic automation workflows and orchestration patterns.',
        tag: 'Main Talk · 30 min'
      },
      { time: '5:15 PM', title: 'Q&A', tag: '10 min' },
      {
        time: '5:25 PM',
        title: 'Wrap-up & Next Steps',
        description: 'Speaker sign-up, next meetup announcement, and community links.',
        tag: '5 min'
      },
      { time: '5:30 PM', title: 'Informal Networking', tag: 'Open end' }
    ],
    speakers: [
      {
        name: 'Dushy',
        title: 'Founder & Automation Practice Head',
        company: 'AI Team Studio',
        linkedin: 'https://linkedin.com'
      }
    ]
  },
  {
    slug: 'claude-mar-2026',
    track: 'claude',
    recap:
      'Members explored practical Claude workflows, prompt patterns, and lightweight AI copilots for community and business use.',
    agenda: [
      { time: '5:00 PM', title: 'Check-in & Community Catch-up', tag: '10 min' },
      {
        time: '5:10 PM',
        title: 'Prompt Design Foundations',
        description: 'Frameworks for reusable, reliable prompts.',
        tag: 'Main Talk'
      },
      {
        time: '5:45 PM',
        title: 'Live Prompt Jam',
        description: 'Real-time examples with participant prompts and feedback.',
        tag: 'Workshop'
      },
      { time: '6:15 PM', title: 'Q&A + Resources', tag: '15 min' }
    ],
    speakers: [
      {
        name: 'Kavi',
        title: 'Community Facilitator',
        company: 'Isai Alai',
        linkedin: 'https://linkedin.com'
      }
    ]
  },
  {
    slug: 'students-feb-2026',
    track: 'students',
    recap:
      'Students built their first AI-assisted mini projects and left with a simple starter guide for learning safely at home.',
    agenda: [
      { time: '10:00 AM', title: 'Welcome Circle', tag: '10 min' },
      {
        time: '10:10 AM',
        title: 'What Is AI?',
        description: 'Simple examples with kid-friendly explanations.',
        tag: 'Mini Talk'
      },
      {
        time: '10:35 AM',
        title: 'Creative Prompt Activity',
        description: 'Teams try guided prompts for stories and ideas.',
        tag: 'Workshop'
      },
      { time: '11:25 AM', title: 'Show & Tell', tag: '20 min' },
      { time: '11:45 AM', title: 'Parent Q&A', tag: '15 min' }
    ],
    speakers: [
      {
        name: 'Anitha',
        title: 'Education Program Lead',
        company: 'Isai Alai',
        linkedin: 'https://linkedin.com'
      }
    ]
  },
  {
    slug: 'uipath-dec-2025',
    track: 'uipath',
    recap:
      'A strong opening meetup that brought together automation builders, students, and community leaders around shared learning.',
    agenda: [
      { time: '6:00 PM', title: 'Registration & Networking', tag: '15 min' },
      { time: '6:15 PM', title: 'Community Roadmap', tag: '15 min' },
      { time: '6:30 PM', title: 'Automation Showcase', tag: 'Main Talk' },
      { time: '7:10 PM', title: 'Open Floor Q&A', tag: '20 min' }
    ],
    speakers: [
      {
        name: 'Dushy',
        title: 'Founder & Automation Practice Head',
        company: 'AI Team Studio',
        linkedin: 'https://linkedin.com'
      },
      {
        name: 'Mithran',
        title: 'Community Builder',
        company: 'Isai Alai',
        linkedin: 'https://linkedin.com'
      }
    ]
  }
];

export function getTrackStyle(track) {
  return TRACK_STYLES[track] || TRACK_STYLES.event;
}

export function inferTrack(rawType = '') {
  const type = rawType.toLowerCase();
  if (type.includes('claude')) return 'claude';
  if (type.includes('student') || type.includes('kid')) return 'students';
  if (type.includes('uipath')) return 'uipath';
  return 'event';
}

export function isPastEvent(event) {
  const today = new Date();
  const eventDate = new Date(`${event.date}T23:59:59`);
  return eventDate < today;
}

export function sortEventsByDate(events) {
  return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function getUpcomingEvents(events = []) {
  return sortEventsByDate(events).filter((event) => !isPastEvent(event));
}

export function getPastEvents(events = []) {
  return sortEventsByDate(events)
    .filter((event) => isPastEvent(event))
    .reverse();
}

export function getSupplementalEventBySlug(slug) {
  return supplementalEvents.find((event) => event.slug === slug);
}

export function formatEventDate(dateString) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function formatEventMeta(event) {
  const timeLabel = event.endTime ? `${event.time} - ${event.endTime}` : event.time;
  return `${formatEventDate(event.date)} · ${timeLabel} · ${event.location}`;
}

export function normalizeAdminEvent(rawEvent) {
  if (!rawEvent) return null;

  const supplemental = getSupplementalEventBySlug(rawEvent.slug);
  const track = rawEvent.track || inferTrack(rawEvent.type);

  return {
    id: rawEvent.id,
    slug: rawEvent.slug || `event-${rawEvent.id}`,
    title: rawEvent.title,
    track,
    date: rawEvent.date,
    time: rawEvent.event_time || rawEvent.time || 'TBD',
    endTime: rawEvent.end_time || rawEvent.endTime || '',
    location: rawEvent.location,
    isLiveStreamed: Boolean(rawEvent.is_live_streamed),
    youtubeUrl: rawEvent.youtube_url || rawEvent.youtubeUrl || '',
    slidesUrl: rawEvent.slides_url || rawEvent.slidesUrl || '',
    description: rawEvent.description,
    registrationLink: rawEvent.registration_link || rawEvent.link || '',
    bannerImage: rawEvent.banner_image || '',
    type: rawEvent.type || 'event',
    agenda: supplemental?.agenda || [],
    speakers: supplemental?.speakers || [],
    recap: supplemental?.recap || '',
    isPast: isPastEvent({ date: rawEvent.date })
  };
}

export async function fetchAdminEvents() {
  const response = await fetch('/api/events');
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  const data = await response.json();
  return Array.isArray(data) ? data.map(normalizeAdminEvent).filter(Boolean) : [];
}
