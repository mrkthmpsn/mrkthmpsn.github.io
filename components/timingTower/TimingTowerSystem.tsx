'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import timingTowerItems from '@/data/timingTowerItems';
import TimingTower from './TimingTower';
import TimingTowerPreview from './TimingTowerPreview';

const CYCLE_INTERVAL = 5000;
const IDLE_RESUME_DELAY = 4000;

const TimingTowerSystem: React.FC = () => {
  const [isIdle, setIsIdle] = useState(true);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const cycleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-cycle when idle
  useEffect(() => {
    if (isIdle) {
      cycleIntervalRef.current = setInterval(() => {
        setCycleIndex((prev) => (prev + 1) % timingTowerItems.length);
      }, CYCLE_INTERVAL);
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
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
  }, []);

  const scheduleIdleResume = useCallback(() => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      setSelectedItemId(null);
      setIsIdle(true);
    }, IDLE_RESUME_DELAY);
  }, []);

  const handleSelectItem = useCallback(
    (id: string) => {
      pauseCycling();
      setSelectedItemId(id);
    },
    [pauseCycling]
  );

  const handleMouseLeave = useCallback(() => {
    scheduleIdleResume();
  }, [scheduleIdleResume]);

  const handleContainerMouseEnter = useCallback(() => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
  }, []);

  // Track activeItemId in a ref so handleKeyDown stays stable
  const activeItemIdRef = useRef<string | null>(null);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentId = activeItemIdRef.current;
      const currentIndex = timingTowerItems.findIndex(
        (item) => item.id === currentId
      );

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        pauseCycling();
        const nextIndex = (currentIndex + 1) % timingTowerItems.length;
        setSelectedItemId(timingTowerItems[nextIndex].id);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        pauseCycling();
        const prevIndex =
          (currentIndex - 1 + timingTowerItems.length) %
          timingTowerItems.length;
        setSelectedItemId(timingTowerItems[prevIndex].id);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = timingTowerItems.find((i) => i.id === currentId);
        if (item) {
          if (item.isExternal) {
            window.open(item.href, '_blank', 'noopener,noreferrer');
          } else {
            window.location.href = item.href;
          }
        }
      }
    },
    [pauseCycling]
  );

  // Determine active item
  const cycleItemId = timingTowerItems[cycleIndex]?.id ?? null;
  const activeItemId = isIdle ? cycleItemId : selectedItemId;
  const activeItem =
    timingTowerItems.find((item) => item.id === activeItemId) ?? null;

  // Keep ref in sync for keyboard handler
  activeItemIdRef.current = activeItemId;

  return (
    <div
      className="flex flex-col md:flex-row items-start gap-3"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleContainerMouseEnter}
      onKeyDown={handleKeyDown}
    >
      {/* Tower */}
      <div className="w-80 md:w-auto md:min-w-[320px] lg:min-w-[380px]">
        <TimingTower
          items={timingTowerItems}
          activeItemId={activeItemId}
          isIdle={isIdle}
          onSelectItem={handleSelectItem}
          onHoverItem={handleSelectItem}
        />
      </div>

      {/* Desktop preview panel */}
      <TimingTowerPreview item={activeItem} variant="desktop" />
    </div>
  );
};

export default TimingTowerSystem;
