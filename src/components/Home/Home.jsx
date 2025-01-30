import React, { useState, useEffect, useRef } from "react";
import Input from "../Inputs/TextInput";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import socketIo from "../../services/socket";
import Toggle from "../Toggle/Toggle";
import CreateView from "../Create-View/CreateView";
import JoinView from "../Join-View/JoinView";

function Home({ setErrMsg }) {
  let socket = socketIo.getSocket();

  const [alignment, setAlignment] = React.useState("Create");
  const [inputs, setInputs] = useState({
    username: "",
    room: "",
  });

  const [createHighlighted, setCreateHighlighted] = useState(true);
  const [joinSelected, setJoinSelected] = useState(false);

  const inputsRef = useRef(inputs);
  const btnSelectorRef = useRef(createHighlighted);

  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [joinSelected]);

  useEffect(() => {
    inputsRef.current = inputs;
  }, [inputs]);

  useEffect(() => {
    btnSelectorRef.current = createHighlighted;
  }, [createHighlighted]);

  const handleKeydown = (e) => {
    if (e.keyCode === 9) return e.preventDefault();

    console.log(e.keyCode);
    if (e.keyCode === 13 && joinSelected === true) return handleJoinRoom();

    if (e.keyCode === 37 || e.keyCode === 39)
      return setCreateHighlighted(!btnSelectorRef.current);

    if (e.keyCode === 13 && btnSelectorRef.current) return handleCreateRoom();

    if (e.keyCode === 13 && !btnSelectorRef.current) return handleJoin();
  };

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

    setErrMsg("");
  };

  const handleJoinRoom = () => {
    if (!inputsRef.current.username) return setErrMsg("Invalid username");
    socket.auth = {
      username: inputsRef.current.username,
      room: inputsRef.current.room,
      reason: "join",
    };
    socket.connect();
    navigate("/room");
  };

  const handleJoin = () => {
    if (!inputsRef.current.username) return setErrMsg("Invalid username");
    setJoinSelected(true);
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

export default Home;
