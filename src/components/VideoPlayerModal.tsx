import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Share2, Check, ExternalLink } from 'lucide-react';
import { FeaturedVideo } from '../data/labelData';
import { soundEngine } from '../utils/audioEngine';

interface VideoPlayerModalProps {
  video: FeaturedVideo | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(15);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!video) return;
    setIsPlaying(true);
    setProgress(12);
    soundEngine.playTrack(video.id, video.genre);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.stop();
        onClose();
      }
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((p) => {
          if (!p) {
            soundEngine.playTrack(video.id, video.genre);
          } else {
            soundEngine.pause();
          }
          return !p;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      soundEngine.stop();
    };
  }, [video, onClose]);

  // Simulated playback timer
  useEffect(() => {
    if (!isPlaying || !video) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying, video]);

  if (!video) return null;

  const handleTogglePlay = () => {
    if (isPlaying) {
      soundEngine.pause();
      setIsPlaying(false);
    } else {
      soundEngine.playTrack(video.id, video.genre);
      setIsPlaying(true);
    }
  };

  const handleClose = () => {
    soundEngine.stop();
    onClose();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-5xl bg-[#0F0F13] text-white border border-white/15 rounded-xs shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-950 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-rose-600 text-[10px] font-black uppercase tracking-widest text-white rounded-xs">
              VEVO
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Dreamwork Video Premiere
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Share video"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>
            <button
              onClick={handleClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xs transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Screen Area */}
        <div className="relative aspect-video w-full bg-black overflow-hidden group">
          <img
            src={video.thumbnail}
            alt={video.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              if (video.fallbackThumbnail && e.currentTarget.src !== video.fallbackThumbnail && !e.currentTarget.src.endsWith(video.fallbackThumbnail)) {
                e.currentTarget.src = video.fallbackThumbnail;
              }
            }}
            className="w-full h-full object-cover"
          />

          {/* Cinematic Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

          {/* VEVO Watermark Top Right */}
          <div className="absolute top-4 right-4 z-20 pointer-events-none opacity-80 flex items-center gap-1 text-[11px] font-black tracking-widest uppercase bg-black/60 px-2.5 py-1 rounded-xs">
            <span className="text-rose-500 font-extrabold">VEVO</span>
            <span className="text-zinc-300">SA CERTIFIED</span>
          </div>

          {/* Audio Visualizer Waves Indicator */}
          {isPlaying && (
            <div className="absolute top-4 left-4 z-20 flex items-end gap-1 h-5 pointer-events-none bg-black/60 px-2 py-1 rounded-xs">
              <span className="w-1 bg-rose-500 animate-pulse h-4" />
              <span className="w-1 bg-rose-400 animate-pulse h-2.5 delay-75" />
              <span className="w-1 bg-rose-600 animate-pulse h-5 delay-150" />
              <span className="w-1 bg-rose-300 animate-pulse h-3 delay-100" />
              <span className="text-[10px] font-mono text-zinc-300 ml-1.5 font-bold">48kHz HQ STEMS</span>
            </div>
          )}

          {/* Big Center Play/Pause Overlay */}
          <button
            onClick={handleTogglePlay}
            className="absolute inset-0 flex items-center justify-center cursor-pointer group-hover:opacity-100 transition-opacity"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            <div className="w-20 h-20 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white flex items-center justify-center shadow-2xl transition-transform transform active:scale-90">
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-current" />
              ) : (
                <Play className="w-8 h-8 fill-current ml-1" />
              )}
            </div>
          </button>

          {/* Video Timeline & Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2 z-20">
            {/* Scrubber Progress Track */}
            <div
              className="w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full cursor-pointer relative transition-all"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = (clickX / rect.width) * 100;
                setProgress(Math.min(Math.max(newProgress, 0), 100));
              }}
            >
              <div
                className="h-full bg-rose-600 rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md" />
              </div>
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between text-xs text-zinc-300 pt-1">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono tabular-nums text-zinc-400">
                  {Math.floor((progress / 100) * 222)}s / {video.duration}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-1.5 py-0.5 bg-zinc-800 text-[10px] uppercase font-mono font-bold text-zinc-300 rounded-xs">
                  4K UHD
                </span>
                <button
                  onClick={() => alert('Fullscreen cinema mode activated.')}
                  className="hover:text-white transition-colors"
                  aria-label="Toggle Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info & Credits Section */}
        <div className="p-6 bg-zinc-950 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-rose-500 font-bold mb-1">
                <span>{video.artist}</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-zinc-400">{video.genre}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {video.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 font-mono">
                Directed by <strong className="text-zinc-200">{video.director}</strong>
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {video.description}
          </p>

          {/* Streaming Platforms Strip */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span>Stream audio single:</span>
              <a
                href="#stream"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Opening ${video.title} on Spotify & Apple Music.`);
                }}
                className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 rounded-xs text-[11px] font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Spotify</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>
              <a
                href="#apple"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Opening ${video.title} on Apple Music.`);
                }}
                className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 rounded-xs text-[11px] font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Apple Music</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>
              <a
                href="#tidal"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Opening ${video.title} on TIDAL HiFi.`);
                }}
                className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 rounded-xs text-[11px] font-semibold flex items-center gap-1 transition-colors"
              >
                <span>TIDAL</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>
            </div>

            <span className="text-[11px] font-mono text-zinc-500">
              VEVO ISRC: US-DWR-26-00492
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
