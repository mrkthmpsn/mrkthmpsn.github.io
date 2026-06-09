"use client";
import React from "react";
import GalleryPageWrapper from "@/components/galleryPageWrapper";
import { getGalleryConfig } from "@/data/gallery-config";

// Import gallery items
import aboutPageItem from "@/data/gallery-items/about-page.json";
import personalSiteItem from "@/data/gallery-items/personal-site-project.json";

const WrittenGallery = () => {
  const galleryConfig = getGalleryConfig("communication/written")!;
  
  // Create items map for easy lookup
  const itemsMap = {
    "about-page": aboutPageItem,
    "personal-site-project": personalSiteItem,
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

export default WrittenGallery;