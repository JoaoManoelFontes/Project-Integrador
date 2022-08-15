import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export default function Game() {
  //?states & hooks
  const { state } = useLocation();
  const [winner, setWinner] = useState(null);

  //?effects
  useEffect(() => {
    if (state.winner.winner != null && state.winner.winner === state.socketId) {
      setWinner("Você Ganhou!");
    } else if (state.winner.winner === null) {
      setWinner("Empatou!");
    } else {
      setWinner("Você Perdeu!");
    }
  }, []);

  return (
    <div>
      <h1>Result</h1>
      <h3>{winner}</h3>
      <p>{state.status}</p>
    </div>
  );
}
