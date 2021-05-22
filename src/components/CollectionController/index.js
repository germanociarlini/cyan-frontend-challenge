import { faFolderOpen, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import Modal from "react-modal";
import { CollectionContext, FeaturesContext } from "../Contexts";
import "./CollectionController.css";
import LoadModal from "./LoadModal";
import SaveModal from "./SaveModal";
import { saveFeatures, saveNewCollection } from "./utils";

Modal.setAppElement(document.getElementById("root"));

const CollectionController = () => {
  const [activeModal, setActiveModal] = useState(null);
  const { setCollection } = useContext(CollectionContext);
  const { features } = useContext(FeaturesContext);

  //#region Save Handlers
  const onSaveAsHandler = async (saveName) => {
    const newCollection = await saveNewCollection(saveName);
    onSaveCollection(newCollection);
  };

  const onOverwriteHandler = (saveName, collectionToOverwrite) => {
    const updatedCollection = await updatedCollection(saveName, collectionToOverwrite);
    onSaveCollection(updatedCollection);
  };

  const onSaveCollection = (upsertedCollection) => {
    const putFeaturesResult = await saveFeatures(upsertedCollection.id, features);
    if (putFeaturesResult) {
      setActiveModal(null);
      setCollection(storedCollection);
    }
  };
  //#endregion

  //#region Load Handlers
  const onLoadHandler = async (collection) => {
    setActiveModal(null);
    setCollection(collection);
  };
  //#endregion

  const saveModal = <SaveModal onSaveAs={onSaveAsHandler} onOverwrite={onOverwriteHandler} />;
  const loadModal = <LoadModal onLoad={(collection) => onLoadHandler(collection)} />;

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
