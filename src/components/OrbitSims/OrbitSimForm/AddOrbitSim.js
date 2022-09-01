import React, { useState } from "react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import classes from "./AddOrbitSim.module.css";
import PlanetList from "./PlanetList";
import OrbitSimForm from "./OrbitSimForm";
import { v4 as uuid } from "uuid";

const AddOrbitSim = (props) => {
  const deg2rad = Math.PI / 180.0;
  const [planets, setPlanets] = useState([]);
  const [title, setTitle] = useState("");

  const onSubmitFormHandler = (planet) => {
    setPlanets((prevPlanets) => [planet, ...prevPlanets]);
  };

  const cancelFormHandler = (event) => {
    props.cancelForm();
  };

  const addPlanetSimHandler = (event) => {
    let names = [];
    let masses = [];
    let r0s = [];
    let v0s = [];
    let radii = [];
    for (let i = 0; i < planets.length; i++) {
      names.push(planets[i].name);
      masses.push(planets[i].mass);
      radii.push(planets[i].radius);
      r0s.push([
        planets[i].r0 * Math.cos(deg2rad * planets[i].r0Ang),
        planets[i].r0 * Math.sin(deg2rad * planets[i].r0Ang),
        0.0,
      ]);
      v0s.push([
        planets[i].v0 *
          Math.cos(
            deg2rad * planets[i].v0Ang * Math.cos(deg2rad * planets[i].r0Ang) -
              Math.sin(
                deg2rad *
                  planets[i].v0Ang *
                  Math.sin(deg2rad * planets[i].r0Ang)
              )
          ),
        planets[i].v0 *
          Math.cos(
            deg2rad * planets[i].v0Ang * Math.sin(deg2rad * planets[i].r0Ang) +
              Math.sin(
                deg2rad *
                  planets[i].v0Ang *
                  Math.cos(deg2rad * planets[i].r0Ang)
              )
          ),
        0.0,
      ]);
    }
    const sim = {
      id: uuid(),
      title: title,
      names: names,
      masses: masses,
      r0s: r0s,
      v0s: v0s,
      radii: radii,
    };
    props.submitForm(sim);
  };

  const deletePlanet = (planetID) => {
    let i = 0;
    for (let j = 1; j < planets.length; j++) {
      if (planets[j].id + "" === planetID) {
        i = j;
      }
    }
    setPlanets((prevPlanets) => {
      let newPlanets = [...prevPlanets];
      newPlanets.splice(i, 1);

      return newPlanets;
    });
  };

  const onTitleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const validateTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className={classes["card-container"]}>
      <Card className={classes["form-card"]}>
        <div className={classes["title-input-container"]}>
          <div className={classes["title-input"]}>
            <label htmlFor="sim title">Sim Title</label>
            <input
              onChange={onTitleChangeHandler}
              onBlur={validateTitle}
              id="sim title"
              type="text"
            ></input>
          </div>
        </div>
        <Card className={classes["form-container"]}>
          <OrbitSimForm
            onSubmitForm={onSubmitFormHandler}
            planetsArray={planets}
          />
          <PlanetList deletePlanet={deletePlanet} planetsArray={planets} />
        </Card>
        <div>
          <Button onClick={addPlanetSimHandler}>Add Simulation</Button>
          <Button style={{ width: "145px" }} onClick={cancelFormHandler}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AddOrbitSim;
