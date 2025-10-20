/**
 * ScrollInfinite Svelte - Svelte actions and stores for infinite scroll
 * @packageDocumentation
 */

export { infiniteScroll } from './infiniteScroll';
export type { InfiniteScrollActionOptions } from './infiniteScroll';

export { createInfiniteScrollStore } from './store';
export type { InfiniteScrollStore, InfiniteScrollStoreOptions } from './store';

// Re-export core types for convenience
export type {
  ScrollInfiniteConfig,
  ScrollDirection,
  LoadingState,
} from '@lionforge/scroll-infinite';
