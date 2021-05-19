import { faFolderOpen, faSave } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Modal from "react-modal";
import api from "../../services/api";
import LoadModalContent from "../modal/LoadModalContent";
import SaveModalContent from "../modal/SaveModalContent";
import "./Toolbar.css";
import ToolbarButton from "./ToolbarButton";

Modal.setAppElement(document.getElementById("root"));

const Toolbar = (props) => {
  const { loadedCollection, features, onSave, onLoad } = props;
  const [activeModal, setActiveModal] = useState(null);
  const [collections, setCollections] = useState([]);

  const onSetActiveModalHandler = (modal) => {
    setActiveModal(modal);
  };

  const onSaveClickHandler = () => {
    onSetActiveModalHandler("save-modal");
  };

  const onSaveHandler = async (saveName, isSaveAs) => {
    const upsertCollection = async (shouldCreateNewCollection) => {
      const endpoint = shouldCreateNewCollection ? "/collections" : `/collections/${loadedCollection.id}`;
      const collection = await api.put(endpoint, { name: saveName });
      return collection.data;
    };

    const collectionToSave = await upsertCollection(isSaveAs || !loadedCollection);

    await api.put(
      `/collections/${collectionToSave.id}/features`,
      features.map((feature) => feature.feature)
    );

    onSetActiveModalHandler(null);
    onSave(collectionToSave);
  };

  const onLoadClickHandler = async () => {
    onSetActiveModalHandler("load-modal");
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

  const onLoadHandler = async (loadedCollection) => {
    const collectionFeatures = await api.get(`/collections/${loadedCollection.id}/features`);
    const validGeoJson = {
      type: "FeatureCollection",
      features: collectionFeatures.data.map((feature) => {
        return {
          type: "Feature",
          properties: {
            color: feature.properties.color,
          },
          geometry: feature.geometry,
        };
      }),
    };
    onSetActiveModalHandler(null);
    onLoad(loadedCollection, validGeoJson);
  };

  return (
    <div className="toolbar-container">
      <ToolbarButton icon={faSave} onClick={onSaveClickHandler} />
      <ToolbarButton icon={faFolderOpen} onClick={onLoadClickHandler} />
      <Modal
        isOpen={activeModal === "save-modal"}
        onRequestClose={() => onSetActiveModalHandler(null)}
        style={{ overlay: { zIndex: 1001 }, content: { zIndex: 1001 } }} // compensate for leaflet z-index
      >
        <SaveModalContent loadedCollection={loadedCollection} onSave={onSaveHandler} />
      </Modal>
      <Modal
        isOpen={activeModal === "load-modal"}
        onRequestClose={() => onSetActiveModalHandler(null)}
        style={{ overlay: { zIndex: 1001 }, content: { zIndex: 1001 } }} // compensate for leaflet z-index
      >
        <LoadModalContent collections={collections} onLoad={onLoadHandler} />
      </Modal>
    </div>
  );
};

export default Toolbar;
