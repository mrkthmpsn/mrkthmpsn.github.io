'use client';

import React, { useState, useEffect } from 'react';
import HomePageMenuGrid from './homePageMenuGrid';
import HomePageSubMenu from './homePageSubMenu';

interface MenuButtonData {
  id: string;
  label: string;
  subItems: Array<{
    id: string;
    label: string;
    href: string;
    linkType?: 'gallery' | 'project' | 'page';
  }>;
}

interface HomePageMenuSystemProps {
  className?: string;
}

const HomePageMenuSystem: React.FC<HomePageMenuSystemProps> = ({
  className = ''
}) => {
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null);
  const [isLandscape, setIsLandscape] = useState<boolean>(true);

  // Track orientation changes
  useEffect(() => {
    const updateOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    return () => window.removeEventListener('resize', updateOrientation);
  }, []);

  // Example button data - this can be moved to where the component is used
  const buttonData: MenuButtonData[] = [
    {
      id: 'industry-knowledge',
      label: 'Industry Knowledge',
      subItems: [
        { id: 'data-availability', label: 'Data Availability', href: '/projects/data-availability', linkType: 'project' },
        { id: 'market', label: 'Market', href: '/galleries/market', linkType: 'gallery' },
        { id: 'data-usage', label: 'Data Usage', href: '/galleries/data-usage', linkType: 'gallery' }
      ]
    },
    {
      id: 'technical-skills',
      label: 'Technical Skills',
      subItems: [
        { id: 'programming', label: 'Programming', href: '/projects/programming', linkType: 'project' },
        { id: 'data-analysis', label: 'Data Analysis', href: '/projects/data-analysis', linkType: 'project' },
        { id: 'visualization', label: 'Visualization', href: '/projects/visualization', linkType: 'project' }
      ]
    },
    {
      id: 'projects',
      label: 'Projects',
      subItems: [
        { id: 'football-analytics', label: 'Football Analytics', href: '/projects/football-analytics', linkType: 'project' },
        { id: 'web-development', label: 'Web Development', href: '/projects/web-development', linkType: 'project' },
        { id: 'data-science', label: 'Data Science', href: '/projects/data-science', linkType: 'project' }
      ]
    },
    {
      id: 'experience',
      label: 'Experience',
      subItems: [
        { id: 'professional', label: 'Professional', href: '/about/professional', linkType: 'page' },
        { id: 'education', label: 'Education', href: '/about/education', linkType: 'page' },
        { id: 'certifications', label: 'Certifications', href: '/about/certifications', linkType: 'page' }
      ]
    }
  ];

  const selectedButton = buttonData.find(button => button.id === selectedButtonId);

  const handleButtonSelect = (buttonId: string | null) => {
    setSelectedButtonId(buttonId);
  };

  const handleSubItemClick = (buttonId: string, subItemId: string, href: string) => {
    // Navigate to the page
    window.location.href = href;
  };

  const handleSubMenuItemClick = (item: { id: string; label: string; href: string; linkType?: 'gallery' | 'project' | 'page' }) => {
    window.location.href = item.href;
  };

  // Determine position based on selected button and screen orientation
  const getSubMenuPosition = () => {
    if (!selectedButtonId) return '';

    const buttonIndex = buttonData.findIndex(button => button.id === selectedButtonId);
    
    // Landscape mode: 2x2 grid
    // Index 0,2 = left side, Index 1,3 = right side
    if (isLandscape) {
      return buttonIndex === 0 || buttonIndex === 2 
        ? 'absolute right-full top-0 mr-4' // Left side buttons -> submenu on left
        : 'absolute left-full top-0 ml-4'; // Right side buttons -> submenu on right
    } 
    // Portrait mode: 1x4 column
    // Index 0,1 = top half, Index 2,3 = bottom half
    else {
      return buttonIndex <= 1
        ? 'absolute bottom-full left-0 mb-4' // Top half buttons -> submenu above
        : 'absolute top-full left-0 mt-4'; // Bottom half buttons -> submenu below
    }
  };

  return (
    <div className={`relative ${className}`}>
      <HomePageMenuGrid
        buttons={buttonData}
        onButtonSelect={handleButtonSelect}
        onSubItemClick={handleSubItemClick}
        selectedButtonId={selectedButtonId}
      />
      
      {selectedButton && (
        <HomePageSubMenu
          items={selectedButton.subItems}
          onItemClick={handleSubMenuItemClick}
          className={getSubMenuPosition()}
        />
      )}
    </div>
  );
};

export default HomePageMenuSystem;