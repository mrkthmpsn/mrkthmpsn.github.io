'use client';

import React from 'react';
import HomePageMenuButton from './homePageMenuButton';

interface MenuButtonData {
  id: string;
  label: string;
  subItems: Array<{
    id: string;
    label: string;
    href: string;
  }>;
}

interface HomePageMenuGridProps {
  buttons: MenuButtonData[];
  onButtonSelect: (buttonId: string | null) => void;
  onButtonHover: (buttonId: string) => void;
  selectedButtonId?: string | null;
  previewButtonId?: string | null;
  isLeafHovered?: boolean;
  className?: string;
}

const HomePageMenuGrid: React.FC<HomePageMenuGridProps> = ({
  buttons,
  onButtonSelect,
  onButtonHover,
  selectedButtonId = null,
  previewButtonId = null,
  isLeafHovered = false,
  className = ''
}) => {
  return (
    <div className={`
      grid gap-2 md:gap-3
      grid-cols-1 portrait:grid-cols-1 portrait:grid-rows-4
      landscape:grid-cols-2 landscape:grid-rows-2
      ${className}
    `}>
      {buttons.map((button) => (
        <HomePageMenuButton
          key={button.id}
          label={button.label}
          isSelected={selectedButtonId === button.id}
          isPreview={!selectedButtonId && previewButtonId === button.id}
          isLeafHovered={selectedButtonId === button.id && isLeafHovered}
          onMouseEnter={() => onButtonHover(button.id)}
          onClick={() => {
            // Toggle on tap (mobile) — if already selected, deselect
            if (selectedButtonId === button.id) {
              onButtonSelect(null);
            } else {
              onButtonSelect(button.id);
            }
          }}
        />
      ))}
    </div>
  );
};

export default HomePageMenuGrid;
