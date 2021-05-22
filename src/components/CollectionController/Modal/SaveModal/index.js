import { useContext, useEffect, useState } from "react";
import { CollectionContext } from "../../../Contexts";
import "../Modal.css";
import "./SaveModal.css";

const SaveModal = ({ onSaveAs, onOverwrite }) => {
  const { collection } = useContext(CollectionContext);
  const [saveName, setSaveName] = useState("");

  useEffect(() => {
    setSaveName(collection ? collection.name : "");
  }, [collection]);

  const onSaveNameChangeHandler = (text) => {
    setSaveName(text);
  };

  const onSaveAsHandler = () => {
    onSaveAs(saveName);
  };

  const onOverwriteHandler = () => {
    onOverwrite(saveName, collection);
  };

  return (
    <div>
      <header>
        <h2>Save Feature Collection</h2>
      </header>
      <main>
        <input
          type="text"
          value={saveName}
          onChange={(e) => onSaveNameChangeHandler(e.target.value)}></input>
        {collection && (
          <button
            className="modal__button"
            disabled={saveName.length === 0}
            onClick={onOverwriteHandler}>
            Overwrite...
          </button>
        )}
        <button
          className="modal__button"
          disabled={saveName.length === 0}
          onClick={onSaveAsHandler}>
          Save as...
        </button>
      </main>
    </div>
  );
};

export default SaveModal;
