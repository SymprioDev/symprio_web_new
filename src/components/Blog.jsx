import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageBanner from './PageBanner';
import SEO from './SEO';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const RSS_URL = 'https://medium.com/feed/@symprioideas';
  const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: false });
    
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setPosts(data.items);
        } else {
          setError('Failed to load blog posts.');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching blog feed.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <SEO title="Blog — AI, RPA & Automation Insights" description="Expert insights on AI, RPA, Agentic AI, digital transformation and automation best practices from the Symprio team." />
      <PageBanner
        title="Symprio Ideas"
        breadcrumb={[{ label: 'Blog' }]}
        backgroundImage="/assets/images/about-bg.jpg"
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2D6E] mb-4" data-aos="fade-up">
              Latest from <span className="text-[#0077B6] italic font-serif">Medium</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Insights, tutorials, and strategy on AI, RPA, and Digital Transformation directly from our experts.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A2D6E]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-20">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post, idx) => (
                <article 
                  key={idx} 
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.thumbnail || '/assets/images/hero-bg.jpg'} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-bold text-[#0077B6] uppercase tracking-widest mb-4">
                      <span>{new Date(post.pubDate).toLocaleDateString()}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>By {post.author}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0A2D6E] mb-4 line-clamp-2 hover:text-[#0077B6] transition-colors">
                      <a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a>
                    </h3>
                    <div 
                      className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow"
                      dangerouslySetInnerHTML={{ __html: post.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' }}
                    />
                    <a 
                      href={post.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#0A2D6E] font-bold text-sm hover:gap-3 transition-all"
                    >
                      Read Full Article 
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
