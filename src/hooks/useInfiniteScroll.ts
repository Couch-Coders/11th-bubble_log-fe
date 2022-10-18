import { useEffect } from 'react';

// TODO: type target parameter
const useInfiniteScroll = (
  target: any,
  onIntersect: IntersectionObserverCallback,
): void => {
  const observer = new IntersectionObserver(onIntersect);

  useEffect(() => {
    if (target === null) return;

    observer.observe(target);

    return () => observer.disconnect();
  }, [target]);
};

export default useInfiniteScroll;
