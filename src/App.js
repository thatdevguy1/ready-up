import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Room from "./components/Room/Room.jsx";
import "./App.css";

function App() {
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
