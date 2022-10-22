import React from 'react';

import Backdrop from '@components/common/Backdrop';
import Button from '@components/common/Button';
import Dialog from '@components/common/Dialog';
import Flexbox from '@components/common/Flexbox';

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const TempPostPromptModal: React.FC<Props> = ({
  isOpen,
  onConfirm,
  onClose,
}) => {
  return (
    <Backdrop isOpen={isOpen}>
      <Dialog isOpen={isOpen}>
        <Flexbox flex="col" gap="1rem" padding="1rem">
          <p>임시저장된 글이 있습니다. 불러오시겠습니까?</p>
          <Flexbox justify="end" gap="1rem" width="100%">
            <Button variant="text" onClick={onClose}>
              아니요
            </Button>
            <Button onClick={onConfirm}>불러오기</Button>
          </Flexbox>
        </Flexbox>
      </Dialog>
    </Backdrop>
  );
};

export default TempPostPromptModal;
