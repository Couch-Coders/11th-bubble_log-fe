import { logAPI } from '@lib/apis/log';
import { useDispatch, useSelector } from '@store/index';
import { fetchLogDetail, logDetailActions } from '@store/slices/logDetail';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Button from '@components/common/Button';
import Flexbox from '@components/common/Flexbox';
import LoadingSpinner from '@components/common/LoadingSpinner';
import Title from '@components/common/Title';
import FavoriteToggleButton from '@components/FavoriteToggleButton';
import Layout from '@components/Layout';
import { BASE_URL } from '@utils/constants';

const LogDetailPage: React.FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data, isLoading } = useSelector((state) => state.logDetail);
  console.log('@isLoading', isLoading);

  const [isFavorite, setIsFavorite] = useState(
    data === null ? false : data.isFavorite,
  );

  const { logId } = useParams();

  console.log(logId);
  console.log('@data', data);

  const handleFavoriteToggleButtonClick = async () => {
    if (data === null) return;
    setIsFavorite((prev) => !prev);
    try {
      await logAPI.toggleLogFavorite(String(data.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteButtonClick = async () => {
    if (data === null) return;
    try {
      await logAPI.deleteLog(String(data.id));
      navigate('/logs');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const promise = dispatch(fetchLogDetail(logId as string));

    return () => {
      promise.abort();
      dispatch(logDetailActions.clearState());
    };
  }, [logId, dispatch]);

  if (isLoading || data === null) {
    return (
      <Layout>
        <Flexbox width="100%" height="26rem">
          <LoadingSpinner />
        </Flexbox>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flexbox flex="col" padding="1rem" gap="1rem" items="start">
        <Flexbox gap="1rem">
          <Title>다이빙 로그 #{data.id}</Title>
          <FavoriteToggleButton
            isFavorite={isFavorite}
            onClick={() => {
              void handleFavoriteToggleButtonClick();
            }}
          />
        </Flexbox>
        {data !== null && <p>노트: {data.content}</p>}
        {data !== null && <p>다이브 종류: {data.diveType}</p>}
        {data !== null && <p>들어간 시간: {data.enterTime}</p>}
        {data !== null && <p>장소: {data.location}</p>}
        {data !== null && <p>위도: {data.latitude}</p>}
        {data !== null && <p>경도: {data.longitude}</p>}
        {data !== null && <p>최대 깊이: {data.maxDepth}</p>}
        {data !== null && <p>들어갈 때 산소량: {data.maxOxygen}</p>}
        {data !== null && <p>나올 때 산소량: {data.minOxygen}</p>}
        {data !== null && <p>수온: {data.temperature}</p>}
        {data !== null && <p>시야 정도: {data.sight}</p>}
        {data?.images.map((image, index) => (
          <img
            style={{ width: '200px', height: '200px' }}
            key={index}
            src={`${BASE_URL}${image}`}
            alt="image"
          />
        ))}
        <Flexbox justify="between" width="100%">
          <Link to="/logs">
            <Button>목록으로 돌아가기</Button>
          </Link>
          <Flexbox gap="1rem">
            <Link to={`/logs/${data.id}/edit`}>
              <Button>수정하기</Button>
            </Link>
            <Button
              onClick={() => {
                void handleDeleteButtonClick();
              }}
            >
              삭제하기
            </Button>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </Layout>
  );
};

export default LogDetailPage;
