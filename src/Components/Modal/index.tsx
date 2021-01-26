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
    <div className={'modal'}>
      <div className={'modal fade'}>
        <div ref={outsideRef} className={'modal__overlay'} onClick={handleCloseOnOverlay} />
        <div className={'modal__box'} style={{ overflowY: 'auto' }}>
          <button className={'modal__close'} onClick={onClose}>
            <img src={iconX} alt={'close'} />
          </button>
          <div className={'modal__title'}>{title}</div>
          <div className={'modal__content'}>{children}</div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalComponent;
