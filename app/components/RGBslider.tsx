// @ts-ignore
'use client'
import { parseColor, Color } from '@react-stately/color';
import { ColorSlider } from '@react-spectrum/color'
import { useState, FC, useEffect } from 'react';
import { Provider, defaultTheme, ActionButton } from "@adobe/react-spectrum";
import hsvToRgb from '../helpers/HuetoRGB'
import { string } from 'prop-types';

interface rgbColor {
  red: number;
  green: number;
  blue: number;
}

interface SetStateFunction<T> {
  (newValue: T): void;
}
interface RGBSliderProps {
  setColor: SetStateFunction<rgbColor>;
  colour: rgbColor;
  player: string;
}

const ipAddresses = [
  '192.168.86.101',
  '192.168.86.102',
  '192.168.86.103',
  '192.168.86.104',
  '192.168.86.105',
  '192.168.86.106'
];

const handleColorChange = async (colour: rgbColor, player:string) => {
  console.log(`Button pressed sending colours r=${colour.red}&g=${colour.green}&b=${colour.blue}&p=${player}`)
  try {
    const fetchPromises = ipAddresses.map(async (ip) => {
      const response = await fetch(`http://${ip}/led/color?r=${colour.red}&g=${colour.green}&b=${colour.blue}&p=${player}`, {
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

// const handleColorChange = (colour:rgbColor) => {
//   fetch(`http://192.168.86.101/led/color?r=${colour["red"]}&g=${colour["green"]}&b=${colour["blue"]}`, {method: 'GET'})
//     .then(response => response.text())
//     .then(text => console.log(text))
//     .catch(error => console.log('error', error));
// }

const RGBSlider: FC<RGBSliderProps> = (props) => {
  const [value, setValue] = useState<Color>(parseColor('hsl(0, 100%, 50%)'));

  let boxColour = `rgb(${props.colour["red"]},${props.colour["green"]},${props.colour["blue"]}`;

  const handleChangeEnd = (newValue: Color) => {
    props.setColor(hsvToRgb(newValue.getChannelValue('hue')));
  };

  return (
    <div className ="flex justify-around items-center">
      <div className ="flex justify-around my-5">
        <Provider theme={defaultTheme} height="100%">
            <ColorSlider
              label="LED Colour Setting"
              value={value}
              onChange={setValue}
              onChangeEnd={handleChangeEnd}
              channel="hue" 
              height="size-300"/>
        </Provider>
      </div>
      <div className ="flex justify-around mx-10">
        <button className="h-10 px-5 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" onClick={() => handleColorChange(props.colour, props.player)}>Set colour</button>
      </div>
      <div 
            style={{
                width: '80px',
                height: '80px',
                backgroundColor: boxColour,
            }}/>
    </div>
  );
}

export default RGBSlider;