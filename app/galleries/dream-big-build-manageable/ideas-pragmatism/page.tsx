"use client";
import React from "react";
import GalleryPageWrapper from "@/components/galleryPageWrapper";
import { getGalleryConfig } from "@/data/gallery-config";

// Import gallery items
import customMetricsItem from "@/data/gallery-items/custom-metrics.json";
import matchCentreItem from "@/data/gallery-items/match-centre.json";
import debugBuildupItem from "@/data/gallery-items/debug-buildup.json";
import footballTrackerItem from "@/data/gallery-items/football-tracker.json";
import dataFeatureRankerItem from "@/data/gallery-items/data-feature-ranker.json";

const IdeasPragmatismGallery = () => {
  const galleryConfig = getGalleryConfig("dream-big-build-manageable/ideas-pragmatism")!;

  // Create items map for easy lookup
  const itemsMap = {
    "custom-metrics": customMetricsItem,
    "match-centre": matchCentreItem,
    "debug-buildup": debugBuildupItem,
    "football-tracker": footballTrackerItem,
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

export default IdeasPragmatismGallery;