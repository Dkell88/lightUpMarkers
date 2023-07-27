'use client'
import { useEffect } from "react";
import ObjMarker from "./components/objectiveMarker"


export default function Home() {

  let player1 = window.localStorage.getItem('player1')|| '';
  let player2 = window.localStorage.getItem('player2')|| '';
  let tempP1Colour = window.localStorage.getItem(`Player1Colour`)|| `{"red": 0, "green": 0, "blue": 0}`;
  let tempP2Colour = window.localStorage.getItem(`Player2Colour`) || `{"red": 0, "green": 0, "blue": 0}`;
  let player1Colour = JSON.parse(tempP1Colour);
  let player2Colour = JSON.parse(tempP2Colour);
  //const ipAddresses = (process.env.IP_ADDRESSES || '').split(',');
  const ipAddresses = ["0.0.0.0",
                      "192.168.86.101",
                      "192.168.86.102",
                      "192.168.86.103",
                      "192.168.86.104",
                      "192.168.86.105",
                      "192.168.86.106"];


  useEffect(() => {
    const savedPlayer1 = window.localStorage.getItem('player1');
    const savedPlayer2 = window.localStorage.getItem('player2');
  
    if (savedPlayer1) {
      player1 = savedPlayer1;
    }
    if (savedPlayer2) {
      player2 = savedPlayer2;
    }
  
  const savedPlayer1Color = window.localStorage.getItem(`Player1Colour`);
  const savedPlayer2Color = window.localStorage.getItem(`Player12Colour`);

    if (savedPlayer1Color) {
      const parsedPlayer1Color = JSON.parse(savedPlayer1Color);
      player1Colour = parsedPlayer1Color;
    }
    if (savedPlayer2Color) {
      const parsedPlayer2Color = JSON.parse(savedPlayer2Color);
      player2Colour = parsedPlayer2Color;
    }
    // console.log(`player1: ${player1}`)
    // console.log(`player2: ${player2}`)
    // console.log(`player1Colour: ${JSON.stringify(player1Colour)}`)
    // console.log(`player2Colour: ${JSON.stringify(player2Colour)}`)
  }, []);
  

  return (
    <main >
      {/* <ObjMarker player1colour = {player1Colour}
                player2colour = {player2Colour}
                player1 = {player1}
                player2 = {player2}
                id ={1}
                IP = {ipAddresses[1]}
                    ></ObjMarker>
      <ObjMarker player1colour = {player1Colour}
                  player2colour = {player2Colour}
                  player1 = {player1}
                  player2 = {player2}
                  id ={2}
                  IP = {ipAddresses[2]}
                  ></ObjMarker> */}
      <ObjMarker player1colour = {player1Colour}
                player2colour = {player2Colour}
                player1 = {player1}
                player2 = {player2}
                id ={3}
                IP = {ipAddresses[3]}
                    ></ObjMarker>
      {/* <ObjMarker player1colour = {player1Colour}
                  player2colour = {player2Colour}
                  player1 = {player1}
                  player2 = {player2}
                  id ={4}
                  IP = {ipAddresses[4]}
                  ></ObjMarker>
        <ObjMarker player1colour = {player1Colour}
                player2colour = {player2Colour}
                player1 = {player1}
                player2 = {player2}
                id ={5}
                IP = {ipAddresses[5]}
                    ></ObjMarker>
      <ObjMarker player1colour = {player1Colour}
                  player2colour = {player2Colour}
                  player1 = {player1}
                  player2 = {player2}
                  id ={6}
                  IP = {ipAddresses[6]}
                  ></ObjMarker> */}
    </main>
  )
}
