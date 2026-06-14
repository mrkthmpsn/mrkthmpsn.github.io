import React from 'react';
import { TeamCategory, TEAM_COLORS } from '@/data/timingTowerItems';

interface TeamIconProps {
  team: TeamCategory;
  className?: string;
}

const TeamIcon: React.FC<TeamIconProps> = ({ team, className = '' }) => {
  const color = TEAM_COLORS[team];

  const icons: Record<TeamCategory, React.ReactNode> = {
    // React atom logo
    react: (
      <svg viewBox="-11 -11 22 22" className={className}>
        <circle r="2" fill={color} />
        <g stroke={color} strokeWidth="1" fill="none">
          <ellipse rx="10" ry="4.5" />
          <ellipse rx="10" ry="4.5" transform="rotate(60)" />
          <ellipse rx="10" ry="4.5" transform="rotate(120)" />
        </g>
      </svg>
    ),
    // Python — two interlocking snakes (simplified)
    python: (
      <svg viewBox="0 0 24 24" className={className} fill={color}>
        <path d="M12 2C8.13 2 7.5 3.78 7.5 3.78V6H12.25v.75H5.5S2 6.25 2 12s2.75 5.5 2.75 5.5H6.5v-2.65s-.13-2.75 2.75-2.75h4.5s2.6.04 2.6-2.5V5.5S16.75 2 12 2zm-1.88 2.06a.94.94 0 110 1.88.94.94 0 010-1.88z" />
        <path d="M12 22c3.87 0 4.5-1.78 4.5-1.78V18h-4.75v-.75h6.75S22 17.75 22 12s-2.75-5.5-2.75-5.5H17.5v2.65s.13 2.75-2.75 2.75h-4.5s-2.6-.04-2.6 2.5v4.1S6.25 22 12 22zm1.88-2.06a.94.94 0 110-1.88.94.94 0 010 1.88z" opacity="0.7" />
      </svg>
    ),
    // Data engineering — database/cylinder icon
    'data-eng': (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.5">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      </svg>
    ),
    // Writing — pen/nib icon
    writing: (
      <svg viewBox="0 0 24 24" className={className} fill={color}>
        <path d="M3 21l1.65-3.8a.85.85 0 01.25-.34l11.36-11.36a2.12 2.12 0 013 0l1.24 1.24a2.12 2.12 0 010 3L9.14 21.1a.85.85 0 01-.34.25L5 23l-2-2zm3.56-2.56l1-.44 9.9-9.9-1.06-1.06-9.9 9.9-.44 1 1.5.5z" />
      </svg>
    ),
  };

  return <>{icons[team]}</>;
};

export default TeamIcon;
