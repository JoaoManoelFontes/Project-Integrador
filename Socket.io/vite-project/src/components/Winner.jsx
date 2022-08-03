import { useLocation } from "react-router-dom";

export default function Game() {
  const { state } = useLocation();
  return <h1>{state.winner}</h1>;
}
