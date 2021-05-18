import { faFolderOpen, faSave } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Modal from "react-modal";
import api from "../../services/api";
import LoadModal from "../modal/LoadModal";
import "./Toolbar.css";
import ToolbarButton from "./ToolbarButton";

Modal.setAppElement(document.getElementById("root"));

const Toolbar = (props) => {
  const { onSave, onLoad } = props;
  const [activeModal, setActiveModal] = useState(null);
  const [collections, setCollections] = useState([]);

  const onSaveHandler = () => {
    onSetActiveModalHandler("save-modal");
    onSave();
  };

  const onSetActiveModalHandler = (modal) => {
    setActiveModal(modal);
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

  const onLoadHandler = async (selectedCollection) => {
    const collectionFeatures = await api.get(
      `/collections/${selectedCollection.id}/features`
    );
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
    onSetActiveModalHandler(null);
    onLoad(validGeoJson);
  };

  return (
    <div className="toolbar-container">
      <ToolbarButton icon={faSave} onClick={onSaveHandler} />
      <ToolbarButton icon={faFolderOpen} onClick={onLoadClickHandler} />
      <Modal
        isOpen={activeModal === "load-modal"}
        onRequestClose={() => onSetActiveModalHandler(null)}
        style={{ overlay: { zIndex: 1001 }, content: { zIndex: 1001 } }} // compensate for leaflet z-index
      >
        <LoadModal collections={collections} onLoad={onLoadHandler} />
      </Modal>
    </div>
  );
};

export default Toolbar;
