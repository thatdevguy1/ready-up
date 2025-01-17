import React from "react";
import Input from "../Inputs/TextInput";
import { Button } from "@mui/material";

function JoinView({ inputs, handleChange, handleJoinRoom }) {
  return (
    <section className="room-form">
      <h1
        style={{
          textAlign: "center",
          fontSize: "40px",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      >
        Join a Room
      </h1>
      <Input
        type="user"
        name={"username"}
        value={inputs.username}
        handleChange={handleChange}
      />
      <Input
        type="search"
        name={"room"}
        value={inputs.room}
        handleChange={handleChange}
      />
      <Button
        variant="contained"
        style={{ marginTop: "10px" }}
        onClick={handleJoinRoom}
      >
        Join
      </Button>
    </section>
  );
}

export default JoinView;
