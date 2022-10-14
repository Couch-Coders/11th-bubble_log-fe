import { useDispatch, useSelector } from '@stores/index';
import { fetchLogDetail } from '@stores/slices/logDetail';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ReturnToListButton from '@components/ReturnToListButton';
import ToggleFavoriteButton from '@components/ToggleFavoriteButton';

const LogDetailPage: React.FC = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector((state) => state.logDetail);

  const params = useParams();

  const logId = Number(params.id);

  useEffect(() => {
    const promise = dispatch(fetchLogDetail(logId));

    return () => promise.abort();
  }, [logId]);

  return (
    <main>
      {isLoading && <p>loading...</p>}
      {error !== null && <p>error</p>}
      {data !== null && <p>{data.content}</p>}
      {data !== null && (
        <ToggleFavoriteButton isFavorite={data.isFavorite} logId={logId} />
      )}
      <ReturnToListButton />
    </main>
  );
};

export default LogDetailPage;
