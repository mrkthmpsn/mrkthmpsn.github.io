"use client";
import React from "react";
import GalleryPageWrapper from "@/components/galleryPageWrapper";
import { getGalleryConfig } from "@/data/gallery-config";

// Import gallery items
import placeholderItem from "@/data/gallery-items/placeholder.json";

const MarketGallery = () => {
  const galleryConfig = getGalleryConfig("industry-knowledge/market")!;
  
  // Create items map for easy lookup
  const itemsMap = {
    "placeholder": placeholderItem,
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

export default MarketGallery;