'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useBooking } from '@/context/BookingContext';

export default function About() {
  const sectionRef = useScrollAnimation({ threshold: 0.12 });
  const { openModal } = useBooking();

  return (
    <section ref={sectionRef} id="about" className="bg-dark py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left - Small text */}
          <div
            className="space-y-4"
            data-animate="fade-left"
            data-animate-delay="0"
            data-animate-duration="700"
          >
            <p className="text-muted-foreground text-sm">
              Your car deserves the best —{' '}
              <span className="text-white font-medium">CarDee Detailing Studio</span>
            </p>
            <p className="text-muted-foreground text-xs max-w-xs leading-relaxed">
              Established in 2022. Serving Hubli &amp; Dharwad with professional, premium car care.
            </p>
          </div>

          {/* Right - Large headline */}
          <div
            className="space-y-6"
            data-animate="fade-right"
            data-animate-delay="120"
            data-animate-duration="700"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-white leading-tight">
              Your Car Deserves More
              <br />
              than an Ordinary Wash
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              CARDEE is Hubli's one-stop solution for professional car care — from deep interior cleaning and exterior detailing to ceramic coating, PPF, and paint protection. Our state-of-the-art facility defends your car against dust, acid rain, bird droppings, and more.
            </p>
            <div className="flex flex-wrap gap-4">
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
        </div>
      </div>
    </section>
  );
}
