"use client";
import React from "react";
import GalleryPageWrapper from "@/components/galleryPageWrapper";
import { getGalleryConfig } from "@/data/gallery-config";

// Import gallery items
import footballTrackerItem from "@/data/gallery-items/football-tracker.json";
import analyticsLibraryReactItem from "@/data/gallery-items/analytics-library-react.json";
import debugBuildupItem from "@/data/gallery-items/debug-buildup.json";
import nextjsPersonalSiteItem from "@/data/gallery-items/nextjs-personal-site.json";
import dataFeatureRankerItem from "@/data/gallery-items/data-feature-ranker.json";

const ReactFeGallery = () => {
  const galleryConfig = getGalleryConfig("technical/react-fe")!;

  // Create items map for easy lookup
  const itemsMap = {
    "football-tracker": footballTrackerItem,
    "analytics-library-react": analyticsLibraryReactItem,
    "debug-buildup": debugBuildupItem,
    "nextjs-personal-site": nextjsPersonalSiteItem,
    "data-feature-ranker": dataFeatureRankerItem,
  };

  // Order items according to gallery config
  const orderedItems = galleryConfig.itemOrder.map(slug => ({
    id: slug,
    ...itemsMap[slug as keyof typeof itemsMap]
  }));

  return (
    <GalleryPageWrapper
      pageTitle={galleryConfig.title}
      items={orderedItems}
    />
  );
};

export default ReactFeGallery;