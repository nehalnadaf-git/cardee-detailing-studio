'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function CarShowcase() {
  const sectionRef = useScrollAnimation({ threshold: 0.08 });

  return (
    <section ref={sectionRef} className="bg-dark py-4 lg:py-6">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Left Car - White */}
          <div
            className="lg:col-span-3 relative group"
            data-animate="scale-up"
            data-animate-delay="0"
            data-animate-duration="700"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
              <img
                src="/assets/white.webp"
                alt="White car after ceramic coating at CarDee studio"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-dark/80 backdrop-blur-sm border border-dark-border rounded-md px-3 py-1.5">
                <span className="text-[10px] text-white font-medium tracking-wider uppercase">
                  Attention to Detail
                </span>
              </div>
              {/* Number */}
              <div className="absolute bottom-4 left-4">
                <span className="text-xs text-muted-foreground font-mono">[01]</span>
              </div>
            </div>
          </div>

          {/* Center Car - Black */}
          <div
            className="lg:col-span-3 relative group"
            data-animate="scale-up"
            data-animate-delay="120"
            data-animate-duration="700"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
              <img
                src="/assets/black.webp"
                alt="Black car after detailing at CarDee studio"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Car - Red XUV */}
          <div
            className="lg:col-span-6 relative group"
            data-animate="scale-up"
            data-animate-delay="240"
            data-animate-duration="700"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9]">
              <img
                src="/assets/red-xuv.webp"
                alt="Red Mahindra XUV700 after premium detailing"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Number */}
              <div className="absolute bottom-4 left-4">
                <span className="text-xs text-muted-foreground font-mono">[02]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
