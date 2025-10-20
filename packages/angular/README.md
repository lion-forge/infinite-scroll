# @scrollinfinite/angular

> Angular directives for infinite scroll

Angular integration for ScrollInfinite. Provides a standalone directive for implementing infinite scrolling in Angular applications.

## Installation

```bash
npm install @scrollinfinite/angular
```

## Usage

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollDirective } from '@scrollinfinite/angular';

@Component({
  selector: 'app-infinite-list',
  standalone: true,
  imports: [CommonModule, InfiniteScrollDirective],
  template: `
    <div
      infiniteScroll
      [threshold]="200"
      [enabled]="true"
      (loadMore)="onLoadMore()"
      (stateChange)="onStateChange($event)"
      (error)="onError($event)">
      <div *ngFor="let item of items">
        {{ item.name }}
      </div>
      <div *ngIf="loading">Loading...</div>
    </div>
  `,
})
export class InfiniteListComponent {
  items: any[] = [];
  loading = false;
  page = 1;

  async onLoadMore() {
    this.loading = true;
    const response = await fetch(`/api/items?page=${this.page}`);
    const newItems = await response.json();
    this.items = [...this.items, ...newItems];
    this.page++;
    this.loading = false;
  }

  onStateChange(state: string) {
    this.loading = state === 'loading';
  }

  onError(error: Error) {
    console.error('Error loading items:', error);
  }
}
```

## API

### Directive Inputs

```typescript
@Input() threshold: number = 200;
@Input() direction: 'vertical' | 'horizontal' = 'vertical';
@Input() useIntersectionObserver: boolean = true;
@Input() rootMargin: string = '200px';
@Input() enabled: boolean = true;
@Input() debounceDelay: number = 100;
```

### Directive Outputs

```typescript
@Output() loadMore: EventEmitter<void>;
@Output() stateChange: EventEmitter<LoadingState>;
@Output() error: EventEmitter<Error>;
```

### Methods

The directive provides these public methods:

- `reset()`: Reset to initial state
- `enable()`: Enable infinite scroll
- `disable()`: Disable infinite scroll

## License

MIT © Umut Korkmaz
