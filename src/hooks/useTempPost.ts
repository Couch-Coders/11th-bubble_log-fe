import { useDispatch, useSelector } from '@store/index';
import { logCreateActions } from '@store/slices/logCreate';
import { useCallback } from 'react';

const useTempPost = () => {
  const dispatch = useDispatch();

  const {
    diveType,
    date,
    leaveTime,
    enterTime,
    sight,
    maxDepth,
    temperature,
    minOxygen,
    maxOxygen,
    location,
    content,
    latitude,
    longitude,
  } = useSelector((state) => state.logCreate);

  const checkTempPost = () => {
    return localStorage.getItem('temp') !== null;
  };

  const loadTempPost = useCallback(() => {
    const tempPost = localStorage.getItem('temp');
    if (tempPost === null) return;

    const tempPostData = JSON.parse(tempPost);

    if (tempPostData.date !== null)
      dispatch(logCreateActions.setDate(new Date(tempPostData.date)));
    dispatch(logCreateActions.setDiveType(tempPostData.diveType));
    if (tempPostData.enterTime !== null)
      dispatch(logCreateActions.setEnterTime(new Date(tempPostData.enterTime)));
    if (tempPostData.leaveTime !== null)
      dispatch(logCreateActions.setLeaveTime(new Date(tempPostData.leaveTime)));
    dispatch(logCreateActions.setLatitude(tempPostData.latitude));
    dispatch(logCreateActions.setMaxDepth(tempPostData.maxDepth));
    dispatch(logCreateActions.setMinOxygen(tempPostData.minOxygen));
    dispatch(logCreateActions.setSight(tempPostData.sight));
    dispatch(logCreateActions.setTemperature(tempPostData.temperature));
  }, [dispatch]);

  const removeTempPost = useCallback(() => {
    localStorage.removeItem('temp');
  }, []);

  const createTempPost = useCallback(() => {
    const tempPostData = {
      diveType,
      date,
      leaveTime,
      enterTime,
      sight,
      maxDepth,
      temperature,
      maxOxygen,
      minOxygen,
      location,
      content,
      longitude,
      latitude,
    };

    localStorage.setItem('temp', JSON.stringify(tempPostData));
  }, [
    diveType,
    date,
    leaveTime,
    enterTime,
    sight,
    maxDepth,
    temperature,
    maxOxygen,
    minOxygen,
    location,
    longitude,
    latitude,
    content,
  ]);

  return { checkTempPost, loadTempPost, removeTempPost, createTempPost };
};

export default useTempPost;
