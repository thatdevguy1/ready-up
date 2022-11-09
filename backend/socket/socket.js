const { uuid } = require("uuidv4");
const rooms = [];

//Middlewares
const setUserInfo = (socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username || !username.trim()) return next(new Error("invalid username"));
  socket.username = username;
  next();
};

const joinRoom = (socket, next) => {
  const reason = socket.handshake?.auth?.reason;
  const roomId = String(socket.handshake?.auth?.room);
  const roomIdSanitised = roomId.trim().toUpperCase();
  if (!(reason === "join") || reason === undefined) return next();
  if (!rooms.includes(roomIdSanitised) || roomIdSanitised === "")
    return next(new Error("invalid room id"));
  socket.join(roomIdSanitised);
  socket.room = roomIdSanitised;
  next();
};

const createRoom = (socket, next) => {
  const reason = socket.handshake?.auth?.reason;
  if (!(reason === "create" || reason === undefined)) return next();
  while (true) {
    const roomId = String(uuid()).slice(0, 4).toUpperCase();
    if (!rooms.includes(roomId)) {
      rooms.push(roomId);
      socket.room = roomId;
      socket.join(roomId);
      break;
    }
  }

  next();
};

//Broadcasts & Emits
const allUsers = (io, socket, users) =>
  socket.emit("users", { users: users[socket.room], room: socket.room });

const onConnection = (io, socket) =>
  socket.broadcast.to(socket.room).emit("user connected", {
    userId: socket.id,
    username: socket.username,
  });

const onDisconnect = (io, socket) =>
  socket.on("disconnect", () => {
    io.to(socket.room).emit("user disconnected", socket.id);
  });

const statusChange = (io, socket) =>
  socket.on("status change", (status) => {
    socket.broadcast.to(socket.room).emit("status change", {
      status,
      userId: socket.id,
    });
  });

const messagePost = (io, socket) =>
  socket.on("message post", (message) => {
    socket.broadcast.to(socket.room).emit("message post", message);
  });

module.exports = {
  messagePost,
  statusChange,
  setUserInfo,
  joinRoom,
  allUsers,
  onConnection,
  createRoom,
  onDisconnect,
};
