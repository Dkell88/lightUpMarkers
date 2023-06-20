import React, { useState } from 'react';

export default function RGBSlider({onColorChange}: any) {
  const [color, setColor] = useState({red: 0, green: 0, blue: 0});

  const handleChange = (event: any) => {
    setColor({
      ...color,
      [event.target.name]: parseInt(event.target.value, 10)
    });
  }

  const handleMouseUp = () => {
    const {red, green, blue} = color;
    onColorChange(red, green, blue);
  }

  return (
    <div>
      <input type="range" name="red" min="0" max="255" value={color.red} onChange={handleChange} onMouseUp={handleMouseUp} />
      <input type="range" name="green" min="0" max="255" value={color.green} onChange={handleChange} onMouseUp={handleMouseUp} />
      <input type="range" name="blue" min="0" max="255" value={color.blue} onChange={handleChange} onMouseUp={handleMouseUp} />
    </div>
  );
}
