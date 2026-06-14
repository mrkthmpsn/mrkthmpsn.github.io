import React from 'react';
import { TimingTowerItem } from '@/data/timingTowerItems';
import TimingTowerRow from './TimingTowerRow';
import TimingTowerPreview from './TimingTowerPreview';

interface TimingTowerProps {
  items: TimingTowerItem[];
  activeItemId: string | null;
  isIdle: boolean;
  onSelectItem: (id: string) => void;
  onHoverItem: (id: string) => void;
  onMouseLeave: () => void;
}

const TimingTower: React.FC<TimingTowerProps> = ({
  items,
  activeItemId,
  isIdle,
  onSelectItem,
  onHoverItem,
  onMouseLeave,
}) => {
  const activeItem = items.find((item) => item.id === activeItemId) ?? null;

  // Mobile pagination: split tower into two pages, show the page containing the active item
  const pageSize = Math.ceil(items.length / 2);
  const activeIndex = items.findIndex((item) => item.id === activeItemId);
  const activePage = activeIndex >= 0 ? Math.floor(activeIndex / pageSize) : 0;

  return (
    <div className="bg-brandLightBlue-950/90 backdrop-blur-sm overflow-hidden">
      {/* Header — large stylised name as visual focal point */}
      <div className="px-4 py-4 md:px-5 md:py-5 border-b border-white/10">
        <div className="font-['Barlow'] text-2xl md:text-3xl tracking-tight leading-none">
          <span className="font-extrabold text-white">MARK</span>
          <span className="font-light text-brandLightBlue-300 ml-2">THOMPSON</span>
        </div>
      </div>

      {/* Tower rows */}
      <div className="flex flex-col">
        {items.map((item, index) => {
          const itemPage = Math.floor(index / pageSize);
          const isOnActivePage = itemPage === activePage;

          return (
            <div key={item.id} className={isOnActivePage ? '' : 'hidden md:block'}>
              <TimingTowerRow
                item={item}
                isActive={activeItemId === item.id}
                isIdleCycling={isIdle}
                isLast={index === items.length - 1}
                onSelect={onSelectItem}
                onHover={onHoverItem}
                onMouseLeave={onMouseLeave}
              />
              {/* Mobile inline preview — rendered after active row */}
              {activeItemId === item.id && (
                <TimingTowerPreview
                  item={activeItem}
                  variant="mobile"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimingTower;
