'use client';

import { useState, useEffect, useRef } from 'react';
import { useBooking } from '@/context/BookingContext';

const navLinks = [
  { label: 'Home', href: '#home', num: '01' },
  { label: 'About', href: '#about', num: '02' },
  { label: 'Services', href: '#services', num: '03' },
  { label: 'Gallery', href: '#gallery', num: '04' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { openModal } = useBooking();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setMounted(true);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    setIsOpen(true);
  };

  const closeMenu = () => {
    setVisible(false);
    setIsOpen(false);
    closeTimerRef.current = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = '';
    }, 420);
  };

  useEffect(() => () => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current); }, []);

  return (
    <>
      {/* ─── Top Bar ─────────────────────────────────────── */}
      <nav
        style={{ zIndex: 60 }}
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          isScrolled ? 'bg-dark/90 backdrop-blur-md border-b border-dark-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a href="#home" className="flex items-center group">
              <img
                src="/cardee logo/Cardee logo.webp"
                alt="CarDee Detailing Studio"
                className="h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-white text-[13px] font-medium tracking-wide transition-colors duration-150"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="tel:+919008399596"
                className="inline-flex items-center justify-center px-4 py-2 border border-white/30 text-white text-xs font-medium rounded-md hover:bg-white/10 transition-all duration-200"
              >
                Call Now
              </a>
              <button
                onClick={() => openModal()}
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium rounded-md transition-all duration-200"
                style={{ background: '#C8A96E', color: '#0A0A0A' }}
              >
                Book Service
              </button>
            </div>

            {/* Hamburger – mobile only */}
            <button
              className="md:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-lg"
              onClick={isOpen ? closeMenu : openMenu}
              aria-label="Toggle menu"
              style={{
                background: isOpen ? 'rgba(200,169,110,0.08)' : 'transparent',
                border: `1px solid ${isOpen ? 'rgba(200,169,110,0.25)' : 'rgba(255,255,255,0.1)'}`,
                transition: 'all 0.25s',
              }}
            >
              <span style={{
                display: 'block', width: 18, height: 1.5, borderRadius: 2,
                background: isOpen ? '#C8A96E' : '#fff',
                transform: isOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
                transition: 'transform 0.3s ease, background 0.2s',
              }} />
              <span style={{
                display: 'block', height: 1.5, borderRadius: 2,
                background: isOpen ? '#C8A96E' : '#fff',
                width: isOpen ? 0 : 12,
                opacity: isOpen ? 0 : 1,
                transition: 'width 0.25s ease, opacity 0.2s, background 0.2s',
              }} />
              <span style={{
                display: 'block', width: 18, height: 1.5, borderRadius: 2,
                background: isOpen ? '#C8A96E' : '#fff',
                transform: isOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                transition: 'transform 0.3s ease, background 0.2s',
              }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Backdrop ────────────────────────────────────── */}
      {mounted && (
        <div
          onClick={closeMenu}
          style={{
            position: 'fixed', inset: 0, zIndex: 55,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: visible ? 'blur(10px)' : 'none',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.38s ease, backdrop-filter 0.38s ease',
          }}
        />
      )}

      {/* ─── Side Panel ──────────────────────────────────── */}
      {mounted && (
        <div
          style={{
            position: 'fixed', top: 0, right: 0, bottom: 0,
            zIndex: 58,
            width: '82vw', maxWidth: 340,
            background: '#080808',
            borderLeft: '1px solid #181818',
            display: 'flex', flexDirection: 'column',
            transform: visible ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.42s cubic-bezier(0.32,0.72,0,1)',
            boxShadow: '-12px 0 64px rgba(0,0,0,0.8)',
            overflow: 'hidden',
          }}
        >
          {/* Close button – top right only, no logo */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 20px 12px' }}>
            <button
              onClick={closeMenu}
              style={{
                width: 38, height: 38, borderRadius: '50%',
                border: '1px solid #252525', background: '#131313',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 14 14">
                <path d="M1 1l12 12M13 1L1 13" stroke="rgba(255,255,255,0.45)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Studio label */}
          <div style={{ paddingLeft: 24, paddingBottom: 20 }}>
            <p style={{
              fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'rgba(200,169,110,0.6)',
            }}>
              Premium Detailing Studio — Hubli
            </p>
          </div>

          {/* Nav links */}
          <nav style={{ flex: 1, paddingLeft: 24, paddingRight: 24 }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {navLinks.map((link, i) => (
                <li
                  key={link.label}
                  style={{
                    borderBottom: '1px solid #121212',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(18px)',
                    transition: `opacity 0.4s ease ${0.08 + i * 0.06}s, transform 0.4s ease ${0.08 + i * 0.06}s`,
                  }}
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    style={{
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 17, paddingBottom: 17,
                      textDecoration: 'none',
                      color: 'rgba(255,255,255,0.82)',
                      fontSize: 28, fontWeight: 600,
                      letterSpacing: '-0.02em',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#C8A96E'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.82)'; }}
                  >
                    <span>{link.label}</span>
                    <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.18)', fontWeight: 400 }}>
                      [{link.num}]
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom: huge logo + CTAs */}
          <div
            style={{
              padding: '0 20px 32px',
              borderTop: '1px solid #141414',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 0.42s ease 0.34s, transform 0.42s ease 0.34s',
            }}
          >
            {/* Huge logo */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '0 -10px' }}>
              <img
                src="/cardee logo/Cardee logo.webp"
                alt="CarDee Detailing Studio"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  // Negative margins to crop whitespace baked into the logo image
                  marginTop: -28,
                  marginBottom: -28,
                  maxWidth: 320,
                }}
              />
            </div>

            {/* Book Service */}
            <button
              onClick={() => { closeMenu(); openModal(); }}
              style={{
                width: '100%', padding: '14px', borderRadius: 12,
                background: '#C8A96E', color: '#0A0A0A',
                fontWeight: 700, fontSize: 15, border: 'none',
                cursor: 'pointer', marginBottom: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.554 4.11 1.524 5.836L.057 23.57a.5.5 0 00.614.614l5.734-1.467A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 01-5.034-1.373l-.361-.214-3.737.957.974-3.628-.234-.374A9.9 9.9 0 012.1 12C2.1 6.534 6.534 2.1 12 2.1S21.9 6.534 21.9 12 17.466 21.9 12 21.9z"/>
              </svg>
              Book Service
            </button>

            {/* Call Now */}
            <a
              href="tel:+919008399596"
              onClick={closeMenu}
              style={{
                width: '100%', padding: '13px', borderRadius: 12,
                background: 'transparent', color: 'rgba(255,255,255,0.7)',
                fontWeight: 500, fontSize: 14,
                border: '1px solid #252525',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none',
              }}
            >
              Call Now
            </a>
          </div>
        </div>
      )}
    </>
  );
}
