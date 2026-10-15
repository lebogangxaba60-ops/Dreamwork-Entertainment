import React, { useState } from 'react';
import { HelpCircle, ArrowRight, Calendar, Newspaper, ExternalLink, Clock } from 'lucide-react';
import { NEWS_ARTICLES, NewsArticle } from '../data/labelData';

interface NewsAndInquiriesProps {
  onOpenInquiry: () => void;
  onSelectArticle: (article: NewsArticle) => void;
}

export const NewsAndInquiries: React.FC<NewsAndInquiriesProps> = ({
  onOpenInquiry,
  onSelectArticle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'SA Hip-Hop', 'SA R&B', 'Studio Expansion', 'Editorial'];

  const filteredNews =
    selectedCategory === 'All'
      ? NEWS_ARTICLES
      : NEWS_ARTICLES.filter((item) => item.category === selectedCategory);

  return (
    <section id="news" aria-label="Press Releases and Inquiries" className="bg-[#FFFFFF] text-zinc-900 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top Header & Inquiry Callout Strip */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-10 border-b border-zinc-200 gap-8 mb-12">
          {/* Section Heading & Category Filters */}
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-widest text-rose-600 font-bold flex items-center gap-2">
              <Newspaper className="w-3.5 h-3.5" />
              <span>SA Hip-Hop &amp; SA R&amp;B Dispatches</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 uppercase font-['Plus_Jakarta_Sans']">
              News
            </h2>

            {/* Category Filter Buttons (Functional Segmented Control) */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-95 ${
                    selectedCategory === cat
                      ? 'bg-zinc-950 text-white shadow-md'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Callout Card for Inquiries (Prompt Requirement) */}
          <div className="lg:max-w-md w-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white p-6 sm:p-7 rounded-xs shadow-2xl border border-zinc-800 flex flex-col justify-between relative overflow-hidden group">
            {/* Subtle Metallic Corner Light */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-rose-500/20 transition-all duration-500" />

            <div className="flex items-start gap-4 relative z-10">
              <div className="p-3 bg-rose-600 text-white rounded-xs shrink-0 shadow-lg shadow-rose-950/50">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-400">
                  Rosebank Executive Concierge
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                  Have a Question for Dreamwork Entertainment?
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed pt-0.5">
                  Connect directly with our SA Hip-Hop A&amp;R, SA R&amp;B Management, Sync Licensing, or Press Operations teams.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between relative z-10">
              <span className="text-[11px] text-zinc-400 font-mono">
                Standard turnaround: &lt; 24h
              </span>
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-200 active:bg-zinc-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xs transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Submit Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Editorial News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNews.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group bg-white border border-zinc-200 hover:border-zinc-300 rounded-xs overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
              <div>
                {/* Image Container with Fallback */}
                <div className="relative aspect-video w-full bg-zinc-100 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-950/85 text-white backdrop-blur-xs rounded-xs">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium font-mono">
                    <Calendar className="w-3 h-3 text-zinc-400" />
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-bold text-base text-zinc-950 group-hover:text-rose-600 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Action Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-rose-600 group-hover:text-rose-700">
                <span>Read Full Statement</span>
                <ExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
