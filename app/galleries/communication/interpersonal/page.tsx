"use client";
import React from "react";
import GalleryPageWrapper from "@/components/galleryPageWrapper";
import { getGalleryConfig } from "@/data/gallery-config";

// Import gallery items
import matchCentreCollaborationItem from "@/data/gallery-items/match-centre-collaboration.json";
import twenty3WorkingWithDesignersItem from "@/data/gallery-items/twenty3-working-with-designers.json";

const InterpersonalGallery = () => {
  const galleryConfig = getGalleryConfig("communication/interpersonal")!;

  // Create items map for easy lookup
  const itemsMap = {
    "match-centre-collaboration": matchCentreCollaborationItem,
    "twenty3-working-with-designers": twenty3WorkingWithDesignersItem,
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

export default InterpersonalGallery;