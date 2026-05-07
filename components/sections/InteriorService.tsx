'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import { useBooking } from '@/context/BookingContext';

export default function InteriorService() {
  const sectionRef = useScrollAnimation({ threshold: 0.06 });
  const { openModal } = useBooking();

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-dark relative overflow-hidden"
      style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(56px, 8vw, 96px)' }}
    >
      {/* Subtle gold ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 0% 60%, rgba(200,169,110,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 relative">

        {/* ── Section bridge: "From a simple wash..." headline ── */}
        <div
          className="mb-12 lg:mb-16"
          data-animate="clip-up"
          data-animate-delay="0"
          data-animate-duration="750"
        >
          {/* Eyebrow */}
          <span
            className="text-[11px] font-mono tracking-widest uppercase block mb-4"
            style={{ color: '#C8A96E' }}
          >
            [Our Services]
          </span>

          {/* Gold rule */}
          <div
            className="mb-6"
            style={{
              height: '1px',
              background: 'linear-gradient(to right, #C8A96E, rgba(200,169,110,0.1) 60%, transparent)',
              opacity: 0.4,
            }}
          />

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-2xl"
            style={{ letterSpacing: '-0.02em' }}
          >
            From a simple wash to{' '}
            <span style={{ color: '#C8A96E' }}>comprehensive detailing</span>
          </h2>
        </div>

        {/* ── Service 01 card ── */}
        <div
          className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 'clamp(36px, 5vw, 60px)',
          }}
        >
          {/* Left — Image */}
          <div
            data-animate="fade-left"
            data-animate-delay="0"
            data-animate-duration="750"
          >
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: '20px', aspectRatio: '16/10' }}
            >
              <Image
                src="/assets/asset-7.webp"
                alt="Interior detailing at CarDee Hubli"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-700 hover:scale-105"
              />
              {/* Gold corner accents */}
              <div className="pointer-events-none absolute inset-0">
                <div
                  className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 rounded-tl-sm"
                  style={{ borderColor: '#C8A96E' }}
                />
                <div
                  className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 rounded-br-sm"
                  style={{ borderColor: '#C8A96E' }}
                />
              </div>

            </div>
          </div>

          {/* Right — Content */}
          <div
            className="space-y-6"
            data-animate="fade-right"
            data-animate-delay="150"
            data-animate-duration="750"
          >
            {/* Number + label row */}
            <div className="flex items-center gap-4">
              <span
                className="font-mono text-[11px] tracking-widest uppercase"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                [Service] [01]
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <p
                className="text-lg sm:text-xl font-semibold"
                style={{ color: '#C8A96E' }}
              >
                Interior Detailing Specialists
              </p>
              <h3
                className="text-2xl sm:text-3xl font-semibold text-white leading-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                Deep Clean.
                <br />
                Restore. Revive.
              </h3>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(200,169,110,0.18)' }} />

            {/* Body */}
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              We offer a comprehensive interior refresh — full vacuuming, deep upholstery cleaning,
              leather conditioning, dashboard &amp; console shine, interior glass cleaning, and odor
              elimination. Your 3-year-old car can look brand new again.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {[
                'Full Vacuuming',
                'Upholstery Cleaning',
                'Leather Conditioning',
                'Odor Elimination',
              ].map(tag => (
                <span
                  key={tag}
                  className="text-[11px] font-mono tracking-wide uppercase px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(200,169,110,0.08)',
                    border: '1px solid rgba(200,169,110,0.2)',
                    color: '#C8A96E',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => openModal('Interior Detailing')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ background: '#C8A96E', color: '#0A0A0A' }}
            >
              Book This Service
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
