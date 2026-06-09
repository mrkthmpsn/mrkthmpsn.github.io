'use client';

import React from 'react';

interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  thumbnail?: string;
}

interface HomePageSubMenuProps {
  items: SubMenuItem[];
  onItemClick: (item: SubMenuItem) => void;
  isPreview?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onItemHoverChange?: (isHovered: boolean) => void;
  className?: string;
}

const HomePageSubMenu: React.FC<HomePageSubMenuProps> = ({
  items,
  onItemClick,
  isPreview = false,
  onMouseEnter,
  onMouseLeave,
  onItemHoverChange,
  className = ''
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      className={`
        flex flex-col gap-2
        bg-brandLightBlue-200 bg-opacity-80 backdrop-blur-sm
        border border-brandLightBlue-400 border-opacity-30
        rounded-lg p-3
        transition-all duration-700 ease-in-out
        ${isPreview ? 'opacity-50 pointer-events-none' : 'opacity-100'}
        ${className}
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick(item)}
          onMouseEnter={() => onItemHoverChange?.(true)}
          onMouseLeave={() => onItemHoverChange?.(false)}
          className="
            px-2 py-1.5 text-sm md:text-base
            bg-white bg-opacity-60 hover:bg-opacity-90
            border border-brandLightBlue-300 border-opacity-40
            hover:border-brandLightBlue-500 hover:border-opacity-60
            rounded text-brandLightBlue-900 hover:text-brandLightBlue-950
            hover:shadow-md hover:scale-[1.01]
            transition-all duration-200
            text-left
          "
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default HomePageSubMenu;
