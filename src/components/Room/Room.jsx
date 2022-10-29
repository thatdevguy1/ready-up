import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Room.css";

const socket = io("http://localhost:3001");

export default function Room() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div>
      <h1>Room</h1>
    </div>
  );
}
