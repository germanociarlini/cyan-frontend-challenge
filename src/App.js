import { useState } from "react";
import Map from "./components/map/Map";
import Toolbar from "./components/toolbar/Toolbar";

const App = () => {
  // NONE, POINT, LINESTRING, POLYGON
  const [activeControl, setActiveControl] = useState("NONE");

  const save = () => {
    // To do...
    console.log("Saving...");
  }

  const load = () => {
    // To do...
    console.log("Loading...");
  }

  const changeControl = (control) => {
    setActiveControl(control);
  };

  return (
    <div className="App">
      <Map activeControl={activeControl} />
      <Toolbar onSave={save} onLoad={load} onChangeControl={changeControl}/>
    </div>
  );
};

export default App;
