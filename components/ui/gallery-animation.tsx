'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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
const DARK     = '#0A0A0A';

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX MODAL
// ─────────────────────────────────────────────────────────────────────────────
function Lightbox({
  items,
  startIndex,
  onClose,
}: {
  items: GalleryItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const total = items.length;

  const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIdx(i => (i + 1) % total), [total]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowLeft')   prev();
      if (e.key === 'ArrowRight')  next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.94)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        padding: '20px',
      }}
    >
      {/* Image container */}
      <motion.div
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', maxWidth: '900px', width: '100%', maxHeight: '90vh' }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={items[idx].src}
            alt={items[idx].alt}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: '16px',
              border: `1px solid rgba(200,169,110,0.25)`,
              display: 'block',
            }}
          />
        </AnimatePresence>

        {/* Gold corner accents */}
        {(['tl','tr','bl','br'] as const).map(corner => (
          <div
            key={corner}
            style={{
              position: 'absolute',
              width: '20px',
              height: '20px',
              borderColor: GOLD,
              borderStyle: 'solid',
              borderWidth: 0,
              ...(corner === 'tl' ? { top: 8, left: 8, borderTopWidth: 2, borderLeftWidth: 2, borderTopLeftRadius: 4 } : {}),
              ...(corner === 'tr' ? { top: 8, right: 8, borderTopWidth: 2, borderRightWidth: 2, borderTopRightRadius: 4 } : {}),
              ...(corner === 'bl' ? { bottom: 8, left: 8, borderBottomWidth: 2, borderLeftWidth: 2, borderBottomLeftRadius: 4 } : {}),
              ...(corner === 'br' ? { bottom: 8, right: 8, borderBottomWidth: 2, borderRightWidth: 2, borderBottomRightRadius: 4 } : {}),
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Bottom brand label */}
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          border: `1px solid rgba(200,169,110,0.2)`,
          borderRadius: '999px',
          padding: '6px 16px',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontSize: '10px',
            fontFamily: 'JetBrains Mono, monospace',
            color: GOLD,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}>
            CarDee Detailing Studio
          </span>
          <span style={{
            fontSize: '10px',
            fontFamily: 'JetBrains Mono, monospace',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.06em',
          }}>
            {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </motion.div>

      {/* Controls */}
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(255,255,255,0.06)',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.2s, background 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD;
          (e.currentTarget as HTMLButtonElement).style.color = GOLD;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)';
          (e.currentTarget as HTMLButtonElement).style.color = '#fff';
        }}
      >
        <X size={16} />
      </button>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); prev(); }}
        style={{
          position: 'fixed',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: `1px solid rgba(200,169,110,0.3)`,
          background: GOLD_DIM,
          color: GOLD,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s, border-color 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,169,110,0.28)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD_DIM; }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); next(); }}
        style={{
          position: 'fixed',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: `1px solid rgba(200,169,110,0.3)`,
          background: GOLD_DIM,
          color: GOLD,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,169,110,0.28)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD_DIM; }}
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP — Framer Motion horizontal accordion
// ─────────────────────────────────────────────────────────────────────────────
export function DesktopAccordionGallery({ items }: { items: GalleryItem[] }) {
  const [hovered, setHovered]     = useState<number | null>(null);
  const [lightbox, setLightbox]   = useState<number | null>(null);

  const getFlex = (idx: number) => {
    if (hovered === null) return 1;
    return hovered === idx ? 3.5 : 0.55;
  };

  return (
    <>
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
              onClick={() => setLightbox(idx)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '18px',
                cursor: 'pointer',
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            items={items}
            startIndex={lightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE — Tap-to-expand vertical accordion with auto-cycle
// ─────────────────────────────────────────────────────────────────────────────
const COLLAPSED_H   = 72;
const AUTO_CYCLE_MS = 3400;

export function MobileAccordionGallery({ items }: { items: GalleryItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox, setLightbox]   = useState<number | null>(null);
  const [paused, setPaused]       = useState(false);

  // Auto-cycle
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActiveIdx(i => (i + 1) % items.length), AUTO_CYCLE_MS);
    return () => clearTimeout(t);
  }, [activeIdx, paused, items.length]);

  const handleTap = (idx: number) => {
    if (activeIdx === idx) {
      setLightbox(idx);
      return;
    }
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
                <p style={{
                  margin: '4px 0 0',
                  fontSize: '11px',
                  fontFamily: 'Inter, sans-serif',
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.04em',
                }}>
                  Tap again to open →
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            items={items}
            startIndex={lightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
