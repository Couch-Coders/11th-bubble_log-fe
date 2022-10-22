import { useDispatch } from '@store/index';
import { logCreateActions } from '@store/slices/logCreate';
import { useCallback } from 'react';

const useTempPost = () => {
  const dispatch = useDispatch();

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

  const createTempPost = useCallback(
    (tempPostData: {
      diveType: 'FREE' | 'SCUBA';
      date: Date | null;
      leaveTime: Date | null;
      enterTime: Date | null;
      sight: string;
      maxDepth: string;
      temperature: string;
      maxOxygen: string;
      minOxygen: string;
      location: string;
      content: string;
      longitude: number;
      latitude: number;
    }) => {
      localStorage.setItem('temp', JSON.stringify(tempPostData));
    },
    [],
  );

  return { checkTempPost, loadTempPost, removeTempPost, createTempPost };
};

export default useTempPost;
