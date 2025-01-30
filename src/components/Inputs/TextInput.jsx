import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./Inputs.css";
import UserIcon from "../Icons/User";
import SearchIcon from "../Icons/Search";

function TextInput(props) {
  const inputRef = useRef(null);

  const iconType = () => {
    if (props.type === "user") return <UserIcon />;
    if (props.type === "search") return <SearchIcon />;
    return "";
  };
  return (
    <div className="Input">
      <div className="input-wrapper">
        {iconType()}
        <input
          type="text"
          name={props.name}
          value={props.value}
          onChange={props.change}
          placeholder={props.placeholder}
          autoComplete="off"
          ref={inputRef}
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
