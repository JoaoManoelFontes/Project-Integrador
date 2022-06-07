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
    socket.on("message", setNewMessage);
    return () => socket.off("message", setNewMessage);
  }, [messages]);

  //? handlers form functions
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, messages });
    setMessage({ sender: message.sender, content: "", id: myId });
  };

  const handleSenderChange = (event) => {
    setMessage({
      sender: event.target.value,
      content: message.content,
      id: myId,
    });
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
