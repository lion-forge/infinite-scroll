import type {
  ScrollInfiniteConfig,
  ScrollInfiniteCallbacks,
  IScrollInfinite,
  LoadingState,
} from './types';
import { debounce, isWindow, isNearEnd } from './utils';

const DEFAULT_CONFIG: Required<Omit<ScrollInfiniteConfig, 'container'>> = {
  threshold: 200,
  direction: 'vertical',
  useIntersectionObserver: true,
  rootMargin: '200px',
  enabled: true,
  debounceDelay: 100,
  initialState: 'idle',
};

/**
 * ScrollInfinite - Universal infinite scroll implementation
 */
export class ScrollInfinite implements IScrollInfinite {
  private config: Required<ScrollInfiniteConfig>;
  private callbacks: ScrollInfiniteCallbacks;
  private state: LoadingState;
  private observer: IntersectionObserver | null = null;
  private sentinel: HTMLElement | null = null;
  private scrollHandler: (() => void) | null = null;
  private isObserving = false;

  constructor(
    config: ScrollInfiniteConfig = {},
    callbacks: ScrollInfiniteCallbacks
  ) {
    this.config = {
      container: window,
      ...DEFAULT_CONFIG,
      ...config,
    };
    this.callbacks = callbacks;
    this.state = this.config.initialState;
  }

  /**
   * Start observing for scroll events
   */
  public observe(): void {
    if (this.isObserving || !this.config.enabled) {
      return;
    }

    if (this.config.useIntersectionObserver) {
      this.observeWithIntersectionObserver();
    } else {
      this.observeWithScrollEvent();
    }

    this.isObserving = true;
  }

  /**
   * Stop observing for scroll events
   */
  public disconnect(): void {
    if (!this.isObserving) {
      return;
    }

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.scrollHandler && this.config.container) {
      const container = this.config.container;
      container.removeEventListener('scroll', this.scrollHandler);
      this.scrollHandler = null;
    }

    if (this.sentinel && this.sentinel.parentElement) {
      this.sentinel.parentElement.removeChild(this.sentinel);
      this.sentinel = null;
    }

    this.isObserving = false;
  }

  /**
   * Get current loading state
   */
  public getState(): LoadingState {
    return this.state;
  }

  /**
   * Set loading state
   */
  public setState(state: LoadingState): void {
    if (this.state !== state) {
      this.state = state;
      this.callbacks.onStateChange?.(state);
    }
  }

  /**
   * Check if currently loading
   */
  public isLoading(): boolean {
    return this.state === 'loading';
  }

  /**
   * Reset the infinite scroll to initial state
   */
  public reset(): void {
    this.disconnect();
    this.setState(this.config.initialState);
  }

  /**
   * Enable infinite scroll
   */
  public enable(): void {
    this.config.enabled = true;
    if (!this.isObserving) {
      this.observe();
    }
  }

  /**
   * Disable infinite scroll
   */
  public disable(): void {
    this.config.enabled = false;
    this.disconnect();
  }

  /**
   * Destroy the instance and clean up
   */
  public destroy(): void {
    this.disconnect();
  }

  /**
   * Handle loading more content
   */
  private async handleLoadMore(): Promise<void> {
    if (this.isLoading() || !this.config.enabled) {
      return;
    }

    try {
      this.setState('loading');
      await this.callbacks.onLoadMore();
      this.setState('loaded');
    } catch (error) {
      this.setState('error');
      this.callbacks.onError?.(
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Observe using Intersection Observer API
   */
  private observeWithIntersectionObserver(): void {
    // Create sentinel element
    this.sentinel = document.createElement('div');
    this.sentinel.style.height = '1px';
    this.sentinel.style.width = '1px';
    this.sentinel.style.position = 'absolute';
    this.sentinel.style.bottom = '0';
    this.sentinel.setAttribute('data-scrollinfinite-sentinel', 'true');

    // Append sentinel to container or body
    const container = this.config.container;
    if (isWindow(container)) {
      document.body.appendChild(this.sentinel);
    } else {
      container.appendChild(this.sentinel);
    }

    // Create observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.handleLoadMore();
          }
        });
      },
      {
        root: isWindow(this.config.container) ? null : this.config.container,
        rootMargin: this.config.rootMargin,
        threshold: 0,
      }
    );

    this.observer.observe(this.sentinel);
  }

  /**
   * Observe using scroll events
   */
  private observeWithScrollEvent(): void {
    this.scrollHandler = debounce(() => {
      if (
        isNearEnd(
          this.config.container,
          this.config.threshold,
          this.config.direction
        )
      ) {
        this.handleLoadMore();
      }
    }, this.config.debounceDelay);

    const container = this.config.container;
    container.addEventListener('scroll', this.scrollHandler, { passive: true });

    // Initial check
    this.scrollHandler();
  }
}
