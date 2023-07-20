import React,{ useState, FC, useEffect } from 'react';
import LedButton from './ledbutton';
import RGBSlider from './RGBslider';
import { Color } from '@react-stately/color';

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
      <h2>Player {props.player}</h2>
      <LedButton/>
      <RGBSlider setColor={props.setColor} />
    </div>
  );
}

export default Player;