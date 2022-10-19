import { useEffect } from 'react';

// target: HTMLElement | null?
const useInfiniteScroll = (
  target: any,
  onIntersect: IntersectionObserverCallback,
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect);

    if (target === null) return;

    observer.observe(target);

    return () => observer.disconnect();
  }, [target, onIntersect]);
};

export default useInfiniteScroll;
