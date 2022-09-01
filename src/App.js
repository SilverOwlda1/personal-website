import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import OrbitList from "./components/OrbitSims/Orbits/OrbitList";
import OrbitSimAdder from "./components/OrbitSims/Orbits/OrbitSimAdder";
import AddOrbitSim from "./components/OrbitSims/OrbitSimForm/AddOrbitSim";
import OrbitSimDisplay from "./components/OrbitSims/OrbitSimDisplay/OrbitSimDisplay";

// const DEFAULT_SIMS = [
//   {
//     id: 0,
//     title: "title",
//     masses: [5.97e24],
//     r0s: [[0.0, 0.0, 0.0]],
//     v0s: [[0.0, 0.0, 0.0]],
//   },
// ];

const App = () => {
  const [sims, setSims] = useState([]);

  const [renderState, setRenderState] = useState("listing-orbits");

  useEffect(() => {
    const storedSimsArray = localStorage.getItem("sims-array");
    try {
      if (storedSimsArray) {
        setSims(JSON.parse(storedSimsArray));
      } else {
        setSims([]);
      }
    } catch (error) {
      console.log(error);
      localStorage.setItem("sims-array", JSON.stringify(sims));
    }
  }, [renderState]);

  const addNewSimHandler = () => {
    setRenderState("adding-orbits");
    //const newSims = [...sims];
    //localStorage.setItem("sims-array", JSON.stringify(newSims));
    //setSims((prevSims) => [sim, ...prevSims]);
  };

  const deleteSimHandler = (simID) => {
    let newSims = [...sims];
    let i = 0;
    for (let j = 1; j < newSims.length; j++) {
      if (newSims[j].id === simID) {
        i = j;
      }
    }
    newSims.splice(i, 1);
    localStorage.setItem("sims-array", newSims);
    setSims((prevSims) => {
      let newSims = [...prevSims];
      newSims.splice(i, 1);
      return newSims;
    });
  };

  const cancelForm = () => {
    setRenderState("listing-orbits");
  };

  const submitForm = (sim) => {
    const newSims = [sim, ...sims];
    localStorage.setItem("sims-array", JSON.stringify(newSims));
    setRenderState("listing-orbits");
  };

  const runOrbitSim = (simID) => {
    setRenderState({ state: "display-orbit", id: simID });
  };

  const simOutputHandler = () => {
    console.log(renderState.id);
    for (let i = 0; i < sims.length; i++) {
      if (sims[i].id === renderState.id) {
        // console.log("mass" + sims[i].masses);
        // console.log("name" + sims[i].names);
        // console.log("r0" + sims[i].r0s);
        // console.log("v0" + sims[i].v0s);
        // console.log("radius" + sims[i].radii);
        return sims[i];
      }
    }
    return sims[0];
  };

  const onClose = () => {
    setRenderState("listing-orbits");
  };

  return (
    <div className="App">
      <Navbar />
      <main>
        {renderState === "listing-orbits" && (
          <React.Fragment>
            <OrbitSimAdder addSim={addNewSimHandler} />
            <OrbitList
              onDeleteItem={deleteSimHandler}
              simsArray={sims}
              onRunSim={runOrbitSim}
            />
          </React.Fragment>
        )}
        {renderState === "adding-orbits" && (
          <AddOrbitSim
            cancelForm={cancelForm}
            submitForm={submitForm}
            simsArray={sims}
          />
        )}
        {renderState.state === "display-orbit" && (
          <OrbitSimDisplay sim={simOutputHandler()} onClose={onClose} />
        )}
      </main>
    </div>
  );
};

export default App;
