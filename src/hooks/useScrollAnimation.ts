import { useEffect, useRef } from 'react';

/**
 * Hook that applies a stagger "visible" class to children when the container
 * enters the viewport.
 */
export function useScrollAnimation(delay = 0) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = el.querySelectorAll<HTMLElement>('.fade-in-up, .fade-in-left');
          children.forEach((child, i) => {
            setTimeout(() => {
              child.classList.add('visible');
            }, delay + i * 80);
          });
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

/**
 * Hook that applies .visible class to any element with animation classes
 * inside a container when it enters viewport.
 */
export function useStaggerAnimation(staggerMs = 80) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll<HTMLElement>('[data-anim]');
          items.forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'none';
            }, i * staggerMs);
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [staggerMs]);

  return ref;
}
