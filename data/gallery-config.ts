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
    defaultLanding: "football-tracker",
    itemOrder: [
      "football-tracker",
      "analytics-library-react",
      "debug-buildup",
      "nextjs-personal-site",
      "data-feature-ranker"
    ]
  },
  {
    id: "technical/python-development",
    title: "Python Development",
    defaultLanding: "custom-metrics",
    itemOrder: [
      "custom-metrics",
      "statsbomb-open-data",
      "tracking-data-python"
    ]
  },
  {
    id: "technical/api-development",
    title: "API Development",
    defaultLanding: "analytics-library-react",
    itemOrder: [
      "analytics-library-react",
      "debug-buildup"
    ]
  },
  {
    id: "industry-knowledge/market",
    title: "Market Knowledge",
    defaultLanding: "placeholder",
    itemOrder: [
      "placeholder"
    ]
  },
  {
    id: "industry-knowledge/data-usage",
    title: "Data Usage",
    defaultLanding: "data-feature-ranker",
    itemOrder: [
      "data-feature-ranker"
    ]
  },
  {
    id: "industry-knowledge/data-providers",
    title: "Data Providers",
    defaultLanding: "placeholder",
    itemOrder: [
      "placeholder"
    ]
  },
  {
    id: "dream-big-build-manageable/visualisations",
    title: "Visualisations",
    defaultLanding: "twenty3-visualisations",
    itemOrder: [
      "twenty3-visualisations",
      "matplotlib-styling"
    ]
  },
  {
    id: "dream-big-build-manageable/ideas-pragmatism",
    title: "Ideas & Pragmatism",
    defaultLanding: "debug-buildup",
    itemOrder: [
      "custom-metrics",
      "match-centre",
      "debug-buildup",
      "football-tracker",
      "data-feature-ranker"
    ]
  },
  {
    id: "dream-big-build-manageable/code-structure",
    title: "Code Structure",
    defaultLanding: "placeholder-architecture",
    itemOrder: [
      "placeholder-architecture",
    ]
  },
  {
    id: "communication/written",
    title: "Written Communication",
    defaultLanding: "about-page",
    itemOrder: [
      "about-page",
      "personal-site-project",
    ]
  },
  {
    id: "communication/visual",
    title: "Visual Communication",
    defaultLanding: "mobile-ux-design",
    itemOrder: [
      "mobile-ux-design",
      "product-design-hierarchy",
      "twenty3-visualisations",
      "user-guided-design",
    ]
  },
  {
    id: "communication/interpersonal",
    title: "Interpersonal Communication",
    defaultLanding: "placeholder-collaboration",
    itemOrder: [
      "placeholder-collaboration",
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