'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useBooking } from '@/context/BookingContext';

export default function CTABanner() {
  const sectionRef = useScrollAnimation({ threshold: 0.12 });
  const { openModal } = useBooking();

  return (
    <section ref={sectionRef} id="booking" className="bg-dark py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div
            className="space-y-6"
            data-animate="fade-left"
            data-animate-delay="0"
            data-animate-duration="750"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Give Your Car the
              <br />
              Care It Deserves
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Visit us at Unkal Cross, Opp. Royal Oak Showroom, Vidyanagar, Hubli 580021. Open daily 9:30 AM – 8:00 PM.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+919008399596"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-dark text-sm font-medium rounded-md hover:scale-[1.03] transition-transform duration-200 shadow-lg"
              >
                Call Now
              </a>
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200"
                style={{ background: '#C8A96E', color: '#0A0A0A' }}
              >
                Book Service
              </button>
              <a
                href="https://maps.google.com/?q=CarDee+Detailing+Studio+Unkal+Cross+Hubli"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 border border-white/30 text-white text-sm font-medium rounded-md hover:bg-white/10 transition-all duration-200"
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div
            data-animate="blur-in"
            data-animate-delay="180"
            data-animate-duration="800"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-[3/4]">
              <img
                src="/assets/asset_8.webp"
                alt="CarDee Detailing Studio Hubli"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-dark/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
