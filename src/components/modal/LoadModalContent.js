import { useState } from "react";
import "./LoadModalContent.css";

const LoadModal = (props) => {
  const { collections, onLoad } = props;
  const [selectedCollection, setSelectedCollection] = useState(null);

  const onSelectedCollectionHandler = (collection) => {
    setSelectedCollection(collection);
  };

  const onLoadHandler = () => {
    onLoad(selectedCollection);
  };

  return (
    <div>
      <header className="modal__header">
        <h2>Load Feature Collection</h2>
        <button className="modal__select-button" onClick={onLoadHandler} disabled={selectedCollection === null}>
          Load Collection
        </button>
      </header>
      <main>
        {collections.map((collection) => {
          return (
            <div
              className={`modal__collection-item ${collection === selectedCollection ? "selected" : ""}`}
              onClick={() => onSelectedCollectionHandler(collection)}
              key={collection.id}>
              <span>{collection.name}</span>
              <span>{collection.updatedAt.toLocaleString("default")}</span>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default LoadModal;
