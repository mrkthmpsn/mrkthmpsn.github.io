'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import HomePageMenuGrid from './homePageMenuGrid';

interface MenuButtonData {
  id: string;
  label: string;
  subItems: Array<{
    id: string;
    label: string;
    href: string;
    linkType?: 'gallery' | 'project' | 'page';
    thumbnail?: string;
  }>;
}

interface HomePageMenuSystemProps {
  className?: string;
}

// 2x2 grid layout: [0][1] / [2][3] — clockwise order
const CLOCKWISE_ORDER = [0, 1, 3, 2];
const IDLE_RESUME_DELAY = 4000;

const HomePageMenuSystem: React.FC<HomePageMenuSystemProps> = ({
  className = ''
}) => {
  const [hoveredButtonId, setHoveredButtonId] = useState<string | null>(null);
  const [isLandscape, setIsLandscape] = useState<boolean>(true);
  const [isIdle, setIsIdle] = useState<boolean>(true);
  const [clockwiseStep, setClockwiseStep] = useState<number>(0);
  const [isLeafHovered, setIsLeafHovered] = useState<boolean>(false);
  const cycleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track orientation changes
  useEffect(() => {
    const updateOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    return () => window.removeEventListener('resize', updateOrientation);
  }, []);

  // Button data based on content categorization
  const buttonData: MenuButtonData[] = [
    {
      id: 'dream-big-build-manageable',
      label: 'Dream Big, Build Manageable',
      subItems: [
        { id: 'visualisations', label: 'Visualisations', href: '/galleries/dream-big-build-manageable/visualisations', linkType: 'gallery' },
        { id: 'code-structure', label: 'Code Structure', href: '/galleries/dream-big-build-manageable/code-structure', linkType: 'gallery', thumbnail: '/images/galleries/debug_buildup_app.png' },
        { id: 'ideas-pragmatism', label: 'Ideas & Pragmatism', href: '/galleries/dream-big-build-manageable/ideas-pragmatism', linkType: 'gallery', thumbnail: '/images/data-feature-ranker/battle-screen.png' }
      ]
    },
    {
      id: 'communication',
      label: 'Communication',
      subItems: [
        { id: 'written', label: 'Written', href: '/galleries/communication/written', linkType: 'gallery', thumbnail: '/images/galleries/get_goalside_thumb.png' },
        { id: 'interpersonal', label: 'Interpersonal', href: '/galleries/communication/interpersonal', linkType: 'gallery', thumbnail: '/images/galleries/xg_timeline_design_thumb.png' },
        { id: 'visual', label: 'Visual', href: '/galleries/communication/visual', linkType: 'gallery' }
      ]
    },
    {
      id: 'technical',
      label: 'Technical',
      subItems: [
        { id: 'api-development', label: 'API Development', href: '/galleries/technical/api-development', linkType: 'gallery' },
        { id: 'python-development', label: 'Python Development', href: '/galleries/technical/python-development', linkType: 'gallery', thumbnail: '/images/galleries/custom-fonts-example-squawka.png' },
        { id: 'react-fe', label: 'React & FE', href: '/galleries/technical/react-fe', linkType: 'gallery', thumbnail: '/images/galleries/football-tracker-app-full-screen.png' }
      ]
    },
    {
      id: 'industry-knowledge',
      label: 'Industry Knowledge',
      subItems: [
        { id: 'data-providers', label: 'Data Providers', href: '/galleries/industry-knowledge/data-providers', linkType: 'gallery' },
        { id: 'market', label: 'Market', href: '/galleries/industry-knowledge/market', linkType: 'gallery', thumbnail: '/images/galleries/get_goalside_thumb.png' },
        { id: 'data-usage', label: 'Data Usage', href: '/galleries/industry-knowledge/data-usage', linkType: 'gallery', thumbnail: '/images/data-feature-ranker/global-rankings.png' }
      ]
    }
  ];

  // Start/stop the cycling interval based on idle state
  useEffect(() => {
    if (isIdle) {
      cycleIntervalRef.current = setInterval(() => {
        setClockwiseStep(prev => (prev + 1) % CLOCKWISE_ORDER.length);
      }, 5000);
    }

    return () => {
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
        cycleIntervalRef.current = null;
      }
    };
  }, [isIdle]);

  // Clean up idle timeout on unmount
  useEffect(() => {
    return () => {
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  const pauseCycling = useCallback(() => {
    setIsIdle(false);
    if (cycleIntervalRef.current) {
      clearInterval(cycleIntervalRef.current);
      cycleIntervalRef.current = null;
    }
    // Cancel any pending idle resume
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
  }, []);

  const scheduleIdleResume = useCallback(() => {
    // Cancel any existing timeout
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      setHoveredButtonId(null);
      setIsIdle(true);
    }, IDLE_RESUME_DELAY);
  }, []);

  // Hover enters a button — activate it, pause cycling
  const handleButtonHover = useCallback((buttonId: string) => {
    pauseCycling();
    setIsLeafHovered(false);
    setHoveredButtonId(buttonId);
  }, [pauseCycling]);

  // Click/tap a button — toggle for mobile support
  const handleButtonSelect = useCallback((buttonId: string | null) => {
    pauseCycling();
    setHoveredButtonId(buttonId);
  }, [pauseCycling]);

  // Cursor leaves the entire menu area — schedule idle resume
  const handleMenuMouseLeave = useCallback(() => {
    scheduleIdleResume();
  }, [scheduleIdleResume]);

  // Cancel idle resume if cursor re-enters menu area
  const handleMenuMouseEnter = useCallback(() => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
  }, []);

  const previewIndex = CLOCKWISE_ORDER[clockwiseStep];
  const previewButtonId = isIdle ? buttonData[previewIndex].id : null;
  const activeButtonId = hoveredButtonId || previewButtonId;
  const activeButton = buttonData.find(button => button.id === activeButtonId);

  const handleSubMenuItemClick = (item: { id: string; label: string; href: string }) => {
    window.location.href = item.href;
  };

  return (
    <div
      className={`relative flex flex-col items-center gap-4 ${className}`}
      onMouseLeave={handleMenuMouseLeave}
      onMouseEnter={handleMenuMouseEnter}
    >
      <HomePageMenuGrid
        buttons={buttonData}
        onButtonSelect={handleButtonSelect}
        onButtonHover={handleButtonHover}
        onItemClick={handleSubMenuItemClick}
        onMenuMouseEnter={handleMenuMouseEnter}
        onMenuMouseLeave={handleMenuMouseLeave}
        onItemHoverChange={setIsLeafHovered}
        selectedButtonId={hoveredButtonId}
        previewButtonId={previewButtonId}
        activeButtonId={activeButtonId}
        isIdle={isIdle}
        isLeafHovered={isLeafHovered}
      />
    </div>
  );
};

export default HomePageMenuSystem;
