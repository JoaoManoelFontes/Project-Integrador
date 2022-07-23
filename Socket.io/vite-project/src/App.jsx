import { useEffect, useState } from "react";
import socket from "./client";

import { useNavigate } from "react-router-dom";

export default function App() {
  //? states & hooks
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [status, SetStatus] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [roomError, setRoomError] = useState(null);
  const [rooms, setRooms] = useState([]);

  //? effects
  useEffect(() => {
    socket.on("roomGenerated", (data) => {
      setRoom(data.room);
      SetStatus(data.status);
    });

    socket.on("roomJoined", (data) => {
      setRoom(data.room);
      SetStatus(data.status);
    });

    socket.on("newRoom", (data) => setRooms(data));

    //? socket room errors
    socket.on("joinRoomError", (data) => setRoomError(data));
    socket.on("hostLeavesRoomError", (data) => setRoomError(data));
  }, [socket]);

  //?handleFunctions
  const generateRoom = () => {
    socket.emit("generateRoom");
  };

  const joinRoom = () => {
    socket.emit("joinRoom", roomId);
  };

  //? render
  return (
    <div>
      <h1>Entrar</h1>
      <button onClick={generateRoom}>Criar uma sala</button> <br />
      <input
        type="text"
        placeholder="Digite o id da sala"
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
        value={roomId}
      />
      <button onClick={joinRoom}>Entrar em uma sala existente</button>
      {roomError && <h2>{roomError}</h2>}
      <div>
        {room != null && status != null ? (
          navigate("/game", {
            state: {
              room,
              status,
            },
          })
        ) : (
          <p></p>
        )}
      </div>
      <div>
        <h1>Salas existentes:</h1>
        {rooms.map((room, index) => {
          return (
            <div key={index}>
              <h3>Sala {index + 1}</h3>
              <p>id: {room}</p>
              <button
                onClick={() => {
                  socket.emit("joinRoom", room);
                }}
              >
                Entrar na sala
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
