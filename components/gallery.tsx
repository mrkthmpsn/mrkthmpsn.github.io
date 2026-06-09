import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  text?: string;
  description?: string;
  caseStudySlug?: string | null;
}

interface GalleryProps {
  items: GalleryItem[];
  title?: string;
}

const Gallery: React.FC<GalleryProps> = ({ items, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!items || items.length === 0) {
    return <div className="text-center text-gray-500">No items to display</div>;
  }

  const currentItem = items[currentIndex];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {title && (
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-['Roboto_Slab'] text-center mb-8">
          {title}
        </h1>
      )}
      
      <div className="flex flex-col items-center">
        {/* Main Gallery Area with fixed navigation */}
        <div className="relative w-full mb-4">
          {/* Previous Button - Positioned exactly halfway between column edge and screen edge */}
          <button
            onClick={goToPrevious}
            className="group/nav fixed left-[calc((50vw-24rem)/2)] top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-brandLightBlue-700 transition-all duration-200 shadow-lg md:left-[calc((50vw-20rem)/2)] lg:left-[calc((50vw-24rem)/2)]"
            disabled={items.length <= 1}
          >
            <svg
              className="w-6 h-6 text-brandLightBlue-200 group-hover/nav:text-brandLightBlue-100 transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Main Image */}
          <div className="flex flex-col items-center px-20">
            <h3 className="text-xl md:text-2xl font-['Roboto_Slab'] mt-4 text-center">
              {currentItem.title}
            </h3>
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-w-2xl max-h-[50vh] lg:max-h-[40vh] h-auto object-contain rounded-lg shadow-lg border-2 border-gray-200 mb-4"
            />
            <p className="text-lg text-gray-700 leading-relaxed">
              {currentItem.text}
            </p>
          </div>

          {/* Next Button - Positioned exactly halfway between column edge and screen edge */}
          <button
            onClick={goToNext}
            className="group/nav fixed right-[calc((50vw-24rem)/2)] top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-brandLightBlue-700 transition-all duration-200 shadow-lg md:right-[calc((50vw-20rem)/2)] lg:right-[calc((50vw-24rem)/2)]"
            disabled={items.length <= 1}
          >
            <svg
              className="w-6 h-6 text-brandLightBlue-200 group-hover/nav:text-brandLightBlue-100 transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Description Text */}
        <div className="w-full max-w-3xl text-center">
          {currentItem.caseStudySlug && (
            <a
              href={currentItem.caseStudySlug}
              className="group inline-flex items-center px-4 py-2 rounded-full font-medium no-underline text-brandLightBlue-700 hover:text-white bg-brandLightBlue-100 bg-gradient-to-r from-brandLightBlue-600 to-brandLightBlue-600 bg-[length:0%_100%] bg-no-repeat bg-left hover:bg-[length:100%_100%] shadow-md hover:shadow-lg transition-all duration-500 ease-out"
            >
              Read More
              <svg
                className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          )}
        </div>

        {/* Pagination Dots */}
        {items.length > 1 && (
          <div className="flex space-x-2 mt-6">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex
                    ? "bg-brandLightBlue"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        {items.length > 1 && (
          <div className="mt-4 text-sm text-gray-500">
            {currentIndex + 1} of {items.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;