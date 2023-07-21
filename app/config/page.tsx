'use client'
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import Player from '../components/colorConfig';

interface rgbColor {
  red: number;
  green: number;
  blue: number;
}

const Config: React.FC = () => {
  const [player1Color, setPlayer1Color] = useState<rgbColor>({red: 0, green: 0, blue: 0});
  const [player2Color, setPlayer2Color] = useState<rgbColor>({red: 0, green: 0, blue: 0});

  const [player1, setPlayer1] = useState<string>('Player 1');
  const [player2, setPlayer2] = useState<string>('Player 2');

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

  console.log(savedPlayer1)
  const savedPlayer1Color = window.localStorage.getItem(`${savedPlayer1}Colour`);
  const savedPlayer2Color = window.localStorage.getItem(`${savedPlayer2}Colour`);
  console.log(savedPlayer1Color)
    if (savedPlayer1Color) {
      console.log("Yes there is a saved color")
      const parsedPlayer1Color = JSON.parse(savedPlayer1Color);
      setPlayer1Color(parsedPlayer1Color);
    }
    if (savedPlayer2Color) {
      const parsedPlayer2Color = JSON.parse(savedPlayer2Color);
      setPlayer2Color(parsedPlayer2Color);
    }

  }, []);


  // const handleChange = (set: (name: string) => void) => (event: ChangeEvent<HTMLInputElement>) => {
  //   set(event.target.value);
  // }
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
      <div  className="flex flex-row justify-around">
        <form>
          <label htmlFor="player1">Player 1:</label>
          <input type="text" id="player1" name="player1" value={player1} onChange={handleChange('player1', setPlayer1)} />
        </form>
        <form>
          <label htmlFor="player2">Player 2:</label>
          <input type="text" id="player2" name="player2" value={player2} onChange={handleChange('player2', setPlayer2)} />
        </form>
      </div>
        <div className="flex flex-row justify-around">
          <div>
            <Player player ={player1} setColor ={setPlayer1Color} colour={player1Color} key = {1}></Player>
          </div>
          <div>
            <Player player ={player2} setColor ={setPlayer2Color} colour={player2Color} key= {2}></Player>
          </div>
        </div>
    </main>
  );
}

export default Config;

