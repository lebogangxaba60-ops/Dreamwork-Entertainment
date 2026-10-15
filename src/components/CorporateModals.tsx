import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Upload,
  Briefcase,
  ChevronDown,
  Building2,
  FileText,
  Mail,
  Send,
  Music,
  ExternalLink,
  Volume2,
} from 'lucide-react';
import {
  FAQ_ITEMS,
  CAREER_ITEMS,
  HeroArtist,
  NewsArticle,
  SubLabel,
} from '../data/labelData';

// ----------------------------------------------------
// 1. INQUIRIES DRAWER / MODAL
// ----------------------------------------------------
interface InquiriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiriesModal: React.FC<InquiriesModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    department: 'Press & Media Relations',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      department: 'Press & Media Relations',
      subject: '',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-2xl bg-[#0F0F13] text-white border border-white/15 rounded-xs shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
          aria-label="Close inquiries modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-rose-600/20 text-rose-500 rounded-full flex items-center justify-center mx-auto border border-rose-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Inquiry Dispatched to {formData.department}
            </h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Thank you for contacting Dreamwork Entertainment. Your reference ticket is{' '}
              <span className="font-mono text-rose-400 font-semibold">
                DWE-{(Math.random() * 90000 + 10000).toFixed(0)}
              </span>
              . An executive representative will respond to{' '}
              <strong className="text-zinc-200">{formData.email}</strong> within 24 business hours.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors"
              >
                Close & Return to Portal
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="border-b border-white/10 pb-4 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-rose-500">
                Corporate Communications
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase mt-1">
                Contact Dreamwork Entertainment
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Direct channel for press inquiries, synchronization licenses, commercial partnerships, and brand queries.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alexandra Chen"
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-rose-500 rounded-xs px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Work Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alexandra@agency.com"
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-rose-500 rounded-xs px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Media outlet, agency, or studio"
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-rose-500 rounded-xs px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Target Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-rose-500 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  >
                    <option value="Press & Media Relations">Press & Media Relations</option>
                    <option value="Sync & Music Licensing">Sync & Music Licensing (Film/TV/Games)</option>
                    <option value="A&R Talent Inquiries">A&R Talent Inquiries</option>
                    <option value="Corporate & Investor Relations">Corporate & Investor Relations</option>
                    <option value="General Administration">General Administration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Summary of inquiry or licensing request"
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-rose-500 rounded-xs px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide complete details including deadlines, broadcast territory, or project scope..."
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-rose-500 rounded-xs px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500">
                  Protected under Dreamwork Enterprise Privacy Policy.
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 shadow-lg shadow-rose-950/40 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Routing Message...</span>
                  ) : (
                    <>
                      <span>Transmit Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 2. FOR ARTISTS (DEMO SUBMISSION) MODAL
// ----------------------------------------------------
interface ForArtistsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForArtistsModal: React.FC<ForArtistsModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl bg-[#0F0F13] text-white border border-white/15 rounded-xs shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
          aria-label="Close artist portal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-rose-600/20 text-rose-500 rounded-full flex items-center justify-center mx-auto border border-rose-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Demo Received by SA Hip-Hop &amp; R&amp;B A&amp;R Scouting
            </h3>
            <p className="text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
              Your audio submission has entered the weekly A&amp;R listening queue for Jozi Streets Records, Aura R&amp;B South Africa, Braamfontein Sound Co., and Velvet Coast. If our scouts see alignment with our SA Hip-Hop and SA R&amp;B release calendar, we will contact you directly.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="border-b border-white/10 pb-4 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-rose-500">
                A&amp;R Talent Portal · SA Hip-Hop &amp; R&amp;B Only
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase mt-1">
                For Artists: Rap &amp; R&amp;B Submissions
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Official digital A&amp;R pipeline for unsigned South African rappers, lyricists, R&amp;B vocalists, and hip-hop producers.
              </p>
            </div>

            {/* Submission Guidelines Note */}
            <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xs mb-6 text-xs text-zinc-300 space-y-1.5">
              <div className="font-semibold text-white flex items-center gap-2">
                <Music className="w-4 h-4 text-rose-500" />
                <span>SA Hip-Hop &amp; SA R&amp;B Submission Criteria:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                <li>Submit unreleased, fully mastered original SA Hip-Hop or SA R&amp;B tracks (WAV/MP3 or private link).</li>
                <li>Vernacular, multilingual (Sesotho, Zulu, Xhosa, Afrikaans, English) and street lyricism are welcomed.</li>
                <li>Uncleared bootleg beats or unlicensed samples will be disqualified by our legal team.</li>
              </ul>
            </div>

            <form onSubmit={handleDemoSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Artist / Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Young Jozi or Zandi Soul"
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-rose-500 rounded-xs px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Primary Genre Focus *
                  </label>
                  <select
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-rose-500 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  >
                    <option value="SA Hip-Hop (Trap / Vernacular / Drill)">SA Hip-Hop (Jozi Streets Records)</option>
                    <option value="Contemporary SA R&B (Neo-Soul / Slow Jams)">Contemporary SA R&amp;B (Aura R&amp;B South Africa)</option>
                    <option value="Conscious SA Hip-Hop (Boom-Bap / Lyricism)">Conscious SA Hip-Hop (Braamfontein Sound Co.)</option>
                    <option value="Alternative SA R&B (Trap-Soul / Downtempo)">Alternative SA R&amp;B (Velvet Coast Imprint)</option>
                    <option value="SA Drill & 808 Trap">SA Drill &amp; 808 Trap (Durban Drill Syndicate)</option>
                    <option value="Experimental R&B & Atmospheric Beats">Experimental R&amp;B (Midnight Echo Labs)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="artist@management.com"
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-rose-500 rounded-xs px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Current City & Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Manchester, UK"
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-rose-500 rounded-xs px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Private Streaming Link (SoundCloud, Spotify, Dropbox, DISCO) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://soundcloud.com/private-link-or-disco-playlist"
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-rose-500 rounded-xs px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>

              {/* Simulated Audio File Picker */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Optional Direct Audio Master (MP3 / WAV up to 50MB)
                </label>
                <div className="border border-dashed border-zinc-700 hover:border-rose-500/80 rounded-xs p-5 bg-zinc-900/50 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
                  <Upload className="w-6 h-6 text-zinc-500 mb-2" />
                  <p className="text-xs text-zinc-300">
                    {selectedFileName ? (
                      <span className="text-rose-400 font-semibold">{selectedFileName}</span>
                    ) : (
                      'Click to attach master track audio file'
                    )}
                  </p>
                  <span className="text-[10px] text-zinc-500 mt-1">
                    Stereo 24-bit 44.1kHz or 48kHz preferred
                  </span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFileName(e.target.files[0].name);
                      }
                    }}
                    className="hidden"
                    id="audio-upload"
                  />
                  <label
                    htmlFor="audio-upload"
                    className="mt-3 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold rounded-xs cursor-pointer"
                  >
                    Select Audio File
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Artist Vision & Discography Overview
                </label>
                <textarea
                  rows={3}
                  placeholder="Summarize your artistic identity, recent achievements, monthly listener trajectory, and live touring experience..."
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-rose-500 rounded-xs px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500">
                  All rights remain 100% property of the submitter.
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 shadow-lg shadow-rose-950/40"
                >
                  <span>Submit to A&R Roster</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 3. CAREERS MODAL
// ----------------------------------------------------
interface CareersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CareersModal: React.FC<CareersModalProps> = ({ isOpen, onClose }) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [appliedJobTitle, setAppliedJobTitle] = useState<string | null>(null);

  if (!isOpen) return null;

  const depts = ['All', 'Artists & Repertoire', 'Global Marketing', 'Business & Legal Affairs', 'Content & Production'];

  const filteredJobs =
    selectedDept === 'All'
      ? CAREER_ITEMS
      : CAREER_ITEMS.filter((j) => j.department === selectedDept);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-4xl bg-[#0F0F13] text-white border border-white/15 rounded-xs shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
          aria-label="Close careers modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-white/10 pb-4 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-rose-500">
            Global Talent Acquisition
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase mt-1">
            Careers at Dreamwork
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Join the visionary team defining the future of music recording, artist development, and entertainment media.
          </p>

          {/* Department Filter */}
          <div className="flex flex-wrap items-center gap-1.5 pt-4">
            {depts.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDept(d)}
                className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors whitespace-nowrap ${
                  selectedDept === d
                    ? 'bg-rose-600 text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {appliedJobTitle ? (
          <div className="py-8 bg-zinc-900 border border-zinc-800 rounded-xs p-6 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Application Successfully Submitted</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Your profile for <strong className="text-rose-400">{appliedJobTitle}</strong> has been transmitted to Dreamwork Talent Operations.
            </p>
            <button
              onClick={() => setAppliedJobTitle(null)}
              className="mt-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold uppercase tracking-wider rounded-xs"
            >
              Back to Job Listings
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-5 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px] text-rose-400 font-semibold uppercase tracking-wider">
                    <span>{job.department}</span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span className="text-zinc-400">{job.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{job.title}</h3>
                  <p className="text-xs text-zinc-400 max-w-xl">{job.description}</p>
                </div>

                <button
                  onClick={() => setAppliedJobTitle(job.title)}
                  className="px-5 py-2.5 bg-zinc-800 hover:bg-rose-600 text-white font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors whitespace-nowrap shrink-0 self-start md:self-center"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 4. FAQ MODAL
// ----------------------------------------------------
interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl bg-[#0F0F13] text-white border border-white/15 rounded-xs shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
          aria-label="Close FAQ modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-white/10 pb-4 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-rose-500">
            Knowledge Base & Policy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Key information regarding artist representation, synchronization, copyright governance, and media inquiries.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpenItem = openId === item.id;
            return (
              <div
                key={item.id}
                className="border border-zinc-800 bg-zinc-900/60 rounded-xs overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenId(isOpenItem ? null : item.id)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-white hover:text-rose-400 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-rose-500 text-xs font-mono">[{item.category}]</span>
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                      isOpenItem ? 'rotate-180 text-rose-500' : ''
                    }`}
                  />
                </button>

                {isOpenItem && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-zinc-300 border-t border-zinc-800/80 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 5. ABOUT MODAL
// ----------------------------------------------------
interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl bg-[#0F0F13] text-white border border-white/15 rounded-xs shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
          aria-label="Close about modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-white/10 pb-4 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-rose-500">
            Corporate Heritage & Vision
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase mt-1">
            About Dreamwork Entertainment SA
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            South Africa&apos;s premier music and visual entertainment enterprise shaping contemporary African soundscapes and global chart phenomena.
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p>
            Dreamwork Entertainment South Africa (Pty) Ltd is home to Mzansi&apos;s most influential recording artists, culture-shifting sub-labels, and world-class visual media. Dedicated exclusively to championing barrier-breaking SA Hip-Hop lyricists, trap pioneers, and velvet-toned contemporary SA R&amp;B vocalists, our Rosebank headquarters nurtures talent with visionary creative freedom and global distribution.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-3 border-y border-zinc-800">
            <div className="p-4 bg-zinc-900/60 rounded-xs text-center">
              <div className="text-2xl font-black text-white font-mono">1998</div>
              <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-1">Est. in Johannesburg</div>
            </div>
            <div className="p-4 bg-zinc-900/60 rounded-xs text-center">
              <div className="text-2xl font-black text-rose-500 font-mono">90+</div>
              <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-1">SA Hip-Hop &amp; R&amp;B Masters</div>
            </div>
            <div className="p-4 bg-zinc-900/60 rounded-xs text-center">
              <div className="text-2xl font-black text-white font-mono">36+</div>
              <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-1">SAHHA &amp; Metro FM Wins</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-base">South African Headquarters & Creative Hubs</h4>
            <p className="text-zinc-400 text-xs">
              Operating world-class recording suites and Dolby Atmos spatial audio mastering studios in:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-semibold text-zinc-200">
              <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xs text-center">
                <div>Rosebank, JHB</div>
                <div className="text-[10px] text-zinc-400 font-normal">National HQ &amp; Studios</div>
              </div>
              <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xs text-center">
                <div>Cape Town</div>
                <div className="text-[10px] text-zinc-400 font-normal">Foreshore R&amp;B Hub</div>
              </div>
              <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xs text-center">
                <div>Durban</div>
                <div className="text-[10px] text-zinc-400 font-normal">Umhlanga Drill Labs</div>
              </div>
              <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xs text-center">
                <div>Pretoria</div>
                <div className="text-[10px] text-zinc-400 font-normal">Capital Trap &amp; Soul Suite</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 6. ARTIST SPOTLIGHT DETAIL MODAL
// ----------------------------------------------------
interface ArtistDetailModalProps {
  artist: HeroArtist | null;
  onClose: () => void;
  onWatchVideo: () => void;
}

export const ArtistDetailModal: React.FC<ArtistDetailModalProps> = ({
  artist,
  onClose,
  onWatchVideo,
}) => {
  if (!artist) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl bg-[#0F0F13] text-white border border-white/15 rounded-xs shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-1.5 bg-black/70 hover:bg-black text-zinc-300 hover:text-white rounded-xs transition-colors cursor-pointer"
          aria-label="Close artist profile"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Top Backdrop */}
        <div className="relative h-64 sm:h-72 w-full bg-zinc-950 overflow-hidden">
          <img
            src={artist.image}
            alt={artist.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] via-[#0F0F13]/40 to-black/30" />

          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
              {artist.subLabel}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight mt-1">
              {artist.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-zinc-300 mt-1 font-medium">
              <span>{artist.genre}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-rose-400">{artist.streams}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 font-mono">
              Artistic Biography &amp; Impact
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {artist.bioHighlight}
            </p>
          </div>

          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">
                Current Marquee Campaign
              </span>
              <div className="text-sm font-bold text-white mt-0.5">
                {artist.latestRelease}
              </div>
              <div className="text-xs text-zinc-400">{artist.releaseType}</div>
            </div>

            <button
              onClick={() => {
                onClose();
                onWatchVideo();
              }}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-semibold text-xs uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Watch Music Video</span>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>Label Representation: {artist.subLabel} South Africa</span>
            <span className="text-zinc-500">ISRC: ZA-DWE-26-8802</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 7. ARTICLE DETAIL MODAL
// ----------------------------------------------------
interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl bg-[#0F0F13] text-white border border-white/15 rounded-xs shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-1.5 bg-black/70 hover:bg-black text-zinc-300 hover:text-white rounded-xs transition-colors"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-60 w-full bg-zinc-950 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] via-black/40 to-transparent" />
        </div>

        <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-wider">
            <span>{article.category}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-400 font-normal">{article.date}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-400 font-normal">{article.readTime}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            {article.title}
          </h2>

          <p className="text-sm text-zinc-300 leading-relaxed pt-2">
            {article.excerpt}
          </p>

          <p className="text-sm text-zinc-400 leading-relaxed">
            Dreamwork Entertainment Corporate Communications, Los Angeles & London — As part of the ongoing strategic initiative to champion original artistic output, this milestone reinforces our commitment to long-term artist development, technological leadership in spatial acoustic engineering, and equitable global distribution across 190+ markets.
          </p>

          <div className="pt-6 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
            <span>Official Press Dispatch · Dreamwork Entertainment</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
