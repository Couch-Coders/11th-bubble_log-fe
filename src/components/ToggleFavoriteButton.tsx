import { useDispatch } from '@stores/index';
import { logDetailActions } from '@stores/slices/logDetail';
import React from 'react';

import { toggleLogFavoriteAPI } from '@apis/log';

interface ReturnType {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const useToggleFavoriteButton = (logId: number): ReturnType => {
  const dispatch = useDispatch();

  const onChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    dispatch(logDetailActions.setIsFavorite(event.target.checked));
    await toggleLogFavoriteAPI(logId);
  };

  return { onChange };
};

interface Props {
  isFavorite: boolean;
  logId: number;
}

const ToggleFavoriteButton: React.FC<Props> = ({ isFavorite, logId }) => {
  const { onChange } = useToggleFavoriteButton(logId);

  return (
    <input
      type="checkbox"
      checked={isFavorite}
      onChange={(event) => {
        void onChange(event);
      }}
    />
  );
};

export default ToggleFavoriteButton;
