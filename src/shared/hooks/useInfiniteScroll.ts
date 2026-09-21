import { useCallback, useEffect, useRef } from 'react';

export const useInfiniteScroll = (callback: () => void) => {
  const observeRef = useRef<IntersectionObserver | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const triggerRef = useCallback((node: HTMLDivElement | null) => {
    if (observeRef.current) {
      observeRef.current.disconnect();
    }

    if (node) {
      observeRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            callbackRef.current();
          }
        },
        { threshold: 0.1 }
      );
      observeRef.current.observe(node);
    }
  }, []);

  return { triggerRef };
};
