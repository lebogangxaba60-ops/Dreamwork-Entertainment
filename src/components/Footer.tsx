import React, { useState } from 'react';
import { Mail, Check, ArrowRight, ShieldCheck, Globe, Sparkles, Lock, Disc3 } from 'lucide-react';

interface FooterProps {
  onOpenDrawer: (drawer: 'about' | 'careers' | 'faq' | 'for-artists' | 'inquiries') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDrawer, onNavigateSection }) => {
  const [email, setEmail] = useState('');
  const [selectedPreference, setSelectedPreference] = useState<'both' | 'hiphop' | 'rnb'>('both');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3500);
    }, 600);
  };

  return (
    <footer aria-label="Corporate Footer" className="bg-[#070709] text-zinc-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Discreet, Luxurious Newsletter Signup Section */}
        <div className="pb-14 mb-14 border-b border-white/10">
          <div className="bg-gradient-to-r from-zinc-950 via-[#0D0D12] to-zinc-950 border border-white/10 hover:border-rose-500/30 transition-all duration-500 p-8 sm:p-10 rounded-xs relative overflow-hidden shadow-2xl">
            {/* Subtle atmospheric sheen */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Quiet Luxury Statement */}
              <div className="lg:col-span-7 space-y-2.5">
                <div className="flex items-center gap-2 text-rose-500 font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                  <span>The Private Register · Fan Edition</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-['Plus_Jakarta_Sans']">
                  Private Access &amp; Intimate Listening Sessions
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
                  Receive private vinyl drop notifications, unreleased SA Hip-Hop &amp; SA R&amp;B studio stems, and secret listening room invitations in Rosebank and Cape Town. Reserved for dedicated connoisseurs.
                </p>

                {/* Subtle Genre Focus Selector */}
                <div className="flex items-center gap-2 pt-1 text-xs">
                  <span className="text-zinc-500 text-[11px] font-mono uppercase tracking-wider">Curate:</span>
                  <button
                    type="button"
                    onClick={() => setSelectedPreference('both')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-xs transition-colors cursor-pointer ${
                      selectedPreference === 'both'
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    All SA Rap &amp; R&amp;B
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPreference('hiphop')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-xs transition-colors cursor-pointer ${
                      selectedPreference === 'hiphop'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    SA Hip-Hop Only
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPreference('rnb')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-xs transition-colors cursor-pointer ${
                      selectedPreference === 'rnb'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    SA R&amp;B Only
                  </button>
                </div>
              </div>

              {/* Right Column: Minimalist Elegant Email Capture */}
              <div className="lg:col-span-5">
                {subscribed ? (
                  <div className="p-5 bg-zinc-900/90 border border-rose-500/30 rounded-xs flex items-center gap-3.5 text-zinc-200 animate-fade-in shadow-xl">
                    <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/40">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Guestlist Confirmed</div>
                      <p className="text-xs text-zinc-400">
                        You will receive private listening invitations and early vinyl allocations.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2.5">
                    <div className="relative flex items-center">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your personal email address..."
                        className="w-full bg-black/60 border border-white/15 focus:border-rose-500 text-white text-xs sm:text-sm px-4 py-3.5 pr-28 rounded-xs placeholder-zinc-500 focus:outline-none transition-colors shadow-inner"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="absolute right-1.5 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-bold text-[11px] uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 shadow-md shadow-rose-950/50 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Enrolling...</span>
                        ) : (
                          <>
                            <span>Join</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Lock className="w-3 h-3 text-zinc-400" />
                        <span>Confidential. Unsubscribe anytime.</span>
                      </span>
                      <span className="font-mono text-zinc-400">VIP Ticket Presales</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-0.5 border border-rose-500/40 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="18" y="16" width="6.5" height="32" rx="3" fill="#E11D48" />
                  <path d="M22 16 H36 C44.5 16 50 21.5 50 32 C50 42.5 44.5 48 36 48 H22 Z" stroke="#E11D48" strokeWidth="6.5" strokeLinejoin="round" />
                  <circle cx="32" cy="32" r="3.5" fill="#FFFFFF" />
                </svg>
              </div>
              <span className="font-bold text-base tracking-tight uppercase text-white">
                Dreamwork Entertainment <span className="text-rose-500 font-extrabold text-xs ml-1 font-mono">SA</span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              South Africa&apos;s premier entertainment conglomerate and record label group. Exclusively dedicated to championing SA Hip-Hop lyrical pioneers and contemporary SA R&amp;B soul vocalists across Mzansi and the global diaspora.
            </p>

            <div className="flex items-center gap-2 text-xs text-zinc-400 pt-2 font-medium">
              <Globe className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>154 Oxford Road, Rosebank, Johannesburg 2196</span>
            </div>
          </div>

          {/* Label Group Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Spotlight Artists
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('labels')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Label Imprints
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('videos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Featured Visuals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('news')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Press &amp; Releases
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDrawer('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Corporate Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Industry Portals */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Portals &amp; Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenDrawer('for-artists')}
                  className="text-rose-400 hover:text-rose-300 font-medium transition-colors cursor-pointer"
                >
                  For Artists: Demo Submissions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDrawer('inquiries')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sync &amp; Master Licensing (SAMRO)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDrawer('careers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Careers: A&amp;R &amp; Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDrawer('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ &amp; Copyright Governance
                </button>
              </li>
            </ul>
          </div>

          {/* Regulatory Standards & Studio Facilities */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Studio &amp; Governance
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Disc3 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Rosebank Dolby Atmos Tracking Suites</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>RiSA (Recording Industry of SA) Member</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>SAMRO, SAMPRA &amp; CAPASSO Compliant</span>
              </div>
              <div className="pt-2 text-[11px] text-zinc-500 font-mono">
                Reg. No. 2026/048192/07 (Pty) Ltd
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Trust Marks */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Dreamwork Entertainment South Africa (Pty) Ltd.</span>
            <span>All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span>VEVO SA certified partner.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenDrawer('faq')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenDrawer('faq')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenDrawer('inquiries')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Sync Clearance
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
