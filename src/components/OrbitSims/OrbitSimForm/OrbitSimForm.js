import React, { useReducer } from "react";
import FormInput from "./FormInput";
import Button from "../../UI/Button";
import { v4 as uuid } from "uuid";

const planetReducer = (state, action) => {
  try {
    if (action.type === "USER_INPUT") {
      return {
        // id: uuid(),
        name: action.value.hasOwnProperty("name")
          ? action.value.name
          : state.name,
        mass: action.value.hasOwnProperty("mass")
          ? action.value.mass
          : state.mass,
        r0: action.value.hasOwnProperty("r0") ? action.value.r0 : state.r0,
        r0Ang: action.value.hasOwnProperty("r0Ang")
          ? action.value.r0Ang
          : state.r0Ang,
        v0: action.value.hasOwnProperty("v0") ? action.value.v0 : state.v0,
        v0Ang: action.value.hasOwnProperty("v0Ang")
          ? action.value.v0Ang
          : state.v0Ang,
        radius: action.value.hasOwnProperty("radius")
          ? action.value.radius
          : state.radius,
      };
    }
    if (action.type === "INPUT_BLUR") {
      return {
        // id: state.id,
        name: state.name,
        mass: state.mass,
        r0: state.r0,
        r0Ang: state.r0Ang,
        v0: state.v0,
        v0Ang: state.v0Ang,
        radius: state.radius,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      // id: uuid(),
      name: "",
      mass: 0.0,
      r0: 0.0,
      r0Ang: 0.0,
      v0: 0.0,
      v0Ang: 0.0,
      radius: 0.0,
    };
  }
};

const OrbitSimForm = (props) => {
  const [planet, dispatchPlanet] = useReducer(planetReducer, {
    // id: uuid(),
    name: "",
    mass: 0.0,
    r0: 0.0,
    r0Ang: 0.0,
    v0: 0.0,
    v0Ang: 0.0,
    radius: 0.0,
  });

  const onNameChangeHandler = (event) => {
    dispatchPlanet({
      type: "USER_INPUT",
      value: {
        name: event.target.value,
      },
    });
  };

  const onMassChangeHandler = (event) => {
    dispatchPlanet({
      type: "USER_INPUT",
      value: {
        mass: parseFloat(event.target.value),
      },
    });
  };

  const onPositionChangeHandler = (event) => {
    dispatchPlanet({
      type: "USER_INPUT",
      value: {
        r0: parseFloat(event.target.value),
      },
    });
  };

  const onPositionAngleChangeHandler = (event) => {
    dispatchPlanet({
      type: "USER_INPUT",
      value: {
        r0Ang: parseFloat(event.target.value),
      },
    });
  };

  const onVelocityChangeHandler = (event) => {
    dispatchPlanet({
      type: "USER_INPUT",
      value: {
        v0: parseFloat(event.target.value),
      },
    });
  };

  const onVelocityAngleChangeHandler = (event) => {
    dispatchPlanet({
      type: "USER_INPUT",
      value: {
        v0Ang: parseFloat(event.target.value),
      },
    });
  };

  const onRadiusChangeHandler = (event) => {
    dispatchPlanet({
      type: "USER_INPUT",
      value: {
        radius: parseFloat(event.target.value),
      },
    });
  };

  const validateForm = (event) => {
    dispatchPlanet({ type: "INPUT_BLUR" });
  };

  const onSubmitFormHandler = (event) => {
    event.preventDefault();
    const newPlanet = { id: uuid(), ...planet };
    props.onSubmitForm(newPlanet);
  };

  return (
    <form onSubmit={onSubmitFormHandler}>
      <FormInput
        onChange={onNameChangeHandler}
        onBlur={validateForm}
        title="Planet Name"
        units=""
      />
      <FormInput
        onChange={onMassChangeHandler}
        onBlur={validateForm}
        title="Planet  Mass"
        units="kg"
      />
      <FormInput
        onChange={onPositionChangeHandler}
        onBlur={validateForm}
        title="Planet Position"
        units="km"
      />
      <FormInput
        onChange={onPositionAngleChangeHandler}
        onBlur={validateForm}
        title="Planet Position Angle"
        units="deg"
      />
      <FormInput
        onChange={onVelocityChangeHandler}
        onBlur={validateForm}
        title="Planet Velocity"
        units="m/s"
      />
      <FormInput
        onChange={onVelocityAngleChangeHandler}
        onBlur={validateForm}
        title="Planet Velocity Angle"
        units="deg"
      />
      <FormInput
        onChange={onRadiusChangeHandler}
        onBlur={validateForm}
        title="Planet Radius"
        units="km"
      />
      <Button type="submit">Add Planet</Button>
    </form>
  );
};

export default OrbitSimForm;
