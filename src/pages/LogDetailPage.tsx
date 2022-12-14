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
                ???????????? ????????????
              </p>
            </Flexbox>
          </Link>
        </Flexbox>
      </Card>
      <Card margin="1rem 0">
        <Flexbox flex="col" gap="1rem" padding="1rem" items="start">
          <Flexbox gap="1rem">
            <Title>????????? ?????? #{data.id}</Title>
            <FavoriteToggleButton
              isFavorite={isFavorite}
              onClick={() => {
                void handleFavoriteToggleButtonClick();
              }}
            />
          </Flexbox>
          <p style={{ fontWeight: 600, fontSize: '1.25rem' }}>
            {format(new Date(data.date), 'yyyy??? MM??? dd???')}, {data.location}
          </p>
          <Flexbox justify="end" width="100%">
            <Flexbox gap="1rem">
              <Link to={`/logs/${data.id}/edit`}>
                <Button>????????????</Button>
              </Link>
              <Button
                onClick={() => {
                  void handleDeleteButtonClick();
                }}
              >
                ????????????
              </Button>
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Card>
      <Card margin="1rem 0">
        <Flexbox flex="col" gap="1rem" padding="1rem" items="start">
          <Subtitle>???????????? ??????</Subtitle>
          <LogDetailImageView images={data.images} />
        </Flexbox>
      </Card>
      <Card margin="1rem 0">
        <Flexbox flex="col" gap="1rem" padding="1rem" items="start">
          <Subtitle>????????? ??????</Subtitle>
          <GridContainer>
            <LogDetailMetricsItem
              label="????????? ??????"
              value={DIVE_TYPE_KOR[data.diveType as 'FREE' | 'SCUBA']}
            />
            <LogDetailMetricsItem
              label="??????"
              value={`${data.temperature}??C`}
            />
            <LogDetailMetricsItem label="??????" value={`${data.sight}m`} />
            <LogDetailMetricsItem
              label="?????? ??????"
              value={`${data.maxDepth}m`}
            />
            <LogDetailMetricsItem
              label="?????? ?????????"
              value={`${data.maxOxygen}L`}
            />
            <LogDetailMetricsItem
              label="?????? ?????????"
              value={`${data.minOxygen}L`}
            />
          </GridContainer>
        </Flexbox>
      </Card>
      <Card margin="1rem 0">
        <Flexbox flex="col" gap="1rem" padding="1rem" items="start">
          <Subtitle>?????? ??????</Subtitle>
          <LogDetailMemo memo={data.content} />
        </Flexbox>
      </Card>
      <Card margin="1rem 0">
        <Flexbox flex="col" gap="1rem" padding="1rem" items="start">
          <Flexbox justify="between" width="100%">
            <Subtitle>??????</Subtitle>
            <p style={{ fontSize: '0.75rem', color: gray[400] }}>
              ????????? ???????????? ????????? ?????? ???????????? ???????????????.
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
            <Button>???????????? ????????????</Button>
          </Link>
        </Flexbox>
      </Card>
    </Layout>
  );
};

export default LogDetailPage;
