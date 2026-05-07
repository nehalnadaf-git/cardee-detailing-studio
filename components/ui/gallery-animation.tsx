'use client';

// ─── WHY NO FRAMER MOTION HERE ────────────────────────────────────────────────
// Framer Motion animates `flex` and `height` via JavaScript on every RAF tick,
// which forces a full browser layout (reflow) on every frame → jank.
// CSS transitions for layout properties (flex, height) are handled by the
// browser's layout engine natively — far cheaper and always 60fps.
// Opacity and transform (scale) are GPU-composited and also done via CSS.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  subtitle?: string;
}

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const GOLD     = '#C8A96E';
const GOLD_DIM = 'rgba(200,169,110,0.15)';

// Shared easing — matches Material Motion standard curve
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP — CSS-transition horizontal accordion (lg+)
// flex transition is done entirely in CSS — zero JS per frame.
// ─────────────────────────────────────────────────────────────────────────────
export function DesktopAccordionGallery({ items }: { items: GalleryItem[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        height: '460px',
        // Prevent the container from affecting surrounding layout during animation
        contain: 'layout style',
      }}
    >
      {items.map((item, idx) => {
        const isActive   = hovered === idx;
        const isInactive = hovered !== null && !isActive;
        const flexVal    = hovered === null ? 1 : isActive ? 3.5 : 0.55;

        return (
          <div
            key={idx}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            style={{
              // ↓ Single CSS transition — browser handles it natively, no JS per frame
              flex: flexVal,
              transition: `flex 0.5s ${EASE}, box-shadow 0.3s ease`,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '18px',
              cursor: 'default',
              flexShrink: 0,
              // promote to own compositing layer so flex animation doesn't
              // repaint adjacent panels
              willChange: 'flex',
              boxShadow: isActive
                ? `0 20px 60px rgba(0,0,0,0.55), 0 0 0 1.5px ${GOLD}`
                : '0 4px 20px rgba(0,0,0,0.25)',
            }}
          >
            {/* ── Image (Next.js for auto-optimisation + WebP) ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                // CSS transform is GPU-composited — no reflow
                transform: isActive
                  ? 'scale(1.07) translateZ(0)'
                  : isInactive
                    ? 'scale(0.97) translateZ(0)'
                    : 'scale(1) translateZ(0)',
                transition: `transform 0.5s ${EASE}`,
                willChange: 'transform',
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 1280px) 25vw, 320px"
                style={{ objectFit: 'cover' }}
                priority={idx < 3}
              />
            </div>

            {/* ── Persistent dark scrim ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.88) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* ── Gold tint (active) — opacity is GPU-composited ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(200,169,110,0.42), transparent 58%)',
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none',
              }}
            />

            {/* ── Inactive dim overlay ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.35)',
                opacity: isInactive ? 1 : 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none',
              }}
            />

            {/* ── Expanded caption ── */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px 18px',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.3s ease, transform 0.3s ${EASE}`,
                pointerEvents: 'none',
              }}
            >
              <p
                style={{
                  margin: '0 0 5px',
                  fontSize: '10px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: GOLD,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                [{String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}]
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: '15px',
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  color: '#fff',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}
              >
                CarDee Detailing Studio
              </p>
            </div>

            {/* ── Collapsed vertical label ── */}
            <div
              style={{
                position: 'absolute',
                bottom: 18,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                opacity: hovered === null ? 0.55 : isInactive ? 0.45 : 0,
                transition: 'opacity 0.25s ease',
                pointerEvents: 'none',
              }}
            >
              <span
                style={{
                  fontSize: '9px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: GOLD,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                }}
              >
                CarDee
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE — CSS-transition vertical accordion with auto-cycle
// height transition done entirely in CSS — no JS per frame.
// ─────────────────────────────────────────────────────────────────────────────
const COLLAPSED_H   = 72;   // px
const EXPANDED_H    = 240;  // px
const AUTO_CYCLE_MS = 3400; // ms

export function MobileAccordionGallery({ items }: { items: GalleryItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused]       = useState(false);

  // Auto-cycle — simple timeout, resets on each change
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(
      () => setActiveIdx(i => (i + 1) % items.length),
      AUTO_CYCLE_MS,
    );
    return () => clearTimeout(t);
  }, [activeIdx, paused, items.length]);

  const handleTap = (idx: number) => {
    setPaused(true);
    setActiveIdx(idx);
    // Resume auto-cycle after 8 s of inactivity
    setTimeout(() => setPaused(false), 8000);
  };

  return (
    <>
      {/* ── Progress dots ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          marginBottom: '12px',
        }}
      >
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => handleTap(i)}
            aria-label={`Photo ${i + 1}`}
            style={{
              // Width transition via CSS — GPU-friendly
              width: activeIdx === i ? 22 : 6,
              height: 6,
              borderRadius: 9999,
              background: activeIdx === i ? GOLD : 'rgba(255,255,255,0.18)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              flexShrink: 0,
              transition: `width 0.35s ${EASE}, background 0.25s ease`,
            }}
          />
        ))}
      </div>

      {/* ── Panels ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item, idx) => {
          const isActive = activeIdx === idx;

          return (
            <div
              key={idx}
              onClick={() => handleTap(idx)}
              style={{
                // ↓ height transition in CSS — zero JS per frame
                height: isActive ? EXPANDED_H : COLLAPSED_H,
                transition: `height 0.45s ${EASE}, box-shadow 0.3s ease`,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                cursor: 'pointer',
                flexShrink: 0,
                willChange: 'height',
                boxShadow: isActive
                  ? `0 14px 44px rgba(0,0,0,0.5), 0 0 0 1.5px ${GOLD}`
                  : '0 2px 12px rgba(0,0,0,0.18)',
              }}
            >
              {/* ── Image ── */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: isActive ? 'scale(1.06) translateZ(0)' : 'scale(1) translateZ(0)',
                  transition: `transform 0.45s ${EASE}`,
                  willChange: 'transform',
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  priority={idx === 0}
                />
              </div>

              {/* ── Scrim ── */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* ── Gold tint ── */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(200,169,110,0.38), transparent 55%)',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }}
              />

              {/* ── Collapsed row ── */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 16px',
                  opacity: isActive ? 0 : 1,
                  transition: 'opacity 0.2s ease',
                  pointerEvents: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: 3,
                      height: 28,
                      background: GOLD,
                      borderRadius: 2,
                      flexShrink: 0,
                    }}
                  />
                  <p
                    style={{
                      margin: 0,
                      fontSize: '13px',
                      fontWeight: 600,
                      fontFamily: 'Inter, sans-serif',
                      color: '#fff',
                      lineHeight: 1.2,
                    }}
                  >
                    CarDee Detailing Studio
                  </p>
                </div>
                <span
                  style={{
                    fontSize: '10px',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: GOLD,
                    background: GOLD_DIM,
                    padding: '3px 8px',
                    borderRadius: 999,
                    letterSpacing: '0.06em',
                    flexShrink: 0,
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* ── Expanded caption ── */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                  transition: `opacity 0.3s ease ${isActive ? '0.1s' : '0s'}, transform 0.3s ${EASE} ${isActive ? '0.1s' : '0s'}`,
                  pointerEvents: 'none',
                }}
              >
                <p
                  style={{
                    margin: '0 0 3px',
                    fontSize: '9px',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: GOLD,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  [{String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}]
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    color: '#fff',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                  }}
                >
                  CarDee Detailing Studio
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
