import React from "react";
import classes from "./OrbitList.module.css";
import OrbitListItem from "./OrbitListItem";

const OrbitList = (props) => {
  const deleteOrbitListItemHandler = (event) => {
    props.onDeleteItem(event.target.id);
  };

  const runOrbitSimHandler = (event) => {
    props.onRunSim(event.target.id);
  };

  return (
    <ul className={classes["orbit-list"]}>
      {props.simsArray.map((sim) => (
        <OrbitListItem
          id={sim.id}
          key={sim.id}
          title={sim.title}
          masses={sim.masses}
          onDelete={deleteOrbitListItemHandler}
          onRun={runOrbitSimHandler}
        />
      ))}
    </ul>
  );
};

export default OrbitList;
