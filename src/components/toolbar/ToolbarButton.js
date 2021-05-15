import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ToolbarButton.css";

const ToolbarButton = (props) => {
  const { icon, onClick } = props;

  const onClickHandler = () => {
    onClick();
  };

  return (
    <div className="toolbar-button" onClick={onClickHandler}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default ToolbarButton;
