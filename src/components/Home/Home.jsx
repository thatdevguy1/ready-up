import React, { useState, useEffect, useRef } from "react";
import Input from "../Inputs/TextInput";
import { useNavigate } from "react-router-dom";
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
    if (!inputsRef.current.username) return setErrMsg("Invalid username");
    socket.auth = { username: inputsRef.current.username, reason: "create" };
    socket.connect();
    navigate("/room");
  };

  return (
    <div className="Home">
      <h1>Ready Up Rooms</h1>
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
