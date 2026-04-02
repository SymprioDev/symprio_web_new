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
  }
};

export const communityEvents = [
  {
    slug: 'uipath-apr-2026',
    title: 'Agentic AI Demo Night',
    track: 'uipath',
    date: '2026-04-26',
    time: '4:30 PM',
    endTime: '5:30 PM',
    location: 'Company Office, Kuala Lumpur',
    isLiveStreamed: true,
    youtubeUrl: 'https://youtube.com/@isai-alai',
    description:
      'Our inaugural UiPath Malaysia Chapter meetup featuring a live demo of agentic AI workflows built on UiPath, with practical enterprise automation examples and a friendly community Q&A.',
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
    title: 'Claude Prompt Jam: Building Better AI Assistants',
    track: 'claude',
    date: '2026-03-15',
    time: '5:00 PM',
    endTime: '6:30 PM',
    location: 'Community Studio, Kuala Lumpur',
    isLiveStreamed: true,
    youtubeUrl: 'https://youtube.com/@isai-alai',
    slidesUrl: 'https://drive.google.com',
    description:
      'A practical community session on prompt design, workflows, and everyday AI assistant patterns for teams and builders.',
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
    title: 'Kids AI Discovery Workshop',
    track: 'students',
    date: '2026-02-22',
    time: '10:00 AM',
    endTime: '12:00 PM',
    location: 'Learning Lab, PJ',
    isLiveStreamed: false,
    slidesUrl: 'https://drive.google.com',
    description:
      'A warm and playful hands-on workshop introducing students and kids to AI thinking, creative prompting, and safe experimentation.',
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
    title: 'Automation Community Kickoff',
    track: 'uipath',
    date: '2025-12-12',
    time: '6:00 PM',
    endTime: '7:30 PM',
    location: 'Company Office, Kuala Lumpur',
    isLiveStreamed: true,
    youtubeUrl: 'https://youtube.com/@isai-alai',
    slidesUrl: 'https://drive.google.com',
    description:
      'The first community kickoff for automation enthusiasts, featuring demos, networking, and a roadmap for the year ahead.',
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
  return TRACK_STYLES[track] || TRACK_STYLES.uipath;
}

export function isPastEvent(event) {
  const today = new Date();
  const eventDate = new Date(`${event.date}T23:59:59`);
  return eventDate < today;
}

export function sortEventsByDate(events) {
  return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function getUpcomingEvents(events = communityEvents) {
  return sortEventsByDate(events).filter((event) => !isPastEvent(event));
}

export function getPastEvents(events = communityEvents) {
  return sortEventsByDate(events)
    .filter((event) => isPastEvent(event))
    .reverse();
}

export function getEventBySlug(slug) {
  return communityEvents.find((event) => event.slug === slug);
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
  return `${formatEventDate(event.date)} · ${event.time} · ${event.location}`;
}
