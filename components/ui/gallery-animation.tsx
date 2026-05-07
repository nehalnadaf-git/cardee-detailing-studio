'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP — Framer Motion horizontal accordion
// ─────────────────────────────────────────────────────────────────────────────
export function DesktopAccordionGallery({ items }: { items: GalleryItem[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const getFlex = (idx: number) => {
    if (hovered === null) return 1;
    return hovered === idx ? 3.5 : 0.55;
  };

  return (
    <div style={{ display: 'flex', gap: '10px', height: '460px' }}>
      {items.map((item, idx) => {
        const isActive   = hovered === idx;
        const isInactive = hovered !== null && !isActive;

        return (
          <motion.div
            key={idx}
            animate={{ flex: getFlex(idx) }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '18px',
              cursor: 'default',
              flexShrink: 0,
              boxShadow: isActive
                ? `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1.5px ${GOLD}`
                : '0 4px 20px rgba(0,0,0,0.25)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {/* Image */}
            <motion.img
              src={item.src}
              alt={item.alt}
              loading="eager"
              decoding="async"
              animate={{ scale: isActive ? 1.07 : isInactive ? 0.97 : 1 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                willChange: 'transform',
              }}
            />

            {/* Persistent dark scrim */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.88) 100%)',
              pointerEvents: 'none',
            }} />

            {/* Gold tint — active */}
            <motion.div
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to top, rgba(200,169,110,0.42), transparent 58%)`,
                pointerEvents: 'none',
              }}
            />

            {/* Inactive dim */}
            <motion.div
              animate={{ opacity: isInactive ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.35)',
                pointerEvents: 'none',
              }}
            />

            {/* Expanded caption */}
            <motion.div
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px 18px',
                pointerEvents: 'none',
              }}
            >
              <p style={{
                margin: '0 0 5px',
                fontSize: '10px',
                fontFamily: 'JetBrains Mono, monospace',
                color: GOLD,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}>
                [{String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}]
              </p>
              <p style={{
                margin: 0,
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                color: '#fff',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}>
                CarDee Detailing Studio
              </p>
            </motion.div>

            {/* Collapsed vertical label */}
            <motion.div
              animate={{ opacity: hovered === null ? 0.55 : isInactive ? 0.45 : 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute',
                bottom: 18,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <span style={{
                fontSize: '9px',
                fontFamily: 'JetBrains Mono, monospace',
                color: GOLD,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}>
                CarDee
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE — Tap-to-expand vertical accordion with auto-cycle
// ─────────────────────────────────────────────────────────────────────────────
const COLLAPSED_H   = 72;
const AUTO_CYCLE_MS = 3400;

export function MobileAccordionGallery({ items }: { items: GalleryItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused]       = useState(false);

  // Auto-cycle
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActiveIdx(i => (i + 1) % items.length), AUTO_CYCLE_MS);
    return () => clearTimeout(t);
  }, [activeIdx, paused, items.length]);

  const handleTap = (idx: number) => {
    setPaused(true);
    setActiveIdx(idx);
    setTimeout(() => setPaused(false), 8000);
  };

  return (
    <>
      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '12px' }}>
        {items.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => handleTap(i)}
            aria-label={`Photo ${i + 1}`}
            animate={{ width: activeIdx === i ? 22 : 6 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{
              height: 6,
              borderRadius: 9999,
              background: activeIdx === i ? GOLD : 'rgba(255,255,255,0.18)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item, idx) => {
          const isActive = activeIdx === idx;

          return (
            <motion.div
              key={idx}
              onClick={() => handleTap(idx)}
              animate={{ height: isActive ? 240 : COLLAPSED_H }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                cursor: 'pointer',
                boxShadow: isActive
                  ? `0 14px 44px rgba(0,0,0,0.5), 0 0 0 1.5px ${GOLD}`
                  : '0 2px 12px rgba(0,0,0,0.18)',
                transition: 'box-shadow 0.3s ease',
                flexShrink: 0,
              }}
            >
              {/* Image */}
              <motion.img
                src={item.src}
                alt={item.alt}
                loading="eager"
                decoding="async"
                animate={{ scale: isActive ? 1.06 : 1 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  willChange: 'transform',
                }}
              />

              {/* Scrim */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 100%)',
                pointerEvents: 'none',
              }} />

              {/* Gold tint */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(200,169,110,0.38), transparent 55%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Collapsed row */}
              <motion.div
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 16px',
                  pointerEvents: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: 3, height: 28, background: GOLD, borderRadius: 2, flexShrink: 0 }} />
                  <p style={{
                    margin: 0,
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    color: '#fff',
                    lineHeight: 1.2,
                  }}>
                    CarDee Detailing Studio
                  </p>
                </div>
                <span style={{
                  fontSize: '10px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: GOLD,
                  background: GOLD_DIM,
                  padding: '3px 8px',
                  borderRadius: 999,
                  letterSpacing: '0.06em',
                  flexShrink: 0,
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </motion.div>

              {/* Expanded caption */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: isActive ? 0.1 : 0 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px',
                  pointerEvents: 'none',
                }}
              >
                <p style={{
                  margin: '0 0 3px',
                  fontSize: '9px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: GOLD,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}>
                  [{String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}]
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  color: '#fff',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}>
                  CarDee Detailing Studio
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
