import React,{ useState, FC, useEffect } from 'react';
import RGBSlider from './RGBslider';

interface SetStateFunction<T> {
  (newValue: T): void;
}

interface rgbColor {
  red: number;
  green: number;
  blue: number;
}

interface PlayerProps {
  player: string;
  setColor: SetStateFunction<rgbColor>;
}


const Player: FC<PlayerProps> = (props) => {

  return (
    <div>
      <h2 className="text-3xl font-bold underline">Player {props.player}</h2>
      <RGBSlider setColor={props.setColor} />
    </div>
  );
}

export default Player;