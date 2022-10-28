import useAuth from '@hooks/useAuth';
import { logAPI } from '@lib/apis/log';
import { gray } from '@lib/styles/palette';
import { theme } from '@lib/styles/theme';
import { useDispatch, useSelector } from '@store/index';
import { fetchLogDetail, logDetailActions } from '@store/slices/logDetail';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { StaticMap } from 'react-kakao-maps-sdk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Flexbox from '@components/common/Flexbox';
import LoadingSpinner from '@components/common/LoadingSpinner';
import Subtitle from '@components/common/Subtitle';
import Title from '@components/common/Title';
import FavoriteToggleButton from '@components/FavoriteToggleButton';
import Layout from '@components/Layout';
import LogDetailImageView from '@components/LogDetailImageView';
import LogDetailMemo from '@components/LogDetailMemo';
import LogDetailMetricsItem from '@components/LogDetailMetricsItem';
import { DIVE_TYPE_KOR } from '@utils/constants';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  height: 12rem;
  background-color: ${gray[50]};
  border-radius: 0.5rem;
`;

const LogDetailPage: React.FC = () => {
  const { isLoggedIn } = useAuth();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data, isLoading } = useSelector((state) => state.logDetail);

  const [isFavorite, setIsFavorite] = useState(false);

  const { logId } = useParams();

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
    if (!isLoggedIn) return;

    const promise = dispatch(fetchLogDetail(logId as string));

    return () => {
      promise.abort();
      dispatch(logDetailActions.clearState());
    };
  }, [logId, dispatch, isLoggedIn]);

  useEffect(() => {
    if (data !== null) setIsFavorite(data.isFavorite);
  }, [data]);

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
      <Card>
        <Flexbox padding="0.5rem" justify="start">
          <Link to="/logs">
            <Flexbox items="center">
              <MdKeyboardArrowLeft size="1.5rem" color={theme.primary} />
              <p
                style={{
                  color: gray[600],
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                목록으로 돌아가기
              </p>
            </Flexbox>
          </Link>
        </Flexbox>
      </Card>
      <Card margin="1rem 0">
        <Flexbox flex="col" gap="1rem" padding="1rem" items="start">
          <Flexbox gap="1rem">
            <Title>다이빙 로그 #{data.id}</Title>
            <FavoriteToggleButton
              isFavorite={isFavorite}
              onClick={() => {
                void handleFavoriteToggleButtonClick();
              }}
            />
          </Flexbox>
          <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>
            {format(new Date(data.date), 'yyyy년 MM월 dd일')}, {data.location}
          </p>
          <Flexbox justify="end" width="100%">
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
      </Card>
      <Card margin="1rem 0">
        <Flexbox flex="col" gap="1rem" padding="1rem" items="start">
          <Subtitle>업로드한 사진</Subtitle>
          <LogDetailImageView images={data.images} />
        </Flexbox>
      </Card>
      <Card margin="1rem 0">
        <Flexbox flex="col" gap="1rem" padding="1rem" items="start">
          <Subtitle>다이브 지표</Subtitle>
          <GridContainer>
            <LogDetailMetricsItem
              label="다이브 종류"
              value={DIVE_TYPE_KOR[data.diveType as 'FREE' | 'SCUBA']}
            />
            <LogDetailMetricsItem
              label="수온"
              value={`${data.temperature}°C`}
            />
            <LogDetailMetricsItem label="시야" value={`${data.sight}m`} />
            <LogDetailMetricsItem
              label="최대 깊이"
              value={`${data.maxDepth}m`}
            />
            <LogDetailMetricsItem
              label="최대 산소량"
              value={`${data.maxOxygen}L`}
            />
            <LogDetailMetricsItem
              label="최소 산소량"
              value={`${data.minOxygen}L`}
            />
          </GridContainer>
        </Flexbox>
      </Card>
      <Card margin="1rem 0">
        <Flexbox flex="col" gap="1rem" padding="1rem" items="start">
          <Subtitle>남긴 메모</Subtitle>
          <LogDetailMemo memo={data.content} />
        </Flexbox>
      </Card>
      <Card margin="1rem 0">
        <Flexbox flex="col" gap="1rem" padding="1rem" items="start">
          <Flexbox justify="between" width="100%">
            <Subtitle>위치</Subtitle>
            <p style={{ fontSize: '0.75rem', color: gray[400] }}>
              지도를 클릭하면 카카오 지도 페이지로 이동합니다.
            </p>
          </Flexbox>
          <StaticMap
            center={{
              lat: data.latitude,
              lng: data.longitude,
            }}
            style={{
              width: '100%',
              height: '450px',
              borderRadius: '0.5rem',
            }}
            marker={{
              position: {
                lat: data.latitude,
                lng: data.longitude,
              },
            }}
            level={3}
          />
        </Flexbox>
      </Card>
      <Card margin="1rem 0">
        <Flexbox flex="col" gap="1rem" padding="1rem" items="end">
          <Link to="/logs">
            <Button>목록으로 돌아가기</Button>
          </Link>
        </Flexbox>
      </Card>
    </Layout>
  );
};

export default LogDetailPage;
