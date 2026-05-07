'use client';

import { useEffect, useRef, useCallback } from 'react';

export type AnimationVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale-up'
  | 'blur-in'
  | 'clip-up'
  | 'none';

interface ScrollAnimationOptions {
  /** How much of the element must be visible before triggering (0–1). Default 0.12 */
  threshold?: number;
  /** Extra root margin offset — e.g. "-60px" to trigger earlier. Default "-40px" on bottom */
  rootMargin?: string;
  /** Only fire once (don't re-animate on scroll-back). Default true */
  once?: boolean;
}

/**
 * Attach [data-animate] attributes to DOM elements and call
 * `initScrollAnimations()` once per section.
 *
 * Elements are wired via CSS classes:
 *   data-animate="fade-up"          — fade + slide up
 *   data-animate="fade-left"        — fade + slide from left
 *   data-animate="fade-right"       — fade + slide from right
 *   data-animate="scale-up"         — fade + scale from 0.92
 *   data-animate="blur-in"          — fade + blur(8px)
 *   data-animate="clip-up"          — clip-path reveal upward
 *   data-animate-delay="150"        — delay in ms
 *   data-animate-duration="700"     — duration in ms (default 650)
 *
 * When visible, the class `is-animated` is added. CSS handles the rest.
 */
export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.12, rootMargin = '0px 0px -40px 0px', once = true } = options;
  const sectionRef = useRef<HTMLElement>(null);

  const observe = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Immediately reveal everything for reduced-motion users
    if (prefersReduced) {
      section.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => {
        el.classList.add('is-animated');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('is-animated');
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.classList.remove('is-animated');
          }
        });
      },
      { threshold, rootMargin }
    );

    // Wire up each animated child
    section.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => {
      const delay = el.dataset.animateDelay ?? '0';
      const duration = el.dataset.animateDuration ?? '650';
      el.style.setProperty('--anim-delay', `${delay}ms`);
      el.style.setProperty('--anim-duration', `${duration}ms`);
      el.classList.add('pre-animate');

      // Fire immediately if already in viewport on mount
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-animated');
        return;
      }

      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  useEffect(() => {
    const cleanup = observe();
    return cleanup;
  }, [observe]);

  return sectionRef;
}
