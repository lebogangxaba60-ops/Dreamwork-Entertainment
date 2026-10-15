export interface HeroArtist {
  id: string;
  name: string;
  stageTitle: string;
  tagphrase: string;
  genre: string;
  latestRelease: string;
  releaseType: string;
  image: string;
  streams: string;
  subLabel: string;
  bioHighlight: string;
  accentColor: string;
}

export interface SubLabel {
  id: string;
  name: string;
  shortCode: string;
  tagline: string;
  founded: string;
  genreFocus: string;
  artistCount: number;
}

export interface FeaturedVideo {
  id: string;
  title: string;
  artist: string;
  duration: string;
  views: string;
  releaseDate: string;
  director: string;
  thumbnail: string;
  vevoVerified: boolean;
  genre: 'SA Hip-Hop' | 'SA R&B' | 'SA Trap-Soul';
  description: string;
  youtubeId: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  featured?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Artists' | 'Licensing' | 'Corporate' | 'Press';
}

export interface CareerOpportunity {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

// 100% EXCLUSIVE TO SA HIP-HOP & SA R&B (NO PEOPLE IN IMAGERY)
export const HERO_ARTISTS: HeroArtist[] = [
  {
    id: 'kaydee-mofokeng',
    name: 'Kamohelo "Kay-Dee" Mofokeng',
    stageTitle: 'The Titan of Modern SA Hip-Hop',
    tagphrase: 'Mastering vernacular lyricism, heavy 808s, and Egoli street storytelling',
    genre: 'SA Hip-Hop · Sotho Drill · Trap',
    latestRelease: 'Sunrise Over Ponte (Platinum Edition)',
    releaseType: 'SAHHA Album of the Year & RiSA 3x Platinum',
    image: '/src/assets/images/johannesburg_skyline_night_1792097802132.jpg',
    streams: '380M Streams',
    subLabel: 'Jozi Streets Records',
    bioHighlight: 'Johannesburg lyrical heavyweight celebrated for uniting multilingual Sesotho, Zulu, and English bars with cinematic orchestral trap production and stadium-filling tours.',
    accentColor: '#DC2626',
  },
  {
    id: 'zandi-ndlovu',
    name: 'Zandile "Zandi" Ndlovu',
    stageTitle: 'The First Lady of Contemporary SA R&B',
    tagphrase: 'Velvet harmonies, intoxicating vulnerability, and late-night soul anthems',
    genre: 'Contemporary SA R&B · Neo-Soul',
    latestRelease: 'Midnight in Rosebank (Deluxe EP)',
    releaseType: 'Metro FM Best R&B Release & RiSA 2x Platinum',
    image: '/src/assets/images/vinyl_turntable_luxury_1792097800883.jpg',
    streams: '290M Streams',
    subLabel: 'Aura R&B South Africa',
    bioHighlight: 'Multi-award-winning R&B songstress hailed as the voice of modern Mzansi romance, bridging 90s soul sensibilities with contemporary South African rhythmic textures.',
    accentColor: '#E11D48',
  },
  {
    id: 'b-khid-dlamini',
    name: 'Bongani "B-Khid" Dlamini',
    stageTitle: 'The Vanguard of Jozi Trap & Boom-Bap',
    tagphrase: 'From Braamfontein basements to national platinum certifications',
    genre: 'SA Hip-Hop · Hardcore Trap · Conscious Rap',
    latestRelease: 'From Braam to the Hills (LP)',
    releaseType: 'South African Hip Hop Awards Best Lyricist',
    image: '/src/assets/images/studio_console_rosebank_1792097800262.jpg',
    streams: '210M Streams',
    subLabel: 'Braamfontein Sound Co.',
    bioHighlight: 'Critically acclaimed producer and rapper known for razor-sharp social commentary, vintage vinyl chops, and collaborations with the continent’s leading rhymers.',
    accentColor: '#BE123C',
  },
  {
    id: 'solenne-thorne',
    name: 'Maya "Solenne" Thorne',
    stageTitle: 'Alternative SA R&B & Trap-Soul Sensation',
    tagphrase: 'Atmospheric midnight echoes crafted between Cape Town and Johannesburg',
    genre: 'Alternative SA R&B · Trap-Soul',
    latestRelease: 'Camps Bay Sunset (Acoustic & Master Stems)',
    releaseType: 'SAMA Best R&B / Soul Album Nominee',
    image: '/src/assets/images/gold_disc_award_1792097802750.jpg',
    streams: '175M Streams',
    subLabel: 'Velvet Coast Imprint',
    bioHighlight: 'Pioneering South Africa’s downtempo trap-soul soundscape with acoustic guitar licks, sub-bass grooves, and internationally syndicated film sync features.',
    accentColor: '#E11D48',
  },
];

// SUB-LABELS: DEDICATED SOLELY TO SA HIP-HOP & SA R&B
export const SUB_LABELS: SubLabel[] = [
  {
    id: 'jozi-streets-records',
    name: 'Jozi Streets Records',
    shortCode: 'JSR',
    tagline: 'Flagship South African Hip-Hop imprint: Hardcore vernacular rap, trap anthems, and stadium lyricists',
    founded: '2004',
    genreFocus: 'SA Hip-Hop / Sotho Drill / Trap',
    artistCount: 28,
  },
  {
    id: 'aura-rnb-sa',
    name: 'Aura R&B South Africa',
    shortCode: 'ARA-SA',
    tagline: 'Home of premier South African contemporary R&B, velvet vocalists, and soul ensembles',
    founded: '2010',
    genreFocus: 'Contemporary SA R&B / Neo-Soul',
    artistCount: 22,
  },
  {
    id: 'braam-sound-co',
    name: 'Braamfontein Sound Co.',
    shortCode: 'BSC',
    tagline: 'Inner-city conscious hip-hop, underground boom-bap, cyphers, and alternative SA rap',
    founded: '2015',
    genreFocus: 'Conscious SA Hip-Hop / Boom-Bap',
    artistCount: 19,
  },
  {
    id: 'velvet-coast',
    name: 'Velvet Coast Imprint',
    shortCode: 'VCI',
    tagline: 'Cape Town and coastal alternative R&B, downtempo soul, and acoustic trap-soul sessions',
    founded: '2017',
    genreFocus: 'Alternative SA R&B / Trap-Soul',
    artistCount: 16,
  },
  {
    id: 'durban-drill-syndicate',
    name: 'Durban Drill Syndicate',
    shortCode: 'DDS',
    tagline: 'KZN street culture, heavy sliding 808s, Durban slang, and high-octane hip-hop flows',
    founded: '2021',
    genreFocus: 'SA Drill / KZN Hip-Hop / 808 Trap',
    artistCount: 14,
  },
  {
    id: 'midnight-echo-labs',
    name: 'Midnight Echo Labs',
    shortCode: 'MEL',
    tagline: 'Experimental R&B production house, atmospheric vocal layering, and modern slow jams',
    founded: '2019',
    genreFocus: 'Trap-Soul / Atmospheric R&B',
    artistCount: 12,
  },
];

// FEATURED VIDEOS: EXCLUSIVELY SA HIP-HOP & SA R&B (NO PEOPLE IN IMAGERY)
export const FEATURED_VIDEOS: FeaturedVideo[] = [
  {
    id: 'vid-1',
    title: 'Sunrise Over Ponte (Live from Hillbrow Rooftop)',
    artist: 'Kamohelo "Kay-Dee" Mofokeng ft. Zandi Ndlovu',
    duration: '3:54',
    views: '41.2M',
    releaseDate: '3 days ago',
    director: 'Tebogo Malope',
    thumbnail: '/src/assets/images/johannesburg_skyline_night_1792097802132.jpg',
    vevoVerified: true,
    genre: 'SA Hip-Hop',
    description: 'High-concept visual shot on a Johannesburg rooftop with panoramic views of Ponte City Tower and Hillbrow, celebrating authentic SA Hip-Hop poetry.',
    youtubeId: 'VEVO-SA-041',
  },
  {
    id: 'vid-2',
    title: 'Midnight in Rosebank (Official R&B Video)',
    artist: 'Zandile "Zandi" Ndlovu',
    duration: '4:08',
    views: '35.6M',
    releaseDate: '1 week ago',
    director: 'Ofentse Mwase',
    thumbnail: '/src/assets/images/vinyl_turntable_luxury_1792097800883.jpg',
    vevoVerified: true,
    genre: 'SA R&B',
    description: 'A lavish neo-soul visual filmed across Rosebank’s luxury hotel suites and late-night vinyl lounges, capturing deep contemporary Mzansi romance.',
    youtubeId: 'VEVO-SA-119',
  },
  {
    id: 'vid-3',
    title: 'Braamfontein Cypher & Streets (Raw Cut)',
    artist: 'Bongani "B-Khid" Dlamini ft. Jozi Collective',
    duration: '3:32',
    views: '26.4M',
    releaseDate: '2 weeks ago',
    director: 'Kyle Lewis',
    thumbnail: '/src/assets/images/studio_console_rosebank_1792097800262.jpg',
    vevoVerified: true,
    genre: 'SA Hip-Hop',
    description: 'Gritty 16mm street video filmed on Juta Street and the Nelson Mandela Bridge, showcasing rapid-fire vernacular punchlines and vintage MPC boom-bap.',
    youtubeId: 'VEVO-SA-082',
  },
  {
    id: 'vid-4',
    title: 'Camps Bay Sunset (Acoustic Trap-Soul)',
    artist: 'Maya "Solenne" Thorne',
    duration: '3:45',
    views: '19.7M',
    releaseDate: '1 month ago',
    director: 'Sunu Gonera',
    thumbnail: '/src/assets/images/gold_disc_award_1792097802750.jpg',
    vevoVerified: true,
    genre: 'SA Trap-Soul',
    description: 'Intimate visual poetry captured along the Atlantic Seaboard at dusk, blending 808 sub-harmonics with soulful electric piano chords.',
    youtubeId: 'VEVO-SA-204',
  },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Kay-Dee Mofokeng Dominates 2026 South African Hip Hop Awards (SAHHA) with 5 Major Honors',
    category: 'SA Hip-Hop',
    date: 'October 14, 2026',
    readTime: '4 min read',
    excerpt: 'Lyrical titan sweeps Best Male, Lyricist of the Year, and Album of the Year for the critically acclaimed Sunrise Over Ponte release.',
    image: '/src/assets/images/johannesburg_skyline_night_1792097802132.jpg',
    featured: true,
  },
  {
    id: 'news-2',
    title: 'Zandi Ndlovu Sets All-Time Record as Most-Streamed Female R&B Artist in South African History',
    category: 'SA R&B',
    date: 'October 10, 2026',
    readTime: '3 min read',
    excerpt: 'Recording Industry of South Africa (RiSA) certifies Midnight in Rosebank multi-platinum, proving the unstoppable resurgence of homegrown soul.',
    image: '/src/assets/images/gold_disc_award_1792097802750.jpg',
  },
  {
    id: 'news-3',
    title: 'Dreamwork SA Unveils Dedicated Hip-Hop & R&B Beat Lab in Rosebank Headquarters',
    category: 'Studio Expansion',
    date: 'September 28, 2026',
    readTime: '3 min read',
    excerpt: 'State-of-the-art facility features vintage Neve consoles, tape saturation racks, and SSL vocal booths custom-tuned for rap verses and R&B runs.',
    image: '/src/assets/images/studio_console_rosebank_1792097800262.jpg',
  },
  {
    id: 'news-4',
    title: 'The Golden Age of SA Trap-Soul: How Dreamwork Imprints are Exporting Mzansi R&B Globally',
    category: 'Editorial',
    date: 'September 19, 2026',
    readTime: '5 min read',
    excerpt: 'Billboard and OkayAfrica spotlight how South African R&B artists are charting across London, Atlanta, and Paris with authentic local dialect melodies.',
    image: '/src/assets/images/vinyl_turntable_luxury_1792097800883.jpg',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Artists',
    question: 'What genres does Dreamwork Entertainment South Africa sign?',
    answer: 'Dreamwork Entertainment SA is exclusively dedicated to South African Hip-Hop (SA Hip-Hop) and South African R&B (SA R&B / Neo-Soul / Trap-Soul). We do not accept or develop music outside of these two core genres.',
  },
  {
    id: 'faq-2',
    category: 'Artists',
    question: 'How can SA Hip-Hop rappers and R&B vocalists submit music?',
    answer: 'Unsolicited CDs and flash drives delivered to our Rosebank headquarters are not reviewed. Unsigned rappers, lyricists, vocalists, and beatmakers must submit streaming links or audio files through our digital "For Artists" portal. Our dedicated Hip-Hop and R&B A&R panels listen weekly.',
  },
  {
    id: 'faq-3',
    category: 'Licensing',
    question: 'How do I clear SA Hip-Hop beats and R&B tracks for commercials, movies, or TV sync?',
    answer: 'All master and publishing rights are cleared swiftly in direct compliance with SAMRO, SAMPRA, and CAPASSO. Submit your cue sheet through our Inquiries portal specifying "Sync & Media Licensing" for immediate 24-hour clearance turnaround.',
  },
  {
    id: 'faq-4',
    category: 'Corporate',
    question: 'Where is the Dreamwork SA Hip-Hop & R&B studio complex located?',
    answer: 'Our headquarters and primary tracking suites are situated at 154 Oxford Road, Rosebank, Johannesburg, 2196 (Gauteng), with our coastal R&B mixing suite located at the Foreshore in Cape Town.',
  },
];

export const CAREER_ITEMS: CareerOpportunity[] = [
  {
    id: 'car-1',
    title: 'Senior A&R Director - SA Hip-Hop & Street Culture',
    department: 'Artists & Repertoire',
    location: 'Johannesburg (Rosebank), South Africa',
    type: 'Full-Time',
    description: 'Scout and sign elite lyrical talent, trap trailblazers, and drill innovators for Jozi Streets Records and Braamfontein Sound Co. across South Africa.',
  },
  {
    id: 'car-2',
    title: 'Head of Artist Development - SA R&B & Neo-Soul',
    department: 'Artists & Repertoire',
    location: 'Johannesburg (Rosebank) / Hybrid',
    type: 'Full-Time',
    description: 'Work directly with our roster of contemporary R&B vocalists, managing vocal coaching, topline songwriter camps, and studio production schedules.',
  },
  {
    id: 'car-3',
    title: 'Hip-Hop & R&B Campaign Strategist (DSP & Radio)',
    department: 'Marketing & Digital',
    location: 'Johannesburg (Rosebank)',
    type: 'Full-Time',
    description: 'Lead single release rollouts across Apple Music Africa Hip-Hop, Spotify South Africa R&B, Metro FM, YFM, and Channel O music video placements.',
  },
  {
    id: 'car-4',
    title: 'Music Rights & Sample Clearance Specialist (SAMRO & CAPASSO)',
    department: 'Business & Legal Affairs',
    location: 'Johannesburg (Rosebank)',
    type: 'Full-Time',
    description: 'Manage sample clearance agreements for Hip-Hop boom-bap chop productions, R&B interpolation licenses, and mechanical distribution contracts.',
  },
];
