/**
 * ScrollInfinite Vue - Vue composables for infinite scroll
 * @packageDocumentation
 */

export { useInfiniteScroll } from './useInfiniteScroll';
export type { UseInfiniteScrollOptions, UseInfiniteScrollReturn } from './useInfiniteScroll';

// Re-export core types for convenience
export type {
  ScrollInfiniteConfig,
  ScrollDirection,
  LoadingState,
} from '@lionforge/scroll-infinite';
