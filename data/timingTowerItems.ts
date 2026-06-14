export type TeamCategory = 'react' | 'python' | 'data-eng' | 'writing';

export const TEAM_COLORS: Record<TeamCategory, string> = {
  react: '#61DAFB',
  python: '#3776AB',
  'data-eng': '#EE8721',
  writing: '#A3B59A',
};

export const TEAM_LABELS: Record<TeamCategory, string> = {
  react: 'RCT',
  python: 'PYT',
  'data-eng': 'ENG',
  writing: 'WRT',
};

export interface TimingTowerItem {
  id: string;
  position: number;
  title: string;
  subtitle: string;
  type: 'project' | 'blog';
  team: TeamCategory;
  href: string;
  isExternal: boolean;
  thumbnail: string;
  description: string;
  tags: string[];
}

const timingTowerItems: TimingTowerItem[] = [
  {
    id: 'twenty3-data-pipelines',
    position: 1,
    title: 'Twenty3 Data Pipelines',
    subtitle: 'Data Eng.',
    type: 'project',
    team: 'data-eng',
    href: '/twenty3-data-pipelines',
    isExternal: false,
    thumbnail: '/images/galleries/twenty3-sport-homepage.png',
    description:
      'Data pipeline architecture at Twenty3, processing football data from multiple providers into unified formats.',
    tags: ['Data Engineering', 'IaC'],
  },
  {
    id: 'pitwall-app',
    position: 2,
    title: 'Football Pitwall App',
    subtitle: 'Tooling',
    type: 'project',
    team: 'react',
    href: '/debug-buildup',
    isExternal: false,
    thumbnail: '/images/galleries/debug_buildup_app.png',
    description:
      'A prototype sideline app for coaches to diagnose build-up play patterns in real time using tracking & event data.',
    tags: ['Python', 'React', 'Product Design'],
  },
  {
    id: 'what-we-talk-about-analytics',
    position: 3,
    title: '...When We Talk About Analytics',
    subtitle: 'Essay',
    type: 'blog',
    team: 'writing',
    href: 'https://www.getgoalsideanalytics.com/what-we-talk-about-when-we-talk-about-analytics/',
    isExternal: true,
    thumbnail: '/images/galleries/2024_GG_icon.png',
    description:
      "An essay about what the word 'analytics' means and why it's not just 'data'.",
    tags: ['Writing', 'Analytics'],
  },
  {
    id: 'twenty3-visualisations',
    position: 4,
    title: 'Twenty3 Visualisations',
    subtitle: 'Data Vis.',
    type: 'project',
    team: 'python',
    href: '/twenty3-visualisations',
    isExternal: false,
    thumbnail: '/images/galleries/twenty3-vis-1.png',
    description:
      'Football data visualisations created at Twenty3, including radars, xG timelines, and custom chart types.',
    tags: ['Data Visualisation', 'Matplotlib'],
  },
  {
    id: 'possession-not-nine-tenths',
    position: 5,
    title: 'Possession Is Not Nine-Tenths',
    subtitle: 'Analytics',
    type: 'blog',
    team: 'writing',
    href: 'https://www.getgoalsideanalytics.com/possession-is-not-nine-tenths/',
    isExternal: true,
    thumbnail: '/images/galleries/2024_GG_icon.png',
    description:
      "A blog exploring, and largely arguing against, 'possession adjusting' defensive statistics.",
    tags: ['Data analysis', 'Writing'],
  },
  {
    id: 'hardest-question-football',
    position: 6,
    title: 'The Hardest Question in Football',
    subtitle: 'The Biz.',
    type: 'blog',
    team: 'writing',
    href: 'https://www.getgoalsideanalytics.com/tiers-of-data/',
    isExternal: true,
    thumbnail: '/images/galleries/2024_GG_icon.png',
    description:
      "A blog exploring how to gauge how much a club is using 'analytics'.",
    tags: ['Writing', 'Club management'],
  },
  {
    id: 'twenty3-custom-fonts',
    position: 7,
    title: 'Twenty3 Vis. Text Magic',
    subtitle: 'Data Vis.',
    type: 'project',
    team: 'python',
    href: '/twenty3-custom-fonts',
    isExternal: false,
    thumbnail: '/images/galleries/toolbox-font-translation-japanese.png',
    description:
      'A self-driven project to add custom brand fonts and auto-resizing text to Twenty3 matplotlib data vis.',
    tags: ['Product', 'Matplotlib'],
  },
  {
    id: 'football-tracker-app',
    position: 8,
    title: 'Football Tracker App',
    subtitle: 'Mobile',
    type: 'project',
    team: 'react',
    href: '/football-tracker-app',
    isExternal: false,
    thumbnail: '/images/galleries/football-tracker-app-thumb.png',
    description:
      'A React Native mobile app for live match tracking, capturing event data with a touch-based pitch interface.',
    tags: ['React Native', 'Product Design'],
  },
  {
    id: 'understand-football-ai',
    position: 9,
    title: 'Understand Football, Understand AI',
    subtitle: 'AI',
    type: 'blog',
    team: 'writing',
    href: 'https://www.getgoalsideanalytics.com/understand-football-and-youll-understand-ai/',
    isExternal: true,
    thumbnail: '/images/galleries/2024_GG_icon.png',
    description:
      'An essay explaining AI (largely machine learning) principles and how they can be understood by football fans.',
    tags: ['Writing', 'AI'],
  },
  {
    id: 'match-centre',
    position: 10,
    title: 'Twenty3 Match Centre',
    subtitle: 'Product',
    type: 'project',
    team: 'data-eng',
    href: '/match-centre',
    isExternal: false,
    thumbnail: '/images/galleries/twenty3_match_centre.png',
    description:
      'A live match centre product built at Twenty3, providing real-time stats and visualisations for football matches.',
    tags: ['API development', 'Product'],
  },
  {
    id: 'data-feature-ranker',
    position: 11,
    title: 'Data Feature Ranker',
    subtitle: 'Game',
    type: 'project',
    team: 'react',
    href: '/data-feature-ranker',
    isExternal: false,
    thumbnail: '/images/data-feature-ranker/landing-page.png',
    description:
      "A 'this or that' game letting users rank football data features head-to-head, generating global Elo-style rankings.",
    tags: ['React', 'Web Game'],
  },
  {
    id: 'processing-war',
    position: 12,
    title: 'Who Will Win the Processing War?',
    subtitle: 'The Biz.',
    type: 'blog',
    team: 'writing',
    href: 'https://www.getgoalsideanalytics.com/who-will-win-processing-war/',
    isExternal: true,
    thumbnail: '/images/galleries/get_goalside_thumb.png',
    description:
      'A blog poking at the competing (and sometimes conflicting) interests in the football data provision industry.',
    tags: ['Industry analysis', 'Writing'],
  },
];

export default timingTowerItems;
