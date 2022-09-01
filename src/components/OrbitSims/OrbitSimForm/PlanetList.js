import classes from "./PlanetList.module.css";
import PlanetListItem from "./PlanetListItem";

const PlanetList = (props) => {
  const deletePlanetListItemHandler = (planetID) => {
    props.deletePlanet(planetID);
  };
  return (
    <ul className={classes["planet-list"]}>
      {props.planetsArray.map((planet) => (
        <PlanetListItem
          id={planet.id}
          key={planet.id}
          name={planet.name}
          mass={planet.mass}
          r0={planet.r0}
          v0={planet.v0}
          onDelete={deletePlanetListItemHandler}
        />
      ))}
    </ul>
  );
};

export default PlanetList;
