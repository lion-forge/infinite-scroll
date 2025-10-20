import { ScrollInfinite } from '../../packages/core/dist/index.mjs';

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const count = 30;
const apiKey = "3KAwY1OxMCAukRvmax3oA2zN6z2SV8R9moYTmwq3N3Y";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Helper function to set attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Display photos in the container
function displayPhotos(photos) {
  photos.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description || 'Unsplash photo',
      title: photo.alt_description || 'Unsplash photo',
    });

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Fetch photos from Unsplash API
async function fetchPhotos() {
  try {
    const response = await fetch(apiUrl);
    const photos = await response.json();
    return photos;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
}

// Initialize ScrollInfinite
const scrollInfinite = new ScrollInfinite(
  {
    threshold: 1000,
    direction: 'vertical',
    useIntersectionObserver: true,
    rootMargin: '200px',
  },
  {
    onLoadMore: async () => {
      console.log('Loading more photos...');
      const photos = await fetchPhotos();
      displayPhotos(photos);
    },
    onStateChange: (state) => {
      console.log('State changed:', state);
      loader.hidden = state !== 'loading';
    },
    onError: (error) => {
      console.error('Error:', error);
      alert('Failed to load more photos. Please try again.');
    },
  }
);

// Start observing
scrollInfinite.observe();

// Load initial photos
(async () => {
  scrollInfinite.setState('loading');
  const photos = await fetchPhotos();
  displayPhotos(photos);
  scrollInfinite.setState('loaded');
})();
