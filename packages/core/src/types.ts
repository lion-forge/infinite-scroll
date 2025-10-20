/**
 * Scroll direction for infinite scroll
 */
export type ScrollDirection = 'vertical' | 'horizontal';

/**
 * Loading state of the infinite scroll
 */
export type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';

/**
 * Configuration options for ScrollInfinite
 */
export interface ScrollInfiniteConfig {
  /**
   * The container element to observe for scrolling
   * @default window
   */
  container?: HTMLElement | Window;

  /**
   * Distance from the bottom/end (in pixels) when to trigger loading
   * @default 200
   */
  threshold?: number;

  /**
   * Scroll direction to observe
   * @default 'vertical'
   */
  direction?: ScrollDirection;

  /**
   * Use Intersection Observer API instead of scroll events
   * @default true
   */
  useIntersectionObserver?: boolean;

  /**
   * Root margin for Intersection Observer (only used when useIntersectionObserver is true)
   * @default '200px'
   */
  rootMargin?: string;

  /**
   * Enable/disable the infinite scroll
   * @default true
   */
  enabled?: boolean;

  /**
   * Debounce delay for scroll events in milliseconds
   * @default 100
   */
  debounceDelay?: number;

  /**
   * Initial loading state
   * @default 'idle'
   */
  initialState?: LoadingState;
}

/**
 * Callback function when more content should be loaded
 */
export type LoadMoreCallback = () => void | Promise<void>;

/**
 * Callback function when loading state changes
 */
export type StateChangeCallback = (state: LoadingState) => void;

/**
 * Callback function when an error occurs
 */
export type ErrorCallback = (error: Error) => void;

/**
 * Event callbacks for ScrollInfinite
 */
export interface ScrollInfiniteCallbacks {
  /**
   * Called when more content should be loaded
   */
  onLoadMore: LoadMoreCallback;

  /**
   * Called when loading state changes
   */
  onStateChange?: StateChangeCallback;

  /**
   * Called when an error occurs
   */
  onError?: ErrorCallback;
}

/**
 * ScrollInfinite instance interface
 */
export interface IScrollInfinite {
  /**
   * Start observing for scroll events
   */
  observe(): void;

  /**
   * Stop observing for scroll events
   */
  disconnect(): void;

  /**
   * Get current loading state
   */
  getState(): LoadingState;

  /**
   * Set loading state
   */
  setState(state: LoadingState): void;

  /**
   * Check if currently loading
   */
  isLoading(): boolean;

  /**
   * Reset the infinite scroll to initial state
   */
  reset(): void;

  /**
   * Enable infinite scroll
   */
  enable(): void;

  /**
   * Disable infinite scroll
   */
  disable(): void;

  /**
   * Destroy the instance and clean up
   */
  destroy(): void;
}
