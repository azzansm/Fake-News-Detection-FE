/* eslint-disable */
import '../index.css'; // Ensure your styles for modal are included in index.css

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button className="modal-button" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Modal;
