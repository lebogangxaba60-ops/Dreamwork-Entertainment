import React, { useRef, useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, Eye, Clock, Film, Sparkles, Volume2 } from 'lucide-react';
import { FEATURED_VIDEOS, FeaturedVideo } from '../data/labelData';
import { PlayingTrack } from './AudioPlayerBar';

interface FeaturedVideosProps {
  onPlayVideo: (video: FeaturedVideo) => void;
  onPlayTrack?: (track: PlayingTrack) => void;
}

export const FeaturedVideos: React.FC<FeaturedVideosProps> = ({ onPlayVideo, onPlayTrack }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 440;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 350);
    }
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleAudioPreview = (e: React.MouseEvent, video: FeaturedVideo) => {
    e.stopPropagation();
    if (onPlayTrack) {
      onPlayTrack({
        id: video.id,
        title: video.title,
        artist: video.artist,
        subLabel: 'Dreamwork SA Video Stems',
        genre: video.genre,
        thumbnail: video.thumbnail,
      });
    }
  };

  return (
    <section
      id="videos"
      aria-label="Official SA Hip-Hop and SA R&B Featured Videos"
      className="bg-[#FAFAFB] text-zinc-900 py-24 border-b border-zinc-200"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header Strip with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-rose-600 font-bold mb-1.5 flex items-center gap-2">
              <Film className="w-3.5 h-3.5" />
              <span>Official SA Hip-Hop &amp; SA R&amp;B Visual Media &amp; Premieres</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 uppercase font-['Plus_Jakarta_Sans']">
              Featured Videos
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500 hidden sm:inline-block">
              Swipe or use controls to browse 4K premieres
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`p-3 rounded-xs border transition-all ${
                  canScrollLeft
                    ? 'bg-white text-zinc-900 border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400 shadow-sm active:scale-90 cursor-pointer'
                    : 'bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed opacity-50'
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`p-3 rounded-xs border transition-all ${
                  canScrollRight
                    ? 'bg-white text-zinc-900 border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400 shadow-sm active:scale-90 cursor-pointer'
                    : 'bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed opacity-50'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel with Fluid Touch & Mouse Scrolling */}
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-6 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {FEATURED_VIDEOS.map((video) => {
            const hasError = imageErrors[video.id];

            return (
              <div
                key={video.id}
                onClick={() => onPlayVideo(video)}
                className="group relative flex-none w-[320px] sm:w-[380px] lg:w-[420px] bg-white rounded-xs shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer snap-start border border-zinc-200/90 hover:-translate-y-1.5"
              >
                {/* 16:9 Thumbnail Container */}
                <div className="relative aspect-video w-full bg-zinc-950 overflow-hidden">
                  {!hasError ? (
                    <img
                      src={video.thumbnail}
                      alt={`${video.title} by ${video.artist}`}
                      onError={() => handleImageError(video.id)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600 font-bold text-sm uppercase">
                      {video.title}
                    </div>
                  )}

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/50 transition-colors duration-300" />

                  {/* VEVO Badge (Official South Africa Stamp) */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className="px-2 py-0.5 bg-black/85 backdrop-blur-xs text-white font-black text-[10px] tracking-widest uppercase border border-white/20 rounded-xs flex items-center gap-1 shadow-md">
                      <span className="text-rose-500 font-extrabold">VEVO</span>
                      <span className="text-zinc-300 text-[9px] font-medium">SA</span>
                    </div>
                  </div>

                  {/* Duration Badge Bottom Right */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <div className="px-2 py-0.5 bg-black/80 text-white font-mono text-[11px] rounded-xs font-semibold backdrop-blur-xs">
                      {video.duration}
                    </div>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-14 h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-115 group-hover:bg-rose-600 transition-all duration-300">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Red Title & Artist Bar (Prompt Requirement) */}
                <div className="bg-gradient-to-r from-rose-600 via-rose-600 to-red-600 text-white px-4 py-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider shadow-inner">
                  <span className="truncate max-w-[240px]">{video.artist}</span>
                  <span className="text-rose-100 font-mono text-[10px] font-semibold lowercase tracking-normal">
                    {video.genre}
                  </span>
                </div>

                {/* Card Body Details */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg text-zinc-950 group-hover:text-rose-600 transition-colors line-clamp-1 leading-snug">
                    {video.title}
                  </h3>

                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>

                  {/* Card Metadata Footer (Unboxed Clean Text) */}
                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="tabular-nums font-mono">{video.views}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => handleAudioPreview(e, video)}
                        className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold hover:underline"
                        title="Listen to track stems"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <div className="flex items-center gap-1 text-zinc-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{video.releaseDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Video Streaming Distribution Banner */}
        <div className="mt-8 p-6 bg-white border border-zinc-200/90 rounded-xs flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm shrink-0">
              <Sparkles className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 text-sm">
                Dreamwork SA Hip-Hop &amp; R&amp;B Visual Network
              </h4>
              <p className="text-xs text-zinc-500">
                Broadcast 4K &amp; Dolby Vision music video distribution across Channel O, Trace Urban, VEVO South Africa, and YouTube.
              </p>
            </div>
          </div>

          <button
            onClick={() => onPlayVideo(FEATURED_VIDEOS[0])}
            className="px-6 py-3 bg-zinc-950 hover:bg-zinc-800 active:bg-zinc-900 text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-all whitespace-nowrap shrink-0 shadow-md active:scale-95 cursor-pointer"
          >
            Launch Video Theater
          </button>
        </div>
      </div>
    </section>
  );
};
