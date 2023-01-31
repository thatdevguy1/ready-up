import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Room from "./components/Room/Room.jsx";
import "./App.css";
import socketIo from "./services/socket";
const socket = socketIo.init();

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        setUsernameAlreadySelected(false);
      }
      console.log(err);
      navigate("/");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
    };
  }, []);

  useEffect(() => {
    isConnected ? console.log("user is connected") : navigate("/");
  }, [isConnected]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
