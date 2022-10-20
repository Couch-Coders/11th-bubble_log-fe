import useAuth from '@hooks/useAuth';
import useDebounce from '@hooks/useDebounce';
import { useDispatch, useSelector } from '@store/index';
import { fetchLogs, logActions } from '@store/slices/log';
import React, { useCallback, useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Button from '@components/common/Button';
import Divider from '@components/common/Divider';
import Flexbox from '@components/common/Flexbox';
import IconButton from '@components/common/IconButton';
import LoadingSpinner from '@components/common/LoadingSpinner';
import Stack from '@components/common/Stack';
import FavoriteToggleButton from '@components/FavoriteToggleButton';
import Layout from '@components/Layout';
import LogListItem from '@components/LogListItem';
import SearchFilter from '@components/SearchFilter';
import SearchInput from '@components/SearchInput';
import {
  DIVE_DEPTH,
  DIVE_LOCATION,
  DIVE_TEMPERATURE,
  DIVE_TYPE,
} from '@utils/constants';

const LogsPage: React.FC = () => {
  const [diveTypeFilterValue, setDiveTypeFilterValue] = useState('');
  const [locationFilterValue, setLocationFilterValue] = useState('');
  const [temperatureFilterValue, setTemperatureFilterValue] = useState('');
  const [depthFilterValue, setDepthFilterValue] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');

  const { data, logList, isLoading, error, query } = useSelector(
    (state) => state.log,
  );

  const debouncedSearchInputValue = useDebounce(searchInputValue, 166);

  const diveTypeFilterButtonLabel =
    temperatureFilterValue === '' ? '전체' : temperatureFilterValue;
  const locationFilterButtonLabel =
    locationFilterValue === '' ? '전체' : locationFilterValue;
  const temperatureFilterButtonLabel =
    diveTypeFilterValue === '' ? '전체' : diveTypeFilterValue;
  const depthFilterButtonLabel =
    depthFilterValue === '' ? '전체' : depthFilterValue;

  const fetchMoreLogButtonDisabled =
    data === null || error !== null || isLoading || data.last;

  console.log('@logList', logList);

  const { isLoggedIn } = useAuth();

  const dispatch = useDispatch();

  // adding query as dependency array causes infinite loop
  const fetchLogsWithQuery = useCallback(async () => {
    if (!isLoggedIn) return;
    await dispatch(fetchLogs(query));
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    void fetchLogsWithQuery();

    return () => {
      dispatch(logActions.clearState());
    };
  }, [dispatch, fetchLogsWithQuery]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchInputValue(event.target.value);
  };

  useEffect(() => {
    dispatch(logActions.setQueryKeyword(debouncedSearchInputValue));
  }, [debouncedSearchInputValue, dispatch]);

  const handleDiveTypeFilterOptionClick = (filterOption: string) => {
    console.log(filterOption);
    setDiveTypeFilterValue(filterOption);
    dispatch(logActions.setQueryDiveType(filterOption));
  };

  const handleLocationFilterOptionClick = (filterOption: string) => {
    setLocationFilterValue(filterOption);
    dispatch(logActions.setQueryLocation(filterOption));
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
  };

  const handleDepthFilterOptionClick = (filterOption: string) => {
    setDepthFilterValue(filterOption);
    const [minDepth, maxDepth] = splitFilterOptionValue(filterOption);
    dispatch(logActions.setQueryMinDepth(minDepth));
    dispatch(logActions.setQueryMaxDepth(maxDepth));
  };

  const fetchMoreLog = () => {
    const queryWithNextPage = {
      ...query,
      page: String(parseInt(query.page) + 1),
    };

    void dispatch(fetchLogs(queryWithNextPage));
    dispatch(logActions.setQueryPage(String(parseInt(query.page) + 1)));
  };

  // const observerRef = useRef<HTMLDivElement | null>(null);

  // const handleIntersect = () => {
  //   fetchMoreLog();
  // };

  // useInfiniteScroll(observerRef.current, handleIntersect);

  return (
    <Layout>
      <Stack spacing={2} p={2}>
        <Flexbox justify="end">
          <Link to="/write">
            <Button>로그 작성</Button>
          </Link>
        </Flexbox>
        <Flexbox justify="end">
          <SearchInput
            value={searchInputValue}
            onChange={handleSearchInputChange}
            onClearButtonClick={() => setSearchInputValue('')}
          />
        </Flexbox>
        <Flexbox justify="start" gap="1rem" flexWrap>
          <SearchFilter
            name="다이브 종류"
            label={diveTypeFilterButtonLabel}
            onClick={handleDiveTypeFilterOptionClick}
            options={DIVE_TYPE}
          />
          <SearchFilter
            name="위치"
            label={locationFilterButtonLabel}
            onClick={handleLocationFilterOptionClick}
            options={DIVE_LOCATION}
          />
          <SearchFilter
            name="수온"
            label={temperatureFilterButtonLabel}
            onClick={handleTemperatureFilterOptionClick}
            options={DIVE_TEMPERATURE}
          />
          <SearchFilter
            name="깊이"
            label={depthFilterButtonLabel}
            onClick={handleDepthFilterOptionClick}
            options={DIVE_DEPTH}
          />
          <FavoriteToggleButton isFavorite={false} onClick={() => {}} />
        </Flexbox>
        {isLoading && (
          <Flexbox height="32rem">
            <LoadingSpinner />
          </Flexbox>
        )}
      </Stack>
      <ul>
        <Divider />
        {logList.map((data, index) => (
          <>
            <LogListItem
              key={index}
              logId={String(data.id)}
              location={data.location}
              date={data.date}
            />
            <Divider />
          </>
        ))}
      </ul>
      {/* <div
          style={{ height: '2rem', border: '1px solid red' }}
          ref={observerRef}
          >
          옵저버
        </div> */}
      {!fetchMoreLogButtonDisabled && (
        <Flexbox padding="1rem">
          <IconButton variant="outlined" onClick={fetchMoreLog}>
            <MdOutlineKeyboardArrowDown size="2rem" />
          </IconButton>
        </Flexbox>
      )}
    </Layout>
  );
};

export default LogsPage;
