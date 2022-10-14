import useAuth from '@hooks/useAuth';
import { useDispatch, useSelector } from '@stores/index';
import { fetchLogDetail } from '@stores/slices/logDetail';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ReturnToListButton from '@components/ReturnToListButton';

const LogDetailPage: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector((state) => state.logDetail);

  console.log(data);
  console.log(isLoading);
  console.log(error);

  const params = useParams();

  const logId = Number(params.id);

  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) navigate('/');

  useEffect(() => {
    const promise = dispatch(fetchLogDetail(logId));

    return () => promise.abort();
  }, [logId]);

  return (
    <main>
      {isLoading && <p>loading...</p>}
      {error !== null && <p>error</p>}
      {data !== null && <p>{data.content}</p>}
      <ReturnToListButton />
    </main>
  );
};

export default LogDetailPage;
