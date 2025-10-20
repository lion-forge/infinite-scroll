# @scrollinfinite/react

> React hooks for infinite scroll

React integration for ScrollInfinite. Provides a simple `useInfiniteScroll` hook for implementing infinite scrolling in React applications.

## Installation

```bash
npm install @scrollinfinite/react
```

## Usage

```tsx
import { useInfiniteScroll } from '@scrollinfinite/react';
import { useState } from 'react';

function InfiniteList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const { containerRef, isLoading, state, reset } = useInfiniteScroll({
    onLoadMore: async () => {
      const response = await fetch(`/api/items?page=${page}`);
      const newItems = await response.json();
      setItems([...items, ...newItems]);
      setPage(page + 1);
    },
    threshold: 200,
    enabled: true,
  });

  return (
    <div ref={containerRef}>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      {isLoading && <div>Loading...</div>}
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## API

### `useInfiniteScroll(options)`

Returns an object with:

```typescript
{
  containerRef: React.RefObject<HTMLElement>;
  state: LoadingState;
  isLoading: boolean;
  reset: () => void;
  enable: () => void;
  disable: () => void;
}
```

### Options

```typescript
interface UseInfiniteScrollOptions {
  onLoadMore: () => void | Promise<void>;
  onError?: (error: Error) => void;
  threshold?: number;
  direction?: 'vertical' | 'horizontal';
  useIntersectionObserver?: boolean;
  rootMargin?: string;
  enabled?: boolean;
  debounceDelay?: number;
  initialState?: LoadingState;
}
```

## License

MIT © Umut Korkmaz
