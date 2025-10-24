<script lang="ts">
  import { infiniteScroll } from '@lionforge/svelte-scroll-infinite';

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

  let photos: Photo[] = [];
  let loading = false;

  async function fetchPhotos(): Promise<Photo[]> {
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${COUNT}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }

  async function loadMore() {
    console.log('Loading more photos...');
    loading = true;
    try {
      const newPhotos = await fetchPhotos();
      photos = [...photos, ...newPhotos];
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load more photos. Please try again.');
    } finally {
      loading = false;
    }
  }

  function handleStateChange(state: string) {
    console.log('State changed:', state);
    loading = state === 'loading';
  }

  function handleError(error: Error) {
    console.error('Error:', error);
    alert('Failed to load more photos. Please try again.');
  }
</script>

<div>
  <h1>LionForge ScrollInfinite - Svelte Example</h1>
  <p class="description">Scroll down to load more images from Unsplash</p>

  {#if loading}
    <div class="loader">
      <img src="/infinity-loader.svg" alt="Loading" />
    </div>
  {/if}

  <div
    use:infiniteScroll={{
      onLoadMore: loadMore,
      onStateChange: handleStateChange,
      onError: handleError,
      threshold: 1000,
      useIntersectionObserver: true,
      rootMargin: '200px',
    }}
    class="image-container"
  >
    {#each photos as photo (photo.id)}
      <a href={photo.links.html} target="_blank" rel="noopener noreferrer">
        <img
          src={photo.urls.regular}
          alt={photo.alt_description || 'Unsplash photo'}
          title={photo.alt_description || 'Unsplash photo'}
        />
      </a>
    {/each}
  </div>
</div>
