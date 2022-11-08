import io from "socket.io-client";
let socket;

export default {
  init: () => {
    socket = io("/", { autoConnect: false });
    return socket;
  },
  getSocket: () => socket,
};
