'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function InteriorService() {
  const sectionRef = useScrollAnimation({ threshold: 0.12 });

  return (
    <section ref={sectionRef} className="bg-dark py-10 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Image */}
          <div
            data-animate="fade-left"
            data-animate-delay="0"
            data-animate-duration="750"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
              <img
                src="/assets/asset-7.webp"
                alt="Interior detailing at CarDee Hubli"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div
            className="space-y-6"
            data-animate="fade-right"
            data-animate-delay="150"
            data-animate-duration="750"
          >
            <span className="text-muted-foreground text-[11px] font-mono tracking-widest uppercase">
              [Service] [01]
            </span>

            <div className="space-y-2">
              <p className="text-gold text-lg sm:text-xl font-semibold">
                Interior Detailing Specialists
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                Deep Clean. Restore. Revive.
              </h3>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              We offer a comprehensive interior refresh — full vacuuming, deep upholstery cleaning, leather conditioning, dashboard &amp; console shine, interior glass cleaning, and odor elimination. Your 3-year-old car can look brand new again.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
