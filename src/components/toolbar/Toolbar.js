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

const Toolbar = () => {
  return (
    <div className="toolbar-container">
      <ToolbarButton icon={faSave} />
      <ToolbarButton icon={faFolderOpen} />
      <ToolbarButton icon={faMousePointer} />
      <ToolbarButton icon={faDotCircle} />
      <ToolbarButton icon={faSlash} />
      <ToolbarButton icon={faDrawPolygon} />
    </div>
  );
};

export default Toolbar;
