import React from "react";
import Input from "../Inputs/TextInput";
import Button from "@mui/material/Button";

function CreateView({ inputs, handleChange, handleCreateRoom }) {
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
        Create a Room
      </h1>
      <Input
        type="user"
        name={"username"}
        value={inputs.username}
        handleChange={handleChange}
      />
      <Button
        variant="contained"
        style={{ marginTop: "10px", width: "100%" }}
        onClick={handleCreateRoom}
      >
        Create
      </Button>
    </section>
  );
}

export default CreateView;
