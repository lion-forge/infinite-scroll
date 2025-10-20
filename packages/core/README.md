# @scrollinfinite/core

> Framework-agnostic infinite scroll library

The core library that powers ScrollInfinite. Use this directly for vanilla JavaScript/TypeScript projects, or use one of the framework-specific packages for React, Vue, Angular, or Svelte.

## Installation

```bash
npm install @scrollinfinite/core
```

## Usage

```javascript
import { ScrollInfinite } from '@scrollinfinite/core';

const container = document.getElementById('container');

const scrollInfinite = new ScrollInfinite(
  {
    container: container,
    threshold: 200,
    direction: 'vertical',
    useIntersectionObserver: true,
  },
  {
    onLoadMore: async () => {
      console.log('Load more items');
      // Fetch and render more items
    },
    onStateChange: (state) => {
      console.log('State changed:', state);
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  }
);

// Start observing
scrollInfinite.observe();

// Clean up when done
scrollInfinite.destroy();
```

## API

### Constructor

```typescript
new ScrollInfinite(config: ScrollInfiniteConfig, callbacks: ScrollInfiniteCallbacks)
```

### Configuration

```typescript
interface ScrollInfiniteConfig {
  container?: HTMLElement | Window;
  threshold?: number;
  direction?: 'vertical' | 'horizontal';
  useIntersectionObserver?: boolean;
  rootMargin?: string;
  enabled?: boolean;
  debounceDelay?: number;
  initialState?: LoadingState;
}
```

### Callbacks

```typescript
interface ScrollInfiniteCallbacks {
  onLoadMore: () => void | Promise<void>;
  onStateChange?: (state: LoadingState) => void;
  onError?: (error: Error) => void;
}
```

### Methods

- `observe()`: Start observing for scroll events
- `disconnect()`: Stop observing
- `getState()`: Get current loading state
- `setState(state)`: Set loading state
- `isLoading()`: Check if currently loading
- `reset()`: Reset to initial state
- `enable()`: Enable infinite scroll
- `disable()`: Disable infinite scroll
- `destroy()`: Clean up and destroy instance

## License

MIT © Umut Korkmaz
