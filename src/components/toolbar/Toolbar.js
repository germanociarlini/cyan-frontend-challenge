import {
  faDotCircle,
  faDrawPolygon,
  faFolderOpen,
  faMousePointer,
  faSave,
  faSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./Toolbar.css";
import ToolbarButton from "./ToolbarButton";

const Toolbar = (props) => {
  const { onSave, onLoad, onChangeControl } = props;

  const onSaveHandler = () => {
    onSave();
  }

  const onLoadHandler = () => {
    onLoad();
  }

  const onChangeControlHandler = (control) => {
    onChangeControl(control);
  }

  return (
    <div className="toolbar-container">
      <ToolbarButton icon={faSave} onClick={onSaveHandler} />
      <ToolbarButton icon={faFolderOpen} onClick={onLoadHandler} />
      <ToolbarButton icon={faMousePointer} onClick={() => onChangeControlHandler("NONE")} />
      <ToolbarButton icon={faDotCircle} onClick={() => onChangeControlHandler("POINT")} />
      <ToolbarButton icon={faSlash} onClick={() => onChangeControlHandler("LINESTRING")} />
      <ToolbarButton icon={faDrawPolygon} onClick={() => onChangeControlHandler("POLYGON")} />
    </div>
  );
};

export default Toolbar;
