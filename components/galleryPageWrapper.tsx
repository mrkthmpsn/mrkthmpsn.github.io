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
  caseStudySlug?: string | null;
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
        <div className="flex justify-between items-center mb-4">
          <a
            href="/"
            className="group inline-flex items-center px-4 py-2 rounded-full font-medium no-underline text-brandLightBlue-700 hover:text-white bg-brandLightBlue-100 bg-gradient-to-r from-brandLightBlue-600 to-brandLightBlue-600 bg-[length:0%_100%] bg-no-repeat bg-left hover:bg-[length:100%_100%] shadow-md hover:shadow-lg transition-all duration-500 ease-out"
          >
            <svg
              className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1"
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