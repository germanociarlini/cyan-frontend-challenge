import { faFolderOpen, faSave } from "@fortawesome/free-solid-svg-icons";
import "./Toolbar.css";
import ToolbarButton from "./ToolbarButton";
import api from "../../services/api";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement(document.getElementById("root"));

const Toolbar = (props) => {
  const { onSave, onLoad } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);

  //#region Save Handlers
  const onSaveHandler = () => {
    onSave();
  };
  //#endregion

  //#region Load Handlers
  const _onModalOpen = () => {
    setIsModalOpen(true);
  };

  const _onModalClose = () => {
    setIsModalOpen(false);
    setSelectedCollection(null);
  };

  const onLoadClickHandler = async () => {
    _onModalOpen();
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

  const onCollectionItemSelected = (collection) => {
    setSelectedCollection(collection);
  };

  const onLoadHandler = async () => {
    const collectionFeatures = await api.get(
      `/collections/${selectedCollection.id}/features`
    );
    setSelectedCollection(null);
    _onModalClose();
    const validGeoJson = {
      type: "FeatureCollection",
      features: collectionFeatures.data.map((feature) => {
        return {
          type: "Feature",
          properties: {
            fill: feature.color,
          },
          geometry: feature.geometry,
        };
      }),
    };
    onLoad(validGeoJson);
  };
  //#endregion

  return (
    <div className="toolbar-container">
      <ToolbarButton icon={faSave} onClick={onSaveHandler} />
      <ToolbarButton icon={faFolderOpen} onClick={onLoadClickHandler} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={_onModalClose}
        style={{ overlay: { zIndex: 1001 }, content: { zIndex: 1001 } }} // compensate for leaflet z-index
      >
        <header className="modal__header">
          <h2>Load Feature Collection</h2>
          <button
            className="modal__select-button"
            onClick={onLoadHandler}
            disabled={selectedCollection === null}
          >
            Load Collection
          </button>
        </header>
        <main>
          {collections.map((collection) => {
            return (
              <div
                className={`modal__collection-item ${
                  collection === selectedCollection ? "selected" : ""
                }`}
                onClick={() => onCollectionItemSelected(collection)}
                key={collection.id}
              >
                <span>{collection.name}</span>
                <span>{collection.updatedAt.toLocaleString("default")}</span>
              </div>
            );
          })}
        </main>
      </Modal>
    </div>
  );
};

export default Toolbar;
