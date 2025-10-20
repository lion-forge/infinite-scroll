import { ref, onMounted, onUnmounted, Ref, watch } from 'vue';
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
   * Ref to attach to the scrollable container element
   */
  containerRef: Ref<HTMLElement | null>;

  /**
   * Current loading state
   */
  state: Ref<LoadingState>;

  /**
   * Check if currently loading
   */
  isLoading: Ref<boolean>;

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
 * Vue 3 composable for infinite scroll
 *
 * @example
 * ```vue
 * <template>
 *   <div ref="containerRef">
 *     <div v-for="item in items" :key="item.id">
 *       {{ item.name }}
 *     </div>
 *     <div v-if="isLoading">Loading...</div>
 *   </div>
 * </template>
 *
 * <script setup>
 * import { useInfiniteScroll } from '@scrollinfinite/vue';
 *
 * const { containerRef, isLoading } = useInfiniteScroll({
 *   onLoadMore: async () => {
 *     await fetchMoreData();
 *   },
 *   threshold: 200,
 * });
 * </script>
 * ```
 */
export function useInfiniteScroll(
  options: UseInfiniteScrollOptions
): UseInfiniteScrollReturn {
  const { onLoadMore, onError, ...config } = options;
  const containerRef = ref<HTMLElement | null>(null);
  const state = ref<LoadingState>(config.initialState || 'idle');
  const isLoading = ref(false);

  let scrollInfinite: ScrollInfinite | null = null;

  const initialize = () => {
    if (!containerRef.value) {
      return;
    }

    scrollInfinite = new ScrollInfinite(
      {
        ...config,
        container: containerRef.value,
      },
      {
        onLoadMore,
        onStateChange: (newState) => {
          state.value = newState;
          isLoading.value = newState === 'loading';
        },
        onError,
      }
    );

    scrollInfinite.observe();
  };

  const cleanup = () => {
    if (scrollInfinite) {
      scrollInfinite.destroy();
      scrollInfinite = null;
    }
  };

  const reset = () => {
    scrollInfinite?.reset();
  };

  const enable = () => {
    scrollInfinite?.enable();
  };

  const disable = () => {
    scrollInfinite?.disable();
  };

  // Watch for container ref changes
  watch(containerRef, (newContainer) => {
    cleanup();
    if (newContainer) {
      initialize();
    }
  });

  onMounted(() => {
    if (containerRef.value) {
      initialize();
    }
  });

  onUnmounted(() => {
    cleanup();
  });

  return {
    containerRef,
    state,
    isLoading,
    reset,
    enable,
    disable,
  };
}
