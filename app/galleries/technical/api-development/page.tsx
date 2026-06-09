"use client";
import React from "react";
import GalleryPageWrapper from "@/components/galleryPageWrapper";
import { getGalleryConfig } from "@/data/gallery-config";

// Import gallery items
import analyticsLibraryReactItem from "@/data/gallery-items/analytics-library-react.json";
import debugBuildupItem from "@/data/gallery-items/debug-buildup.json";
import matchCentreItem from "@/data/gallery-items/match-centre.json";

const ApiDevelopmentGallery = () => {
  const galleryConfig = getGalleryConfig("technical/api-development")!;

  // Create items map for easy lookup
  const itemsMap = {
    "analytics-library-react": analyticsLibraryReactItem,
    "debug-buildup": debugBuildupItem,
    "match-centre": matchCentreItem,
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

export default ApiDevelopmentGallery;