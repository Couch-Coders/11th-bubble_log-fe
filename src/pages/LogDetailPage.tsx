import { useDispatch, useSelector } from '@stores/index';
import { fetchLogDetail, logDetailActions } from '@stores/slices/logDetail';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DeleteLogButton from '@components/DeleteLogButton';
import Layout from '@components/Layout';
import ReturnToListButton from '@components/ReturnToListButton';
import ToggleFavoriteButton from '@components/FavoriteToggleButton';
import UpdateLogButton from '@components/UpdateLogButton';

const LogDetailPage: React.FC = () => {
  const dispatch = useDispatch();

  const { data, isLoading } = useSelector((state) => state.logDetail);

  const params = useParams();

  const logId = Number(params.id);

  useEffect(() => {
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
        <ToggleFavoriteButton isFavorite={data.isFavorite} logId={logId} />
      )}
      <UpdateLogButton />
      <DeleteLogButton />
      <ReturnToListButton />
    </Layout>
  );
};

export default LogDetailPage;
