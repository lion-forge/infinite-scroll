import { ScrollInfinite, ScrollInfiniteConfig } from 'scrollinfinite';

export interface InfiniteScrollActionOptions extends Omit<ScrollInfiniteConfig, 'container'> {
  /**
   * Callback function to load more items
   */
  onLoadMore: () => void | Promise<void>;

  /**
   * Callback when an error occurs
   */
  onError?: (error: Error) => void;

  /**
   * Callback when state changes
   */
  onStateChange?: (state: string) => void;
}

/**
 * Svelte action for infinite scroll
 *
 * @example
 * ```svelte
 * <script>
 *   import { infiniteScroll } from '@scrollinfinite/svelte';
 *
 *   let items = [];
 *   let loading = false;
 *
 *   async function loadMore() {
 *     loading = true;
 *     const newItems = await fetchItems();
 *     items = [...items, ...newItems];
 *     loading = false;
 *   }
 * </script>
 *
 * <div use:infiniteScroll={{ onLoadMore: loadMore, threshold: 200 }}>
 *   {#each items as item (item.id)}
 *     <div>{item.name}</div>
 *   {/each}
 *   {#if loading}
 *     <div>Loading...</div>
 *   {/if}
 * </div>
 * ```
 */
export function infiniteScroll(
  node: HTMLElement,
  options: InfiniteScrollActionOptions
) {
  const { onLoadMore, onError, onStateChange, ...config } = options;

  let scrollInfinite = new ScrollInfinite(
    {
      ...config,
      container: node,
    },
    {
      onLoadMore,
      onError,
      onStateChange,
    }
  );

  scrollInfinite.observe();

  return {
    update(newOptions: InfiniteScrollActionOptions) {
      const { onLoadMore, onError, onStateChange, ...newConfig } = newOptions;

      // Recreate instance with new options
      scrollInfinite.destroy();
      scrollInfinite = new ScrollInfinite(
        {
          ...newConfig,
          container: node,
        },
        {
          onLoadMore,
          onError,
          onStateChange,
        }
      );
      scrollInfinite.observe();
    },
    destroy() {
      scrollInfinite.destroy();
    },
  };
}
