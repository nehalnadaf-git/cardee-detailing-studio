'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useBooking } from '@/context/BookingContext';

const navLinks = [
  { label: 'Home', href: '#home', num: '01' },
  { label: 'About', href: '#about', num: '02' },
  { label: 'Services', href: '#services', num: '03' },
  { label: 'Gallery', href: '#gallery', num: '04' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const { openModal } = useBooking();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Scroll detection ─────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section detection ─────────────────── */
  useEffect(() => {
    const ids = navLinks.map(l => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveLink(`#${e.target.id}`);
        });
      },
      { threshold: 0.35 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* ── Mobile drawer helpers ────────────────────── */
  const openMenu = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setMounted(true);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setVisible(false);
    setIsOpen(false);
    closeTimerRef.current = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = '';
    }, 440);
  }, []);

  useEffect(() => () => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current); }, []);

  /* ── Derived glass style ──────────────────────── */
  const glassBase = {
    background: scrolled
      ? 'rgba(6,6,6,0.72)'
      : 'rgba(10,10,10,0.32)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderBottom: scrolled
      ? '1px solid rgba(200,169,110,0.12)'
      : '1px solid rgba(255,255,255,0.06)',
    boxShadow: scrolled
      ? '0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)'
      : 'none',
    transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
  };

  return (
    <>
      {/* ─── Top Bar ───────────────────────────────────── */}
      <nav
        style={{ zIndex: 60, ...glassBase }}
        className="fixed top-0 left-0 right-0"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <a href="#home" className="flex items-center group shrink-0" style={{ position: 'relative' }}>
              {/* Glow orb behind logo */}
              <span
                style={{
                  position: 'absolute',
                  left: '50%', top: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: 72, height: 72,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(200,169,110,0.18) 0%, transparent 70%)',
                  opacity: 0,
                  transition: 'opacity 0.35s',
                  pointerEvents: 'none',
                }}
                className="group-hover:opacity-100"
              />
              <img
                src="/cardee logo/Cardee logo.webp"
                alt="CarDee Detailing Studio"
                style={{ height: 58, width: 'auto', objectFit: 'contain', position: 'relative' }}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = activeLink === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      position: 'relative',
                      padding: '6px 14px',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 500,
                      letterSpacing: '0.025em',
                      color: isActive ? '#C8A96E' : 'rgba(255,255,255,0.58)',
                      background: isActive ? 'rgba(200,169,110,0.08)' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(200,169,110,0.18)' : 'transparent'}`,
                      transition: 'all 0.22s ease',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.88)';
                        (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)';
                        (e.currentTarget as HTMLAnchorElement).style.border = '1px solid rgba(255,255,255,0.08)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.58)';
                        (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                        (e.currentTarget as HTMLAnchorElement).style.border = '1px solid transparent';
                      }
                    }}
                  >
                    {isActive && (
                      <span style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: '#C8A96E',
                        display: 'inline-block',
                        boxShadow: '0 0 6px rgba(200,169,110,0.7)',
                      }} />
                    )}
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2">
              {/* Call Now — ghost */}
              <a
                href="tel:+919008399596"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 15px',
                  borderRadius: 8,
                  fontSize: 12.5,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.68)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  textDecoration: 'none',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.22s ease',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.22)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.68)';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)';
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Call Now
              </a>

              {/* Book Service — gold */}
              <button
                onClick={() => openModal()}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 17px',
                  borderRadius: 8,
                  fontSize: 12.5,
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #C8A96E 0%, #a8893e 100%)',
                  color: '#0A0A0A',
                  border: '1px solid rgba(200,169,110,0.4)',
                  boxShadow: '0 0 18px rgba(200,169,110,0.22), 0 2px 8px rgba(0,0,0,0.4)',
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                  transition: 'all 0.22s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 28px rgba(200,169,110,0.42), 0 4px 16px rgba(0,0,0,0.5)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 18px rgba(200,169,110,0.22), 0 2px 8px rgba(0,0,0,0.4)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                Book Service
              </button>
            </div>

            {/* Hamburger – mobile */}
            <button
              className="md:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-xl"
              onClick={isOpen ? closeMenu : openMenu}
              aria-label="Toggle menu"
              style={{
                background: isOpen ? 'rgba(200,169,110,0.1)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isOpen ? 'rgba(200,169,110,0.3)' : 'rgba(255,255,255,0.1)'}`,
                backdropFilter: 'blur(8px)',
                transition: 'all 0.25s',
              }}
            >
              <span style={{
                display: 'block', width: 18, height: 1.5, borderRadius: 2,
                background: isOpen ? '#C8A96E' : 'rgba(255,255,255,0.8)',
                transform: isOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
                transition: 'transform 0.3s ease, background 0.2s',
              }} />
              <span style={{
                display: 'block', height: 1.5, borderRadius: 2,
                background: isOpen ? '#C8A96E' : 'rgba(255,255,255,0.8)',
                width: isOpen ? 0 : 12,
                opacity: isOpen ? 0 : 1,
                transition: 'width 0.25s ease, opacity 0.2s, background 0.2s',
              }} />
              <span style={{
                display: 'block', width: 18, height: 1.5, borderRadius: 2,
                background: isOpen ? '#C8A96E' : 'rgba(255,255,255,0.8)',
                transform: isOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                transition: 'transform 0.3s ease, background 0.2s',
              }} />
            </button>
          </div>
        </div>

        {/* Subtle gradient line at bottom when scrolled */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: scrolled
            ? 'linear-gradient(90deg, transparent, rgba(200,169,110,0.25) 30%, rgba(200,169,110,0.25) 70%, transparent)'
            : 'none',
          transition: 'background 0.4s ease',
          pointerEvents: 'none',
        }} />
      </nav>

      {/* ─── Backdrop ──────────────────────────────────── */}
      {mounted && (
        <div
          onClick={closeMenu}
          style={{
            position: 'fixed', inset: 0, zIndex: 55,
            background: 'rgba(0,0,0,0.70)',
            backdropFilter: visible ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: visible ? 'blur(12px)' : 'none',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.4s ease, backdrop-filter 0.4s ease',
          }}
        />
      )}

      {/* ─── Mobile Drawer ─────────────────────────────── */}
      {mounted && (
        <div
          style={{
            position: 'fixed', top: 0, right: 0, bottom: 0,
            zIndex: 58,
            width: '82vw', maxWidth: 340,
            background: 'rgba(8,8,8,0.92)',
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
            borderLeft: '1px solid rgba(200,169,110,0.12)',
            display: 'flex', flexDirection: 'column',
            transform: visible ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.44s cubic-bezier(0.32,0.72,0,1)',
            boxShadow: '-20px 0 80px rgba(0,0,0,0.85)',
            overflow: 'hidden',
          }}
        >
          {/* Decorative gold glow top-right */}
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,169,110,0.12) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          {/* Studio label */}
          <div style={{ padding: '28px 24px 12px', position: 'relative' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px',
              borderRadius: 6,
              background: 'rgba(200,169,110,0.08)',
              border: '1px solid rgba(200,169,110,0.15)',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#C8A96E', boxShadow: '0 0 6px rgba(200,169,110,0.8)', display: 'inline-block' }} />
              <p style={{
                fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'rgba(200,169,110,0.75)',
                margin: 0,
              }}>
                Premium Detailing Studio
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav style={{ flex: 1, padding: '8px 20px' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {navLinks.map((link, i) => {
                const isActive = activeLink === link.href;
                return (
                  <li
                    key={link.label}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateX(0)' : 'translateX(24px)',
                      transition: `opacity 0.42s ease ${0.1 + i * 0.065}s, transform 0.42s ease ${0.1 + i * 0.065}s`,
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      style={{
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 0',
                        textDecoration: 'none',
                        color: isActive ? '#C8A96E' : 'rgba(255,255,255,0.8)',
                        fontSize: 26, fontWeight: 600,
                        letterSpacing: '-0.02em',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        transition: 'color 0.2s',
                        position: 'relative',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#C8A96E'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = isActive ? '#C8A96E' : 'rgba(255,255,255,0.8)'; }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {isActive && (
                          <span style={{ width: 4, height: 24, borderRadius: 2, background: '#C8A96E', display: 'inline-block' }} />
                        )}
                        {link.label}
                      </span>
                      <span style={{
                        fontSize: 10, fontFamily: 'monospace',
                        color: isActive ? 'rgba(200,169,110,0.5)' : 'rgba(255,255,255,0.16)',
                        fontWeight: 400,
                      }}>
                        [{link.num}]
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom CTAs */}
          <div
            style={{
              padding: '0 20px 36px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(18px)',
              transition: 'opacity 0.44s ease 0.36s, transform 0.44s ease 0.36s',
            }}
          >
            {/* Logo */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '0 -10px' }}>
              <img
                src="/cardee logo/Cardee logo.webp"
                alt="CarDee Detailing Studio"
                style={{
                  width: '100%', height: 'auto', objectFit: 'contain',
                  marginTop: -28, marginBottom: -18, maxWidth: 300,
                  display: 'block',
                }}
              />
            </div>

            {/* Book Service */}
            <button
              onClick={() => { closeMenu(); openModal(); }}
              style={{
                width: '100%', padding: '14px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #C8A96E 0%, #a8893e 100%)',
                color: '#0A0A0A',
                fontWeight: 700, fontSize: 15, border: 'none',
                cursor: 'pointer', marginBottom: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 4px 20px rgba(200,169,110,0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              Book Service
            </button>

            {/* Call Now */}
            <a
              href="tel:+919008399596"
              onClick={closeMenu}
              style={{
                width: '100%', padding: '13px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(8px)',
                color: 'rgba(255,255,255,0.65)',
                fontWeight: 500, fontSize: 14,
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                textDecoration: 'none',
                transition: 'all 0.22s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Call Now
            </a>
          </div>
        </div>
      )}
    </>
  );
}
