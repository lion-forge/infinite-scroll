import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ScrollInfinite, ScrollInfiniteConfig, LoadingState } from '@lionforge/scroll-infinite';

/**
 * Angular directive for infinite scroll
 *
 * @example
 * ```html
 * <div
 *   infiniteScroll
 *   [threshold]="200"
 *   [enabled]="true"
 *   (loadMore)="onLoadMore()"
 *   (stateChange)="onStateChange($event)">
 *   <div *ngFor="let item of items">
 *     {{ item.name }}
 *   </div>
 *   <div *ngIf="loading">Loading...</div>
 * </div>
 * ```
 *
 * @example
 * ```typescript
 * export class MyComponent {
 *   items = [];
 *   loading = false;
 *
 *   async onLoadMore() {
 *     this.loading = true;
 *     const newItems = await this.fetchItems();
 *     this.items = [...this.items, ...newItems];
 *     this.loading = false;
 *   }
 *
 *   onStateChange(state: LoadingState) {
 *     this.loading = state === 'loading';
 *   }
 * }
 * ```
 */
@Directive({
  selector: '[infiniteScroll]',
  standalone: true,
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
  /**
   * Distance from the bottom (in pixels) when to trigger loading
   */
  @Input() threshold = 200;

  /**
   * Scroll direction to observe
   */
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';

  /**
   * Use Intersection Observer API instead of scroll events
   */
  @Input() useIntersectionObserver = true;

  /**
   * Root margin for Intersection Observer
   */
  @Input() rootMargin = '200px';

  /**
   * Enable/disable the infinite scroll
   */
  @Input() enabled = true;

  /**
   * Debounce delay for scroll events in milliseconds
   */
  @Input() debounceDelay = 100;

  /**
   * Event emitted when more content should be loaded
   */
  @Output() loadMore = new EventEmitter<void>();

  /**
   * Event emitted when loading state changes
   */
  @Output() stateChange = new EventEmitter<LoadingState>();

  /**
   * Event emitted when an error occurs
   */
  @Output() error = new EventEmitter<Error>();

  private scrollInfinite: ScrollInfinite | null = null;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.initialize();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private initialize(): void {
    const config: ScrollInfiniteConfig = {
      container: this.elementRef.nativeElement,
      threshold: this.threshold,
      direction: this.direction,
      useIntersectionObserver: this.useIntersectionObserver,
      rootMargin: this.rootMargin,
      enabled: this.enabled,
      debounceDelay: this.debounceDelay,
    };

    this.scrollInfinite = new ScrollInfinite(config, {
      onLoadMore: () => {
        this.loadMore.emit();
      },
      onStateChange: (state) => {
        this.stateChange.emit(state);
      },
      onError: (err) => {
        this.error.emit(err);
      },
    });

    this.scrollInfinite.observe();
  }

  private destroy(): void {
    if (this.scrollInfinite) {
      this.scrollInfinite.destroy();
      this.scrollInfinite = null;
    }
  }

  /**
   * Reset the infinite scroll to initial state
   */
  public reset(): void {
    this.scrollInfinite?.reset();
  }

  /**
   * Enable infinite scroll
   */
  public enable(): void {
    this.scrollInfinite?.enable();
  }

  /**
   * Disable infinite scroll
   */
  public disable(): void {
    this.scrollInfinite?.disable();
  }
}
