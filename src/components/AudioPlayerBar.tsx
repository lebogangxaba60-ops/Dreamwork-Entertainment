import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, Radio, Disc, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';

export interface PlayingTrack {
  id: string;
  title: string;
  artist: string;
  subLabel: string;
  genre: 'SA Hip-Hop' | 'SA R&B' | 'SA Trap-Soul';
  thumbnail: string;
}

interface AudioPlayerBarProps {
  currentTrack: PlayingTrack | null;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ currentTrack, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentTrack) {
      soundEngine.playTrack(currentTrack.id, currentTrack.genre);
      setIsPlaying(true);
      setProgress(0);
    }
  }, [currentTrack]);

  useEffect(() => {
    soundEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.4));
    }, 400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!currentTrack) return null;

  const togglePlay = () => {
    if (isPlaying) {
      soundEngine.pause();
      setIsPlaying(false);
    } else {
      soundEngine.playTrack(currentTrack.id, currentTrack.genre);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      soundEngine.setVolume(volume || 0.7);
      setIsMuted(false);
    } else {
      soundEngine.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <aside
      aria-label="Audio player preview bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#09090C]/95 backdrop-blur-2xl border-t border-rose-500/20 shadow-[0_-10px_35px_rgba(0,0,0,0.8)] px-4 sm:px-8 py-3 transition-all animate-slide-up"
    >
      {/* Subtle Luxury Gold/Crimson Ambient Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Track Artwork & Artist Identity */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative w-12 h-12 rounded-xs overflow-hidden bg-zinc-900 border border-white/10 shrink-0 shadow-md">
            <img
              src={currentTrack.thumbnail}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Disc className="w-6 h-6 text-rose-500 animate-spin" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-bold">
                {currentTrack.genre}
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[9px] font-mono text-zinc-400 bg-white/5 px-1.5 py-0.2 rounded-xs border border-white/10">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                <span>RiSA Platinum Stems</span>
              </span>
            </div>

            <h4 className="text-sm font-bold text-white truncate leading-tight">
              {currentTrack.title}
            </h4>

            <p className="text-xs text-zinc-400 truncate">
              {currentTrack.artist} · <span className="text-zinc-500">{currentTrack.subLabel}</span>
            </p>
          </div>
        </div>

        {/* Playback Controls & Progress Scrubber */}
        <div className="flex flex-col items-center gap-1.5 flex-1 max-w-lg px-2">
          <div className="flex items-center gap-5">
            {/* Live Audio Visualizer Animation */}
            <div className="flex items-end gap-0.5 h-4 w-12 justify-center">
              {[40, 90, 60, 100, 75, 45].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isPlaying ? 'bg-rose-500' : 'bg-zinc-700 h-1'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(15, (h * Math.sin((progress + i * 20) / 10) + 100) / 2)}%` : '4px',
                  }}
                />
              ))}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-950/60 transition-transform active:scale-95"
              aria-label={isPlaying ? 'Pause track' : 'Play track'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            <span className="text-[11px] font-mono text-zinc-400 tabular-nums hidden sm:inline">
              0:{(progress * 0.038).toFixed(0).padStart(2, '0')} / 3:45
            </span>
          </div>

          {/* Scrubber Line */}
          <div
            className="w-full h-1 bg-zinc-800 hover:h-2 rounded-full cursor-pointer relative transition-all"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress(Math.min(Math.max((clickX / rect.width) * 100, 0), 100));
            }}
          >
            <div
              className="h-full bg-rose-500 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </div>

        {/* Volume & Close */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 accent-rose-500 cursor-pointer h-1 bg-zinc-700 rounded-lg"
              aria-label="Volume slider"
            />
          </div>

          <button
            onClick={() => {
              soundEngine.stop();
              onClose();
            }}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
            aria-label="Close audio player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
