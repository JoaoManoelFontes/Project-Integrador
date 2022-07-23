import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socket from "../client";

export default function Game() {
  //? States & Hooks
  const { state } = useLocation();
  const [status, setStatus] = useState(null);
  const [roomError, setRoomError] = useState(null);
  const [playerCard, setPlayerCard] = useState(null);

  //?Effects
  useEffect(() => {
    setStatus(state.status);
  }, []);

  useEffect(() => {
    socket.on("status", (data) => setStatus(data));

    socket.on("roomError", (data) => setRoomError(data));
  }, [socket]);

  //?Handle Functions
  const handleChange = (e) => {
    setPlayerCard(e.target.value);
  };

  const handleFormSend = () => {
    socket.emit("sendCard", { playerCard, room: state.room });
  };

  //? Render
  return (
    <div>
      <h1>Game</h1>
      <div id="radio">
        <label>
          <input type="radio" onChange={handleChange} value={90} name="card" />
          Strong: 90
        </label>
        <br />
        <label>
          <input type="radio" onChange={handleChange} value={80} name="card" />
          Smartness: 80
        </label>
        <br />
        <label>
          <input type="radio" onChange={handleChange} value={91} name="card" />
          Agility: 91
        </label>
        <br />
      </div>
      <button onClick={handleFormSend}>Click</button>
      {status && <p>{status}</p>}
      {roomError && (
        <div>
          <p>{roomError}</p>
          <a href="/">
            <button>Back</button>
          </a>
        </div>
      )}
    </div>
  );
}
