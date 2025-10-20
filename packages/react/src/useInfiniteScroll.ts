import { useEffect, useRef, useState, useCallback } from 'react';
import { ScrollInfinite, ScrollInfiniteConfig, LoadingState } from 'scrollinfinite';

export interface UseInfiniteScrollOptions extends Omit<ScrollInfiniteConfig, 'container'> {
  /**
   * Callback function to load more items
   */
  onLoadMore: () => void | Promise<void>;

  /**
   * Callback when an error occurs
   */
  onError?: (error: Error) => void;
}

export interface UseInfiniteScrollReturn {
  /**
   * Ref to attach to the scrollable container
   */
  containerRef: React.RefObject<HTMLElement>;

  /**
   * Current loading state
   */
  state: LoadingState;

  /**
   * Check if currently loading
   */
  isLoading: boolean;

  /**
   * Manually trigger reset
   */
  reset: () => void;

  /**
   * Enable infinite scroll
   */
  enable: () => void;

  /**
   * Disable infinite scroll
   */
  disable: () => void;
}

/**
 * React hook for infinite scroll
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { containerRef, isLoading } = useInfiniteScroll({
 *     onLoadMore: async () => {
 *       await fetchMoreData();
 *     },
 *     threshold: 200,
 *   });
 *
 *   return (
 *     <div ref={containerRef}>
 *       {items.map(item => <Item key={item.id} {...item} />)}
 *       {isLoading && <Loader />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useInfiniteScroll(
  options: UseInfiniteScrollOptions
): UseInfiniteScrollReturn {
  const { onLoadMore, onError, ...config } = options;
  const containerRef = useRef<HTMLElement>(null);
  const scrollInfiniteRef = useRef<ScrollInfinite | null>(null);
  const [state, setState] = useState<LoadingState>(config.initialState || 'idle');

  // Initialize ScrollInfinite instance
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const scrollInfinite = new ScrollInfinite(
      {
        ...config,
        container: containerRef.current,
      },
      {
        onLoadMore,
        onStateChange: setState,
        onError,
      }
    );

    scrollInfinite.observe();
    scrollInfiniteRef.current = scrollInfinite;

    return () => {
      scrollInfinite.destroy();
      scrollInfiniteRef.current = null;
    };
  }, [containerRef.current]);

  // Update callbacks when they change
  useEffect(() => {
    if (scrollInfiniteRef.current) {
      // Re-create instance with new callbacks
      const container = containerRef.current;
      if (container) {
        scrollInfiniteRef.current.destroy();
        const scrollInfinite = new ScrollInfinite(
          {
            ...config,
            container,
          },
          {
            onLoadMore,
            onStateChange: setState,
            onError,
          }
        );
        scrollInfinite.observe();
        scrollInfiniteRef.current = scrollInfinite;
      }
    }
  }, [onLoadMore, onError]);

  const reset = useCallback(() => {
    scrollInfiniteRef.current?.reset();
  }, []);

  const enable = useCallback(() => {
    scrollInfiniteRef.current?.enable();
  }, []);

  const disable = useCallback(() => {
    scrollInfiniteRef.current?.disable();
  }, []);

  return {
    containerRef,
    state,
    isLoading: state === 'loading',
    reset,
    enable,
    disable,
  };
}
