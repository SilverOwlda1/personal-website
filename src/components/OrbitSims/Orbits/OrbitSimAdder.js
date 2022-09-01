import React from "react";
import classes from "./OrbitSimAdder.module.css";
import Button from "../../UI/Button";

const OrbitSimAdder = (props) => {
  const simAddHandler = (event) => {
    props.addSim();
  };

  return (
    <div className={classes["orbit-sim-adder"]}>
      <h2 className={classes["orbit-sims-title"]}>Orbit Simulations</h2>
      <Button
        onClick={simAddHandler}
        className={classes["orbit-sim-adder__button"]}
      >
        Add Simulation
      </Button>
    </div>
  );
};

export default OrbitSimAdder;
