import io from "socket.io-client";
let socket;

export default {
  init: () => {
    socket = io("http://localhost:3001/", { autoConnect: false });
    return socket;
  },
  getSocket: () => socket,
};
