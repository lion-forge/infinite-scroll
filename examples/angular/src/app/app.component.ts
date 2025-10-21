import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollInfinite, LoadingState } from '@lionforge/scroll-infinite';

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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') containerElement!: ElementRef<HTMLDivElement>;

  photos: Photo[] = [];
  loading = false;

  private readonly API_KEY = '3KAwY1OxMCAukRvmax3oA2zN6z2SV8R9moYTmwq3N3Y';
  private readonly COUNT = 30;
  private scrollInfinite: ScrollInfinite | null = null;

  ngAfterViewInit() {
    this.initializeScrollInfinite();
  }

  ngOnDestroy() {
    this.scrollInfinite?.destroy();
  }

  private initializeScrollInfinite() {
    this.scrollInfinite = new ScrollInfinite(
      {
        container: this.containerElement.nativeElement,
        threshold: 1000,
        useIntersectionObserver: true,
        rootMargin: '200px',
      },
      {
        onLoadMore: () => this.loadMore(),
        onStateChange: (state) => this.onStateChange(state),
        onError: (error) => this.onError(error),
      }
    );

    this.scrollInfinite.observe();
  }

  async loadMore() {
    console.log('Loading more photos...');
    try {
      const apiUrl = `https://api.unsplash.com/photos/random?client_id=${this.API_KEY}&count=${this.COUNT}`;
      const response = await fetch(apiUrl);
      const newPhotos = await response.json();
      this.photos = [...this.photos, ...newPhotos];
    } catch (error) {
      console.error('Error fetching photos:', error);
      alert('Failed to load more photos. Please try again.');
    }
  }

  onStateChange(state: LoadingState) {
    console.log('State changed:', state);
    this.loading = state === 'loading';
  }

  onError(error: Error) {
    console.error('Error:', error);
    alert('Failed to load more photos. Please try again.');
  }
}
