import { faFolderOpen, faSave } from "@fortawesome/free-solid-svg-icons";
import "./Toolbar.css";
import ToolbarButton from "./ToolbarButton";
import api from '../../services/api';

const Toolbar = (props) => {
  const { onSave, onLoad } = props;

  const onSaveHandler = () => {
    onSave();
  };

  const onLoadHandler = async () => {
    const featureCollections = await api.get('/collections');
    console.log(featureCollections);
    
    // Open modal with "props" featureCollections, onLoad
  };

  return (
    <div className="toolbar-container">
      <ToolbarButton icon={faSave} onClick={onSaveHandler} />
      <ToolbarButton icon={faFolderOpen} onClick={onLoadHandler} />
    </div>
  );
};

export default Toolbar;
