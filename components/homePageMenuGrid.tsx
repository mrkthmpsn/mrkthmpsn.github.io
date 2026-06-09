'use client';

import React from 'react';
import HomePageMenuButton from './homePageMenuButton';
import HomePageSubMenu from './homePageSubMenu';

interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  thumbnail?: string;
}

interface MenuButtonData {
  id: string;
  label: string;
  subItems: SubMenuItem[];
}

interface HomePageMenuGridProps {
  buttons: MenuButtonData[];
  onButtonSelect: (buttonId: string | null) => void;
  onButtonHover: (buttonId: string) => void;
  onItemClick: (item: SubMenuItem) => void;
  onMenuMouseEnter?: () => void;
  onMenuMouseLeave?: () => void;
  onItemHoverChange?: (isHovered: boolean) => void;
  selectedButtonId?: string | null;
  previewButtonId?: string | null;
  activeButtonId?: string | null;
  isIdle?: boolean;
  isLeafHovered?: boolean;
  className?: string;
}

const HomePageMenuGrid: React.FC<HomePageMenuGridProps> = ({
  buttons,
  onButtonSelect,
  onButtonHover,
  onItemClick,
  onMenuMouseEnter,
  onMenuMouseLeave,
  onItemHoverChange,
  selectedButtonId = null,
  previewButtonId = null,
  activeButtonId = null,
  isIdle = false,
  isLeafHovered = false,
  className = ''
}) => {
  return (
    <div className={`
      grid gap-2 md:gap-3
      grid-cols-1 portrait:grid-cols-1
      landscape:grid-cols-2
      ${className}
    `}>
      {buttons.map((button) => {
        const isActive = activeButtonId === button.id;
        const isUserHovered = !isIdle && isActive;
        const isPreviewActive = isIdle && isActive;
        const thumbnails = button.subItems.filter(item => item.thumbnail);
        return (
          <div key={button.id} className="flex flex-col">
            <HomePageMenuButton
              label={button.label}
              isSelected={selectedButtonId === button.id}
              isPreview={!selectedButtonId && previewButtonId === button.id}
              isLeafHovered={selectedButtonId === button.id && isLeafHovered}
              onMouseEnter={() => onButtonHover(button.id)}
              onClick={() => {
                if (selectedButtonId === button.id) {
                  onButtonSelect(null);
                } else {
                  onButtonSelect(button.id);
                }
              }}
            />
            {/* Leaves — only on actual hover */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isUserHovered ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'
              }`}
            >
              <HomePageSubMenu
                items={button.subItems}
                onItemClick={onItemClick}
                isPreview={false}
                onMouseEnter={onMenuMouseEnter}
                onMouseLeave={onMenuMouseLeave}
                onItemHoverChange={onItemHoverChange}
              />
            </div>
            {/* Thumbnails — on idle cycling and hover */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isActive && thumbnails.length > 0 ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="flex gap-2 justify-center">
                {thumbnails.map((item) => (
                  <div key={item.id} className="rounded-md overflow-hidden shadow-md border border-white border-opacity-30">
                    <img
                      src={item.thumbnail}
                      alt={item.label}
                      className="w-16 h-11 md:w-24 md:h-16 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomePageMenuGrid;
