import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    };

    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`;
    el.style.willChange = 'opacity, transform';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.unobserve(el);
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);

    const fallback = setTimeout(show, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [delay]);

  return ref;
}

export function useStaggerReveal(count: number, baseDelay = 0, step = 80) {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((el, i) => {
      if (!el) return;

      const d = baseDelay + i * step;
      const show = () => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      };

      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.6s ease-out ${d}ms, transform 0.6s ease-out ${d}ms`;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            show();
            obs.unobserve(el);
          }
        },
        { threshold: 0.01, rootMargin: '0px 0px -20px 0px' }
      );

      obs.observe(el);
      const fallback = setTimeout(show, 2000 + d);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [count, baseDelay, step]);

  return (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };
}
