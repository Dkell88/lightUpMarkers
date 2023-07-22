import React,{ FC } from 'react';
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
  colour: rgbColor;
  id: number;
}


const ColourConfig: FC<PlayerProps> = (props) => {

  return (
    <div className ="flex flex-col items-center">
      <h2 className="text-3xl font-bold underline mb-10">{props.player}</h2>
      <RGBSlider setColor={props.setColor} colour={props.colour} player={props.player} id={props.id}/>
    </div>
  );
}

export default ColourConfig;