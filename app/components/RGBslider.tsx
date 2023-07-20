// @ts-ignore
'use client'
import { parseColor, Color } from '@react-stately/color';
import { ColorSlider } from '@react-spectrum/color'
import { useState, FC } from 'react';
import { Provider, defaultTheme, ActionButton } from "@adobe/react-spectrum";
import hsvToRgb from '../helpers/HuetoRGB'

interface rgbColor {
  red: number;
  green: number;
  blue: number;
}

interface SetStateFunction<T> {
  (newValue: T): void;
}
interface RGBSliderProps {setColor: SetStateFunction<rgbColor>;}

let boxColour = 'hsl(89, 43%, 51%)'

const handleColorChange = () => {
  let red = 255;
  let green = 128;
  let blue = 0; 
  fetch(`http://192.168.86.101/led/color?r=${red}&g=${green}&b=${blue}`, {method: 'GET'})
    .then(response => response.text())
    .then(text => console.log(text))
    .catch(error => console.log('error', error));
}

const RGBSlider: FC<RGBSliderProps> = (props) => {
  const [value, setValue] = useState<Color>(parseColor('hsl(0, 100%, 50%)'));

  const handleChangeEnd = (newValue: Color) => {
    console.log(newValue)
    //need to parse the color from a hex to a rgb value.
    console.log(hsvToRgb(newValue.getChannelValue('hue')))
    props.setColor(hsvToRgb(newValue.getChannelValue('hue')));
  };

  return (
    <div className ="flex justify-around">
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
        <button className="h-10 px-5 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" onClick={handleColorChange}>Set colour</button>
      </div>
      <div 
            style={{
                width: '50px',
                height: '50px',
                backgroundColor: boxColour,
            }}/>
    </div>
  );
}

export default RGBSlider;