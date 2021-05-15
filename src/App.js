import { useState } from "react";
import Map from "./components/map/Map";
import Toolbar from "./components/toolbar/Toolbar";

const App = () => {
  const [features, setFeatures] = useState([]);

  const updateFeaturesHandler = (updatedFeatures) => {
    setFeatures(updatedFeatures);
  };

  const save = () => {
    // To do...
    console.log(`Saving...`, features);
  };

  const load = () => {
    // To do...
    console.log(`Loading...`, features);
  };

  return (
    <div className="App">
      <Map features={features} onUpdateFeatures={updateFeaturesHandler} />
      <Toolbar onSave={save} onLoad={load} />
    </div>
  );
};

export default App;
