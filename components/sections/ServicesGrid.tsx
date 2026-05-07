'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Grid3X3 } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

const reasons = [
  {
    num: '[01]',
    title: 'State-of-the-Art Studio — Hexagonal lighting rig, professional-grade bay, and a climate-controlled detailing environment.',
  },
  {
    num: '[02]',
    title: 'Certified Technicians — Every detailer is trained, experienced, and passionate about delivering a flawless finish.',
  },
  {
    num: '[03]',
    title: "1,500+ Happy Customers — From daily drivers to luxury vehicles, we've earned the trust of Hubli's car community.",
  },
  {
    num: '[04]',
    title: 'Premium Products Only — We use industry-leading coatings, PPF films, and cleaning agents — no shortcuts, ever.',
  },
  {
    num: '[05]',
    title: 'Two & Four Wheeler Experts — Bikes, SUVs, sedans, and luxury cars — our process adapts to every vehicle.',
  },
  {
    num: '[06]',
    title: 'Transparent Pricing — No hidden charges. We assess, recommend, and deliver — with full clarity before we begin.',
  },
];

export default function ServicesGrid() {
  const sectionRef = useScrollAnimation({ threshold: 0.08 });
  const { openModal } = useBooking();

  return (
    <section ref={sectionRef} className="bg-olive py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-12">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight max-w-lg"
            data-animate="fade-up"
            data-animate-delay="0"
            data-animate-duration="700"
          >
            Why Hubli's car owners trust CarDee with their vehicles.
          </h2>

          <div
            className="flex gap-4"
            data-animate="fade-up"
            data-animate-delay="120"
            data-animate-duration="700"
          >
            <a
              href="tel:+919008399596"
              className="inline-flex items-center justify-center px-5 py-2 border border-white/30 text-white text-sm font-medium rounded-md hover:bg-white/10 transition-all duration-200"
            >
              Call Us
            </a>
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium rounded-md transition-all duration-200"
              style={{ background: '#C8A96E', color: '#0A0A0A' }}
            >
              Book Service
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative bg-olive-card border border-olive-light/30 rounded-xl p-5 lg:p-6 hover:border-gold/30 hover:-translate-y-1 transition-[border-color,transform] duration-300"
              data-animate="fade-up"
              data-animate-delay={`${180 + index * 80}`}
              data-animate-duration="650"
            >
              <span className="text-muted-foreground text-[11px] font-mono tracking-wider block mb-3">
                {reason.num}
              </span>
              <p className="text-white text-sm font-medium leading-snug pr-8">
                {reason.title}
              </p>
              <div className="absolute bottom-4 right-4 w-6 h-6 rounded bg-olive-light/50 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                <Grid3X3 className="w-3 h-3 text-gold" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
