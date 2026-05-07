'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  subtitle?: string;
}

// ─── Brand constants ──────────────────────────────────────────────────────────
const GOLD_50 = 'rgba(200,169,110,0.50)';
const GOLD_45 = 'rgba(200,169,110,0.45)';

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP: Horizontal Accordion (hidden on mobile, visible on lg+)
// ─────────────────────────────────────────────────────────────────────────────
interface DesktopGalleryProps {
  items: GalleryItem[];
  location?: string;
  address?: string;
}

export function DesktopAccordionGallery({ items }: DesktopGalleryProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div
      style={{
        height: '420px',
        display: 'flex',
        gap: '8px',
        // GPU layer for the whole strip — prevents repaint on flex change
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    >
      {items.map((item, idx) => {
        const isActive = hoveredIdx === idx;
        const isInactive = hoveredIdx !== null && !isActive;

        return (
          <div
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              flex: hoveredIdx === null ? 1 : isActive ? 4 : 0.6,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '20px',
              cursor: 'pointer',
              flexShrink: 0,
              // ↓ Faster flex + shadow — was 0.55s, now 0.3s
              transition: 'flex 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.2s ease',
              boxShadow: isActive
                ? '0 12px 48px rgba(0,0,0,0.28)'
                : '0 4px 16px rgba(0,0,0,0.12)',
              willChange: 'flex',
            }}
          >
            {/* Image — eager load, GPU promoted */}
            <img
              src={item.src}
              alt={item.alt}
              loading="eager"
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                // ↓ Was 0.7s — now 0.3s
                transform: isActive ? 'scale(1.04) translateZ(0)' : 'scale(1) translateZ(0)',
                transition: 'transform 0.3s ease',
                willChange: 'transform',
              }}
            />

            {/* Persistent dark gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.15), transparent)',
                pointerEvents: 'none',
              }}
            />

            {/* Brand-tinted gradient — ↓ was 0.4s, now 0.18s */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to top, ${GOLD_50}, transparent)`,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.18s ease',
                pointerEvents: 'none',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE: Vertical Accordion (visible on mobile, hidden on lg+)
// ─────────────────────────────────────────────────────────────────────────────
interface MobileGalleryProps {
  items: GalleryItem[];
}

export function MobileAccordionGallery({ items }: MobileGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHeight, setActiveHeight] = useState(210);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const calc = () => setActiveHeight((el.offsetWidth * 9) / 16);
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIdx(idx);
    }
  }, []);

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((item, idx) => {
        const isActive = activeIdx === idx;

        return (
          <div
            key={idx}
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            aria-label={`View ${item.caption}`}
            onClick={() => setActiveIdx(idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '18px',
              cursor: 'pointer',
              height: isActive ? `${activeHeight}px` : '90px',
              // ↓ Was 0.52s height + 0.4s shadow — now 0.3s + 0.2s
              transition: 'height 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.2s ease',
              boxShadow: isActive
                ? '0 12px 40px rgba(0,0,0,0.25)'
                : '0 2px 10px rgba(0,0,0,0.10)',
              outline: 'none',
              flexShrink: 0,
              willChange: 'height',
            }}
          >
            {/* Image — eager load */}
            <img
              src={item.src}
              alt={item.alt}
              loading="eager"
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                // ↓ Was 0.6s — now 0.3s
                transform: isActive ? 'scale(1.04) translateZ(0)' : 'scale(1) translateZ(0)',
                transition: 'transform 0.3s ease',
                willChange: 'transform',
              }}
            />

            {/* Persistent dark gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.10), transparent)',
                pointerEvents: 'none',
              }}
            />

            {/* Brand-tinted gradient — ↓ was 0.4s, now 0.18s */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to top, ${GOLD_45}, transparent)`,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.18s ease',
                pointerEvents: 'none',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
