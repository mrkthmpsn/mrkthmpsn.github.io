import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/pages-styles.css";
import CustomNavbar from "./navbar";
import Gallery from "./gallery";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  description?: string;
}

interface GalleryPageWrapperProps {
  pageTitle: string;
  pageDescription?: string;
  items: GalleryItem[];
}

const GalleryPageWrapper: React.FC<GalleryPageWrapperProps> = ({
  pageTitle,
  pageDescription,
  items,
}) => {
  return (
    <>
      <CustomNavbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header with Back to Home and Title on same level */}
        <div className="flex justify-between items-center mb-8">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-brandStraw hover:bg-brandLightBlue transition-colors duration-200 rounded-lg text-gray-800 font-medium"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </a>
          
          <h1 className="text-xl md:text-2xl lg:text-3xl font-['Roboto_Slab'] text-brandLightBlue-500">
            {pageTitle}
          </h1>
          
          {/* Empty div for flex spacing */}
          <div className="w-32"></div>
        </div>
        
        <Gallery items={items} />
      </div>
    </>
  );
};

export default GalleryPageWrapper;