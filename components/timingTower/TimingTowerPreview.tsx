import React from 'react';
import { TimingTowerItem } from '@/data/timingTowerItems';

interface TimingTowerPreviewProps {
  item: TimingTowerItem | null;
  variant: 'desktop' | 'mobile';
}

const TimingTowerPreview: React.FC<TimingTowerPreviewProps> = ({
  item,
  variant,
}) => {
  if (variant === 'desktop') {
    return (
      <div
        className={`hidden md:block transition-all duration-500 ease-in-out ${
          item
            ? 'opacity-100 translate-x-0 max-w-sm'
            : 'opacity-0 -translate-x-4 max-w-0'
        } overflow-hidden`}
      >
        {item && <PreviewContent item={item} />}
      </div>
    );
  }

  // Mobile: inline accordion
  return (
    <div
      className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
        item ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      {item && <PreviewContent item={item} />}
    </div>
  );
};

const PreviewContent: React.FC<{ item: TimingTowerItem }> = ({ item }) => {
  return (
    <div
      key={item.id}
      className="bg-gray-300 md:bg-gray-300/70 md:backdrop-blur-xl border border-white/40 rounded-none md:rounded-xl p-2 md:p-4 animate-fadeIn w-full md:w-72"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-sm">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Title — hidden on mobile since it's directly below the timing tower title */}
      <h3 className="hidden md:block font-['Barlow'] text-brandLightBlue-950 font-bold text-base text-left p-0 m-0 mt-2">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-brandLightBlue-800 text-sm leading-snug font-['Barlow'] text-left mt-1 mb-2">
        {item.description}
      </p>

      {/* Tags — hidden on mobile to save space */}
      <p className="hidden md:block text-brandLightBlue-500 text-[10px] font-['Barlow'] uppercase tracking-wider text-left mb-3">
        {item.tags.join(' / ')}
      </p>

      {/* CTA */}
      <a
        href={item.href}
        {...(item.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-brandLightBlue-700 hover:bg-brandLightBlue-600 px-3 py-1.5 rounded-lg transition-colors font-['Barlow'] no-underline"
      >
        {item.isExternal ? (
          <>
            Read on Get Goalside
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </>
        ) : (
          'View Project'
        )}
      </a>
    </div>
  );
};

export default TimingTowerPreview;
