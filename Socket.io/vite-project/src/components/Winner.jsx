import { useLocation } from "react-router-dom";

export default function Game() {
  const { state } = useLocation();
  return (
    <div>
      <h1>Result</h1>
      {state.winner.winner === state.socketId ? (
        <h3>Você Ganhou!</h3>
      ) : (
        <h3>Você Perdeu!</h3>
      )}
      <p>{state.status}</p>
    </div>
  );
}
