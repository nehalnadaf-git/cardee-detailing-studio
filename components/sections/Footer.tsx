'use client';

import { useReveal } from '@/hooks/useReveal';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { ref, isVisible } = useReveal(0.1);


  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/cardeedetailing/',
      icon: (
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/919008399596',
      icon: <MessageCircle className="w-4 h-4" />,
    },
  ];

  const quickLinks = {
    service: [
      'Exterior Wash & Polish',
      'Interior Detailing',
      'Ceramic Coating',
      'Paint Protection Film (PPF)',
      'Teflon Coating',
      'Denting & Repainting',
    ],
    official: [
      'Unkal Cross, Vidyanagar',
      'Hubli, Karnataka 580021',
      'Opp. Royal Oak Showroom',
      'Call Now',
      '9:30 AM – 8:00 PM Daily',
    ],
    booking: ['Our Services', 'About Us'],
  };

  return (
    <footer ref={ref} id="contact" className="bg-dark border-t border-dark-border pt-16 lg:pt-24 pb-8">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <div
            className={`space-y-8 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Phone */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-muted-foreground text-[11px] font-mono tracking-widest uppercase">
                  Phone
                </span>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
              </div>
              <a
                href="tel:+919008399596"
                className="text-white text-xl sm:text-2xl font-semibold hover:text-gold transition-colors duration-200"
              >
                Call Now
              </a>
            </div>

            {/* Address */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-muted-foreground text-[11px] font-mono tracking-widest uppercase">
                  Address
                </span>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
              </div>
              <p className="text-white text-sm leading-relaxed">
                Unkal Cross, Opp. Royal Oak Showroom<br />
                Vidyanagar, Hubballi, Karnataka 580031
              </p>
            </div>

            {/* Social */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-muted-foreground text-[11px] font-mono tracking-widest uppercase">
                  Social Media
                </span>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-10 h-10 rounded-full border border-dark-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <span className="flex items-center justify-center">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Links */}
          <div
            className={`transition-all duration-600 delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-muted-foreground text-[11px] font-mono tracking-widest uppercase">
                Quick Link
              </span>
              <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Service */}
              <div>
                <h4 className="text-white text-sm font-medium mb-4">Services</h4>
                <ul className="space-y-2">
                  {quickLinks.service.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#services"
                        className="text-muted-foreground text-xs hover:text-white transition-colors duration-150"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Official */}
              <div>
                <h4 className="text-white text-sm font-medium mb-4">Location</h4>
                <ul className="space-y-2">
                  {quickLinks.official.map((link, i) => (
                    <li key={i}>
                      <span className="text-muted-foreground text-xs">
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking */}
              <div>
                <h4 className="text-white text-sm font-medium mb-4">Info</h4>
                <ul className="space-y-2">
                  {quickLinks.booking.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#about"
                        className="text-muted-foreground text-xs hover:text-white transition-colors duration-150"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Huge Centered Logo */}
        <div
          className={`flex justify-center transition-all duration-800 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <img
            src="/cardee logo/Cardee logo.webp"
            alt="CarDee Detailing Studio"
            className="h-[300px] sm:h-[500px] w-auto max-w-full object-contain scale-110 -my-10"
          />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-dark-border flex flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground text-[11px]">
            © 2026 CarDee Detailing Studio. All rights reserved. Est. 2022.
          </p>
        </div>
      </div>
    </footer>
  );
}

