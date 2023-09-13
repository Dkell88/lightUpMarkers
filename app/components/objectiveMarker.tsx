// @ts-ignore
"use client";
import { FC, PropsWithChildren, useState } from "react";

export interface rgbColor {
  red: number;
  green: number;
  blue: number;
}

interface SetStateFunction<T> {
  (newValue: T): void;
}
interface ObjMarkerProps extends PropsWithChildren {
  player1colour: rgbColor;
  player2colour: rgbColor;
  player2: string;
  player1: string;
  id: number;
  IP: string;
  key: React.Key
}

// /lib/toRBGString
const toRBGString = (
  { red, blue, green } = { red: 0, blue: 0, green: 0 } as rgbColor
) => `rgb(${red},${green},${blue}`;
// /services/setColor
const setColor = (playerID: string, IP: string) =>
  fetch(`http://${IP}/led/player?p=${playerID}`, { method: "GET" })
    .then((response) => response.text())
    .then((text) => console.log(text))
    .catch((error) => console.log("error", error));

const ObjMarker: FC<ObjMarkerProps> = ({
  player1,
  player2,
  player1colour,
  player2colour,
  id,
  IP,
  ...props
}) => {
  let [circleColour, setCircleColour] = useState(`rgb(0,0,0`);
  // const [currentPlayer, setCurrentPlayer] = useState<null | string>(null);

  const onClickObj = (player: string, _id: number) => {
    let playerID = _id;

    if (player === player1) {
      if (
        circleColour !== toRBGString({ ...player1colour })
        //`rgb(${player1colour["red"]},${player1colour["green"]},${player1colour["blue"]}`
      ) {
        setCircleColour(
          toRBGString({ ...player1colour })
          // `rgb(${player1colour["red"]},${player1colour["green"]},${player1colour["blue"]}`
        );
        playerID = 1;
      } else {
        playerID = 0;
        setCircleColour(toRBGString());
        //setCircleColour(`rgb(0,0,0`);
      }
    } else {
      if (
        circleColour !== toRBGString({...player2colour})
        //`rgb(${player2colour["red"]},${player2colour["green"]},${player2colour["blue"]}`
      ) {
        setCircleColour(
          toRBGString({...player2colour})
          //`rgb(${player2colour["red"]},${player2colour["green"]},${player2colour["blue"]}`
        );
        playerID = 2;
      } else {
        playerID = 0;
        setCircleColour(toRBGString())
        //setCircleColour(`rgb(0,0,0`);
      }
    }
    fetch(`http://${IP}/led/player?p=${playerID}`, { method: "GET" })
      .then((response) => response.text())
      .then((text) => console.log(text))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="flex justify-center">
      <button
        className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-5"
        onClick={() => onClickObj(player1, id)}
      >
        Set Obj for: {player1}
      </button>
      <div
        className="flex justify-center items-center rounded-full mx-20 text-white"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: circleColour,
        }}
      >
        <span>{id}</span>
      </div>
      <button
        className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-5"
        onClick={() => onClickObj(player2, id)}
      >
        Set Obj for: {player2}
      </button>
    </div>
  );
};

export default ObjMarker;
