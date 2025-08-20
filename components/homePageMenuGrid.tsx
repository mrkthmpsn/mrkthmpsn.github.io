'use client';

import React, { useState } from 'react';
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
  onSubItemClick: (buttonId: string, subItemId: string, href: string) => void;
  selectedButtonId?: string | null;
  className?: string;
}

const HomePageMenuGrid: React.FC<HomePageMenuGridProps> = ({
  buttons,
  onButtonSelect,
  onSubItemClick,
  selectedButtonId = null,
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
          onClick={() => {
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