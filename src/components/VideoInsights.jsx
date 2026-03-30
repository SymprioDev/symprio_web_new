import React from 'react';

const videos = [
  { id: 'coyjtNrYGAs', title: 'AI Solutions Overview' },
  { id: '1uPlLRAp_g4', title: 'Automation in Action' },
  { id: '4gzmo0TrLls', title: 'Digital Transformation' },
  { id: 'EqwOLDQdQEA', title: 'Enterprise Success Story' }
];

export default function VideoInsights() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-3 block">
            Video Insights
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] mb-5 font-primary">
            See Our Solutions in <span className="text-[#185ADB] font-serif-italic">Action</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Watch how we help enterprises transform operations with AI, automation, and digital delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, idx) => (
            <div
              key={video.id}
              className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#0A192F]">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
