import { useDispatch, useSelector } from '@stores/index';
import { fetchLogDetail, logDetailActions } from '@stores/slices/logDetail';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { deleteLogAPI, toggleLogFavoriteAPI } from '@apis/log';
import Button from '@components/common/Button';
import FavoriteToggleButton from '@components/FavoriteToggleButton';
import Layout from '@components/Layout';

const LogDetailPage: React.FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data, isLoading } = useSelector((state) => state.logDetail);

  const [isFavorite, setIsFavorite] = useState(
    data === null ? false : data.isFavorite,
  );

  const params = useParams();
  const logId = params.id as string;

  const handleFavoriteToggleButtonClick = async () => {
    if (data === null) return;
    setIsFavorite((prev) => !prev);
    try {
      await toggleLogFavoriteAPI(String(data.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteButtonClick = async () => {
    if (data === null) return;
    try {
      await deleteLogAPI(String(data.id));
      navigate('/logs');
    } catch (error) {
      console.log(error);
    }
  };

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
        <FavoriteToggleButton
          checked={isFavorite}
          onClick={() => {
            void handleFavoriteToggleButtonClick;
          }}
        />
      )}
      {data !== null && (
        <Link to={`/log/${data.id}/edit`}>
          <Button>수정하기</Button>
        </Link>
      )}

      <Button
        onClick={() => {
          void handleDeleteButtonClick;
        }}
      >
        삭제하기
      </Button>
      <Link to="/logs">
        <Button>돌아가기</Button>
      </Link>
    </Layout>
  );
};

export default LogDetailPage;
