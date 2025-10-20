# 🦁⚒️ LionForge

> Forge powerful applications with confidence

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**LionForge** is a collection of powerful, framework-agnostic libraries for building modern web applications. Crafted with strength and precision, each tool in the LionForge ecosystem is designed to work seamlessly across React, Vue, Angular, Svelte, and vanilla JavaScript.

---

## 🌟 Philosophy

LionForge tools embody three core principles:

1. **🦁 Strength** - Robust, battle-tested solutions for real-world challenges
2. **⚒️ Craftsmanship** - Meticulously designed APIs and developer experience
3. **🌍 Universal** - Framework-agnostic core with first-class framework adapters

---

## 📦 Current Libraries

### Infinite Scroll

Universal infinite scroll library with support for all modern frameworks.

```bash
# Core library (vanilla JS/TypeScript)
npm install @lionforge/scroll-infinite

# Framework-specific packages
npm install @lionforge/react-scroll-infinite
npm install @lionforge/vue-scroll-infinite
npm install @lionforge/angular-scroll-infinite
npm install @lionforge/svelte-scroll-infinite
```

**Features:**
- ✅ Intersection Observer API with scroll event fallback
- ✅ Configurable thresholds and directions
- ✅ Loading state management
- ✅ TypeScript support with full type definitions
- ✅ Tree-shakeable builds (ESM & CJS)

**Quick Start:**

```tsx
// React
import { useInfiniteScroll } from '@lionforge/react-scroll-infinite';

function MyComponent() {
  const { containerRef, isLoading } = useInfiniteScroll({
    onLoadMore: async () => {
      await fetchMoreItems();
    },
  });

  return <div ref={containerRef}>...</div>;
}
```

---

## 🚀 Coming Soon

The LionForge ecosystem is growing! Here's what's being forged:

- **🗂️ Table** - Powerful data tables and grids
- **🪝 Hooks** - Collection of useful React hooks
- **🎨 Vue Hooks** - Vue 3 composables collection
- **📱 Virtual** - Virtual scrolling for large lists
- **📝 Forms** - Form utilities and validation
- **⚡ State** - State management utilities
- **🎯 Core** - Shared utilities across all packages

---

## 🎯 Why LionForge?

### Universal by Design
Every LionForge library starts with a framework-agnostic core, then adds thin, idiomatic wrappers for each framework. Use the same powerful tool regardless of your stack.

### TypeScript First
Built with TypeScript from the ground up, providing excellent intellisense and type safety.

### Developer Experience
Clean, intuitive APIs that feel natural in each framework while maintaining consistency across the ecosystem.

### Battle-Tested
Production-ready tools that solve real problems, not just experiments.

---

## 📖 Documentation

- [Infinite Scroll](./packages/core/README.md) - Documentation for infinite scroll library
- Framework guides available in each package directory

---

## 🤝 Contributing

LionForge is an open ecosystem! Contributions are welcome.

---

## 📄 License

All LionForge packages are MIT licensed.

---

## 🔗 Links

- [GitHub Organization](https://github.com/UmutKorkmaz/js-infinity-scroll)
- [npm Organization](https://www.npmjs.com/org/lionforge)
- [Issues](https://github.com/UmutKorkmaz/js-infinity-scroll/issues)

---

## 📦 All Packages

- [@lionforge/scroll-infinite](https://www.npmjs.com/package/@lionforge/scroll-infinite) - Core infinite scroll library
- [@lionforge/react-scroll-infinite](https://www.npmjs.com/package/@lionforge/react-scroll-infinite) - React hooks for infinite scroll
- [@lionforge/vue-scroll-infinite](https://www.npmjs.com/package/@lionforge/vue-scroll-infinite) - Vue composables for infinite scroll
- [@lionforge/angular-scroll-infinite](https://www.npmjs.com/package/@lionforge/angular-scroll-infinite) - Angular directives for infinite scroll
- [@lionforge/svelte-scroll-infinite](https://www.npmjs.com/package/@lionforge/svelte-scroll-infinite) - Svelte actions for infinite scroll

---

<div align="center">

**Forged with 🦁 and ⚒️ by [Umut Korkmaz](https://github.com/UmutKorkmaz)**

</div>
