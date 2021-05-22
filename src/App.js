import { useMemo, useState } from "react";
import CollectionController from "./components/CollectionController";
import { CollectionContext, LayersContext } from "./components/Contexts";
import Map from "./components/Map";

const App = () => {
  const [collection, setCollection] = useState(null);
  const [layers, setLayers] = useState([]);

  const collectionProviderValue = useMemo(
    () => ({
      collection,
      setCollection,
    }),
    [collection, setCollection]
  );

  const layersProviderValue = useMemo(
    () => ({
      layers,
      setLayers,
    }),
    [layers, setLayers]
  );

  return (
    <div className="App">
      <CollectionContext.Provider value={collectionProviderValue}>
        <LayersContext.Provider value={layersProviderValue}>
          <CollectionController />
          <Map />
        </LayersContext.Provider>
      </CollectionContext.Provider>
    </div>
  );
};

export default App;
