import { writable, derived, Readable } from 'svelte/store';
import { ScrollInfinite, ScrollInfiniteConfig, LoadingState } from '@scrollinfinite/core';

export interface InfiniteScrollStoreOptions extends Omit<ScrollInfiniteConfig, 'container'> {
  /**
   * Callback function to load more items
   */
  onLoadMore: () => void | Promise<void>;

  /**
   * Callback when an error occurs
   */
  onError?: (error: Error) => void;
}

export interface InfiniteScrollStore {
  /**
   * Current loading state
   */
  state: Readable<LoadingState>;

  /**
   * Check if currently loading
   */
  isLoading: Readable<boolean>;

  /**
   * Initialize with container element
   */
  init: (container: HTMLElement) => void;

  /**
   * Reset the infinite scroll
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

  /**
   * Destroy the instance
   */
  destroy: () => void;
}

/**
 * Create a Svelte store for infinite scroll
 *
 * @example
 * ```svelte
 * <script>
 *   import { createInfiniteScrollStore } from '@scrollinfinite/svelte';
 *
 *   let containerElement;
 *
 *   const infiniteScroll = createInfiniteScrollStore({
 *     onLoadMore: async () => {
 *       await fetchMoreData();
 *     },
 *     threshold: 200,
 *   });
 *
 *   $: if (containerElement) {
 *     infiniteScroll.init(containerElement);
 *   }
 * </script>
 *
 * <div bind:this={containerElement}>
 *   {#if $infiniteScroll.isLoading}
 *     <div>Loading...</div>
 *   {/if}
 * </div>
 * ```
 */
export function createInfiniteScrollStore(
  options: InfiniteScrollStoreOptions
): InfiniteScrollStore {
  const { onLoadMore, onError, ...config } = options;
  const state = writable<LoadingState>(config.initialState || 'idle');
  const isLoading = derived(state, ($state) => $state === 'loading');

  let scrollInfinite: ScrollInfinite | null = null;

  function init(container: HTMLElement) {
    if (scrollInfinite) {
      scrollInfinite.destroy();
    }

    scrollInfinite = new ScrollInfinite(
      {
        ...config,
        container,
      },
      {
        onLoadMore,
        onStateChange: (newState) => state.set(newState),
        onError,
      }
    );

    scrollInfinite.observe();
  }

  function reset() {
    scrollInfinite?.reset();
  }

  function enable() {
    scrollInfinite?.enable();
  }

  function disable() {
    scrollInfinite?.disable();
  }

  function destroy() {
    if (scrollInfinite) {
      scrollInfinite.destroy();
      scrollInfinite = null;
    }
  }

  return {
    state: { subscribe: state.subscribe },
    isLoading: { subscribe: isLoading.subscribe },
    init,
    reset,
    enable,
    disable,
    destroy,
  };
}
