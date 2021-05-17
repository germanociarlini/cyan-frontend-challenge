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
    setCollections(featureCollections.data);
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
        <h2>Load Feature Collection</h2>
        {collections.map((collection) => {
          return (
            <p
              className={`modal__collection-item ${
                collection === selectedCollection ? "selected" : ""
              }`}
              key={collection.id}
              onClick={() => onCollectionItemSelected(collection)}
            >
              {collection.name}
            </p>
          );
        })}
        <button
          className="modal__select-button"
          onClick={onLoadHandler}
          disabled={selectedCollection === null}
        >
          Load Collection
        </button>
      </Modal>
    </div>
  );
};

export default Toolbar;
