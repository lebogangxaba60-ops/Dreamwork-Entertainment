import React, { useState } from 'react';
import { SUB_LABELS, SubLabel } from '../data/labelData';
import { Disc3, ArrowUpRight, Radio, Layers, Sparkles, CheckCircle2, X } from 'lucide-react';

interface LabelsBannerProps {
  onSelectSubLabel: (label: SubLabel) => void;
}

export const LabelsBanner: React.FC<LabelsBannerProps> = ({ onSelectSubLabel }) => {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [selectedImprint, setSelectedImprint] = useState<SubLabel | null>(null);

  // Custom SVG icon generator for authentic monochrome record label marks
  const renderLabelLogo = (labelId: string, name: string) => {
    switch (labelId) {
      case 'jozi-streets-records':
        return (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black text-xs transform -rotate-3 shadow-md">
              JZI
            </div>
            <div className="text-left">
              <div className="font-black text-sm tracking-tight uppercase text-white">JOZI</div>
              <div className="text-[10px] tracking-widest text-zinc-400 uppercase">STREETS RECORDS</div>
            </div>
          </div>
        );
      case 'aura-rnb-sa':
        return (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border border-white/90 rounded-full flex items-center justify-center text-xs font-bold text-rose-400">
              ARA
            </div>
            <div className="text-left">
              <div className="font-extrabold text-sm tracking-wider uppercase text-white">AURA</div>
              <div className="text-[10px] tracking-widest text-zinc-400 uppercase">R&amp;B SOUTH AFRICA</div>
            </div>
          </div>
        );
      case 'braam-sound-co':
        return (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border-2 border-white flex items-center justify-center font-mono font-bold text-xs">
              BSC
            </div>
            <div className="text-left">
              <div className="font-black text-sm tracking-wider uppercase text-white">BRAAM</div>
              <div className="text-[10px] tracking-widest text-zinc-400 uppercase">SOUND CO.</div>
            </div>
          </div>
        );
      case 'velvet-coast':
        return (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border border-dashed border-rose-500 rounded-full flex items-center justify-center text-xs font-semibold text-rose-300">
              VC
            </div>
            <div className="text-left">
              <div className="font-bold text-sm tracking-wider uppercase text-white">VELVET</div>
              <div className="text-[10px] tracking-widest text-zinc-400 uppercase">COAST R&amp;B</div>
            </div>
          </div>
        );
      case 'durban-drill-syndicate':
        return (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-rose-600 text-white flex items-center justify-center font-black text-xs tracking-tighter shadow-md">
              DDS
            </div>
            <div className="text-left">
              <div className="font-black text-sm tracking-wider uppercase text-white">DURBAN</div>
              <div className="text-[10px] tracking-widest text-zinc-400 uppercase">DRILL SYNDICATE</div>
            </div>
          </div>
        );
      case 'midnight-echo-labs':
        return (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border border-white flex items-center justify-center text-xs">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-bold text-sm tracking-wider uppercase text-white">MIDNIGHT</div>
              <div className="text-[10px] tracking-widest text-zinc-400 uppercase">ECHO TRAP-SOUL</div>
            </div>
          </div>
        );
      default:
        return (
          <div className="font-bold text-sm tracking-widest uppercase text-white">
            {name}
          </div>
        );
    }
  };

  const handleCardClick = (label: SubLabel) => {
    setSelectedImprint(label);
    onSelectSubLabel(label);
  };

  return (
    <>
      <section
        id="labels"
        aria-label="South African Record Label Imprints"
        className="bg-[#0A0A0E] border-y border-white/10 py-18 text-white relative overflow-hidden"
      >
        {/* Subtle Luxury Gradient Background Wash */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-5 border-b border-white/10 gap-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-rose-500 font-bold mb-1.5 flex items-center gap-2">
                <Disc3 className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Johannesburg Record Label Family</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-white font-['Plus_Jakarta_Sans']">
                Labels
              </h2>
            </div>
            <p className="text-sm text-zinc-400 max-w-lg leading-relaxed">
              Our premier South African label imprints are dedicated exclusively to advancing the lyrical mastery, trap innovation, and velvet soul of SA Hip-Hop and SA R&amp;B.
            </p>
          </div>

          {/* Monochrome Logos Grid with Smooth Hover Lift */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SUB_LABELS.map((label) => {
              const isHovered = activeHoverId === label.id;

              return (
                <div
                  key={label.id}
                  onMouseEnter={() => setActiveHoverId(label.id)}
                  onMouseLeave={() => setActiveHoverId(null)}
                  onClick={() => handleCardClick(label)}
                  className={`group relative p-6 bg-zinc-950/80 border border-white/10 hover:border-rose-500/50 transition-all duration-300 rounded-xs flex flex-col justify-between cursor-pointer min-h-[185px] active:scale-95 ${
                    isHovered ? 'bg-zinc-900 shadow-2xl shadow-black -translate-y-1.5' : ''
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(label);
                    }
                  }}
                  aria-label={`View ${label.name} imprint details`}
                >
                  {/* Monochrome Logo Element */}
                  <div className="transition-transform duration-300 group-hover:scale-105">
                    {renderLabelLogo(label.id, label.name)}
                  </div>

                  {/* Footer Info on Card */}
                  <div className="pt-6 border-t border-white/5 mt-auto flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-mono text-[11px] text-zinc-400 font-medium">
                      {label.genreFocus.split('/')[0]}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-rose-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  {/* Hover Popover Synopsis */}
                  {isHovered && (
                    <div className="absolute left-0 right-0 -bottom-16 z-30 bg-zinc-900 border border-rose-500/30 p-3 shadow-2xl text-[11px] text-zinc-300 rounded-xs hidden lg:block pointer-events-none animate-fade-in">
                      <p className="line-clamp-2 leading-relaxed">{label.tagline}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sub-label Metrics strip */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 text-xs text-zinc-400">
            <div className="flex items-center gap-3">
              <Disc3 className="w-4 h-4 text-rose-500" />
              <span>Over 100+ SA Hip-Hop &amp; SA R&amp;B catalog releases</span>
            </div>
            <div className="flex items-center gap-3">
              <Radio className="w-4 h-4 text-zinc-400" />
              <span>Direct DSP support: Apple Music SA Hip-Hop, Spotify Mzansi R&amp;B</span>
            </div>
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-zinc-400" />
              <span>6 Dedicated Rap &amp; R&amp;B Imprints</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sub-Label Luxury Imprint Dossier Modal */}
      {selectedImprint && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedImprint(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0D0D12] text-white border border-rose-500/30 rounded-xs shadow-2xl p-6 sm:p-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImprint(null)}
              className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
              aria-label="Close imprint modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-white/10 pb-5 mb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-rose-500 font-bold">
                Official Label Imprint Profile
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mt-1">
                {selectedImprint.name}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Founded {selectedImprint.founded} · Rosebank Headquarters, Johannesburg
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                  Mission &amp; Sound Identity
                </span>
                <p className="text-sm text-zinc-200 mt-1 leading-relaxed">
                  {selectedImprint.tagline}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    Genre Specialty
                  </span>
                  <div className="text-sm font-bold text-white mt-1">
                    {selectedImprint.genreFocus}
                  </div>
                </div>

                <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    Active Catalog
                  </span>
                  <div className="text-sm font-bold text-white mt-1">
                    {selectedImprint.artistCount} Signed Artists &amp; Producers
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>RiSA Certified &amp; SAMRO Registered Imprint</span>
                </div>

                <button
                  onClick={() => setSelectedImprint(null)}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
