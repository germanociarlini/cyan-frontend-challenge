import { faFolderOpen, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import Modal from "react-modal";
import { CollectionContext, FeaturesContext } from "../Contexts";
import "./CollectionController.css";
import LoadModal from "./LoadModal";
import SaveModal from "./SaveModal";
import { putFeatures, upsertCollection } from "./utils";

Modal.setAppElement(document.getElementById("root"));

const CollectionController = () => {
  const [activeModal, setActiveModal] = useState(null);
  const { collection, setCollection } = useContext(CollectionContext);
  const { features } = useContext(FeaturesContext);

  const onSaveHandler = async (saveName, isSaveAs) => {
    const collectionToSave = await upsertCollection(saveName, (isSaveAs || !collection), collection);
    const result = await putFeatures(collectionToSave.id, features);
    if (result) {
      setActiveModal(null);
      setCollection(collectionToSave);
    }
  };

  const onLoadHandler = async (collection) => {
    setActiveModal(null);
    setCollection(collection);
  };

  const saveModal = <SaveModal onSave={onSaveHandler} />;
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
