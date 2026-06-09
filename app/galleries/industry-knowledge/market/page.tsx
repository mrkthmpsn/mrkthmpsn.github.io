"use client";
import React from "react";
import GalleryPageWrapper from "@/components/galleryPageWrapper";
import { getGalleryConfig } from "@/data/gallery-config";

// Import gallery items
import twenty3MarketAudiencesItem from "@/data/gallery-items/twenty3-market-audiences.json";
import dataFeatureRankerMarketItem from "@/data/gallery-items/data-feature-ranker-market.json";
import getGoalsideMarketItem from "@/data/gallery-items/get-goalside-market.json";

const MarketGallery = () => {
  const galleryConfig = getGalleryConfig("industry-knowledge/market")!;

  // Create items map for easy lookup
  const itemsMap = {
    "twenty3-market-audiences": twenty3MarketAudiencesItem,
    "data-feature-ranker-market": dataFeatureRankerMarketItem,
    "get-goalside-market": getGoalsideMarketItem,
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