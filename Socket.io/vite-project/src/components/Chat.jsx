import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";

const myId = uuid();

const socket = io("http://localhost:8888");
socket.on("connect", () => {
  console.log("server conectado!");
});

export function Chat() {
  const [message, setMessage] = useState({ sender: "", content: "" });
  const [messages, setMessages] = useState([]);

  function setNewMessage(message) {
    setMessages([
      ...messages,
      {
        message,
      },
    ]);
  }

  useEffect(() => {
    console.log(messages);
    socket.on("message", setNewMessage);
    return () => socket.off("message", setNewMessage);
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage({ sender: message.sender, content: "" });
  };

  const handleSenderChange = (event) => {
    setMessage({ sender: event.target.value, content: message.content });
  };

  const handleContentChange = (event) => {
    setMessage({ content: event.target.value, sender: message.sender });
  };

  return (
    <main>
      {messages.map(({ message }, index) => (
        <div key={index}>
          <span>
            {message.sender}:<br />
            {message.content}
          </span>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
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
    </main>
  );
}
