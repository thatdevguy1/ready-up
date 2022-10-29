import React from "react";
import PropTypes from "prop-types";
import "./Inputs.css";
import UserIcon from "../Icons/User";
import SearchIcon from "../Icons/Search";

function TextInput(props) {
  const iconType = () => {
    if (props.type === "user") return <UserIcon />;
    if (props.type === "search") return <SearchIcon />;
    return "";
  };
  return (
    <div className="Input">
      <div className="input-wrapper">
        {iconType()}
        <input type="text" />
      </div>
    </div>
  );
}

TextInput.propTypes = {
  type: PropTypes.string,
};

export default TextInput;
