'use client'
import React, { useState } from 'react';
import Player from '../components/colorConfig';

interface rgbColor {
  red: number;
  green: number;
  blue: number;
}

const Config: React.FC = () => {
  const [player1Color, setPlayer1Color] = useState<rgbColor>({red: 0, green: 0, blue: 0});

  const handleColorChange = (color: rgbColor) => {
    setPlayer1Color(color);
    console.log(JSON.stringify(color));
    // Here you can also call the function to send request to ESP-01 server.
  }

  return (
    <main>
      <p>This is the config page</p>
      <Player player ={'1'} setColor ={setPlayer1Color}></Player>
    </main>
  );
}

export default Config;




