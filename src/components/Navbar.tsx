import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Volume2 } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';

interface NavbarProps {
  onOpenDrawer: (drawer: 'about' | 'careers' | 'faq' | 'for-artists' | 'inquiries') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDrawer, onNavigateSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    soundEngine.subscribe((playing) => {
      setIsAudioPlaying(playing);
    });
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070709]/92 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#070709]/95 via-[#070709]/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Logo Tab & Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('hero');
            }}
            className="flex items-center gap-3.5 text-white tracking-wider whitespace-nowrap shrink-0 group focus:outline-none cursor-pointer py-1 px-2 -ml-2 rounded-xs hover:bg-white/5 transition-all"
            aria-label="Dreamwork Entertainment South Africa - Official Logo Tab"
            title="Dreamwork Entertainment SA - Home"
          >
            {/* Custom Luxury Logo Tab Emblem */}
            <div className="relative w-9 h-9 rounded-sm bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-0.5 border border-rose-500/40 group-hover:border-rose-400 group-hover:shadow-[0_0_15px_rgba(225,29,72,0.35)] transition-all flex items-center justify-center shrink-0">
              <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="navDeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FB7185" />
                    <stop offset="50%" stopColor="#E11D48" />
                    <stop offset="100%" stopColor="#BE123C" />
                  </linearGradient>
                </defs>
                <rect x="18" y="16" width="6.5" height="32" rx="3" fill="url(#navDeGrad)" />
                <path d="M22 16 H36 C44.5 16 50 21.5 50 32 C50 42.5 44.5 48 36 48 H22 Z" stroke="url(#navDeGrad)" strokeWidth="6.5" strokeLinejoin="round" />
                <circle cx="32" cy="32" r="3.5" fill="#FFFFFF" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight uppercase text-zinc-100 group-hover:text-rose-400 transition-colors flex items-center leading-none">
                Dreamwork <span className="font-light ml-1 text-white">Entertainment</span>
                <span className="text-rose-500 font-mono font-extrabold text-[10px] ml-1.5 tracking-widest bg-rose-500/10 px-1.5 py-0.5 rounded-xs border border-rose-500/30">
                  SA
                </span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 font-mono mt-0.5">
                SA Hip-Hop &amp; R&amp;B Imprint
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 Navigation Links (Clean single-line prose) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <button
              onClick={() => onOpenDrawer('about')}
              className="hover:text-white transition-colors relative py-1 whitespace-nowrap shrink-0 hover:underline decoration-rose-500 underline-offset-8 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onNavigateSection('news')}
              className="hover:text-white transition-colors relative py-1 whitespace-nowrap shrink-0 hover:underline decoration-rose-500 underline-offset-8 cursor-pointer"
            >
              News
            </button>
            <button
              onClick={() => onOpenDrawer('careers')}
              className="hover:text-white transition-colors relative py-1 whitespace-nowrap shrink-0 hover:underline decoration-rose-500 underline-offset-8 cursor-pointer"
            >
              Careers
            </button>
            <button
              onClick={() => onOpenDrawer('faq')}
              className="hover:text-white transition-colors relative py-1 whitespace-nowrap shrink-0 hover:underline decoration-rose-500 underline-offset-8 cursor-pointer"
            >
              FAQ
            </button>
            <button
              onClick={() => onOpenDrawer('for-artists')}
              className="text-rose-400 font-semibold hover:text-rose-300 transition-colors relative py-1 whitespace-nowrap shrink-0 hover:underline decoration-rose-400 underline-offset-8 flex items-center gap-1 cursor-pointer"
            >
              <span>For Artists</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action + Live Equalizer + Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {isAudioPlaying && (
              <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 bg-rose-500/10 border border-rose-500/30 rounded-xs text-[10px] text-rose-400 font-mono">
                <Volume2 className="w-3 h-3 text-rose-500" />
                <span className="uppercase tracking-wider">Master Playing</span>
              </div>
            )}

            <button
              onClick={() => onOpenDrawer('inquiries')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 rounded-sm transition-all shadow-md shadow-rose-900/30 whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
            >
              Contact Jozi HQ
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0A0A0C]/98 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col justify-between pb-10">
          <div className="flex flex-col space-y-6 text-lg font-medium text-zinc-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDrawer('about');
              }}
              className="text-left py-2 border-b border-zinc-800 hover:text-rose-400 transition-colors"
            >
              About Dreamwork
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSection('news');
              }}
              className="text-left py-2 border-b border-zinc-800 hover:text-rose-400 transition-colors"
            >
              Latest News
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDrawer('careers');
              }}
              className="text-left py-2 border-b border-zinc-800 hover:text-rose-400 transition-colors"
            >
              Careers & Opportunities
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDrawer('faq');
              }}
              className="text-left py-2 border-b border-zinc-800 hover:text-rose-400 transition-colors"
            >
              FAQ & Submission Policy
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDrawer('for-artists');
              }}
              className="text-left py-2 border-b border-zinc-800 text-rose-400 font-semibold flex items-center justify-between"
            >
              <span>For Artists & Demo Drop</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>

          <div className="pt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDrawer('inquiries');
              }}
              className="w-full py-3 text-center text-sm font-semibold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-sm"
            >
              Have a Question? Inquire Now
            </button>
            <p className="text-xs text-zinc-500 text-center mt-4">
              © {new Date().getFullYear()} Dreamwork Entertainment Inc. All rights reserved.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
