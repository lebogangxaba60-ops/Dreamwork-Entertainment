# Dreamwork Entertainment - Record Label & Entertainment Landing Page

A modern, high-end corporate entertainment and record label landing page for **Dreamwork Entertainment**, capturing the sleek, authoritative aesthetic of major global music companies like Sony Music Entertainment.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The clarifying questions were skipped; the recommended defaults have been adopted:
> - **Musical Scope**: Multi-genre powerhouse roster (contemporary pop, cinematic hip-hop, electronic, and alternative R&B).
> - **Video Interaction**: Clicking featured video cards opens a high-fidelity cinematic video player modal complete with director credits, production details, audio waveforms, and simulated VEVO player controls.
> - **Interactive Portals**: Functional modals/drawers for **"For Artists"** (demo submission with audio preview), **"Careers"** (open job listings filter), **"FAQ"** (interactive accordion), and the **"Inquiries"** drawer ("Have a Question for Dreamwork Entertainment?").

- **Confirmed Decision 1**: Sleek Sony Music-inspired dual theme posture: dark atmospheric obsidian hero and sub-labels section transitioning cleanly into a crisp, high-contrast light section for Featured Videos and News.
- **Confirmed Decision 2**: Interactive horizontal carousels with smooth navigation, drag/scroll support, and active indicator bars for both Spotlight Artists and Featured Videos.
- **Confirmed Decision 3**: Complete working handlers on every button, modal, navigation link, filter pill, and inquiry form submission with toast confirmation.

---

## 1. Overview & Core Concept

- **What It Does**: Presents Dreamwork Entertainment as an industry-leading global music and entertainment powerhouse. Visitors can explore spotlight artists on the label, browse sub-imprint brands, watch trending music videos with official VEVO badging, catch up on label press releases and corporate announcements, and submit artist demos or corporate inquiries.
- **Target Audience / Persona**: Music fans, industry executives, managers, aspiring recording artists, journalists, and corporate partners looking for credible, cutting-edge entertainment representations.
- **Key Value**: Delivers the pedigree, prestige, and polish of Tier-1 record labels through typography, fluid transitions, and authentic entertainment industry layouts.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Hero Spotlight Discovery**: Users arrive at a deep obsidian hero section featuring a full-width hero slider showcasing marquee artists (e.g., Nova Vance, Kaelen Cross, Solenne, The Midnight Protocol). Visitors can switch slides via progress indicators or arrow controls, explore artist bio highlights, and view their latest releases.
2. **Sub-Labels Roster**: Smooth horizontal ribbon displaying monochrome vector logos of Dreamwork's signature sub-labels (e.g., Dreamwork Records, Nocturne Imprint, Vanguard Sound, Echo Chamber, Aura Urban, Horizon Pulse) with hover lift states and imprint descriptions.
3. **Featured Videos Showcase**: Seamless transition into a light, crisp editorial section with a bold heading. Visitors swipe/scroll through horizontal 16:9 thumbnail cards with red artist/title badges, play icon overlays, duration chips, and authentic VEVO badges. Clicking any card launches the cinematic video theater modal.
4. **News & Inquiries**: An editorial news grid covering chart records, global tour kickoffs, and executive appointments, paired with an inquiry card: *"Have a Question for Dreamwork Entertainment?"*. Clicking launches a validated inquiry drawer (Press, Licensing, Sync, General).
5. **Corporate Modal Overlays**: Header navigation links (About, Careers, FAQ, For Artists) open dedicated full-featured drawers/modals without breaking page continuity.

### Visual Identity & Theme
- **Color Palette**:
  - *Dominant Canvas (Dark)*: Obsidian `#0A0A0C`, Card Surface `#141418`, Border Hairline `#272730`
  - *Dominant Canvas (Light)*: Crisp Studio White `#FBFBFC`, Card Surface `#FFFFFF`, Divider `#E5E7EB`
  - *Accents*: Crimson VEVO Red `#E11D48` / `#EF4444` (for video title strips, play accents, and live highlights) with Monochromatic Silver/Slate tones.
- **Typography & Hierarchy**:
  - *Display*: Neo-grotesque bold display font styling (`Plus Jakarta Sans` / `Outfit`) with tight tracking (`tracking-tight`) and balanced headlines.
  - *Body*: Clean readable sans (`Plus Jakarta Sans` / `DM Sans`), `15px-16px`, standard line height 1.6.
  - *Metadata & Numbers*: Tabular numerals for video counts, durations, and release dates.
- **Anti-Slop Discipline**:
  - Zero arbitrary pill tags around static metadata (clean unboxed inline text with `·` separators).
  - No fake versioning, no pulsing decorative dots, no low-opacity background watermark text.
  - Clean 3-zone Top Bar Contract: Brand mark wordmark on the left, 5 clean single-line nav links, and 1 primary CTA button ("Contact Us").

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual Surface Composition (Dark Hero & Labels + Crisp Light Videos & News)**
  - *Chosen Approach*: Maintain a dark, atmospheric hero section and monochrome label strip, followed by a crisp white/light gray section for "Featured Videos" and "News", as specifically requested in the prompt ("Featured Videos Section: A light-background section with a bold heading...").
  - *Why*: Directly fulfills the prompt requirement while emulating Sony Music's modern corporate layout which juxtaposes immersive artist key art against high-readability press/media grids.
- **Decision 2: Image Strategy with Domain High-Fidelity Assets**
  - *Chosen Approach*: Use `generate_image` in a single parallel batch to produce authentic, atmospheric artist portraits, music video stills, and news photography, with resilient styled SVG fallback containers.
  - *Why*: Complies with the zero-broken-image policy and avoids unverified external CDN URLs.
- **Decision 3: Complete In-App Interactive Overlays**
  - *Chosen Approach*: Build fully functional modals for Video Playback, Artist Demo Submissions ("For Artists"), Careers, FAQ, and Inquiries instead of static placeholder links.
  - *Why*: Ensures every interactive affordance has a working event handler and delivers a complete application experience.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Dreamwork Entertainment                         │
├────────────────────────────────────────────────────────────────────────┤
│  Top Navigation (Brand Logo · About · News · Careers · FAQ · Artists)  │
├────────────────────────────────────────────────────────────────────────┤
│  Hero Slider [Dark / Atmospheric]                                      │
│  ├── Full-width spotlight artists (Nova Vance, Kaelen, Solenne, etc.)  │
│  └── Slide controls, auto-play toggle, artist synopsis, stream action  │
├────────────────────────────────────────────────────────────────────────┤
│  Labels Roster Banner [Monochrome]                                     │
│  └── Sub-imprints: Dreamwork Records, Nocturne, Vanguard, Echo, etc.   │
├────────────────────────────────────────────────────────────────────────┤
│  Featured Videos [Crisp Light Background]                              │
│  ├── Horizontal video carousel with VEVO badges & red title bars       │
│  └── Interactive Click -> Cinematic Video Player Modal                 │
├────────────────────────────────────────────────────────────────────────┤
│  News & Inquiries Section                                              │
│  ├── News Grid (Press releases, album milestones, tour launches)       │
│  └── Inquiry Card ("Have a Question for Dreamwork Entertainment?")     │
├────────────────────────────────────────────────────────────────────────┤
│  Interactive Modals & Drawers                                          │
│  ├── Video Modal · Artist Demo Portal · Inquiries Form · FAQ · Careers │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State
- `HeroSlide`: `id, artistName, stageTitle, tagphrase, genre, latestRelease, releaseType, coverImage, backdropImage, ctaLink`
- `SubLabel`: `id, name, tagline, founded, genreFocus, logoSvg`
- `FeaturedVideo`: `id, title, artist, duration, views, releaseDate, thumbnail, vevoVerified, youtubeId, director`
- `NewsArticle`: `id, title, category, date, readTime, excerpt, image, featured`
- `InquiryFormData`: `name, email, organization, inquiryType, message`
- `ArtistSubmissionData`: `artistName, genre, contactEmail, socialUrl, trackTitle, demoFile`

### Component & State Mapping
- `activeHeroIndex`: Controlled carousel state with auto-advance and pause-on-hover.
- `videoCarouselScroll`: Scroll offset tracking for fluid horizontal video navigation.
- `activeVideoModal`: State holding the currently selected video to render the cinema modal.
- `activeDrawer`: Controls open state for `'inquiry' | 'artist_submission' | 'careers' | 'faq' | 'about' | null`.
- `inquirySubmitted`: Boolean toggle showing the immediate positive confirmation card upon form submission.
