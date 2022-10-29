import React from "react";
import Input from "../Inputs/TextInput";
import PropTypes from "prop-types";
import "./Home.css";

function Home(props) {
  return (
    <div className="Home">
      <h1>Create a Room</h1>
      <Input type="user" />
      <button>Create</button>
      <h5 style={{ textAlign: "center" }}>or</h5>
      <h1>Join a Room</h1>
      <Input type="user" />
      <Input type="search" />
      <button>Join</button>
    </div>
  );
}

Home.propTypes = {};

export default Home;
