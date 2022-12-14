import useAuth from '@hooks/useAuth';
import useDebounce from '@hooks/useDebounce';
import { useDispatch, useSelector } from '@store/index';
import { fetchLogs, fetchMoreLogs, logActions } from '@store/slices/log';
import React, { useEffect, useState } from 'react';
import {
  MdClose,
  MdCreate,
  MdFilterAlt,
  MdKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
import { shallowEqual } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Chip from '@components/common/Chip';
import Fab from '@components/common/Fab';
import Flexbox from '@components/common/Flexbox';
import IconButton from '@components/common/IconButton';
import Modal from '@components/common/Modal';
import Skeleton from '@components/common/Skeleton';
import Spacer from '@components/common/Spacer';
import Stack from '@components/common/Stack';
import Title from '@components/common/Title';
import Layout from '@components/Layout';
import LogListItem from '@components/LogListItem';
import SearchFilter from '@components/SearchFilter';
import SearchInput from '@components/SearchInput';
import SortToggleButton from '@components/SortToggleButton';
import {
  DIVE_DEPTH,
  DIVE_LOCATION,
  DIVE_TEMPERATURE,
  DIVE_TYPE,
} from '@utils/constants';
import { scrollToTop } from '@utils/scrollToTop';

const FabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
`;

const LogsPage: React.FC = () => {
  const [diveTypeFilterValue, setDiveTypeFilterValue] = useState('');
  const [locationFilterValue, setLocationFilterValue] = useState('');
  const [temperatureFilterValue, setTemperatureFilterValue] = useState('');
  const [depthFilterValue, setDepthFilterValue] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sortToggleButtonValue, setSortToggleButtonValue] = useState<
    '?????????' | '?????????'
  >('?????????');

  const {
    response,
    data: logListData,
    isLoading,
    error,
  } = useSelector((state) => state.log);

  const query = useSelector((state) => state.log.query, shallowEqual);

  const debouncedSearchInputValue = useDebounce(searchInputValue, 166);

  const diveTypeFilterButtonLabel =
    diveTypeFilterValue === '' ? '??????' : diveTypeFilterValue;
  const locationFilterButtonLabel =
    locationFilterValue === '' ? '??????' : locationFilterValue;
  const temperatureFilterButtonLabel =
    temperatureFilterValue === '' ? '??????' : temperatureFilterValue;
  const depthFilterButtonLabel =
    depthFilterValue === '' ? '??????' : depthFilterValue;

  const fetchMoreLogButtonDisabled =
    response === null || error !== null || isLoading || response.last;

  console.log('@logList', logListData);

  const { isLoggedIn } = useAuth();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return;
    void dispatch(fetchLogs());

    return () => {
      dispatch(logActions.clearState());
    };
  }, [isLoggedIn, dispatch]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchInputValue(event.target.value);
  };

  useEffect(() => {
    dispatch(logActions.setQueryKeyword(debouncedSearchInputValue));
    dispatch(logActions.setQueryPage('0'));
    void dispatch(fetchLogs());
  }, [debouncedSearchInputValue, dispatch]);

  useEffect(() => {
    if (sortToggleButtonValue === '?????????')
      dispatch(logActions.setQuerySort('id,asc'));
    if (sortToggleButtonValue === '?????????')
      dispatch(logActions.setQuerySort('id,desc'));

    dispatch(logActions.setQueryPage('0'));

    void dispatch(fetchLogs());
  }, [sortToggleButtonValue, dispatch]);

  const handleDiveTypeFilterOptionClick = (filterOption: string) => {
    setDiveTypeFilterValue(filterOption);
    dispatch(logActions.setQueryDiveType(filterOption));
    dispatch(logActions.setQueryPage('0'));

    void dispatch(fetchLogs());
  };

  const handleLocationFilterOptionClick = (filterOption: string) => {
    setLocationFilterValue(filterOption);
    dispatch(logActions.setQueryLocation(filterOption));
    dispatch(logActions.setQueryPage('0'));

    void dispatch(fetchLogs());
  };

  const splitFilterOptionValue = (filterOption: string) => {
    const minValue = filterOption.split('-')[0];
    const maxValue = filterOption.split('-')[1];

    return [minValue, maxValue];
  };

  const handleTemperatureFilterOptionClick = (filterOption: string) => {
    setTemperatureFilterValue(filterOption);
    const [minTemperature, maxTemperature] =
      splitFilterOptionValue(filterOption);
    dispatch(logActions.setQueryMinTemperature(minTemperature));
    dispatch(logActions.setQueryMaxTemperature(maxTemperature));
    dispatch(logActions.setQueryPage('0'));

    void dispatch(fetchLogs());
  };

  const handleDepthFilterOptionClick = (filterOption: string) => {
    setDepthFilterValue(filterOption);
    const [minDepth, maxDepth] = splitFilterOptionValue(filterOption);
    dispatch(logActions.setQueryMinDepth(minDepth));
    dispatch(logActions.setQueryMaxDepth(maxDepth));
    dispatch(logActions.setQueryPage('0'));

    void dispatch(fetchLogs());
  };

  const handleFetchMoreLogsButtonClick = () => {
    dispatch(logActions.setQueryPage(String(parseInt(query.page) + 1)));
    void dispatch(fetchMoreLogs());
  };

  return (
    <Layout>
      <Card>
        <FabContainer>
          <Fab size="small" shape="rounded" onClick={scrollToTop}>
            <MdKeyboardArrowUp size="1.5rem" />
          </Fab>
          <Fab onClick={() => navigate('/write')}>
            <MdCreate size="1.5rem" />
          </Fab>
        </FabContainer>
        <Stack spacing={2} p={2}>
          <Flexbox justify="between">
            <Title>????????? ??????</Title>
            <Link to="/write">
              <Button>?????? ??????</Button>
            </Link>
          </Flexbox>
          <Flexbox justify="between" style={{ position: 'relative' }}>
            <SearchInput
              value={searchInputValue}
              onChange={handleSearchInputChange}
              onClearButtonClick={() => setSearchInputValue('')}
            />
            <Modal
              isOpen={isFilterModalOpen}
              onClose={() => setIsFilterModalOpen(false)}
              style={{ transform: 'translate(1rem, 4rem)' }}
            >
              <Flexbox
                flex="col"
                items="start"
                gap="1rem"
                padding="1rem"
                flexWrap
              >
                <Flexbox width="100%" justify="between">
                  <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>??????</p>
                  <MdClose
                    size="1.5rem"
                    cursor="pointer"
                    onClick={() => setIsFilterModalOpen(false)}
                  />
                </Flexbox>
                <SearchFilter
                  name="????????? ??????"
                  label={diveTypeFilterButtonLabel}
                  onClick={handleDiveTypeFilterOptionClick}
                  options={DIVE_TYPE}
                />
                <SearchFilter
                  name="??????"
                  label={locationFilterButtonLabel}
                  onClick={handleLocationFilterOptionClick}
                  options={DIVE_LOCATION}
                />
                <SearchFilter
                  name="??????"
                  label={temperatureFilterButtonLabel}
                  onClick={handleTemperatureFilterOptionClick}
                  options={DIVE_TEMPERATURE}
                />
                <SearchFilter
                  name="??????"
                  label={depthFilterButtonLabel}
                  onClick={handleDepthFilterOptionClick}
                  options={DIVE_DEPTH}
                />
              </Flexbox>
            </Modal>
          </Flexbox>
          <Flexbox justify="start" gap="1rem" flexWrap>
            {diveTypeFilterValue !== '' && (
              <Chip
                label={`??????: ${diveTypeFilterValue}`}
                onDelete={() => handleDiveTypeFilterOptionClick('')}
              />
            )}
            {locationFilterValue !== '' && (
              <Chip
                label={`??????: ${locationFilterValue}`}
                onDelete={() => handleLocationFilterOptionClick('')}
              />
            )}
            {temperatureFilterValue !== '' && (
              <Chip
                label={`??????: ${temperatureFilterValue}`}
                onDelete={() => handleTemperatureFilterOptionClick('')}
              />
            )}
            {depthFilterValue !== '' && (
              <Chip
                label={`??????: ${depthFilterValue}`}
                onDelete={() => handleDepthFilterOptionClick('')}
              />
            )}
          </Flexbox>
          <Flexbox justify="between">
            <Flexbox>
              <SortToggleButton
                active={sortToggleButtonValue === '?????????'}
                position="left"
                onClick={() => setSortToggleButtonValue('?????????')}
              >
                ?????????
              </SortToggleButton>
              <SortToggleButton
                active={sortToggleButtonValue === '?????????'}
                position="right"
                onClick={() => setSortToggleButtonValue('?????????')}
              >
                ?????????
              </SortToggleButton>
            </Flexbox>
            <Flexbox gap="1rem">
              <IconButton onClick={() => setIsFilterModalOpen((prev) => !prev)}>
                <MdFilterAlt size="1.5rem" />
              </IconButton>
            </Flexbox>
          </Flexbox>
        </Stack>
      </Card>

      <ul>
        {logListData.map((log, index) => (
          <LogListItem
            key={index}
            logId={String(log.id)}
            location={log.location}
            date={log.date}
            isFavorite={log.isFavorite}
          />
        ))}
      </ul>
      {isLoading && (
        <>
          <Spacer />
          <Flexbox flex="col" gap="1rem" width="100%">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <Card key={index}>
                  <Flexbox
                    flex="col"
                    gap="0.5rem"
                    padding="1rem"
                    width="100%"
                    items="start"
                  >
                    <Skeleton variant="rounded" width="40%" height="0.8rem" />
                    <Skeleton variant="rounded" width="100%" height="2.5rem" />
                  </Flexbox>
                </Card>
              ))}
          </Flexbox>
        </>
      )}
      {!fetchMoreLogButtonDisabled && (
        <Card margin="1rem 0">
          <Flexbox padding="1rem">
            <IconButton
              variant="outlined"
              onClick={handleFetchMoreLogsButtonClick}
            >
              <MdOutlineKeyboardArrowDown size="2rem" />
            </IconButton>
          </Flexbox>
        </Card>
      )}
    </Layout>
  );
};

export default LogsPage;
