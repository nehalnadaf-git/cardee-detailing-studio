'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  subtitle?: string;
}

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const GOLD     = '#C8A96E';
const GOLD_DIM = 'rgba(200,169,110,0.18)';

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP — Horizontal Accordion
// Each panel transitions via CSS `flex` driven by React state.
// All heavy lifting (scale, opacity) is on GPU-promoted layers.
// ─────────────────────────────────────────────────────────────────────────────
export function DesktopAccordionGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      style={{
        height: '460px',
        display: 'flex',
        gap: '10px',
        // Prevents the flex container itself from triggering layout shifts
        contain: 'layout style',
      }}
    >
      {items.map((item, idx) => {
        const isActive   = active === idx;
        const isInactive = active !== null && !isActive;

        return (
          <div
            key={idx}
            onMouseEnter={() => setActive(idx)}
            onMouseLeave={() => setActive(null)}
            style={{
              // Flex-based expand — GPU doesn't composite flex changes, but
              // CSS transitions on flex-grow are cheap for small N panels.
              flex: active === null ? 1 : isActive ? 4.5 : 0.55,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '18px',
              cursor: 'pointer',
              // Single compound transition — avoids reflow stutter
              transition:
                'flex 0.42s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s ease',
              boxShadow: isActive
                ? `0 16px 56px rgba(0,0,0,0.5), 0 0 0 1.5px ${GOLD}`
                : isInactive
                  ? '0 2px 12px rgba(0,0,0,0.18)'
                  : '0 6px 20px rgba(0,0,0,0.22)',
              // Promote panel to its own compositing layer
              willChange: 'flex',
              transform: 'translateZ(0)',
            }}
          >
            {/* ── Image ── */}
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
                transform: isActive
                  ? 'scale(1.06) translateZ(0)'
                  : isInactive
                    ? 'scale(0.98) translateZ(0)'
                    : 'scale(1) translateZ(0)',
                transition: 'transform 0.42s cubic-bezier(0.4,0,0.2,1)',
                willChange: 'transform',
              }}
            />

            {/* ── Persistent scrim ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* ── Gold tint overlay ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to top, rgba(200,169,110,0.45), transparent 60%)`,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.28s ease',
                pointerEvents: 'none',
              }}
            />

            {/* ── Dim inactive tint ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.32)',
                opacity: isInactive ? 1 : 0,
                transition: 'opacity 0.28s ease',
                pointerEvents: 'none',
              }}
            />

            {/* ── Caption (only visible when active) ── */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px 18px',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.28s ease, transform 0.28s cubic-bezier(0.4,0,0.2,1)',
                pointerEvents: 'none',
              }}
            >
              {/* Index */}
              <p
                style={{
                  margin: '0 0 4px',
                  fontSize: '10px',
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.12em',
                  color: GOLD,
                  textTransform: 'uppercase',
                }}
              >
                [{String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}]
              </p>
              <p
                style={{
                  margin: '0 0 2px',
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

            {/* ── Collapsed label (shown when inactive) ── */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                opacity: active === null ? 0.6 : isInactive ? 0.5 : 0,
                transition: 'opacity 0.22s ease',
                pointerEvents: 'none',
              }}
            >
              <span
                style={{
                  fontSize: '9px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: GOLD,
                  letterSpacing: '0.1em',
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
// MOBILE — Vertical Accordion with auto-cycle
// ─────────────────────────────────────────────────────────────────────────────
const COLLAPSED_H  = 72;   // px — collapsed panel height
const AUTO_CYCLE_MS = 3200; // ms between auto-advance

export function MobileAccordionGallery({ items }: { items: GalleryItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedH, setExpandedH]  = useState(220);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef   = useRef(false);

  // Responsive expanded height = container width * (9/16)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const calc = () => setExpandedH(Math.round((el.offsetWidth * 9) / 16));
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Auto-cycle
  const scheduleNext = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!pausedRef.current) {
        setActiveIdx(i => (i + 1) % items.length);
      }
      scheduleNext();
    }, AUTO_CYCLE_MS);
  }, [items.length]);

  useEffect(() => {
    scheduleNext();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [scheduleNext]);

  const handleTap = (idx: number) => {
    pausedRef.current = true; // pause auto-cycle on user interaction
    setActiveIdx(idx);
    // Resume after 8s
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      pausedRef.current = false;
      scheduleNext();
    }, 8000);
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTap(idx);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
    >
      {/* Progress dots */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          marginBottom: '4px',
        }}
      >
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => handleTap(i)}
            aria-label={`Go to photo ${i + 1}`}
            style={{
              width: activeIdx === i ? '22px' : '6px',
              height: '6px',
              borderRadius: '9999px',
              background: activeIdx === i ? GOLD : 'rgba(255,255,255,0.2)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), background 0.2s ease',
            }}
          />
        ))}
      </div>

      {items.map((item, idx) => {
        const isActive = activeIdx === idx;

        return (
          <div
            key={idx}
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            aria-label={`View ${item.caption}`}
            onClick={() => handleTap(idx)}
            onKeyDown={e => handleKeyDown(e, idx)}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '16px',
              cursor: 'pointer',
              height: isActive ? `${expandedH}px` : `${COLLAPSED_H}px`,
              transition:
                'height 0.42s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s ease',
              boxShadow: isActive
                ? `0 12px 40px rgba(0,0,0,0.45), 0 0 0 1.5px ${GOLD}`
                : '0 2px 10px rgba(0,0,0,0.15)',
              outline: 'none',
              willChange: 'height',
            }}
          >
            {/* ── Image ── */}
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
                transform: isActive ? 'scale(1.05) translateZ(0)' : 'scale(1) translateZ(0)',
                transition: 'transform 0.42s cubic-bezier(0.4,0,0.2,1)',
                willChange: 'transform',
              }}
            />

            {/* ── Persistent scrim ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.82) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* ── Gold tint (active) ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to top, rgba(200,169,110,0.4), transparent 55%)`,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.28s ease',
                pointerEvents: 'none',
              }}
            />

            {/* ── Collapsed row (brand + index pill) ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                opacity: isActive ? 0 : 1,
                transition: 'opacity 0.18s ease',
                pointerEvents: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Gold line accent */}
                <div style={{ width: '3px', height: '28px', background: GOLD, borderRadius: '2px', flexShrink: 0 }} />
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
              {/* Index pill */}
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: GOLD,
                  background: GOLD_DIM,
                  padding: '3px 8px',
                  borderRadius: '999px',
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
                padding: '18px 16px',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                transition:
                  'opacity 0.28s ease 0.1s, transform 0.28s cubic-bezier(0.4,0,0.2,1) 0.1s',
                pointerEvents: 'none',
              }}
            >
              <p
                style={{
                  margin: '0 0 3px',
                  fontSize: '9px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: GOLD,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                [{String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}]
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: '17px',
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
  );
}
