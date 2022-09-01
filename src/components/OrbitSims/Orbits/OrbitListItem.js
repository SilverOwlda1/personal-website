import React from "react";
import classes from "./OrbitListItem.module.css";
import "../../UI/Card.css";
import Card from "../../UI/Card";
import Button from "../../UI/Button";

const OrbitListItem = (props) => {
  return (
    <li className={`card ${classes["orbit-list-item"]}`}>
      <h1 className={classes["orbit-list-item__title"]}>{props.title}</h1>
      <Card className={classes["orbit-list-item__container"]}>
        Number of bodies: {props.masses.length}
      </Card>
      <Card className={classes["orbit-list-item__container"]}>
        <Button
          id={props.id}
          onClick={props.onRun}
          className={classes["orbit-list-item__button"]}
        >
          Run Simulation
        </Button>
        <Button className={classes["orbit-list-item__button"]}>
          Edit Simulation
        </Button>
        <Button
          id={props.id}
          onClick={props.onDelete}
          className={classes["orbit-list-item__button"]}
        >
          Delete Simulation
        </Button>
      </Card>
    </li>
  );
};

export default OrbitListItem;
