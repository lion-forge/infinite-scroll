# ScrollInfinite

> Universal infinite scroll library for all modern frameworks

[![npm version](https://img.shields.io/npm/v/scrollinfinite.svg)](https://www.npmjs.com/package/scrollinfinite)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

ScrollInfinite is a lightweight, framework-agnostic infinite scroll library with first-class support for React, Vue, Angular, and Svelte. It provides a simple, performant solution for implementing infinite scrolling with both Intersection Observer API and traditional scroll events.

## Features

- **Universal**: Works with React, Vue, Angular, Svelte, and vanilla JavaScript
- **TypeScript**: Fully typed with comprehensive type definitions
- **Performant**: Uses Intersection Observer API by default with fallback to scroll events
- **Flexible**: Highly configurable with sensible defaults
- **Lightweight**: Minimal bundle size with tree-shaking support
- **Modern**: Built with modern JavaScript and bundled for ESM and CJS

## Installation

### Core Library (Vanilla JS/TypeScript)

```bash
npm install scrollinfinite
```

### Framework-Specific Packages

```bash
# React
npm install @scrollinfinite/react

# Vue 3
npm install @scrollinfinite/vue

# Angular
npm install @scrollinfinite/angular

# Svelte
npm install @scrollinfinite/svelte
```

## Quick Start

### React

```tsx
import { useInfiniteScroll } from '@scrollinfinite/react';

function MyComponent() {
  const [items, setItems] = useState([]);

  const { containerRef, isLoading } = useInfiniteScroll({
    onLoadMore: async () => {
      const newItems = await fetchMoreItems();
      setItems([...items, ...newItems]);
    },
    threshold: 200,
  });

  return (
    <div ref={containerRef}>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}
```

### Vue 3

```vue
<template>
  <div ref="containerRef">
    <div v-for="item in items" :key="item.id">
      {{ item.name }}
    </div>
    <div v-if="isLoading">Loading...</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useInfiniteScroll } from '@scrollinfinite/vue';

const items = ref([]);

const { containerRef, isLoading } = useInfiniteScroll({
  onLoadMore: async () => {
    const newItems = await fetchMoreItems();
    items.value = [...items.value, ...newItems];
  },
  threshold: 200,
});
</script>
```

### Svelte

```svelte
<script>
  import { infiniteScroll } from '@scrollinfinite/svelte';

  let items = [];
  let loading = false;

  async function loadMore() {
    loading = true;
    const newItems = await fetchMoreItems();
    items = [...items, ...newItems];
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

### Angular

```typescript
import { Component } from '@angular/core';
import { InfiniteScrollDirective } from '@scrollinfinite/angular';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [InfiniteScrollDirective],
  template: `
    <div
      infiniteScroll
      [threshold]="200"
      (loadMore)="onLoadMore()">
      <div *ngFor="let item of items">
        {{ item.name }}
      </div>
      <div *ngIf="loading">Loading...</div>
    </div>
  `,
})
export class MyComponent {
  items = [];
  loading = false;

  async onLoadMore() {
    this.loading = true;
    const newItems = await this.fetchMoreItems();
    this.items = [...this.items, ...newItems];
    this.loading = false;
  }
}
```

### Vanilla JavaScript

```javascript
import { ScrollInfinite } from 'scrollinfinite';

const container = document.getElementById('container');

const scrollInfinite = new ScrollInfinite(
  {
    container: container,
    threshold: 200,
  },
  {
    onLoadMore: async () => {
      const items = await fetchMoreItems();
      renderItems(items);
    },
    onStateChange: (state) => {
      console.log('State changed:', state);
    },
  }
);

scrollInfinite.observe();
```

## Configuration Options

All framework adapters support the following configuration options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `threshold` | `number` | `200` | Distance from bottom (in pixels) when to trigger loading |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Scroll direction to observe |
| `useIntersectionObserver` | `boolean` | `true` | Use Intersection Observer API instead of scroll events |
| `rootMargin` | `string` | `'200px'` | Root margin for Intersection Observer |
| `enabled` | `boolean` | `true` | Enable/disable infinite scroll |
| `debounceDelay` | `number` | `100` | Debounce delay for scroll events (ms) |

## API

### Loading States

The library provides the following loading states:

- `idle`: Initial state, ready to load
- `loading`: Currently loading more items
- `loaded`: Successfully loaded items
- `error`: Error occurred while loading

### Methods

All framework adapters provide these methods:

- `reset()`: Reset to initial state
- `enable()`: Enable infinite scroll
- `disable()`: Disable infinite scroll

## Examples

Check out the `/examples` directory for complete working examples with each framework.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Intersection Observer API is supported in all modern browsers. For older browsers, the library falls back to scroll events.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Umut Korkmaz

## Links

- [GitHub Repository](https://github.com/UmutKorkmaz/js-infinity-scroll)
- [npm Package](https://www.npmjs.com/package/scrollinfinite)
- [Issues](https://github.com/UmutKorkmaz/js-infinity-scroll/issues)
