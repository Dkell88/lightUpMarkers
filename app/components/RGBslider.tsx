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

const RGBSlider: FC<RGBSliderProps> = (props) => {
  const [value, setValue] = useState<Color>(parseColor('hsl(0, 100%, 50%)'));

  const handleChangeEnd = (newValue: Color) => {
    console.log(newValue)
    //need to parse the color from a hex to a rgb value.
    console.log(hsvToRgb(newValue.getChannelValue('hue')))
    props.setColor(hsvToRgb(newValue.getChannelValue('hue')));
  };

  return (
    <Provider theme={defaultTheme} height="100%">
        <ColorSlider
          label="Hue (controlled)"
          value={value}
          onChange={setValue}
          onChangeEnd={handleChangeEnd}
          channel="hue" 
          height="size-300"/>
    </Provider>
  );
}

export default RGBSlider;