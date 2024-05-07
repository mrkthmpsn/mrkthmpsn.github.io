import React from "react";

const VideoScrubber = ({ min, max, onChange, currentIndex }) => {
  const handleSliderChange = (event) => {
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
