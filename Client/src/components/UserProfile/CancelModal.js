// src/Modal.js
import React from 'react';
import './Modal.css';

const CancelModal = ({ show, handleClose, handleConfirm }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <h2>Are you sure?</h2>
        <p>Do you really want to cancel your subscription?</p>
        <div className="modal-actions">
          <button onClick={(e)=>handleConfirm(e)} className="modal-confirm">
            Yes
          </button>
          <button onClick={handleClose} className="modal-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
