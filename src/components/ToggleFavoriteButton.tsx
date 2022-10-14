import { useDispatch } from '@stores/index';
import { logDetailActions } from '@stores/slices/logDetail';
import React from 'react';

import { toggleLogFavoriteAPI } from '@apis/log';

interface ReturnType {
  onClick: () => Promise<void>;
}

const useToggleFavoriteButton = (logId: number): ReturnType => {
  const dispatch = useDispatch();

  const onClick = async (): Promise<void> => {
    dispatch(logDetailActions.setIsFavorite(true));
    await toggleLogFavoriteAPI(logId);
  };

  return { onClick };
};

interface Props {
  isFavorite: boolean;
  logId: number;
}

const ToggleFavoriteButton: React.FC<Props> = ({ isFavorite, logId }) => {
  const { onClick } = useToggleFavoriteButton(logId);

  return (
    <input
      type="checkbox"
      checked={isFavorite}
      onClick={() => {
        void onClick;
      }}
    />
  );
};

export default ToggleFavoriteButton;
