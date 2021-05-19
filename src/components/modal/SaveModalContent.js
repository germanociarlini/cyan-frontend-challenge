import { useState } from "react";
import "./SaveModalContent.css";

const SaveModalContent = (props) => {
  const { loadedCollection, onSave } = props;
  const [saveName, setSaveName] = useState("");

  const onSaveHandler = (isSaveAsNewCollection) => {
    onSave(saveName, isSaveAsNewCollection);
  };

  const onSaveNameChangeHandler = (text) => {
    setSaveName(text);
  };

  return (
    <div>
      <header className="modal__header">
        <h2>Save Feature Collection</h2>
      </header>
      <main>
        <input type="text" onChange={(e) => onSaveNameChangeHandler(e.target.value)}></input>
        {loadedCollection && <button
          className="modal__select-button"
          disabled={saveName.length === 0}
          onClick={() => onSaveHandler(false)}
        >
          Overwrite...
        </button>}
        <button
          className="modal__select-button"
          disabled={saveName.length === 0}
          onClick={() => onSaveHandler(true)}
        >
          Save as...
        </button>
      </main>
    </div>
  );
};

export default SaveModalContent;
