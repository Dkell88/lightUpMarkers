'use client'
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import ColourConfig from '../components/colorConfig';
import BSlider from '../components/brightnessSlider';

interface rgbColor {
  red: number;
  green: number;
  blue: number;
}

const ipAddresses = [
"192.168.86.101",
"192.168.86.102",
"192.168.86.103",
"192.168.86.104",
"192.168.86.105",
"192.168.86.106"];

const Config: React.FC = () => {
  const [player1Color, setPlayer1Color] = useState<rgbColor>({red: 0, green: 0, blue: 0});
  const [player2Color, setPlayer2Color] = useState<rgbColor>({red: 0, green: 0, blue: 0});

  const [player1, setPlayer1] = useState<string>('Player 1');
  const [player2, setPlayer2] = useState<string>('Player 2');

  const [brightness, setBrightness] = useState(50); // Initial value can be adjusted

  const handleBrightnessChange = async (newBrightness: number) => {
    // Handle any additional logic you want when the brightness changes
    setBrightness(newBrightness);
    try {
      const fetchPromises = ipAddresses.map(async (ip) => {
        const response = await fetch(`http://${ip}/led/brightness?b=${newBrightness}`, {
          method: 'GET'
        });
  
        const text = await response.text();
        console.log(`Response from ${ip}:`, text);
      });
  
      await Promise.all(fetchPromises);
      console.log('All fetch commands completed successfully.');
    } catch (error) {
      console.log('Error occurred during fetch commands:', error);
    }
  };

  // when the component mounts, retrieve the name from localStorage
  useEffect(() => {
    const savedPlayer1 = window.localStorage.getItem('player1');
    const savedPlayer2 = window.localStorage.getItem('player2');

    if (savedPlayer1) {
      setPlayer1(savedPlayer1);
    }
    if (savedPlayer2) {
      setPlayer2(savedPlayer2);
    }

  const savedPlayer1Color = window.localStorage.getItem(`Player1Colour`);
  const savedPlayer2Color = window.localStorage.getItem(`Player2Colour`);

    if (savedPlayer1Color) {
      const parsedPlayer1Color = JSON.parse(savedPlayer1Color);
      setPlayer1Color(parsedPlayer1Color);
    }
    if (savedPlayer2Color) {
      const parsedPlayer2Color = JSON.parse(savedPlayer2Color);
      setPlayer2Color(parsedPlayer2Color);
    }

  }, []);


  const handleChange = (player: string, set: (name: string) => void) => (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    set(name);
    // save the name to localStorage
    window.localStorage.setItem(player, name);
  }

  return (
    <main>
      <h2 className="text-2xl font-bold my-20">Configuration Page</h2>
      <h3 className="text-1xl my-10">Use this page to configure the players marker colours.</h3>
      <div className="border-4 pt-5">
        <div  className="flex flex-row justify-around">
          <form >
            <label htmlFor="player1" className="mx-5">Player 1:</label>
            <input className="border-4" type="text" id="player1" name="player1" value={player1} onChange={handleChange('player1', setPlayer1)} />
          </form>
          <form>
            <label htmlFor="player2">Player 2:</label>
            <input className="border-4" type="text" id="player2" name="player2" value={player2} onChange={handleChange('player2', setPlayer2)} />
          </form>
        </div>
          <div className="flex flex-row justify-around">
            <div>
              <ColourConfig player ={player1} setColor ={setPlayer1Color} colour={player1Color} id = {1}></ColourConfig>
            </div>
            <div>
              <ColourConfig player ={player2} setColor ={setPlayer2Color} colour={player2Color} id= {2}></ColourConfig>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-around my-5 py-5 border-4">
          <BSlider onChange={handleBrightnessChange} initialValue={brightness} />
        </div>
    </main>
  );
}

export default Config;

