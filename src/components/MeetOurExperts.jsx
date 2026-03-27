import React from 'react';

const MeetOurExperts = () => {
  const team = [
    {
      name: 'Vilhelm Bjermeland',
      position: 'COO, USA',
      image: '/vilhelm_New.jpg',
      linkedin: 'https://www.linkedin.com/in/get2vil/'
    },
    {
      name: 'Prabin Vijay',
      position: 'Practice Lead, APAC',
      image: '/prabin_New.jpg',
      linkedin: 'https://www.linkedin.com/in/prabin-vijay-89a2758/'
    },
    {
      name: 'Vivek Krishna',
      position: 'Director - Automation Services, APAC',
      image: '/vivek_New.jpg',
      linkedin: 'https://www.linkedin.com/in/vivekkkrishna/'
    },
    {
      name: 'Ramalingam Dushyanth',
      position: 'Practice Head - Automation',
      image: '/dushy.jpeg',
      linkedin: 'https://www.linkedin.com/in/ddr-dushy/'
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-3 block">
            Our Experts
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] mb-6 font-primary">
            Meet Our <span className="text-[#185ADB] font-serif-italic">Visionaries</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team of dedicated professionals is driven by innovation and excellence, 
            working together to transform your digital landscape.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group relative">
              {/* Member Image & Social Hover */}
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5] bg-gray-100">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Social Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl flex justify-center space-x-4">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0A192F] hover:text-[#185ADB] transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#0A192F] mb-1 group-hover:text-[#185ADB] transition-colors font-primary">
                  {member.name}
                </h3>
                <p className="text-orange-500 text-sm font-medium uppercase tracking-wider">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurExperts;
