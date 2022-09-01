import React from "react";
import "./Navbar.css";
import Button from "../UI/Button";

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <h1 style={{ color: "white", fontFamily: "Roboto", marginLeft: "20px" }}>
        Welcome to the Orbit Simulator!
      </h1>
    </nav>
  );
};

export default Navbar;
