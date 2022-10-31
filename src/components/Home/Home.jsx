import React, { useState } from "react";
import Input from "../Inputs/TextInput";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Home.css";
import socketIo from "../../services/socket";

function Home(props) {
  const socket = socketIo.getSocket();
  const [inputs, setInputs] = useState({
    username: "",
    room: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleJoinRoom = () => {
    socket.auth = {
      username: inputs.username,
      room: inputs.room,
      reason: "join",
    };
    socket.connect();
    navigate("/room");
  };

  const handleCreateRoom = () => {
    socket.auth = { username: inputs.username, reason: "create" };
    socket.connect();
    navigate("/room");
  };

  return (
    <div className="Home">
      <h1>Create a Room</h1>
      <Input
        type="user"
        name={"username"}
        value={inputs.username}
        change={handleChange}
      />
      <button onClick={handleCreateRoom}>Create</button>
      <h5 style={{ textAlign: "center" }}>or</h5>
      <h1>Join a Room</h1>
      <Input
        type="user"
        name={"username"}
        value={inputs.username}
        change={handleChange}
      />
      <Input
        type="search"
        name={"room"}
        value={inputs.room}
        change={handleChange}
      />
      <button onClick={handleJoinRoom}>Join</button>
    </div>
  );
}

Home.propTypes = {};

export default Home;
