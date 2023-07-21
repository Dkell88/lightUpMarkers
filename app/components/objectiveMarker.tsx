// @ts-ignore
'use client'
import { parseColor, Color } from '@react-stately/color';
import { useState, FC } from 'react';
import hsvToRgb from '../helpers/HuetoRGB'

interface rgbColor {
  red: number;
  green: number;
  blue: number;
}

interface SetStateFunction<T> {
  (newValue: T): void;
}
interface objMarkerProps {
  setColor: SetStateFunction<rgbColor>;
  colour: rgbColor;
  player: string;
  key: number;
}

const objMarker: FC<objMarkerProps> = (props) => {
    const [value, setValue] = useState<Color>(parseColor('hsl(0, 100%, 50%)'));
  
    let boxColour = `rgb(${props.colour["red"]},${props.colour["green"]},${props.colour["blue"]}`;
  
    const handleChangeEnd = (newValue: Color) => {
      const rgbColour = hsvToRgb(newValue.getChannelValue('hue'));
      props.setColor(rgbColour);
      window.localStorage.setItem(`${props.player}Colour`, JSON.stringify(rgbColour));
    };
  
    return (
      <div className ="flex justify-around items-bottom">
        <div className ="flex justify-around mx-10">
          <button className="text-gray-900 bg-gradient-to-r from-orange-200 via-orange-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-orange-100 dark:focus:ring-orange-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => handleColorChange(props.colour, props.key)}>Set colour</button>
        </div>
        <div 
              style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: boxColour,
              }}/>
        <div className ="flex justify-around mx-10">
          <button className="text-gray-900 bg-gradient-to-r from-orange-200 via-orange-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-orange-100 dark:focus:ring-orange-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => handleColorChange(props.colour, props.key)}>Set colour</button>
        </div>
      </div>
    );
  }
  
  export default objMarker;