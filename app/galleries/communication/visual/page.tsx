"use client";
import React from "react";
import GalleryPageWrapper from "@/components/galleryPageWrapper";
import { getGalleryConfig } from "@/data/gallery-config";

// Import gallery items
import mobileUxItem from "@/data/gallery-items/mobile-ux-design.json";
import productDesignItem from "@/data/gallery-items/product-design-hierarchy.json";
import twenty3VisualisationsItem from "@/data/gallery-items/twenty3-visualisations.json";
import userGuidedItem from "@/data/gallery-items/user-guided-design.json";

const VisualGallery = () => {
  const galleryConfig = getGalleryConfig("communication/visual")!;
  
  // Create items map for easy lookup
  const itemsMap = {
    "mobile-ux-design": mobileUxItem,
    "product-design-hierarchy": productDesignItem,
    "twenty3-visualisations": twenty3VisualisationsItem,
    "user-guided-design": userGuidedItem,
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

export default VisualGallery;