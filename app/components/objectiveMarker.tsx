// @ts-ignore
'use client'
import { FC, useState } from 'react';

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
  id: number;
  IP: string;
}

const objMarker: FC<objMarkerProps> = (props) => {
  
    let [circleColour, setCircleColour] = useState(`rgb(0,0,0`); 
      
    const onClickObj = (player:string, id: number) => {

      let playerID = id;

      if (player === props.player1) {
        if (circleColour !== `rgb(${props.player1colour["red"]},${props.player1colour["green"]},${props.player1colour["blue"]}`){
          setCircleColour(`rgb(${props.player1colour["red"]},${props.player1colour["green"]},${props.player1colour["blue"]}`);
          playerID = 1;
        }else {
          playerID = 0;
          setCircleColour(`rgb(0,0,0`);
        }
      } else {
        if (circleColour !== `rgb(${props.player2colour["red"]},${props.player2colour["green"]},${props.player2colour["blue"]}`){
          setCircleColour(`rgb(${props.player2colour["red"]},${props.player2colour["green"]},${props.player2colour["blue"]}`);
          playerID = 2;
        }else {
          playerID = 0;
          setCircleColour(`rgb(0,0,0`);
        }
      }

      fetch(`http://${props.IP}/led/player?p=${playerID}`, {method: 'GET'})
      .then(response => response.text())
      .then(text => console.log(text))
      .catch(error => console.log('error', error));
    }

    return (
      <div className ="flex justify-center">
          <button className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-5" onClick={() => onClickObj(props.player1, props.id)}>Set Obj for: {props.player1}</button>
        <div className="flex justify-center items-center rounded-full mx-20 text-white"
              style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: circleColour,
              }}><span>{props.id}</span></div>
          <button className ="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-5" onClick={() => onClickObj(props.player2, props.id)}>Set Obj for: {props.player2}</button>
      </div>
    );
  }
  
  export default objMarker;