export interface GalleryConfig {
  id: string;
  title: string;
  defaultLanding: string;
  itemOrder: string[];
}

export const galleryConfigs: GalleryConfig[] = [
  {
    id: "technical/react-fe",
    title: "React & Frontend Development",
    defaultLanding: "debug-buildup",
    itemOrder: [
      "debug-buildup",
      "data-feature-ranker",
      "football-tracker",
      "analytics-library-react",
      "nextjs-personal-site"
    ]
  },
  {
    id: "technical/python-development",
    title: "Python Development",
    defaultLanding: "tracking-data-python",
    itemOrder: [
      "tracking-data-python",
      "custom-fonts-python",
      "custom-metrics",
      "statsbomb-open-data"
    ]
  },
  {
    id: "technical/api-development",
    title: "API Development",
    defaultLanding: "match-centre",
    itemOrder: [
      "match-centre",
      "debug-buildup",
      "analytics-library-react"
    ]
  },
  {
    id: "industry-knowledge/market",
    title: "Market Knowledge",
    defaultLanding: "twenty3-market-audiences",
    itemOrder: [
      "twenty3-market-audiences",
      "data-feature-ranker-market",
      "get-goalside-market"
    ]
  },
  {
    id: "industry-knowledge/data-usage",
    title: "Data Usage",
    defaultLanding: "twenty3-data-usage",
    itemOrder: [
      "twenty3-data-usage",
      "custom-metrics-data-usage",
      "data-feature-ranker"
    ]
  },
  {
    id: "industry-knowledge/data-providers",
    title: "Data Providers",
    defaultLanding: "match-centre-providers",
    itemOrder: [
      "match-centre-providers",
      "statsbomb-provider-knowledge",
      "goalkeeper-tracking-providers"
    ]
  },
  {
    id: "dream-big-build-manageable/visualisations",
    title: "Visualisations",
    defaultLanding: "twenty3-visualisations",
    itemOrder: [
      "twenty3-visualisations",
      "debug-buildup",
      "matplotlib-styling"
    ]
  },
  {
    id: "dream-big-build-manageable/ideas-pragmatism",
    title: "Ideas & Pragmatism",
    defaultLanding: "data-feature-ranker",
    itemOrder: [
      "data-feature-ranker",
      "debug-buildup",
      "football-tracker",
      "custom-metrics",
      "match-centre"
    ]
  },
  {
    id: "dream-big-build-manageable/code-structure",
    title: "Code Structure",
    defaultLanding: "match-centre-architecture",
    itemOrder: [
      "match-centre-architecture",
      "analytics-library-structure"
    ]
  },
  {
    id: "communication/written",
    title: "Written Communication",
    defaultLanding: "get-goalside",
    itemOrder: [
      "get-goalside",
      "personal-site-project",
      "about-page"
    ]
  },
  {
    id: "communication/visual",
    title: "Visual Communication",
    defaultLanding: "twenty3-visualisations",
    itemOrder: [
      "twenty3-visualisations",
      "xg-timeline-visual-design",
      "mobile-ux-design",
      "product-design-hierarchy",
      "user-guided-design"
    ]
  },
  {
    id: "communication/interpersonal",
    title: "Interpersonal Communication",
    defaultLanding: "match-centre-collaboration",
    itemOrder: [
      "match-centre-collaboration",
      "twenty3-working-with-designers"
    ]
  }
];

// Helper function to get gallery config by ID
export function getGalleryConfig(id: string): GalleryConfig | undefined {
  return galleryConfigs.find(config => config.id === id);
}

// Helper function to get all gallery IDs
export function getAllGalleryIds(): string[] {
  return galleryConfigs.map(config => config.id);
}