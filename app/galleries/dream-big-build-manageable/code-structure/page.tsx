"use client";
import React from "react";
import GalleryPageWrapper from "@/components/galleryPageWrapper";
import { getGalleryConfig } from "@/data/gallery-config";

// Import gallery items
import placeholderArchitectureItem from "@/data/gallery-items/placeholder-architecture.json";

const CodeStructureGallery = () => {
  const galleryConfig = getGalleryConfig("dream-big-build-manageable/code-structure")!;
  
  // Create items map for easy lookup
  const itemsMap = {
    "placeholder-architecture": placeholderArchitectureItem,
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