# @scrollinfinite/svelte

> Svelte actions and stores for infinite scroll

Svelte integration for ScrollInfinite. Provides both action and store-based APIs for implementing infinite scrolling in Svelte applications.

## Installation

```bash
npm install @scrollinfinite/svelte
```

## Usage

### Using Action (Recommended)

```svelte
<script>
  import { infiniteScroll } from '@scrollinfinite/svelte';

  let items = [];
  let page = 1;
  let loading = false;

  async function loadMore() {
    loading = true;
    const response = await fetch(`/api/items?page=${page}`);
    const newItems = await response.json();
    items = [...items, ...newItems];
    page++;
    loading = false;
  }
</script>

<div use:infiniteScroll={{ onLoadMore: loadMore, threshold: 200 }}>
  {#each items as item (item.id)}
    <div>{item.name}</div>
  {/each}
  {#if loading}
    <div>Loading...</div>
  {/if}
</div>
```

### Using Store

```svelte
<script>
  import { createInfiniteScrollStore } from '@scrollinfinite/svelte';

  let items = [];
  let containerElement;

  const infiniteScroll = createInfiniteScrollStore({
    onLoadMore: async () => {
      const newItems = await fetchItems();
      items = [...items, ...newItems];
    },
    threshold: 200,
  });

  $: if (containerElement) {
    infiniteScroll.init(containerElement);
  }
</script>

<div bind:this={containerElement}>
  {#each items as item (item.id)}
    <div>{item.name}</div>
  {/each}
  {#if $infiniteScroll.isLoading}
    <div>Loading...</div>
  {/if}
</div>
```

## API

### `infiniteScroll` Action

```typescript
use:infiniteScroll={options}
```

### `createInfiniteScrollStore(options)`

Returns a store with:

```typescript
{
  state: Readable<LoadingState>;
  isLoading: Readable<boolean>;
  init: (container: HTMLElement) => void;
  reset: () => void;
  enable: () => void;
  disable: () => void;
  destroy: () => void;
}
```

### Options

```typescript
interface InfiniteScrollOptions {
  onLoadMore: () => void | Promise<void>;
  onError?: (error: Error) => void;
  onStateChange?: (state: LoadingState) => void;
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
