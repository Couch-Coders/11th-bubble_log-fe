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
import LogList from '@components/LogList';
import SearchInput from '@components/SearchInput';
import { DIVE_TYPE } from '@utils/constants';

const LogsPage: React.FC = () => {
  const [diveTypeFilterValue, setDiveTypeFilterValue] = useState('전체');
  const [locationFilterValue, setLocationFilterValue] = useState('전체');
  const [temperatureFilterValue, setTemperatureFilterValue] = useState('전체');
  const [depthFilterValue, setDepthFilterValue] = useState('전체');
  const [searchInputValue, setSearchInputValue] = useState('');

  const debouncedSearchInputValue = useDebounce(searchInputValue, 166);

  const { data, isLoading, error, query } = useSelector((state) => state.log);

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

  useEffect(() => {
    dispatch(logActions.setQueryKeyword(debouncedSearchInputValue));
  }, [debouncedSearchInputValue, dispatch]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchInputValue(event.target.value);
  };

  const handleSearchInputClearButtonClick = () => {
    setSearchInputValue('');
  };

  const handleDiveTypeFilterOptionClick = (filterOption: string) => {
    setDiveTypeFilterValue(filterOption);
    const optionValue = filterOption === '전체' ? '' : filterOption;
    dispatch(logActions.setQueryDiveType(optionValue));
  };

  const handleLocationFilterOptionClick = (filterOption: string) => {
    setLocationFilterValue(filterOption);
    const optionValue = filterOption === '전체' ? '' : filterOption;
    dispatch(logActions.setQueryLocation(optionValue));
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
    const minTemperatureOptionValue =
      filterOption === '전체' ? '' : minTemperature;
    const maxTemperatureOptionValue =
      filterOption === '전체' ? '' : maxTemperature;
    dispatch(logActions.setQueryMinTemperature(minTemperatureOptionValue));
    dispatch(logActions.setQueryMaxTemperature(maxTemperatureOptionValue));
  };

  const handleDepthFilterOptionClick = (filterOption: string) => {
    setDepthFilterValue(filterOption);
    const [minDepth, maxDepth] = splitFilterOptionValue(filterOption);
    const minDepthOptionValue = filterOption === '전체' ? '' : minDepth;
    const maxDepthOptionValue = filterOption === '전체' ? '' : maxDepth;
    dispatch(logActions.setQueryMinDepth(minDepthOptionValue));
    dispatch(logActions.setQueryMaxDepth(maxDepthOptionValue));
  };

  const fetchMoreLog = () => {
    const queryWithNextPage = {
      ...query,
      page: String(parseInt(query.page) + 1),
    };

    void dispatch(fetchLogs(queryWithNextPage));
    dispatch(logActions.setQueryPage(String(parseInt(query.page) + 1)));
  };

  const handleFetchMoreLogButtonClick = () => {
    fetchMoreLog();
  };

  const fetchMoreLogButtonDisabled =
    data === null || error !== null || isLoading || data.last;

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
          onClearButtonClick={handleSearchInputClearButtonClick}
        />
        <Flexbox justify="start" gap="1rem" wrap>
          <Flexbox items="center" gap="1rem">
            <label>다이브 종류</label>
            <Dropdown.Button label={diveTypeFilterValue}>
              <Dropdown.Menu>
                <Dropdown.MenuItem
                  label="전체"
                  onClick={() => handleDiveTypeFilterOptionClick('전체')}
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
          <Flexbox items="center" gap="1rem">
            <label>위치</label>
            <Dropdown.Button label={locationFilterValue}>
              <Dropdown.Menu>
                <Dropdown.MenuItem
                  label="전체"
                  onClick={() => handleLocationFilterOptionClick('전체')}
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
          <Flexbox items="center" gap="1rem">
            <label>수온</label>
            <Dropdown.Button label={temperatureFilterValue}>
              <Dropdown.Menu>
                <Dropdown.MenuItem
                  label="전체"
                  onClick={() => handleTemperatureFilterOptionClick('전체')}
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
          <Flexbox items="center" gap="1rem">
            <label>깊이</label>
            <Dropdown.Button label={depthFilterValue}>
              <Dropdown.Menu>
                <Dropdown.MenuItem
                  label="전체"
                  onClick={() => handleDepthFilterOptionClick('전체')}
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
        <LogList />
        {/* <div
          style={{ height: '2rem', border: '1px solid red' }}
          ref={observerRef}
          >
          옵저버
        </div> */}
        <button
          onClick={handleFetchMoreLogButtonClick}
          disabled={fetchMoreLogButtonDisabled}
        >
          더보기
        </button>
      </Stack>
    </Layout>
  );
};

export default LogsPage;
