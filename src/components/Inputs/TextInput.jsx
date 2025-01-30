import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./Inputs.css";
import UserIcon from "../Icons/User";
import SearchIcon from "../Icons/Search";
import TextField from "@mui/material/TextField";

function TextInput({ name, value, handleChange, type }) {
  const iconType = () => {
    if (type === "user") return <UserIcon />;
    if (type === "search") return <SearchIcon />;
    return "";
  };
  return (
    <div className="Input">
      <div className="input-wrapper">
        {iconType()}
        <TextField
          id="outlined-required"
          style={{ flex: 1 }}
          label={name}
          name={name}
          margin="dense"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

TextInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
};

export default TextInput;
