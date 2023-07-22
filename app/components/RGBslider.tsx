// @ts-ignore
'use client'
import { parseColor, Color } from '@react-stately/color';
import { ColorSlider } from '@react-spectrum/color'
import { useState, FC } from 'react';
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import hsvToRgb from '../helpers/HuetoRGB'

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
  id: number;
}

const ipAddresses = (process.env.IP_ADDRESSES || '').split(',');

const handleColorChange = async (colour: rgbColor, player:number) => {
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

const RGBSlider: FC<RGBSliderProps> = (props) => {
  const [value, setValue] = useState<Color>(parseColor('hsl(0, 100%, 50%)'));

  let boxColour = `rgb(${props.colour["red"]},${props.colour["green"]},${props.colour["blue"]}`;

  const handleChangeEnd = (newValue: Color) => {
    const rgbColour = hsvToRgb(newValue.getChannelValue('hue'));
    props.setColor(rgbColour);
    window.localStorage.setItem(`Player${props.id}Colour`, JSON.stringify(rgbColour));
  };

  return (
    <div className ="flex justify-around items-bottom">
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
        <button className="text-gray-900 bg-gradient-to-r from-orange-200 via-orange-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-orange-100 dark:focus:ring-orange-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => handleColorChange(props.colour, props.id)}>Set colour</button>
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