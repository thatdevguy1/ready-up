const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const client = require("redis").createClient();

require("dotenv").config();
// require("./backend/config/database.js");
const socketCtrl = require("./backend/socket/socket");

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

const app = express();
client.on("error", (err) => console.log("Redis Client Error", err));
app.use(logger("dev"));
app.use(express.json());
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));

// Configure both serve-favicon & static middlewares
// to serve from the production 'build' folder
// app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

app.use(require("./backend/config/auth"));

app.use("/api/room", require("./backend/routes/api/rooms"));

// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const io = require("./backend/config/socket").init(server);

io.use(socketCtrl.setUserInfo);
io.use(socketCtrl.joinRoom);
io.use(socketCtrl.createRoom);

io.on("connection", async (socket) => {
  await client.connect();

  // let users = await client.get('users');

  users = {};

  for (let [id, socket] of io.of("/").sockets) {
    users[socket.room]
      ? users[socket.room].push({
          userId: id,
          username: socket.username,
          creator: false,
        })
      : (users[socket.room] = [
          {
            userId: id,
            username: socket.username,
            creator: true,
          },
        ]);
  }
  console.log("users", users);

  const jsonUsers = JSON.stringify(users);

  await client.set("users", jsonUsers);

  await client.disconnect();

  socketCtrl.onDisconnect(io, socket);
  socketCtrl.allUsers(io, socket, users);
  socketCtrl.onConnection(io, socket);
  socketCtrl.statusChange(io, socket);
  socketCtrl.messagePost(io, socket);
});
