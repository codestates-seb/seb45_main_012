import React from 'react';
import '../styles/Button.css';
import '../styles/Modal.css';
import PropTypes from 'prop-types';
import { ModalProps } from '../types/types.ts';

const Modal: React.FC<ModalProps> = ({ content, onCancel, onConfirm }) => {
  return (
    <div className="modal_overlay">
      <div className="modal_container">
        <div className="modal_content">{content}</div>
        <div className="modal_buttons">
          <button className="custom_button confirm_button" onClick={onConfirm}>
            확인
          </button>
          <button className="custom_button cancel_button" onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
