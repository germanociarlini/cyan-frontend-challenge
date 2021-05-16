import { faFolderOpen, faSave } from "@fortawesome/free-solid-svg-icons";
import "./Toolbar.css";
import ToolbarButton from "./ToolbarButton";
import testGeoJson from "../../test.json";

const Toolbar = (props) => {
  const { onSave, onLoad } = props;

  const onSaveHandler = () => {
    onSave();
  };

  const onLoadHandler = () => {
    // Open modal
    onLoad(testGeoJson);
  };

  return (
    <div className="toolbar-container">
      <ToolbarButton icon={faSave} onClick={onSaveHandler} />
      <ToolbarButton icon={faFolderOpen} onClick={onLoadHandler} />
    </div>
  );
};

export default Toolbar;
