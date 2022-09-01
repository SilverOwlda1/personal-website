import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button
      id={props.id}
      className={`${props.className} custom-button`}
      style={props.style}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
