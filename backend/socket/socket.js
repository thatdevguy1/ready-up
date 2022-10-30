const usernameMiddleware = (socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username || !username.trim()) return next(new Error("invalid username"));
  socket.username = username;
  next();
};

const allUsers = (socket, users) => socket.emit("users", users);

const onConnection = (socket) =>
  socket.broadcast.emit("user connected", {
    userId: socket.id,
    username: socket.username,
  });

module.exports = {
  usernameMiddleware,
  allUsers,
  onConnection,
};
