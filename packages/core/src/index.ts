/**
 * ScrollInfinite - Universal infinite scroll library
 * @packageDocumentation
 */

export { ScrollInfinite } from './ScrollInfinite';
export type {
  ScrollInfiniteConfig,
  ScrollInfiniteCallbacks,
  IScrollInfinite,
  ScrollDirection,
  LoadingState,
  LoadMoreCallback,
  StateChangeCallback,
  ErrorCallback,
} from './types';
export { debounce, isWindow, getScrollPosition, getScrollSize, getClientSize, isNearEnd } from './utils';
