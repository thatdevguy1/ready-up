import React, { useState } from "react";
import Input from "../Inputs/TextInput";
import { getRoom, createRoom } from "../../api/services";
import PropTypes from "prop-types";
import "./Home.css";

function Home(props) {
  const [inputs, setInputs] = useState({
    username: "",
    room: "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleJoinRoom = () => {
    //getRoom(<id>);
  };

  const handleCreateRoom = async () => {
    const response = await createRoom;
    console.log(response);
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
      <button>Create</button>
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
      <button onClick={handleCreateRoom}>Join</button>
    </div>
  );
}

Home.propTypes = {};

export default Home;
