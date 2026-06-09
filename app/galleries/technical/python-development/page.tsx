"use client";
import React from "react";
import GalleryPageWrapper from "@/components/galleryPageWrapper";
import { getGalleryConfig } from "@/data/gallery-config";

// Import gallery items
import customMetricsItem from "@/data/gallery-items/custom-metrics.json";
import statsbombOpenDataItem from "@/data/gallery-items/statsbomb-open-data.json";
import trackingDataPythonItem from "@/data/gallery-items/tracking-data-python.json";
import customFontsPythonItem from "@/data/gallery-items/custom-fonts-python.json";
import dataPipelinesPythonItem from "@/data/gallery-items/data-pipelines-python.json";

const PythonDevelopmentGallery = () => {
  const galleryConfig = getGalleryConfig("technical/python-development")!;

  // Create items map for easy lookup
  const itemsMap = {
    "custom-metrics": customMetricsItem,
    "statsbomb-open-data": statsbombOpenDataItem,
    "tracking-data-python": trackingDataPythonItem,
    "custom-fonts-python": customFontsPythonItem,
    "data-pipelines-python": dataPipelinesPythonItem,
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

export default PythonDevelopmentGallery;