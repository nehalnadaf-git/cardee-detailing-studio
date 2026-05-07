'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ServicesIntro() {
  const sectionRef = useScrollAnimation({ threshold: 0.12 });

  return (
    <section ref={sectionRef} id="services" className="bg-dark py-10 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Heading */}
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-xl"
          data-animate="clip-up"
          data-animate-delay="0"
          data-animate-duration="800"
        >
          From a simple wash to comprehensive detailing
        </h2>
      </div>
    </section>
  );
}
