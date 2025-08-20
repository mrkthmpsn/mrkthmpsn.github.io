'use client';

import React from 'react';

interface HomePageMenuButtonProps {
  label: string;
  isSelected?: boolean;
  onClick: () => void;
  className?: string;
}

const HomePageMenuButton: React.FC<HomePageMenuButtonProps> = ({
  label,
  isSelected = false,
  onClick,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-4 rounded-lg font-medium text-lg md:text-xl
        transition-all duration-200 cursor-pointer
        backdrop-blur-sm border border-opacity-30
        text-center leading-tight whitespace-normal break-words
        min-h-[4rem] flex items-center justify-center
        ${isSelected 
          ? 'bg-brandStraw-400 bg-opacity-80 border-brandStraw-600 text-brandStraw-950 shadow-lg' 
          : 'bg-brandStraw-200 bg-opacity-60 border-brandStraw-400 text-brandStraw-900 hover:bg-brandStraw-300 hover:bg-opacity-70 hover:border-brandStraw-500'
        }
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default HomePageMenuButton;