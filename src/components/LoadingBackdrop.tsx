import React from 'react';

import Backdrop from './common/Backdrop';
import LoadingSpinner from './common/LoadingSpinner';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
}

const LoadingBackdrop: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Backdrop isOpen={isOpen} onClose={onClose}>
      <LoadingSpinner />
    </Backdrop>
  );
};

export default LoadingBackdrop;
