import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ToolbarButton.css";

const ToolbarButton = (props) => {
  const { icon, onClickHandler } = props;

  return (
    <div className="toolbar-button">
      <FontAwesomeIcon icon={icon} onClick={onClickHandler} />
    </div>
  );
};

export default ToolbarButton;
