'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useBooking } from '@/context/BookingContext';

const services = [
  {
    num: '[Service] [01]',
    category: 'Interior Detailing',
    title: 'Deep Interior Detailing',
    description:
      'Full vacuuming, upholstery & leather cleaning, dashboard shine, interior glass cleaning, and odor elimination — your car feels brand new.',
    tags: 'Interior · Leather Care · Odor Removal',
    image: '/service-images/1_deep_interior_detailing.webp',
    imageAlt: 'Interior car detailing at CarDee',
    // Maps to the exact string in BookingModal SERVICES list
    modalService: 'Interior Detailing',
  },
  {
    num: '[Service] [02]',
    category: 'Exterior Wash',
    title: 'Gentle Exterior Wash & Polish',
    description:
      "Bring back your car's showroom shine with our thorough exterior wash, polish, and surface protection — defending against dust, bird droppings, and acid rain.",
    tags: 'Car Washing · Polishing · Coating',
    image: '/service-images/2_gentle_exterior_wash.webp',
    imageAlt: 'Exterior car wash at CarDee',
    modalService: 'Exterior Wash & Polish',
  },
  {
    num: '[Service] [03]',
    category: 'Paint Protection',
    title: 'Ceramic Coating',
    description:
      "Advanced chemical polymer solution that bonds to your vehicle's paint. Provides ultra-high gloss, chemical resistance, and superior hydrophobicity.",
    tags: 'Ceramic Coating · 9H Hardness · High Gloss',
    image: '/service-images/3_ceramic_coating_ppf.webp',
    imageAlt: 'Ceramic coating service at CarDee',
    modalService: 'Ceramic Coating',
  },
  {
    num: '[Service] [04]',
    category: 'Paint Protection',
    title: 'Paint Protection Film (PPF)',
    description:
      "A clear, self-healing film that protects your car's paint from stone chips, scratches, and road debris. The ultimate shield for your vehicle.",
    tags: 'PPF · Self-Healing · Scratch Protection',
    image: '/service-images/3_ceramic_coating_ppf.webp',
    imageAlt: 'Paint Protection Film (PPF) at CarDee',
    modalService: 'Paint Protection Film (PPF)',
  },
  {
    num: '[Service] [05]',
    category: 'Paint Protection',
    title: 'Paint Protection',
    description:
      "A high-quality protective barrier applied to your car's paint surface — shields against UV rays, water spots, and minor abrasions for long-lasting gloss.",
    tags: 'Paint Protection · Paint Shield · UV Protection',
    image: '/service-images/4_teflon_paint_protection.webp',
    imageAlt: 'Paint protection service at CarDee',
    modalService: 'Paint Protection',
  },
  {
    num: '[Service] [06]',
    category: 'Denting & Repainting',
    title: 'Denting, Repainting & Restoration',
    description:
      'Accident repair, dent removal, full-body repainting, buffing, and paint restoration — we bring your car back to its original factory color and condition.',
    tags: 'Denting · Repainting · Restoration',
    image: '/service-images/5_denting_painting_restoration.webp',
    imageAlt: 'Denting and repainting at CarDee',
    modalService: 'Denting & Repainting',
  },
  {
    num: '[Service] [07]',
    category: 'Car Wash',
    title: 'Premium High-Pressure Car Wash',
    description:
      'A thorough, streak-free car wash using premium shampoos and high-pressure rinse — removing dirt, grime, and road contaminants from every surface.',
    tags: 'Car Wash · Shampoo · Deep Clean',
    image: '/service-images/6_premium_high_pressure_wash.webp',
    imageAlt: 'Premium car wash at CarDee',
    modalService: 'Exterior Wash & Polish',
  },
];

export default function ServiceCards() {
  const sectionRef = useScrollAnimation({ threshold: 0.06 });
  const { openModal } = useBooking();

  return (
    <section ref={sectionRef} id="pricing" className="bg-dark py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div
          className="mb-12"
          data-animate="fade-up"
          data-animate-delay="0"
          data-animate-duration="650"
        >
          <span className="text-muted-foreground text-[11px] font-mono tracking-widest uppercase">
            [Our Services]
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mt-3">
            Everything Your Car Needs
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-dark-secondary border border-dark-border rounded-xl overflow-hidden hover:border-dark-border-light hover:-translate-y-1 transition-[border-color,transform] duration-300"
              data-animate="fade-up"
              data-animate-delay={`${80 + index * 90}`}
              data-animate-duration="680"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-secondary via-dark-secondary/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 -mt-10 relative">
                <span className="text-muted-foreground text-[11px] font-mono tracking-widest uppercase block mb-3">
                  {service.num} / {service.category}
                </span>
                <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <p className="text-gold text-xs font-medium mb-4">
                  {service.tags}
                </p>
                <button
                  onClick={() => openModal(service.modalService)}
                  className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium rounded-md transition-all duration-200"
                  style={{ background: '#C8A96E', color: '#0A0A0A' }}
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
