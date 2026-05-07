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
  const sectionRef = useScrollAnimation({ threshold: 0.06 });

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={{ backgroundColor: '#0A0A0A', paddingTop: '80px', paddingBottom: '80px' }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 5vw, 64px)',
          paddingRight: 'clamp(24px, 5vw, 64px)',
        }}
      >
        {/* ── SECTION HEADER ──────────────────────────────────────────── */}
        <div
          data-animate="clip-up"
          data-animate-delay="0"
          data-animate-duration="750"
          style={{ textAlign: 'center', margin: '0 auto 40px' }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              margin: 0,
              background: 'linear-gradient(135deg, #ffffff 30%, #C8A96E 60%, #E8D5A3 80%, #D4B87A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            CarDee
            <br />
            Detailing Studio
          </h2>
        </div>

        {/* ── GALLERY STRIP ─────────────────────────────────────────────── */}
        <div
          data-animate="blur-in"
          data-animate-delay="120"
          data-animate-duration="800"
        >
          {/* Desktop: lg+ */}
          <div className="hidden lg:block">
            <DesktopAccordionGallery items={GALLERY_ITEMS} />
          </div>

          {/* Mobile: below lg */}
          <div className="block lg:hidden">
            <MobileAccordionGallery items={GALLERY_ITEMS} />
          </div>
        </div>

        {/* ── FOOTER STRIP ─────────────────────────────────────────────── */}
        <div
          data-animate="fade-up"
          data-animate-delay="300"
          data-animate-duration="600"
          style={{
            marginTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Left */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              color: 'rgba(255,255,255,0.45)',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <Camera
              style={{ width: '14px', height: '14px', flexShrink: 0 }}
              strokeWidth={1.5}
            />
            <span>{GALLERY_ITEMS.length} real photos from our Hubli studio</span>
          </div>

          {/* Right: address pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(200,169,110,0.35)',
              background: 'rgba(200,169,110,0.07)',
              color: '#C8A96E',
              fontSize: '13px',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.04em',
            }}
          >
            <MapPin
              style={{ width: '12px', height: '12px', flexShrink: 0 }}
              strokeWidth={2}
            />
            <span>Unkal Cross, Vidyanagar — Hubli</span>
          </div>
        </div>
      </div>
    </section>
  );
}
