'use client';

import React from 'react';

interface HomePageMenuButtonProps {
  label: string;
  isSelected?: boolean;
  isPreview?: boolean;
  isLeafHovered?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  className?: string;
}

const HomePageMenuButton: React.FC<HomePageMenuButtonProps> = ({
  label,
  isSelected = false,
  isPreview = false,
  isLeafHovered = false,
  onClick,
  onMouseEnter,
  className = ''
}) => {
  const getButtonStyles = () => {
    if (isSelected && isLeafHovered) {
      return 'bg-brandLightBlue-400 bg-opacity-75 border-brandLightBlue-600 text-brandLightBlue-950 shadow-lg';
    }
    if (isSelected) {
      return 'bg-brandStraw-400 bg-opacity-80 border-brandStraw-600 text-brandStraw-950 shadow-lg';
    }
    if (isPreview) {
      return 'bg-brandStraw-300 bg-opacity-65 border-brandStraw-400 border-opacity-50 text-brandStraw-950 shadow-md';
    }
    return 'bg-brandStraw-200 bg-opacity-75 border-brandStraw-400 text-brandStraw-900 hover:bg-brandStraw-300 hover:bg-opacity-70 hover:border-brandStraw-500 hover:scale-[1.02] shadow-md';
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`
        px-6 py-4 rounded-lg font-medium text-lg md:text-xl
        transition-all duration-500 ease-in-out cursor-pointer
        backdrop-blur-sm border border-opacity-30
        text-center leading-tight whitespace-normal break-words
        min-h-[4rem] flex items-center justify-center
        ${getButtonStyles()}
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default HomePageMenuButton;
