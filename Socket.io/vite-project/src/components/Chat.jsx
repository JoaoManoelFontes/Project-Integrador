import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";

const myId = uuid();

const socket = io("http://localhost:8888");
socket.on("connect", () => {
  console.log("server conectado!");
});

export function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function setNewMessage(message) {
    setMessages([
      ...messages,
      {
        id: myId,
        message,
      },
    ]);
  }

  useEffect(() => {
    socket.on("message", setNewMessage);

    return () => socket.off("message", setNewMessage);
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    socket.emit("message", message);
    setMessage("");
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <main>
      <ul>
        {messages.map((m, index) => (
          <li
            className={`message(${m.id === myId ? "mine" : "other"})`}
            key={index}
          >
            <span>{m.message}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          value={message}
          onChange={handleInputChange}
          placeholder="Digite uma mensagem..."
        />
        <button type="submit">Enviar</button>
      </form>
    </main>
  );
}
