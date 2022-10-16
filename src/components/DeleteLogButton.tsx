import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteLogAPI } from '@apis/log';

import Button from './common/Button';

interface ReturnType {
  onClick: () => Promise<void>;
}

const useDeleteLogButton = (): ReturnType => {
  const params = useParams();
  const logId = Number(params.id);
  const navigate = useNavigate();

  const onClick = async (): Promise<void> => {
    try {
      await deleteLogAPI(logId);
      navigate('/logs');
    } catch (error) {
      console.log(error);
    }
  };

  return { onClick };
};

const DeleteLogButton: React.FC = () => {
  const { onClick } = useDeleteLogButton();

  return (
    <Button
      onClick={() => {
        void onClick();
      }}
    >
      삭제하기
    </Button>
  );
};

export default DeleteLogButton;
