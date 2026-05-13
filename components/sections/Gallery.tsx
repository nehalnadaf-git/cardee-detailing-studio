'use client';

import { Camera, MapPin } from 'lucide-react';
import {
  DesktopAccordionGallery,
  MobileAccordionGallery,
  type GalleryItem,
} from '@/components/ui/gallery-animation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// ─── Gallery Data ─────────────────────────────────────────────────────────────
const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: '/gallery/1.webp',
    alt: 'CarDee professional detailing work — exterior treatment',
    caption: 'Ceramic Coating',
    subtitle: 'Exterior Treatment',
  },
  {
    src: '/gallery/2.webp',
    alt: 'CarDee paint protection detailing',
    caption: 'Paint Protection',
    subtitle: 'PPF Installation',
  },
  {
    src: '/gallery/3.webp',
    alt: 'CarDee interior restoration detailing',
    caption: 'Interior Restoration',
    subtitle: 'Deep Cleaning',
  },
  {
    src: '/gallery/4.webp',
    alt: 'CarDee mirror-finish polishing',
    caption: 'Mirror-Finish Polish',
    subtitle: 'Paint Correction',
  },
  {
    src: '/gallery/5.webp',
    alt: 'CarDee full car detailing transformation',
    caption: 'Full Detail',
    subtitle: 'Complete Package',
  },
];

// ─── Main Gallery Section ─────────────────────────────────────────────────────
export default function Gallery() {
  const sectionRef = useScrollAnimation({ threshold: 0.05 });

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={{
        backgroundColor: '#0A0A0A',
        paddingTop: 'clamp(60px, 8vw, 100px)',
        paddingBottom: 'clamp(60px, 8vw, 100px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow behind gallery */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '340px',
          background:
            'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(200,169,110,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(20px, 5vw, 64px)',
          paddingRight: 'clamp(20px, 5vw, 64px)',
          position: 'relative',
        }}
      >
        {/* ── SECTION HEADER ────────────────────────────────────────────── */}
        <div
          data-animate="fade-up"
          data-animate-delay="0"
          data-animate-duration="700"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            marginBottom: '32px',
          }}
        >
          {/* Eyebrow */}
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#C8A96E',
            }}
          >
            [Our Work]
          </span>

          {/* Headline row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(1.85rem, 4.5vw, 2.75rem)',
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.12,
                letterSpacing: '-0.03em',
                background:
                  'linear-gradient(135deg, #ffffff 30%, #C8A96E 60%, #E8D5A3 80%, #D4B87A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              CarDee
              <br />
              Detailing Studio
            </h2>

            {/* Stats pill — right-aligned on desktop */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                padding: '10px 18px',
                borderRadius: '14px',
                border: '1px solid rgba(200,169,110,0.18)',
                background: 'rgba(200,169,110,0.05)',
                flexShrink: 0,
                alignSelf: 'flex-end',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    color: '#fff',
                    lineHeight: 1,
                  }}
                >
                  {GALLERY_ITEMS.length}
                </p>
                <p
                  style={{
                    margin: '3px 0 0',
                    fontSize: '9px',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Photos
                </p>
              </div>
              <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    color: '#fff',
                    lineHeight: 1,
                  }}
                >
                  Real
                </p>
                <p
                  style={{
                    margin: '3px 0 0',
                    fontSize: '9px',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Work
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── GOLD DIVIDER ───────────────────────────────────────────────── */}
        <div
          data-animate="fade-right"
          data-animate-delay="150"
          data-animate-duration="900"
          style={{
            height: '1px',
            marginBottom: '24px',
            background: 'linear-gradient(to right, #C8A96E 0%, rgba(200,169,110,0.15) 60%, transparent 100%)',
            opacity: 0.5,
          }}
        />

        {/* ── GALLERY STRIP ──────────────────────────────────────────────── */}
        <div
          data-animate="blur-in"
          data-animate-delay="200"
          data-animate-duration="750"
        >
          {/* Desktop lg+ */}
          <div className="hidden lg:block">
            <DesktopAccordionGallery items={GALLERY_ITEMS} />
          </div>

          {/* Mobile / tablet */}
          <div className="block lg:hidden">
            <MobileAccordionGallery items={GALLERY_ITEMS} />
          </div>
        </div>

        {/* ── FOOTER STRIP ───────────────────────────────────────────────── */}
        <div
          data-animate="fade-up"
          data-animate-delay="350"
          data-animate-duration="600"
          style={{
            marginTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* Left — photo count */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              color: 'rgba(255,255,255,0.38)',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <Camera
              style={{ width: '13px', height: '13px', flexShrink: 0 }}
              strokeWidth={1.5}
            />
            <span>{GALLERY_ITEMS.length} real photos from our studio</span>
          </div>

          {/* Right — address pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 13px',
              borderRadius: '999px',
              border: '1px solid rgba(200,169,110,0.3)',
              background: 'rgba(200,169,110,0.06)',
              color: '#C8A96E',
              fontSize: '12px',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.04em',
            }}
          >
            <MapPin
              style={{ width: '11px', height: '11px', flexShrink: 0 }}
              strokeWidth={2}
            />
            <span>Unkal Cross, Vidyanagar</span>
          </div>
        </div>
      </div>
    </section>
  );
}
