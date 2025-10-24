import { useState } from 'react';
import { useInfiniteScroll } from '@lionforge/react-scroll-infinite';

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

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);

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
      setPhotos((prev) => [...prev, ...newPhotos]);
    },
    onError: (error) => {
      console.error('Error:', error);
      alert('Failed to load more photos. Please try again.');
    },
    threshold: 1000,
    useIntersectionObserver: true,
    rootMargin: '200px',
  });

  return (
    <div>
      <h1>LionForge ScrollInfinite - React Example</h1>
      <p className="description">Scroll down to load more images from Unsplash</p>

      {isLoading && (
        <div className="loader">
          <img src="/infinity-loader.svg" alt="Loading" />
        </div>
      )}

      <div ref={containerRef as React.RefObject<HTMLDivElement>} className="image-container">
        {photos.map((photo) => (
          <a key={photo.id} href={photo.links.html} target="_blank" rel="noopener noreferrer">
            <img
              src={photo.urls.regular}
              alt={photo.alt_description || 'Unsplash photo'}
              title={photo.alt_description || 'Unsplash photo'}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
