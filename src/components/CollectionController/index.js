import { faFolderOpen, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import Modal from "react-modal";
import { CollectionContext, LayersContext } from "../Contexts";
import { extractLayerGeoJson } from "../Map/LayersController/utils";
import "./CollectionController.css";
import LoadModal from "./LoadModal";
import SaveModal from "./SaveModal";
import { saveFeatures, saveNewCollection, updateCollection } from "./utils";

Modal.setAppElement(document.getElementById("root"));

const CollectionController = () => {
  const [activeModal, setActiveModal] = useState(null);
  const { setCollection } = useContext(CollectionContext);
  const { layers } = useContext(LayersContext);

  //#region Save Handlers
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
  //#endregion

  //#region Load Handlers
  const onLoadHandler = async (loadedCollection) => {
    setActiveModal(null);
    setCollection(loadedCollection);
  };
  //#endregion

  const saveModal = <SaveModal onSaveAs={onSaveAsHandler} onOverwrite={onOverwriteHandler} />;
  const loadModal = <LoadModal onLoad={(loadedCollection) => onLoadHandler(loadedCollection)} />;

  return (
    <div className="collection-controller">
      <div className="toolbar-button" onClick={() => setActiveModal(saveModal)}>
        <FontAwesomeIcon icon={faSave} />
      </div>
      <div className="toolbar-button" onClick={() => setActiveModal(loadModal)}>
        <FontAwesomeIcon icon={faFolderOpen} />
      </div>
      <Modal
        isOpen={activeModal !== null}
        onRequestClose={() => setActiveModal(null)}
        style={{ overlay: { zIndex: 1001 }, content: { zIndex: 1001 } }}>
        {activeModal}
      </Modal>
    </div>
  );
};

export default CollectionController;
