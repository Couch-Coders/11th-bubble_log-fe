import { useDispatch, useSelector } from '@stores/index';
import { fetchLogDetail, logDetailActions } from '@stores/slices/logDetail';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { toggleLogFavoriteAPI } from '@apis/log';
import DeleteLogButton from '@components/DeleteLogButton';
import FavoriteToggleButton from '@components/FavoriteToggleButton';
import Layout from '@components/Layout';
import ReturnToListButton from '@components/ReturnToListButton';
import UpdateLogButton from '@components/UpdateLogButton';

const LogDetailPage: React.FC = () => {
  const dispatch = useDispatch();

  const { data, isLoading } = useSelector((state) => state.logDetail);

  const [isFavorite, setIsFavorite] = useState(
    data === null ? false : data.isFavorite,
  );

  const params = useParams();

  const logId = params.id === undefined ? null : parseInt(params.id, 10);

  const handleFavoriteToggleButtonClick = async (): Promise<void> => {
    if (data === null) return;
    setIsFavorite((prev) => !prev);
    try {
      await toggleLogFavoriteAPI(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (logId === null) return;
    const promise = dispatch(fetchLogDetail(logId));

    return () => {
      promise.abort();
      dispatch(logDetailActions.clearData());
    };
  }, [logId]);

  return (
    <Layout>
      {isLoading && <p>loading...</p>}
      {data !== null && <p>{JSON.stringify(data)}</p>}
      {data !== null && (
        <FavoriteToggleButton
          checked={isFavorite}
          onClick={() => {
            void handleFavoriteToggleButtonClick;
          }}
        />
      )}
      <UpdateLogButton />
      <DeleteLogButton />
      <ReturnToListButton />
    </Layout>
  );
};

export default LogDetailPage;
