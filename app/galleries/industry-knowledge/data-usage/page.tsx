"use client";
import React from "react";
import GalleryPageWrapper from "@/components/galleryPageWrapper";
import { getGalleryConfig } from "@/data/gallery-config";

// Import gallery items
import dataFeatureRankerItem from "@/data/gallery-items/data-feature-ranker.json";

const DataUsageGallery = () => {
  const galleryConfig = getGalleryConfig("industry-knowledge/data-usage")!;

  // Create items map for easy lookup
  const itemsMap = {
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

export default DataUsageGallery;