import io from "socket.io-client";
const ENDPOINT = "http://localhost:8888";
export default io(ENDPOINT);
