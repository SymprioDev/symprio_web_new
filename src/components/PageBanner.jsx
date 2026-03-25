import React from 'react';
import { Link } from 'react-router-dom';

const PageBanner = ({ title, breadcrumb = [], backgroundImage }) => {
  // Default background if none provided
  const bgImage = backgroundImage || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600";

  return (
    <section className="relative h-[450px] w-full overflow-hidden flex items-center">
      {/* Background Image with Zoom Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          zIndex: -1
        }}
      >
        <div className="absolute inset-0 bg-[#0A192F]/70 backdrop-blur-[2px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
          {title}
        </h1>
      </div>

      {/* Breadcrumb Container - Rounded white box at bottom left of banner */}
      <div className="absolute bottom-0 left-0 bg-white px-8 py-4 rounded-tr-3xl z-20 hidden md:block border-t border-r border-gray-100">
        <nav className="flex items-center space-x-2 text-sm font-medium">
          <Link to="/" className="text-gray-500 hover:text-orange-500 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          {breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              <span className="text-gray-300">/</span>
              {item.link ? (
                <Link to={item.link} className="text-gray-500 hover:text-orange-500">
                  {item.label}
                </Link>
              ) : (
                <span className="text-orange-500">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Bottom Curve/Cutout Effect */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{ clipPath: 'ellipse(70% 100% at 50% 100%)' }}></div>
    </section>
  );
};

export default PageBanner;
