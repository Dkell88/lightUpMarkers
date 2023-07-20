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
  const [player2Color, setPlayer2Color] = useState<rgbColor>({red: 0, green: 0, blue: 0});

  const handleColorChange = (color: rgbColor) => {
    setPlayer1Color(color);
    console.log(JSON.stringify(color));
    // Here you can also call the function to send request to ESP-01 server.
  }

  return (
    <main>
      <h2 className="text-2xl font-bold my-20">Configuration Page</h2>
      <h3 className="text-1xl my-10">Use this page to configure the players marker colours.</h3>
        <div className="flex flex-row justify-around">
          <div>
            <Player player ={'1'} setColor ={setPlayer1Color} colour={player1Color}></Player>
          </div>
          <div>
            <Player player ={'2'} setColor ={setPlayer2Color} colour={player2Color}></Player>
          </div>
        </div>
    </main>
  );
}

export default Config;




