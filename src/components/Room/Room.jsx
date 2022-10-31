import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Room.css";
import socketIo from "../../services/socket";

export default function Room(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = socketIo.getSocket();
    socket.on("users", (users) => {
      console.log(users);
      users.forEach((user) => {
        user.self = user.userId === socket.id;
      });

      const sortedUsers = sortUsers(users);
      setUsers(sortedUsers);
    });

    socket.on("user connected", (user) => {
      setUsers((users) => sortUsers([...users, user]));
    });

    return () => {
      socket.off("users");
      socket.off("user connected");
    };
  }, []);

  const sortUsers = (newUsers) => {
    newUsers.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
    return newUsers;
  };

  return (
    <div>
      <h1>Room</h1>
      <h2>MessageBox</h2>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
