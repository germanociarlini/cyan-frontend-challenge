import { useState } from "react";
import Map from "./components/map/Map";
import Toolbar from "./components/toolbar/Toolbar";

const App = () => {
  const [features, setFeatures] = useState([]);

  const createFeatureHandler = (newFeature) => {
    setFeatures((previousFeatures) => [...previousFeatures, newFeature]);
  };

  const editFeatureHandler = (editedFeatures) => {
    console.log(editedFeatures);
  };

  const deleteFeatureHandler = (deletedFeatures) => {
    console.log(deletedFeatures);
  };

  const save = () => {
    console.log(`Saving...`, features);
  };

  const load = () => {
    console.log(`Loading...`, features);
  };

  return (
    <div className="App">
      <Map
        createFeature={createFeatureHandler}
        editFeature={editFeatureHandler}
        deleteFeature={deleteFeatureHandler}
      />
      <Toolbar onSave={save} onLoad={load} />
    </div>
  );
};

export default App;
