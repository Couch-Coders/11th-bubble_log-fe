import React, { useEffect } from 'react';

const useOutsideClick = (
  ref: React.MutableRefObject<HTMLElement | null>,
  onOutsideClick: any,
): void => {
  useEffect(() => {
    const listener = (event: any): void => {
      if (ref.current == null || ref.current.contains(event.target)) return;

      onOutsideClick(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, onOutsideClick]);
};

export default useOutsideClick;