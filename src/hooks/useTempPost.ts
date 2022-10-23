import { useCallback } from 'react';

const useTempPost = () => {
  const checkTempPost = () => {
    return localStorage.getItem('temp') !== null;
  };

  const loadTempPost = useCallback(() => {
    const tempPost = localStorage.getItem('temp');
    if (tempPost === null) return;

    const tempPostData = JSON.parse(tempPost);

    return tempPostData;
  }, []);

  const removeTempPost = useCallback(() => {
    localStorage.removeItem('temp');
  }, []);

  const createTempPost = useCallback(
    ({
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
    }: {
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
      localStorage.setItem(
        'temp',
        JSON.stringify({
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
        }),
      );
    },
    [],
  );

  return { checkTempPost, loadTempPost, removeTempPost, createTempPost };
};

export default useTempPost;
