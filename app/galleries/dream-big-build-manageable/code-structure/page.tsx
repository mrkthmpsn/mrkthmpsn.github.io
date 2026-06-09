"use client";
import React from "react";
import GalleryPageWrapper from "@/components/galleryPageWrapper";
import { getGalleryConfig } from "@/data/gallery-config";

// Import gallery items
import matchCentreArchitectureItem from "@/data/gallery-items/match-centre-architecture.json";
import analyticsLibraryStructureItem from "@/data/gallery-items/analytics-library-structure.json";

const CodeStructureGallery = () => {
  const galleryConfig = getGalleryConfig("dream-big-build-manageable/code-structure")!;

  // Create items map for easy lookup
  const itemsMap = {
    "match-centre-architecture": matchCentreArchitectureItem,
    "analytics-library-structure": analyticsLibraryStructureItem,
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

export default CodeStructureGallery;