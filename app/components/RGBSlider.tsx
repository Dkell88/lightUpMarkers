import React, { useState } from 'react';

interface Color {
  red: number;
  green: number;
  blue: number;
}

interface RGBSliderProps {
  onColorChange: (color: Color) => void;
}

const RGBSlider: React.FC<RGBSliderProps> = ({onColorChange}) => {
  const [color, setColor] = useState<Color>({red: 0, green: 0, blue: 0});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor({
      ...color,
      [event.target.name]: parseInt(event.target.value, 10)
    });
  }

  const handleMouseUp = () => {
    onColorChange(color);
  }

  return (
    <div>
      <input type="range" name="red" min="0" max="255" value={color.red} onChange={handleChange} onMouseUp={handleMouseUp} />
      <input type="range" name="green" min="0" max="255" value={color.green} onChange={handleChange} onMouseUp={handleMouseUp} />
      <input type="range" name="blue" min="0" max="255" value={color.blue} onChange={handleChange} onMouseUp={handleMouseUp} />
    </div>
  );
}

export default RGBSlider;