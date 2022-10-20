import useAuth from '@hooks/useAuth';
import useDebounce from '@hooks/useDebounce';
import { useDispatch, useSelector } from '@store/index';
import { fetchLogs, logActions } from '@store/slices/log';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@components/common/Button';
import Dropdown from '@components/common/dropdown';
import Flexbox from '@components/common/Flexbox';
import Stack from '@components/common/Stack';
import Layout from '@components/Layout';
import LogListItem from '@components/LogListItem';
import SearchInput from '@components/SearchInput';
import { DIVE_TYPE } from '@utils/constants';

const LogsPage: React.FC = () => {
  const [diveTypeFilterValue, setDiveTypeFilterValue] = useState('전체');
  const [locationFilterValue, setLocationFilterValue] = useState('전체');
  const [temperatureFilterValue, setTemperatureFilterValue] = useState('');
  const [depthFilterValue, setDepthFilterValue] = useState('전체');
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
        <SearchInput
          value={searchInputValue}
          onChange={handleSearchInputChange}
          onClearButtonClick={() => setSearchInputValue('')}
        />
        <Flexbox justify="start" gap="1rem" flexWrap>
          <Flexbox gap="1rem">
            <label>다이브 종류</label>
            <Dropdown.Button label={diveTypeFilterButtonLabel}>
              <Dropdown.Menu>
                <Dropdown.MenuItem
                  label="전체"
                  onClick={() => handleDiveTypeFilterOptionClick('')}
                />
                {DIVE_TYPE.map((option, index) => (
                  <Dropdown.MenuItem
                    key={index}
                    label={option}
                    onClick={() => handleDiveTypeFilterOptionClick(option)}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown.Button>
          </Flexbox>
          <Flexbox gap="1rem">
            <label>위치</label>
            <Dropdown.Button label={locationFilterButtonLabel}>
              <Dropdown.Menu>
                <Dropdown.MenuItem
                  label="전체"
                  onClick={() => handleLocationFilterOptionClick('')}
                />
                {DIVE_TYPE.map((option, index) => (
                  <Dropdown.MenuItem
                    key={index}
                    label={option}
                    onClick={() => handleLocationFilterOptionClick(option)}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown.Button>
          </Flexbox>
          <Flexbox gap="1rem">
            <label>수온</label>
            <Dropdown.Button label={temperatureFilterButtonLabel}>
              <Dropdown.Menu>
                <Dropdown.MenuItem
                  label="전체"
                  onClick={() => handleTemperatureFilterOptionClick('')}
                />
                {DIVE_TYPE.map((option, index) => (
                  <Dropdown.MenuItem
                    key={index}
                    label={option}
                    onClick={() => handleTemperatureFilterOptionClick(option)}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown.Button>
          </Flexbox>
          <Flexbox gap="1rem">
            <label>깊이</label>
            <Dropdown.Button label={depthFilterButtonLabel}>
              <Dropdown.Menu>
                <Dropdown.MenuItem
                  label="전체"
                  onClick={() => handleDepthFilterOptionClick('')}
                />
                {DIVE_TYPE.map((option, index) => (
                  <Dropdown.MenuItem
                    key={index}
                    label={option}
                    onClick={() => handleDepthFilterOptionClick(option)}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown.Button>
          </Flexbox>
        </Flexbox>
        {isLoading && <p>loading...</p>}
        <ul>
          {logList.map((data, index) => (
            <LogListItem
              key={index}
              isFavorite={data.isFavorite}
              logId={String(data.id)}
              location={data.location}
              date={data.date}
            />
          ))}
        </ul>
        {/* <div
          style={{ height: '2rem', border: '1px solid red' }}
          ref={observerRef}
          >
          옵저버
        </div> */}
        <button onClick={fetchMoreLog} disabled={fetchMoreLogButtonDisabled}>
          더보기
        </button>
      </Stack>
    </Layout>
  );
};

export default LogsPage;
