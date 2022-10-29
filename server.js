const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

require("dotenv").config();
require("./backend/config/database.js");

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));
app.use(express.json());

// Configure both serve-favicon & static middlewares
// to serve from the production 'build' folder
// app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

app.use(require("./backend/config/auth"));

// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const io = require("./backend/config/socket").init(server);

io.on("connection", (socket) => {
  console.log("socket connection was made");
  // socket.emit("welcome", "Welcome to my first socketio app");
  // socket.broadcast.emit("join", "Someone has joined the server");
  // socket.on("post", (data) => {
  //   io.emit("newPost", data);
  // });
});
