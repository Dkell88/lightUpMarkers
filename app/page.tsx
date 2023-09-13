"use client";
import { useEffect, useMemo, useState } from "react";
import ObjMarker, { rgbColor } from "./components/objectiveMarker";

// moved out so this var does not reinitalize every render
const ipAddresses = [
  "0.0.0.0",
  "192.168.86.101",
  "192.168.86.102",
  "192.168.86.103",
  "192.168.86.104",
  "192.168.86.105",
  "192.168.86.106",
];
//const ipAddresses = (process.env.IP_ADDRESSES || "").split(",")

export default function Home() {
  //



  const [localData, setLocalData] = useState({
    player1: "",
    player2: "",
    player1Colour: { red: 0, green: 0, blue: 0 },
    player2Colour: { red: 0, green: 0, blue: 0 },
  });
  
  useEffect(() => {
    setLocalData({
      player1: localStorage.getItem("player1") || "",
      player2: localStorage.getItem("player2") || "",
      player1Colour: safelyParseJSON(localStorage.getItem(`Player1Colour`)) || { red: 0, green: 0, blue: 0 },
      player2Colour: safelyParseJSON(localStorage.getItem(`Player2Colour`)) || { red: 0, green: 0, blue: 0 },
    });
  }, []);
  
  function safelyParseJSON(jsonString: string | null): any {
    try {
      return JSON.parse(jsonString || "");
    } catch (e) {
      return null;
    }
  }
  
  const { player1, player2, player1Colour, player2Colour } = localData;
  

  const objMarkers = ipAddresses.map((ip, index) => {
    if (!index) return null; //TODO DELETE
    return (
      <ObjMarker
        player1colour={player1Colour}
        player2colour={player2Colour}
        player1={player1}
        player2={player2}
        id={index}
        key={index}
        IP={ipAddresses[index]}
      />
    );
  });

  return (
    <main>
      {objMarkers}
    </main>
  );
}
