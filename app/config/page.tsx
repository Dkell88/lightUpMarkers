'use client'
import React, { useState } from 'react';
import RGBSlider from '../components/RGBSlider';

interface Color {
  red: number;
  green: number;
  blue: number;
}

const ParentComponent: React.FC = () => {
  const [player1Color, setPlayer1Color] = useState<Color>({red: 0, green: 0, blue: 0});

  const handleColorChange = (color: Color) => {
    setPlayer1Color(color);
    console.log(JSON.stringify(color));
    // Here you can also call the function to send request to ESP-01 server.
  }

  return (
    <div>
      <h1>Configuration</h1>
      <RGBSlider onColorChange={handleColorChange} />
    </div>
  );
}

export default ParentComponent;




