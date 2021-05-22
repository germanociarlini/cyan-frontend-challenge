import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";

const BaseModal = ({ isOpen, onRequestClose, content }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{ overlay: { zIndex: 1001 }, content: { zIndex: 1001 } }}>
      <FontAwesomeIcon icon={faTimes} className="modal__close-button" onClick={onRequestClose} />
      {content}
    </Modal>
  );
};

export default BaseModal;
