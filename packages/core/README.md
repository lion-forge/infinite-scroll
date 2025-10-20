# @lionforge/scroll-infinite

> Universal infinite scroll library - Part of the LionForge ecosystem

Framework-agnostic infinite scroll implementation. Use this directly for vanilla JavaScript/TypeScript projects, or use one of the framework-specific packages for React, Vue, Angular, or Svelte.

## Installation

```bash
npm install @lionforge/scroll-infinite
```

## Usage

```javascript
import { ScrollInfinite } from '@lionforge/scroll-infinite';

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

## Framework Packages

For better integration with your framework, use these packages:

- **React**: `@lionforge/react-scroll-infinite`
- **Vue**: `@lionforge/vue-scroll-infinite`
- **Angular**: `@lionforge/angular-scroll-infinite`
- **Svelte**: `@lionforge/svelte-scroll-infinite`

## Part of LionForge

This library is part of the [LionForge](https://github.com/UmutKorkmaz/js-infinity-scroll) ecosystem - a collection of powerful, framework-agnostic libraries for modern web development.

## License

MIT © Umut Korkmaz
