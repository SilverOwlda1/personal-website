import classes from "./PlanetListItem.module.css";

const PlanetListItem = (props) => {
  const deletePlanetListItem = (event) => {
    props.onDelete(event.target.id);
  };

  return (
    <li className={classes["planet-list-item"]}>
      <p>{`${props.name}, M: ${props.mass} kg, P: ${props.r0} m, V: ${props.v0} m/s`}</p>
      <button id={props.id} onClick={deletePlanetListItem}>
        X
      </button>
    </li>
  );
};

export default PlanetListItem;
