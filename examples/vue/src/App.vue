<template>
  <div>
    <h1>LionForge ScrollInfinite - Vue Example</h1>
    <p class="description">Scroll down to load more images from Unsplash</p>

    <div v-if="isLoading" class="loader">
      <img src="/infinity-loader.svg" alt="Loading" />
    </div>

    <div ref="containerRef" class="image-container">
      <a
        v-for="photo in photos"
        :key="photo.id"
        :href="photo.links.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          :src="photo.urls.regular"
          :alt="photo.alt_description || 'Unsplash photo'"
          :title="photo.alt_description || 'Unsplash photo'"
        />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useInfiniteScroll } from '@lionforge/vue-scroll-infinite';

interface Photo {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string | null;
  links: {
    html: string;
  };
}

const API_KEY = '3KAwY1OxMCAukRvmax3oA2zN6z2SV8R9moYTmwq3N3Y';
const COUNT = 30;

const photos = ref<Photo[]>([]);

const fetchPhotos = async () => {
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${COUNT}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

const { containerRef, isLoading } = useInfiniteScroll({
  onLoadMore: async () => {
    console.log('Loading more photos...');
    const newPhotos = await fetchPhotos();
    photos.value = [...photos.value, ...newPhotos];
  },
  onError: (error) => {
    console.error('Error:', error);
    alert('Failed to load more photos. Please try again.');
  },
  threshold: 1000,
  useIntersectionObserver: true,
  rootMargin: '200px',
});
</script>
