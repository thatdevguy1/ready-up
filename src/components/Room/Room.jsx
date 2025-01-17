import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Room.css";
import socketIo from "../../services/socket";
import Message from "../Icons/Message";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Room(props) {
  let socket = socketIo.getSocket();
  const readyColor = "#00e600";
  const notReadyColor = "#ffcc00";
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [animateMessage, setAnimateMessage] = useState(false);

  useEffect(() => {
    socket.on("users", (data) => {
      setRoom(data.room);
      data.users.forEach((user) => {
        user.self = user.userId === socket.id;
      });

      const sortedUsers = sortUsers(data.users);
      setUsers(sortedUsers);
    });

    socket.on("user connected", (user) => {
      setUsers((users) => sortUsers([...users, user]));
    });

    socket.on("user disconnected", (userId) => {
      console.log("user disconnected");
      setUsers((users) => {
        const userIdx = users.findIndex((user) => user.userId === userId);
        users.splice(userIdx, 1);
        console.log(userIdx);
        return [...users];
      });
    });

    socket.on("status change", (data) => {
      setUsers((users) => {
        const newUsers = users.map((user) => {
          if (user.userId === data.userId) user.status = data.status;
          return user;
        });
        return newUsers;
      });
    });

    socket.on("message post", (message) => {
      setMessage(message);
    });

    return () => {
      socket.off("users");
      socket.off("user connected");
      socket.off("status change");
      socket.off("message post");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setUsers((users) => {
      const statusResetUsers = users.map((user) => {
        return { ...user, status: null };
      });
      console.log(statusResetUsers);
      return statusResetUsers;
    });
    if (message) {
      setAnimateMessage(true);
    }
  }, [message]);

  const handleMessagePost = (e) => {
    socket.emit("message post", message);
  };

  const handleSetMessage = (e) => {
    setMessage(e.target.value);
  };

  const creatorView = () => {
    const self = users.find((user) => user.self);
    return self?.creator ? (
      <>
        <div className="Input">
          <div className="input-wrapper">
            <Message />
            <TextField
              multiline
              maxRows={4}
              style={{ flex: 4 }}
              value={message}
              onChange={handleSetMessage}
            />
            <Button
              style={{ flex: 1, marginLeft: "10px", padding: "15px 0" }}
              variant="contained"
              onClick={handleMessagePost}
            >
              Post
            </Button>
          </div>
        </div>
      </>
    ) : (
      <></>
    );
  };

  const sortUsers = (newUsers) => {
    newUsers.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
    return newUsers;
  };

  const setStatusColor = (status) => {
    switch (status) {
      case "ready":
        return readyColor;
        break;
      case "not ready":
        return notReadyColor;
        break;
      case null:
        return "transparent";
        break;
      default:
        return "transparent";
        break;
    }
  };

  const handleStatusClick = (e) => {
    const self = users.find((user) => user.self);
    if (e.target.getAttribute("data-status") === "ready") {
      e.target.style.backgroundColor = readyColor;
      self.status = "ready";
      socket.emit("status change", "ready");
    } else if (e.target.getAttribute("data-status") === "not ready") {
      e.target.style.backgroundColor = notReadyColor;
      self.status = "not ready";
      socket.emit("status change", "not ready");
    } else {
      e.target.style.backgroundColor = "transparent";
      self.status = null;
      socket.emit("status change", null);
    }
    setUsers((users) =>
      users.map((user) => (user.userId === self.userId ? self : user))
    );
    setAnimateMessage(false);
  };

  return (
    <div className="Room">
      <div>
        <div className="headings">
          <h1>Room: {room}</h1>
          <h4>Participants: {users.length}</h4>
        </div>
        <div
          className={animateMessage ? "message-box is-active" : "message-box"}
        >
          <h3>{message}</h3>
        </div>
        {creatorView()}
        <ul>
          {users.map((user) => (
            <li
              key={user.userId}
              data-user-id={user.userId}
              style={{ backgroundColor: setStatusColor(user.status) }}
            >
              {user.username}
            </li>
          ))}
        </ul>
        <div className="bottom-btn-wrapper">
          <Button
            variant="outlined"
            className="ready-btn bottom-btn"
            onClick={handleStatusClick}
            data-status="ready"
          >
            Ready
          </Button>
          <Button
            variant="outlined"
            className="not-ready-btn bottom-btn"
            onClick={handleStatusClick}
            data-status="not ready"
          >
            More Time
          </Button>
          <Button
            variant="outlined"
            className="clear-btn bottom-btn"
            onClick={handleStatusClick}
            data-status="null"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
