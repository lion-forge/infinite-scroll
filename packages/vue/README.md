# @scrollinfinite/vue

> Vue 3 composables for infinite scroll

Vue 3 integration for ScrollInfinite. Provides a `useInfiniteScroll` composable for implementing infinite scrolling in Vue applications.

## Installation

```bash
npm install @scrollinfinite/vue
```

## Usage

```vue
<template>
  <div ref="containerRef">
    <div v-for="item in items" :key="item.id">
      {{ item.name }}
    </div>
    <div v-if="isLoading">Loading...</div>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useInfiniteScroll } from '@scrollinfinite/vue';

const items = ref([]);
const page = ref(1);

const { containerRef, isLoading, state, reset } = useInfiniteScroll({
  onLoadMore: async () => {
    const response = await fetch(`/api/items?page=${page.value}`);
    const newItems = await response.json();
    items.value = [...items.value, ...newItems];
    page.value++;
  },
  threshold: 200,
  enabled: true,
});
</script>
```

## API

### `useInfiniteScroll(options)`

Returns an object with:

```typescript
{
  containerRef: Ref<HTMLElement | null>;
  state: Ref<LoadingState>;
  isLoading: Ref<boolean>;
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
