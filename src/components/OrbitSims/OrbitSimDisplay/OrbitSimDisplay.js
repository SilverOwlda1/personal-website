import React, { useEffect, useState } from "react";
import classes from "./OrbitSimDisplay.module.css";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
// import $ from "jquery";
// window.jQuery = $;
// window.$ = $;

const OrbitSimDisplay = (props) => {
  const getPlanets = () => {
    let planetList = [];
    for (let i = 0; i < props.sim.masses.length; i++) {
      // console.log("mass" + props.sim.masses[i]);
      // console.log("name" + props.sim.names[i]);
      // console.log("r0" + props.sim.r0s[i]);
      // console.log("v0" + props.sim.v0s[i]);
      // console.log("radius" + props.sim.radii[i]);
      planetList.push({
        name: props.sim.names[i] ? props.sim.names[i] : "",
        mass: props.sim.masses[i] ? props.sim.masses[i] : 0.0,
        r0: props.sim.r0s[i] ? props.sim.r0s[i] : [0.0, 0.0, 0.0],
        v0: props.sim.v0s[i] ? props.sim.v0s[i] : [0.0, 0.0, 0.0],
        radius: props.sim.radii[i] ? props.sim.radii[i] : 0.0,
      });
    }
    return planetList;
  };

  const [planets, setPlanets] = useState(getPlanets());

  useEffect(() => {
    localStorage.setItem("celestial-bodies", JSON.stringify(planets));
  }, planets);

  // const bruh = () => {
  //   let htmlToAppend = "<div id="glowscript" class="glowscript">\n \
  //   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n \
  //   <link type="text/css" href="https://www.glowscript.org/css/redmond/2.1/jquery-ui.custom.css" rel="stylesheet"/>\n \
  //   <link type="text/css" href="https://www.glowscript.org/css/ide.css" rel="stylesheet"/>\n \
  //   <script type="text/javascript" src="https://www.glowscript.org/lib/jquery/2.1/jquery.min.js"></script>\n \
  //   <script type="text/javascript" src="https://www.glowscript.org/lib/jquery/2.1/jquery-ui.custom.min.js"></script>\n \
  //   <script type="text/javascript" src="https://www.glowscript.org/package/glow.3.2.min.js"></script>\n \
  //   <script id="correct-script" type="text/javascript"></script>\n \
  //   </div>\n";
  //   $("#orbit-sim-display").append(htmlToAppend);
  // };

  const onCloseHandler = () => {
    props.onClose();
  };

  return (
    <div className={classes["orbit-sim-display-container"]}>
      <Card id="orbit-sim-display" className={classes["orbit-sim-display"]}>
        <iframe
          title="orbit display"
          src="orbitdisplay.html"
          name="targetframe"
          allowtransparency="true"
          scrolling="no"
          frameborder="0"
          className={classes.display}
        ></iframe>
        <Button onClick={onCloseHandler}>Close</Button>
      </Card>
    </div>
  );
};

export default OrbitSimDisplay;
