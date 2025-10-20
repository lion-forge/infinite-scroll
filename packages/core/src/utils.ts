/**
 * Debounce function to limit how often a function can be called
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if element is window
 */
export function isWindow(element: any): element is Window {
  return element === window || element instanceof Window;
}

/**
 * Get scroll position for an element
 */
export function getScrollPosition(
  element: HTMLElement | Window,
  direction: 'vertical' | 'horizontal'
): number {
  if (isWindow(element)) {
    return direction === 'vertical' ? window.scrollY : window.scrollX;
  }
  return direction === 'vertical' ? element.scrollTop : element.scrollLeft;
}

/**
 * Get scroll height/width for an element
 */
export function getScrollSize(
  element: HTMLElement | Window,
  direction: 'vertical' | 'horizontal'
): number {
  if (isWindow(element)) {
    return direction === 'vertical'
      ? document.documentElement.scrollHeight
      : document.documentElement.scrollWidth;
  }
  return direction === 'vertical' ? element.scrollHeight : element.scrollWidth;
}

/**
 * Get client height/width for an element
 */
export function getClientSize(
  element: HTMLElement | Window,
  direction: 'vertical' | 'horizontal'
): number {
  if (isWindow(element)) {
    return direction === 'vertical' ? window.innerHeight : window.innerWidth;
  }
  return direction === 'vertical' ? element.clientHeight : element.clientWidth;
}

/**
 * Check if user has scrolled near the end
 */
export function isNearEnd(
  element: HTMLElement | Window,
  threshold: number,
  direction: 'vertical' | 'horizontal'
): boolean {
  const scrollPosition = getScrollPosition(element, direction);
  const scrollSize = getScrollSize(element, direction);
  const clientSize = getClientSize(element, direction);

  return scrollPosition + clientSize >= scrollSize - threshold;
}
