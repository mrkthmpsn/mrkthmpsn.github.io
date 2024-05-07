import React, { ChangeEvent } from "react";

interface VideoScrubberProps {
  min: number;
  max: number;
  onChange: CallableFunction;
  currentIndex: number;
}

const VideoScrubber: React.FC<VideoScrubberProps> = ({
  min,
  max,
  onChange,
  currentIndex,
}) => {
  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFrame = parseInt(event.target.value, 10);
    onChange(newFrame);
  };

  return (
    <div className="col-span-2 text-xs text-center md:text-sm lg:text-base">
      <input
        type="range"
        min={min}
        max={max}
        value={currentIndex}
        onChange={handleSliderChange}
        style={{ width: "80%" }}
      />
      <div>Frame: {currentIndex + 1}/120</div>
    </div>
  );
};

export default VideoScrubber;
