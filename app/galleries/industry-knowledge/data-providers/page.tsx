"use client";
import React from "react";
import GalleryPageWrapper from "@/components/galleryPageWrapper";
import { getGalleryConfig } from "@/data/gallery-config";

// Import gallery items
import matchCentreProvidersItem from "@/data/gallery-items/match-centre-providers.json";
import goalkeeperTrackingProvidersItem from "@/data/gallery-items/goalkeeper-tracking-providers.json";
import statsbombProviderKnowledgeItem from "@/data/gallery-items/statsbomb-provider-knowledge.json";

const DataProvidersGallery = () => {
  const galleryConfig = getGalleryConfig("industry-knowledge/data-providers")!;

  // Create items map for easy lookup
  const itemsMap = {
    "match-centre-providers": matchCentreProvidersItem,
    "goalkeeper-tracking-providers": goalkeeperTrackingProvidersItem,
    "statsbomb-provider-knowledge": statsbombProviderKnowledgeItem,
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

export default DataProvidersGallery;