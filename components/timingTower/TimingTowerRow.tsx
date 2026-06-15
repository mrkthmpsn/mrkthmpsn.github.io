import React from 'react';
import { TimingTowerItem, TEAM_COLORS } from '@/data/timingTowerItems';
import TeamIcon from './TeamIcon';

interface TimingTowerRowProps {
  item: TimingTowerItem;
  isActive: boolean;
  isIdleCycling: boolean;
  isLast: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string) => void;
}

const TimingTowerRow: React.FC<TimingTowerRowProps> = ({
  item,
  isActive,
  isIdleCycling,
  isLast,
  onSelect,
  onHover,
}) => {
  const positionBg =
    item.position === 1
      ? 'bg-ggOrange-500'
      : item.position <= 3
        ? 'bg-brandLightBlue-700'
        : 'bg-brandLightBlue-950';

  const rowBg = isActive
    ? isIdleCycling
      ? 'bg-white/10'
      : 'bg-white/15'
    : '';

  const teamColor = TEAM_COLORS[item.team];

  return (
    <div
      role="button"
      tabIndex={0}
      className={`flex items-center gap-0 cursor-pointer transition-colors duration-300 ${rowBg} ${!isLast ? 'border-b border-white/10' : ''}`}
      onClick={() => onSelect(item.id)}
      onMouseEnter={() => onHover(item.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item.id);
        }
      }}
    >
      {/* Position badge */}
      <div
        className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center ${positionBg} text-white font-['Barlow'] font-bold text-xs md:text-sm`}
      >
        {item.position}
      </div>

      {/* Team colour strip */}
      <div
        className="flex-shrink-0 w-1 h-7 md:h-8"
        style={{ backgroundColor: teamColor }}
      />

      {/* Team icon */}
      <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 mx-1.5 md:mx-2">
        <TeamIcon team={item.team} className="w-full h-full" />
      </div>

      {/* Title */}
      <span className="flex-1 font-['Barlow'] text-white text-sm md:text-base truncate">
        {item.title}
      </span>

      {/* Subtitle — secondary category on the right */}
      <span className="hidden md:inline flex-shrink-0 text-[11px] text-white/40 font-['Barlow'] uppercase tracking-wider pr-3">
        {item.subtitle}
      </span>
    </div>
  );
};

export default TimingTowerRow;
