import React from "react";
import '../app/app.css';
import './modal.css';
import PropTypes from "prop-types";

function Modal({children}) {
  return (
    <div className="modal-container">
      {children}
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
