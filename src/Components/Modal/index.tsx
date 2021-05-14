import React, { useRef } from 'react';

import iconX from '../../Assets/x.svg';

//CSS
import './styles.css';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  const outsideRef = useRef(null);

  const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
  };

  return isOpen ? (
    <div className="modal" tabIndex={-1}>
      <div className="modal-dialog" ref={outsideRef} onClick={handleCloseOnOverlay}>
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalComponent;
