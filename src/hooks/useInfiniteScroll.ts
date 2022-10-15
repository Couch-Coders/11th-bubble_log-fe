import { useEffect } from 'react';

// TODO: type target parameter
const useInfiniteScroll = (
  target: any,
  onIntersect: IntersectionObserverCallback,
): void => {
  useEffect(() => {
    if (target === null) return;
    const observer = new IntersectionObserver(onIntersect);

    observer.observe(target);

    return () => observer.disconnect();
  }, [target]);
};

export default useInfiniteScroll;
