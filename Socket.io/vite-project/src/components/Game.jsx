import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socket from "../client";

export default function Game() {
  //? States & Hooks
  const { state } = useLocation();
  const [status, setStatus] = useState(null);

  //?Effects
  useEffect(() => {
    setStatus(state.status);
  }, []);

  useEffect(() => {
    socket.on("status", (data) => setStatus(data));
  }, [socket]);

  return (
    <div>
      <h1>Game</h1>
      {status && <p>{status}</p>}
    </div>
  );
}
