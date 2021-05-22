import { useEffect, useState } from "react";
import api from "../../../../services/api";
import "../Modal.css";
import "./LoadModal.css";

const LoadModal = ({ onLoad }) => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      const featureCollections = await api.get("/collections");
      setCollections(
        featureCollections.data.map((collection) => {
          return {
            ...collection,
            updatedAt: new Date(collection.updatedAt.replace(" ", "T")),
          };
        })
      );
    };
    fetchCollections();
  }, []);

  const onSelectedCollectionHandler = (collection) => {
    setSelectedCollection(collection);
  };

  const onLoadHandler = () => {
    onLoad(selectedCollection);
  };

  return (
    <div className="load-modal__content">
      <header className="modal__header">
        <h2>Load Feature Collection</h2>
      </header>
      <main className="load-modal__collection-list">
        {collections.map((collection) => {
          return (
            <div
              className={`load-modal__collection-item ${
                collection === selectedCollection ? "selected" : ""
              }`}
              onClick={() => onSelectedCollectionHandler(collection)}
              onDoubleClick={onLoadHandler}
              key={collection.id}>
              <span>{collection.name}</span>
              <span>{collection.updatedAt.toLocaleString("default")}</span>
            </div>
          );
        })}
      </main>
      <footer>
        <button
          className="modal__button"
          onClick={onLoadHandler}
          disabled={selectedCollection === null}>
          Load Collection
        </button>
      </footer>
    </div>
  );
};

export default LoadModal;
