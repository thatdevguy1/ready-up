import io from "socket.io-client";
let socket;

export default {
  init: () => {
    socket = io("https://readyup-rooms.herokuapp.com/", { autoConnect: false });
    return socket;
  },
  getSocket: () => socket,
};
