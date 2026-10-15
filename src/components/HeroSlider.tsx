import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Volume2, Pause, Sparkles, Award } from 'lucide-react';
import { HERO_ARTISTS, HeroArtist } from '../data/labelData';
import { PlayingTrack } from './AudioPlayerBar';

interface HeroSliderProps {
  onSelectArtist: (artist: HeroArtist) => void;
  onExploreVideos: () => void;
  onPlayTrack: (track: PlayingTrack) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onSelectArtist,
  onExploreVideos,
  onPlayTrack,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Touch Swipe Gesture State
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_ARTISTS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_ARTISTS.length) % HERO_ARTISTS.length);
  }, []);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Auto advance
  useEffect(() => {
    if (!isPlayingAuto) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isPlayingAuto, nextSlide]);

  const activeArtist = HERO_ARTISTS[currentIndex];

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Touch handlers for mobile swipe responsiveness
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide(); // Swiped left -> next
    if (diff < -50) prevSlide(); // Swiped right -> prev
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleListenPreview = () => {
    const genre = activeArtist.genre.includes('Hip-Hop')
      ? 'SA Hip-Hop'
      : activeArtist.genre.includes('Trap-Soul')
      ? 'SA Trap-Soul'
      : 'SA R&B';

    onPlayTrack({
      id: activeArtist.id,
      title: activeArtist.latestRelease,
      artist: activeArtist.name,
      subLabel: activeArtist.subLabel,
      genre: genre as 'SA Hip-Hop' | 'SA R&B' | 'SA Trap-Soul',
      thumbnail: activeArtist.image,
    });
  };

  return (
    <section
      id="hero"
      aria-label="Spotlight Artists Hero Showcase"
      className="relative w-full min-h-[95vh] lg:min-h-screen bg-[#070709] text-white flex flex-col justify-end overflow-hidden pt-20 select-none"
      onMouseEnter={() => setIsPlayingAuto(false)}
      onMouseLeave={() => setIsPlayingAuto(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background High-Resolution Artist Slides */}
      <div className="absolute inset-0 z-0">
        {HERO_ARTISTS.map((artist, idx) => {
          const isActive = idx === currentIndex;
          const hasError = imageErrors[artist.id];

          return (
            <div
              key={artist.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {!hasError ? (
                <img
                  src={artist.image}
                  alt={artist.name}
                  onError={() => handleImageError(artist.id)}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-center lg:object-top transition-transform duration-7000 ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex items-center justify-center">
                  <span className="text-zinc-600 font-bold text-4xl uppercase tracking-widest">
                    {artist.name}
                  </span>
                </div>
              )}

              {/* Realistic Film Scrims & Luxury Vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/70 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/95 via-[#070709]/50 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#070709]/90 to-transparent" />
            </div>
          );
        })}
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 pb-16 pt-28 w-full">
        {/* Luxury Trust Stamp Top Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-xs border border-white/15 text-[11px] font-mono tracking-widest uppercase text-zinc-200">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Johannesburg Flagship Roster</span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">·</span>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase text-zinc-400">
            <Sparkles className="w-3 h-3 text-rose-500" />
            <span>Dolby Atmos Master Suite</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Main Artist Spotlight Column */}
          <div className="lg:col-span-8 space-y-4">
            {/* Subtle Unboxed Metadata with Typographic Separator */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs tracking-wider uppercase text-zinc-400 font-medium">
              <span className="text-rose-400 font-bold tracking-widest">{activeArtist.subLabel}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300">{activeArtist.genre}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-amber-400 font-mono tabular-nums">{activeArtist.streams}</span>
            </div>

            {/* Prominent Artist Name with Luxury Display Font */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-none text-balance font-['Plus_Jakarta_Sans']">
              {activeArtist.name}
            </h1>

            {/* Tagline / Stage Title */}
            <p className="text-lg sm:text-xl font-light text-zinc-300 max-w-2xl leading-relaxed">
              {activeArtist.tagphrase}
            </p>

            {/* Release Callout Bar with Luxury Framing */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 text-[11px] font-black uppercase tracking-widest bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-xs shadow-md shadow-rose-950/40">
                {activeArtist.releaseType}
              </span>
              <span className="text-sm font-semibold text-zinc-200">
                {activeArtist.latestRelease}
              </span>
            </div>

            {/* Ultra-Responsive Action Buttons */}
            <div className="pt-5 flex flex-wrap items-center gap-3.5">
              <button
                onClick={handleListenPreview}
                className="px-6 py-3.5 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all rounded-xs flex items-center gap-2.5 shadow-xl shadow-rose-950/50 hover:shadow-rose-900/60 active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-white" />
                <span>Play Track Preview</span>
              </button>

              <button
                onClick={() => onSelectArtist(activeArtist)}
                className="px-6 py-3.5 bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 active:bg-zinc-300 transition-all rounded-xs flex items-center gap-2 shadow-xl shadow-black/40 active:scale-95 cursor-pointer"
              >
                <span>Artist Biography &amp; Credits</span>
              </button>

              <button
                onClick={onExploreVideos}
                className="px-5 py-3.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs uppercase tracking-wider border border-white/15 transition-all rounded-xs flex items-center gap-2 backdrop-blur-sm active:scale-95 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current text-rose-500" />
                <span>Watch Visuals</span>
              </button>
            </div>
          </div>

          {/* Carousel Controls & Slide Ticker */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between space-y-6">
            {/* Slide Index & Auto-play Toggle */}
            <div className="flex items-center gap-4 text-xs font-mono tabular-nums text-zinc-400 bg-black/40 px-3.5 py-1.5 rounded-xs border border-white/10 backdrop-blur-md">
              <span className="text-white text-sm font-bold">
                0{currentIndex + 1}
              </span>
              <span className="text-zinc-600">/</span>
              <span>0{HERO_ARTISTS.length}</span>

              <button
                onClick={() => setIsPlayingAuto(!isPlayingAuto)}
                className="ml-2 p-1 rounded-xs hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                title={isPlayingAuto ? 'Pause slider' : 'Resume auto-play'}
                aria-label={isPlayingAuto ? 'Pause slider' : 'Resume auto-play'}
              >
                {isPlayingAuto ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
              </button>
            </div>

            {/* Navigation Arrows with Hover/Active Scale */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={prevSlide}
                className="p-3.5 bg-zinc-950/80 hover:bg-rose-600 text-zinc-300 hover:text-white border border-white/15 hover:border-rose-500 rounded-xs transition-all shadow-xl active:scale-90 cursor-pointer"
                aria-label="Previous artist"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3.5 bg-zinc-950/80 hover:bg-rose-600 text-zinc-300 hover:text-white border border-white/15 hover:border-rose-500 rounded-xs transition-all shadow-xl active:scale-90 cursor-pointer"
                aria-label="Next artist"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Progress Mini-Strip with Active Animations */}
            <div className="w-full max-w-xs flex gap-2 pt-2">
              {HERO_ARTISTS.map((artist, idx) => (
                <button
                  key={artist.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'bg-rose-500 scale-y-125 shadow-md shadow-rose-500/50'
                      : 'bg-zinc-800 hover:bg-zinc-600'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${artist.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
