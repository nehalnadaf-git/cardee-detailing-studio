'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Star, ArrowRight } from 'lucide-react';

export default function USP() {
  const sectionRef = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="bg-dark pt-16 lg:pt-24 pb-0">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Label */}
        <div
          className="mb-10"
          data-animate="fade-up"
          data-animate-delay="0"
          data-animate-duration="600"
        >
          <span className="text-muted-foreground text-[11px] font-mono tracking-widest uppercase">
            [Key USP List]
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 - State-of-the-Art */}
          <div
            className="group relative bg-dark-secondary border border-dark-border rounded-xl p-6 lg:p-8 hover:border-dark-border-light hover:-translate-y-1 transition-[border-color,transform] duration-300"
            data-animate="scale-up"
            data-animate-delay="100"
            data-animate-duration="700"
          >
            <h3 className="text-xl font-semibold text-white mb-3">
              State-of-the-Art Facilities
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Our advanced facility specializes in restoring dull or damaged paint, with anti-corrosion treatment for metal surfaces and a non-stick protective barrier — defending against dust, toxic air, acid rain, bird droppings, and tree gum.
            </p>
            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-muted-foreground text-xs italic mb-6">
              "Showroom-level shine with great attention to detail." — Shashank S.
            </p>
            {/* Car Image */}
            <div className="relative rounded-xl overflow-hidden aspect-video">
              <img
                src="/Key-USP-List/bike-asset.webp"
                alt="Motorcycle detailing and PPF protection at CarDee"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Card 2 - Safe Process */}
          <div
            className="group relative bg-dark-secondary border border-dark-border rounded-xl p-6 lg:p-8 hover:border-dark-border-light hover:-translate-y-1 transition-[border-color,transform] duration-300"
            data-animate="scale-up"
            data-animate-delay="220"
            data-animate-duration="700"
          >
            <h3 className="text-xl font-semibold text-white mb-3">
              Safe, Paint-Friendly Process
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Our techniques protect your car's paintwork from swirl marks, scratches, and harsh chemicals — preserving your vehicle's value and shine. Daily open 9:30 AM – 8:00 PM. Cash, GPay, Paytm, PhonePe accepted.
            </p>
            <a
              href="#services"
              className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:text-gold-hover transition-colors mb-6 group/link"
            >
              Our Services
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
            </a>
            {/* Car Image */}
            <div className="relative rounded-xl overflow-hidden aspect-video">
              <img
                src="/Key-USP-List/red-asset.webp"
                alt="Premium red car detailing at CarDee studio"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
