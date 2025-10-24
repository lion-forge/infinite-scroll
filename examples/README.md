# LionForge ScrollInfinite Examples

This directory contains example implementations of the LionForge ScrollInfinite library for all supported platforms.

## 📦 Available Examples

### Vanilla JavaScript
Basic implementation using the core ScrollInfinite class.

**Location:** `examples/vanilla/`

**Run:**
```bash
cd examples/vanilla
# Open index.html in your browser
```

### React
Implementation using the `useInfiniteScroll` React hook.

**Location:** `examples/react/`

**Run:**
```bash
cd examples/react
pnpm install
pnpm dev
```

**Build:**
```bash
pnpm build
```

### Vue 3
Implementation using the `useInfiniteScroll` Vue composable.

**Location:** `examples/vue/`

**Run:**
```bash
cd examples/vue
pnpm install
pnpm dev
```

**Build:**
```bash
pnpm build
```

### Angular
Implementation using the core ScrollInfinite class with Angular standalone components.

**Location:** `examples/angular/`

**Run:**
```bash
cd examples/angular
pnpm install
pnpm dev
```

**Build:**
```bash
pnpm build
```

### Svelte
Implementation using the `infiniteScroll` Svelte action.

**Location:** `examples/svelte/`

**Run:**
```bash
cd examples/svelte
pnpm install
pnpm dev
```

**Build:**
```bash
pnpm build
```

## 🎨 What These Examples Demonstrate

All examples implement the same functionality:
- Infinite scrolling photo gallery using Unsplash API
- Loading state management
- Error handling
- Configurable scroll thresholds
- Intersection Observer API usage

## 🚀 Quick Start

From the root of the monorepo:

1. Install dependencies:
```bash
pnpm install
```

2. Build all packages:
```bash
pnpm build
```

3. Run any example:
```bash
cd examples/[platform]
pnpm dev
```

## 📝 Notes

- All examples use the same Unsplash API key for demonstration purposes
- The examples are configured to work with the workspace packages
- Each example is self-contained and can be used as a starting point for your own projects
