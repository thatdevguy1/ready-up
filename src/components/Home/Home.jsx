import React, { useState, useEffect, useRef } from "react";
import Input from "../Inputs/TextInput";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Home.css";
import socketIo from "../../services/socket";

function Home({ setErrMsg }) {
  let socket = socketIo.getSocket();

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
    console.log(e.keyCode);
    if (e.keyCode === 13 && joinSelected === true) return handleJoinRoom();
    console.log("not handleJoinRoom");
    if (e.keyCode === 37 || e.keyCode === 39)
      return setCreateHighlighted(!btnSelectorRef.current);

    console.log("not selecting btn");
    if (e.keyCode === 13 && btnSelectorRef.current) return handleCreateRoom();
    console.log("not handleCreateRoom");
    if (e.keyCode === 13 && !btnSelectorRef.current) return handleJoin();
    console.log("not handleJoin");
  };

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

    setErrMsg("");
  };

  const handleJoinRoom = () => {
    socket.auth = {
      username: inputsRef.current.username,
      room: inputsRef.current.room,
      reason: "join",
    };
    socket.connect();
    navigate("/room");
  };

  const handleJoin = () => {
    console.log("handle join");
    setJoinSelected(true);
  };

  const handleCreateRoom = () => {
    console.log("handle create");
    socket.auth = { username: inputs.username, reason: "create" };
    socket.connect();
    navigate("/room");
  };

  return (
    <div className="Home">
      <h1>Ready Up Rooms!</h1>
      <form>
        <Input
          type="user"
          name={"username"}
          placeholder="username"
          value={inputs.username}
          change={handleChange}
        />
        {joinSelected && (
          <Input
            type="search"
            name={"room"}
            placeholder="room id"
            value={inputs.room}
            change={handleChange}
          />
        )}
        <div className="btn-wrapper">
          {joinSelected || (
            <button
              style={{
                border: createHighlighted ? "solid 1px  #246db6" : undefined,
              }}
              type="button"
            >
              Create
            </button>
          )}
          <button
            style={{
              border: createHighlighted ? undefined : "solid 1px #246db6",
            }}
            type="button"
            onClick={joinSelected ? handleJoinRoom : handleJoin}
          >
            Join
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
