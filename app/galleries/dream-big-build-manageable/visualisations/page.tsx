"use client";
import React from "react";
import GalleryPageWrapper from "@/components/galleryPageWrapper";
import { getGalleryConfig } from "@/data/gallery-config";

// Import gallery items
import twenty3VisItem from "@/data/gallery-items/twenty3-visualisations.json";
import matplotlibStylingItem from "@/data/gallery-items/matplotlib-styling.json";
import debugBuildupItem from "@/data/gallery-items/debug-buildup.json";

const VisualisationsGallery = () => {
  const galleryConfig = getGalleryConfig("dream-big-build-manageable/visualisations")!;

  // Create items map for easy lookup
  const itemsMap = {
    "twenty3-visualisations": twenty3VisItem,
    "matplotlib-styling": matplotlibStylingItem,
    "debug-buildup": debugBuildupItem,
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

export default VisualisationsGallery;