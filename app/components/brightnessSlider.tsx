import React, { useState } from 'react';

type SliderProps = {
  onChange: (brightness: number) => void;
  initialValue: number;
};

const Slider: React.FC<SliderProps> = ({ onChange, initialValue }) => {
  const [brightness, setBrightness] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setBrightness(value);
    setIsDragging(true);
  };

  const handleSliderRelease = () => {
    onChange(brightness);
    setIsDragging(false);
  };

  return (
    <div className="flex items-center">
      <label htmlFor="brightnessSlider" className="mr-4">
        Brightness:
      </label>
      <input
        id="brightnessSlider"
        type="range"
        min="0"
        max="100"
        step="1"
        value={brightness}
        onChange={handleSliderChange}
        onMouseUp={handleSliderRelease}
        onTouchEnd={handleSliderRelease}
        className="w-40 appearance-none bg-gray-300 h-2 rounded-full outline-none"
      />
      <span className="ml-4">{brightness}</span>
    </div>
  );
};

export default Slider;
