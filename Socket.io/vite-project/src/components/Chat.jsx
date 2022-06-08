import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let myId = "";
const socket = io("http://localhost:8888");

socket.on("connect", () => {
  console.log("server conectado!");
  socket.emit("clientId");
  socket.on("myId", (data) => {
    myId = data;
    console.log(myId);
  });
});

export function Chat() {
  //? states
  const [message, setMessage] = useState({ sender: "", content: "", id: "" });
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");

  //? effects
  function setNewMessage(message) {
    setMessages([
      ...messages,
      {
        message,
      },
    ]);
  }

  useEffect(() => {
    socket.on("receiveMessage", setNewMessage);
    return () => socket.off("receiveMessage", setNewMessage);
  }, [messages]);

  //? handlers form functions
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", { message, room });
    setMessage({ sender: message.sender, content: "", id: myId });
  };

  const handleSenderChange = (event) => {
    setMessage({
      sender: event.target.value,
      content: message.content,
      id: myId,
    });
  };

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  const handleContentChange = (event) => {
    setMessage({
      content: event.target.value,
      sender: message.sender,
      id: myId,
    });
  };

  //? render
  return (
    <main>
      <label>Join Room:</label>
      <input
        type="text"
        name="room"
        value={message.room}
        onChange={handleRoomChange}
        placeholder="Digite o nome da sala"
      />
      <button
        onClick={() => {
          room != ""
            ? socket.emit("joinRoom", room)
            : alert("Selecione uma sala!");
        }}
      >
        Join
      </button>
      <form onSubmit={handleSubmit}>
        <br />
        <label>Sender:</label>
        <input
          type="text"
          name="sender"
          value={message.sender}
          onChange={handleSenderChange}
          placeholder="Digite seu nome"
        />
        <br />
        <label>Message:</label>
        <input
          type="text"
          name="content"
          value={message.content}
          onChange={handleContentChange}
          placeholder="Digite uma mensagem..."
        />
        <button type="submit">Enviar</button>
      </form>
      <h2>Messages:</h2>
      {messages.map((message, index) =>
        message.message.id === myId ? (
          <div key={index}>
            <span>
              {message.message.sender} - (me):
              <br />
              {message.message.content}
            </span>
          </div>
        ) : (
          <div key={index}>
            <span>
              {message.message.sender} - (other):
              <br />
              {message.message.content}
            </span>
          </div>
        )
      )}
    </main>
  );
}
