import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Room.css";
import socketIo from "../../services/socket";
import Message from "../Icons/Message";

export default function Room(props) {
  let socket = socketIo.getSocket();
  const readyColor = "#00e600";
  const notReadyColor = "#ffcc00";
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(null);
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");

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
    };
  }, []);

  //Use a use effect with a dependency on the status state to send a single socket.emit
  const handleClick = (e) => {
    const self = users.find((user) => user.self);
    if (e.target.getAttribute("data-user-id") !== self.userId) return;
    if (status === null) {
      e.target.style.backgroundColor = readyColor;
      setStatus("ready");
      socket.emit("status change", "ready");
    } else if (status === "ready") {
      e.target.style.backgroundColor = notReadyColor;
      setStatus("not ready");
      socket.emit("status change", "not ready");
    } else {
      e.target.style.backgroundColor = "transparent";
      setStatus(null);
      socket.emit("status change", null);
    }
  };

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
            <input type="text" value={message} onChange={handleSetMessage} />
          </div>
        </div>
        <button onClick={handleMessagePost}>Post</button>
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

  return (
    <div>
      <h1>Room: {room}</h1>

      <h2>MessageBox</h2>
      <div className="message-box">{message}</div>
      {creatorView()}
      <ul>
        {users.map((user) => (
          <li
            onClick={handleClick}
            key={user.userId}
            data-user-id={user.userId}
            style={{ backgroundColor: setStatusColor(user.status) }}
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
