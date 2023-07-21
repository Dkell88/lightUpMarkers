// @ts-ignore
'use client'
import { FC } from 'react';

interface rgbColor {
  red: number;
  green: number;
  blue: number;
}

interface SetStateFunction<T> {
  (newValue: T): void;
}
interface objMarkerProps {
  player1colour: rgbColor;
  player2colour: rgbColor;
  player2: string;
  player1: string;
  key: number;
  IP: string;
}

const objMarker: FC<objMarkerProps> = (props) => {
  
    let boxColour = `rgb(${props.player1colour["red"]},${props.player1colour["green"]},${props.player1colour["blue"]}`;
  
    const onClickObj = (player:string) => {
      fetch(`http://${props.IP}/led/player?p=${player}`, {method: 'GET'})
      .then(response => response.text())
      .then(text => console.log(text))
      .catch(error => console.log('error', error));

      if (player = props.player1) {
        boxColour = `rgb(${props.player1colour["red"]},${props.player1colour["green"]},${props.player1colour["blue"]}`;
      } else {
        boxColour = `rgb(${props.player2colour["red"]},${props.player2colour["green"]},${props.player2colour["blue"]}`;
  
      }
    }

    return (
      <div className ="flex justify-around items-bottom">
        <div className ="flex justify-around mx-10">
          <button className="text-gray-900" onClick={() => onClickObj(props.player1)}>{props.player1}</button>
        </div>
        <div 
              style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: boxColour,
              }}/>
        <div>
          <button className ="flex justify-aroun" onClick={() => onClickObj(props.player2)}>{props.player2}</button>
        </div>
      </div>
    );
  }
  
  export default objMarker;