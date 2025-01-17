import React, { useState, useEffect } from "react";
import Input from "../Inputs/TextInput";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import socketIo from "../../services/socket";
import Toggle from "../Toggle/Toggle";
import CreateView from "../Create-View/CreateView";
import JoinView from "../Join-View/JoinView";

function Home(props) {
  let socket = socketIo.getSocket();
  const [alignment, setAlignment] = React.useState("Create");
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
    console.log("creating room");
    socket.auth = { username: inputs.username, reason: "create" };
    socket.connect();
    navigate("/room");
  };

  return (
    <div className="Home">
      <Toggle alignment={alignment} setAlignment={setAlignment} />
      {alignment === "Create" && (
        <CreateView
          inputs={inputs}
          handleChange={handleChange}
          handleCreateRoom={handleCreateRoom}
        />
      )}
      {alignment === "Join" && (
        <JoinView
          inputs={inputs}
          handleChange={handleChange}
          handleJoinRoom={handleJoinRoom}
        />
      )}
      {alignment === null && <h1>Choose an option</h1>}
    </div>
  );
}

Home.propTypes = {};

export default Home;
