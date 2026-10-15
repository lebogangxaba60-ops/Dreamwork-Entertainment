/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { LabelsBanner } from './components/LabelsBanner';
import { FeaturedVideos } from './components/FeaturedVideos';
import { NewsAndInquiries } from './components/NewsAndInquiries';
import { Footer } from './components/Footer';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { AudioPlayerBar, PlayingTrack } from './components/AudioPlayerBar';
import {
  InquiriesModal,
  ForArtistsModal,
  CareersModal,
  FAQModal,
  AboutModal,
  ArtistDetailModal,
  ArticleModal,
} from './components/CorporateModals';
import {
  HeroArtist,
  FeaturedVideo,
  NewsArticle,
  SubLabel,
  FEATURED_VIDEOS,
} from './data/labelData';

export default function App() {
  // Modal / Drawer state management
  const [activeDrawer, setActiveDrawer] = useState<
    'about' | 'careers' | 'faq' | 'for-artists' | 'inquiries' | null
  >(null);
  const [activeVideo, setActiveVideo] = useState<FeaturedVideo | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<HeroArtist | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [currentTrack, setCurrentTrack] = useState<PlayingTrack | null>(null);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSubLabel = (subLabel: SubLabel) => {
    // LabelsBanner handles opening its rich dossier modal
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white pb-16">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        onOpenDrawer={(drawer) => setActiveDrawer(drawer)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 1. Header & Hero Section (Dark, atmospheric, spotlight artists slider) */}
        <HeroSlider
          onSelectArtist={(artist) => setSelectedArtist(artist)}
          onExploreVideos={() => handleNavigateSection('videos')}
          onPlayTrack={(track) => setCurrentTrack(track)}
        />

        {/* 2. Labels / Roster Banner (Monochrome sub-label logos) */}
        <LabelsBanner onSelectSubLabel={handleSelectSubLabel} />

        {/* 3. Featured Videos Section (Light background, VEVO badges, red title bars) */}
        <FeaturedVideos
          onPlayVideo={(video) => setActiveVideo(video)}
          onPlayTrack={(track) => setCurrentTrack(track)}
        />

        {/* 4. News & Inquiries Section (Bold News header, inquiry callout card) */}
        <NewsAndInquiries
          onOpenInquiry={() => setActiveDrawer('inquiries')}
          onSelectArticle={(article) => setSelectedArticle(article)}
        />
      </main>

      {/* Corporate Label Footer */}
      <Footer
        onOpenDrawer={(drawer) => setActiveDrawer(drawer)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Persistent Luxury Audio Player Bar */}
      <AudioPlayerBar
        currentTrack={currentTrack}
        onClose={() => setCurrentTrack(null)}
      />

      {/* Interactive Overlays & Modals */}
      <VideoPlayerModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      <InquiriesModal
        isOpen={activeDrawer === 'inquiries'}
        onClose={() => setActiveDrawer(null)}
      />

      <ForArtistsModal
        isOpen={activeDrawer === 'for-artists'}
        onClose={() => setActiveDrawer(null)}
      />

      <CareersModal
        isOpen={activeDrawer === 'careers'}
        onClose={() => setActiveDrawer(null)}
      />

      <FAQModal
        isOpen={activeDrawer === 'faq'}
        onClose={() => setActiveDrawer(null)}
      />

      <AboutModal
        isOpen={activeDrawer === 'about'}
        onClose={() => setActiveDrawer(null)}
      />

      <ArtistDetailModal
        artist={selectedArtist}
        onClose={() => setSelectedArtist(null)}
        onWatchVideo={() => setActiveVideo(FEATURED_VIDEOS[0])}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}
