import { faFolderOpen, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import Modal from "react-modal";
import { CollectionContext, LayersContext } from "../Contexts";
import { extractLayerGeoJson } from "../Map/LayersController/utils";
import "./CollectionController.css";
import BaseModal from "./Modal";
import LoadModal from "./Modal/LoadModal";
import SaveModal from "./Modal/SaveModal";
import { saveFeatures, saveNewCollection, updateCollection } from "./utils";

Modal.setAppElement(document.getElementById("root"));

const CollectionController = () => {
  const [activeModal, setActiveModal] = useState(null);
  const { collection, setCollection } = useContext(CollectionContext);
  const { layers } = useContext(LayersContext);

  const onSaveAsHandler = async (saveName) => {
    const newCollection = await saveNewCollection(saveName);
    onSaveCollection(newCollection);
  };

  const onOverwriteHandler = async (saveName, collectionToOverwrite) => {
    const updatedCollection = await updateCollection(saveName, collectionToOverwrite);
    onSaveCollection(updatedCollection);
  };

  const onSaveCollection = async (upsertedCollection) => {
    const collectionGeoJson = layers.map((layer) => extractLayerGeoJson(layer));
    const saveFeaturesResult = await saveFeatures(upsertedCollection.id, collectionGeoJson);
    if (saveFeaturesResult) {
      setActiveModal(null);
      setCollection(upsertedCollection);
    } else {
      // show error toast
    }
  };

  const onLoadHandler = async (loadedCollection) => {
    setActiveModal(null);
    setCollection(loadedCollection);
  };

  const saveModal = <SaveModal onSaveAs={onSaveAsHandler} onOverwrite={onOverwriteHandler} />;
  const loadModal = <LoadModal onLoad={(loadedCollection) => onLoadHandler(loadedCollection)} />;
  const collectionLabel = collection ? `Editing ${collection.name}` : "New Collection";

  return (
    <div className="collection-controller__container">
      <span className="collection-controller__editing-label">{collectionLabel}</span>
      <div className="collection-controller_toolbar">
        <div
          className="collection-controller_toolbar-button"
          onClick={() => setActiveModal(saveModal)}>
          <FontAwesomeIcon icon={faSave} />
        </div>
        <div
          className="collection-controller_toolbar-button"
          onClick={() => setActiveModal(loadModal)}>
          <FontAwesomeIcon icon={faFolderOpen} />
        </div>
        <BaseModal
          isOpen={activeModal !== null}
          onRequestClose={() => setActiveModal(null)}
          content={activeModal}
        />
      </div>
    </div>
  );
};

export default CollectionController;
