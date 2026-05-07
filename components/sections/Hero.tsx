'use client';

import { useEffect, useState, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { openModal } = useBooking();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative bg-dark pt-28 pb-8 lg:pt-32 lg:pb-12">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Location Badge */}
            <div
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                transitionDelay: '0ms',
              }}
              className="inline-flex items-center gap-2 bg-dark-secondary border border-dark-border rounded-full px-3 py-1.5"
            >
              <MapPin className="w-3 h-3 text-gold" />
              <span className="text-muted-foreground text-[11px] tracking-wide">Unkal Cross, Vidyanagar, Hubli — Est. 2022</span>
            </div>

            <h1
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(28px)',
                filter: isLoaded ? 'blur(0)' : 'blur(4px)',
                transition:
                  'opacity 0.75s cubic-bezier(0.16,1,0.3,1) 80ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) 80ms, filter 0.5s ease 80ms',
              }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.05] tracking-tight"
            >
              Bringing Your Car's
              <br />
              Shine Back to Life
            </h1>

            <p
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1) 160ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) 160ms',
              }}
              className="text-muted-foreground text-sm sm:text-base max-w-md leading-relaxed"
            >
              Hubli's premium car care studio — expert detailing, ceramic coating, PPF, and paint protection with state-of-the-art facilities. Opp. Royal Oak Showroom, Vidyanagar.
            </p>

            <div
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.65s cubic-bezier(0.16,1,0.3,1) 240ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) 240ms',
              }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="tel:+919008399596"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-dark text-sm font-medium rounded-md hover:scale-[1.03] transition-transform duration-200 shadow-lg"
              >
                Call Now
              </a>
              <button
                onClick={() => openModal()}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200"
                style={{ background: '#C8A96E', color: '#0A0A0A' }}
              >
                Book Service
              </button>
            </div>
          </div>

          {/* Right Images */}
          <div
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
              filter: isLoaded ? 'blur(0)' : 'blur(6px)',
              transition:
                'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 300ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 300ms, filter 0.55s ease 300ms',
            }}
          >
            <div className="flex gap-3 justify-end">
              <div className="relative mt-8">
                <div className="w-40 sm:w-48 h-52 sm:h-60 rounded-2xl overflow-hidden">
                  <img
                    src="/assets/asset_1.jpg"
                    alt="Professional detailing at CarDee"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 text-center tracking-wide">
                  Professional Detailers
                </p>
              </div>
              <div className="relative">
                <div className="w-40 sm:w-48 h-52 sm:h-60 rounded-2xl overflow-hidden">
                  <img
                    src="/assets/asset-2.webp"
                    alt="Book your service at CarDee"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 text-center tracking-wide">
                  Book Your Service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
