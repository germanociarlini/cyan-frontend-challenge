import { useMemo, useState } from "react";
import CollectionController from "./components/CollectionController";
import { CollectionContext, FeaturesContext } from "./components/Contexts";
import Map from "./components/Map";

const App = () => {
  const [collection, setCollection] = useState(null);
  const [features, setFeatures] = useState([]);

  const collectionProviderValue = useMemo(
    () => ({
      collection,
      setCollection,
    }),
    [collection, setCollection]
  );

  const featuresProviderValue = useMemo(
    () => ({
      features,
      setFeatures,
    }),
    [features, setFeatures]
  );

  return (
    <div className="App">
      <CollectionContext.Provider value={collectionProviderValue}>
        <FeaturesContext.Provider value={featuresProviderValue}>
          <CollectionController />
          <Map />
        </FeaturesContext.Provider>
      </CollectionContext.Provider>
    </div>
  );
};

export default App;
