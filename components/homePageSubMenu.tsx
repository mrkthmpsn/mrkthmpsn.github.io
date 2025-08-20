'use client';

import React from 'react';

interface SubMenuItem {
  id: string;
  label: string;
  href: string;
}

interface HomePageSubMenuProps {
  items: SubMenuItem[];
  onItemClick: (item: SubMenuItem) => void;
  className?: string;
}

const HomePageSubMenu: React.FC<HomePageSubMenuProps> = ({
  items,
  onItemClick,
  className = ''
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`
      flex flex-col gap-2
      bg-brandLightBlue-200 bg-opacity-80 backdrop-blur-sm
      border border-brandLightBlue-400 border-opacity-30
      rounded-lg p-3
      ${className}
    `}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick(item)}
          className="
            px-3 py-2 text-lg md:text-xl
            bg-white bg-opacity-60 hover:bg-opacity-80
            border border-brandLightBlue-300 border-opacity-40
            rounded text-brandLightBlue-900 hover:text-brandLightBlue-950
            transition-all duration-150
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