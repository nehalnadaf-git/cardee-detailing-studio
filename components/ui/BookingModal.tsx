'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useBooking } from '@/context/BookingContext';
import { X, CheckCircle } from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────── */
const SERVICES = [
  'Interior Detailing',
  'Exterior Wash & Polish',
  'Ceramic Coating',
  'Paint Protection Film (PPF)',
  'Teflon Coating',
  'Denting & Repainting',
];

const VEHICLE_TYPES = ['Car', 'SUV', 'Bike', 'Luxury Car'];

const TIME_SLOTS = [
  { label: 'Morning',   sub: '9:30 AM – 12:00 PM' },
  { label: 'Afternoon', sub: '12:00 PM – 4:00 PM'  },
  { label: 'Evening',   sub: '4:00 PM – 8:00 PM'   },
];

const EMPTY = {
  name: '',
  phone: '',
  vehicleType: '',
  vehicleModel: '',
  services: [] as string[],
  date: '',
  timeSlot: '',
  notes: '',
};

/* ─── Helpers ───────────────────────────────────────────── */
const inp: React.CSSProperties = {
  background: '#141414',
  border: '1px solid #2A2A2A',
  borderRadius: 10,
  color: '#fff',
  width: '100%',
  outline: 'none',
  fontSize: 15,
  padding: '11px 13px',
  lineHeight: '1.4',
  WebkitAppearance: 'none',
  colorScheme: 'dark' as const,
  fontFamily: 'inherit',
  touchAction: 'manipulation',
};

const lbl: React.CSSProperties = {
  display: 'block',
  fontSize: 10,
  fontFamily: 'monospace',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.35)',
  marginBottom: 6,
};

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = 'rgba(200,169,110,0.55)';
  e.currentTarget.style.boxShadow  = '0 0 0 3px rgba(200,169,110,0.07)';
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = '#2A2A2A';
  e.currentTarget.style.boxShadow  = 'none';
}

/* ─── Component ─────────────────────────────────────────── */
export default function BookingModal() {
  const { isOpen, selectedService, closeModal } = useBooking();
  const [form, setForm]         = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted]   = useState(false);
  const [visible, setVisible]   = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ── open / close lifecycle ── */
  useEffect(() => {
    if (isOpen) {
      setForm({ ...EMPTY, services: selectedService ? [selectedService] : [] });
      setSubmitted(false);
      setMounted(true);
      document.body.style.overflow = 'hidden';
      // Scroll body back to top on open
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: 0 });
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const t = setTimeout(() => {
        setMounted(false);
        document.body.style.overflow = '';
        setForm(EMPTY);
        setSubmitted(false);
      }, 380);
      return () => clearTimeout(t);
    }
  }, [isOpen, selectedService]);

  if (!mounted) return null;

  /* ── helpers ── */
  const toggleService = (s: string) =>
    setForm(f => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter(x => x !== s)
        : [...f.services, s],
    }));

  const isValid =
    form.name.trim() &&
    form.phone.trim() &&
    form.vehicleType &&
    form.vehicleModel.trim() &&
    form.services.length > 0 &&
    form.date &&
    form.timeSlot;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const slot = TIME_SLOTS.find(t => t.label === form.timeSlot);
    const slotLabel  = slot ? `${slot.label} (${slot.sub})` : form.timeSlot;
    const serviceList = form.services.map(s => `  - ${s}`).join('\n');

    const message =
      `CARDEE DETAILING STUDIO — BOOKING REQUEST\n` +
      `------------------------------------------\n\n` +
      `Customer: ${form.name}\n` +
      `Contact: ${form.phone}\n\n` +
      `Vehicle Type: ${form.vehicleType}\n` +
      `Make & Model: ${form.vehicleModel}\n\n` +
      `Services Requested:\n${serviceList}\n\n` +
      `Preferred Date: ${new Date(form.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}\n` +
      `Time Slot: ${slotLabel}\n` +
      (form.notes.trim() ? `\nNotes: ${form.notes.trim()}\n` : '') +
      `\n------------------------------------------\n` +
      `Please confirm my appointment. Thank you.`;

    const encoded  = encodeURIComponent(message);
    const deepLink = `whatsapp://send?phone=919008399596&text=${encoded}`;
    const webLink  = `https://wa.me/919008399596?text=${encoded}`;

    const anchor = document.createElement('a');
    anchor.href = deepLink;
    anchor.click();
    setTimeout(() => window.open(webLink, '_blank'), 600);

    setSubmitted(true);
  };

  /* ─────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={closeModal}
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: visible ? 'blur(6px)' : 'none',
          WebkitBackdropFilter: visible ? 'blur(6px)' : 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.32s ease, backdrop-filter 0.32s ease',
        }}
      />

      {/* ── Sheet wrapper — fills screen, centres on desktop ── */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 101,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',      /* bottom-sheet on mobile  */
          pointerEvents: 'none',
          padding: '0',
        }}
        /* On md+ switch to centred dialog via className */
        className="md:justify-center md:px-4"
      >
        {/*
          ── The sheet itself ──────────────────────────────────
          Mobile : full-width, slides up from bottom, max 94dvh
          Desktop: fixed width 520px, rounded all sides
        */}
        <div
          className="md:rounded-2xl"
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: 520,
            background: '#0D0D0D',
            border: '1px solid #1E1E1E',
            borderRadius: '20px 20px 0 0',    /* mobile: top corners only  */
            boxShadow: '0 -8px 48px rgba(0,0,0,0.6)',
            /* Cap height so it never overflows — dvh accounts for browser chrome */
            maxHeight: 'min(94dvh, 740px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            /* Entrance animation */
            transform: visible ? 'translateY(0)' : 'translateY(110%)',
            opacity:   visible ? 1 : 0,
            transition: 'transform 0.4s cubic-bezier(0.32,0.72,0,1), opacity 0.3s ease',
          }}
        >
          {/* ── Drag handle — mobile only ── */}
          <div
            className="md:hidden"
            style={{
              display: 'flex', justifyContent: 'center',
              padding: '10px 0 6px', flexShrink: 0,
            }}
          >
            <div style={{ width: 36, height: 4, borderRadius: 2, background: '#2E2E2E' }} />
          </div>

          {/* ── Fixed header ── */}
          <div
            style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              padding: '12px 16px 12px',
              borderBottom: '1px solid #1C1C1C',
              flexShrink: 0,
            }}
          >
            <div>
              <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: 3 }}>
                CarDee Detailing Studio
              </p>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, lineHeight: 1.2, margin: 0 }}>
                Book Your Service
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 3 }}>
                Open daily · 9:30 AM – 8:00 PM · Hubli
              </p>
            </div>
            <button
              onClick={closeModal}
              aria-label="Close"
              style={{
                width: 34, height: 34, borderRadius: '50%',
                border: '1px solid #2A2A2A', background: '#181818',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginLeft: 12, cursor: 'pointer',
              }}
            >
              <X style={{ width: 15, height: 15, color: 'rgba(255,255,255,0.45)' }} />
            </button>
          </div>

          {/* ── Scrollable body ── */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch' as any,
            }}
          >
            {submitted ? (
              /* ── Success state ── */
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center', gap: 14 }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle style={{ width: 26, height: 26, color: '#C8A96E' }} />
                </div>
                <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 19, margin: 0 }}>Booking Request Sent</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.6, maxWidth: 260, margin: 0 }}>
                  Your booking details were sent to WhatsApp. Our team will confirm your appointment shortly.
                </p>
                <button
                  onClick={closeModal}
                  style={{ marginTop: 8, padding: '12px 36px', borderRadius: 10, background: '#C8A96E', color: '#0A0A0A', fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}
                >
                  Done
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form id="booking-form" onSubmit={handleSubmit} style={{ padding: '16px 16px 0' }}>

                {/* Name + Phone side-by-side on wider screens */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                  <div>
                    <label style={lbl}>Full Name *</label>
                    <input
                      required type="text" autoComplete="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      style={inp} onFocus={onFocus} onBlur={onBlur}
                    />
                  </div>
                  <div>
                    <label style={lbl}>Mobile *</label>
                    <input
                      required type="tel" autoComplete="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      style={inp} onFocus={onFocus} onBlur={onBlur}
                    />
                  </div>
                </div>

                {/* Vehicle Type */}
                <div style={{ marginBottom: 12 }}>
                  <label style={lbl}>Vehicle Type *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
                    {VEHICLE_TYPES.map(t => (
                      <button
                        key={t} type="button"
                        onClick={() => setForm(f => ({ ...f, vehicleType: t }))}
                        style={{
                          padding: '9px 4px', borderRadius: 9, fontSize: 12, fontWeight: 500,
                          border: `1px solid ${form.vehicleType === t ? 'rgba(200,169,110,0.7)' : '#2A2A2A'}`,
                          background: form.vehicleType === t ? 'rgba(200,169,110,0.12)' : '#141414',
                          color: form.vehicleType === t ? '#C8A96E' : 'rgba(255,255,255,0.45)',
                          cursor: 'pointer', transition: 'all 0.15s', minHeight: 40,
                          touchAction: 'manipulation',
                        }}
                      >{t}</button>
                    ))}
                  </div>
                </div>

                {/* Vehicle Model */}
                <div style={{ marginBottom: 12 }}>
                  <label style={lbl}>Vehicle Make & Model *</label>
                  <input
                    required type="text"
                    placeholder="e.g. Mahindra XUV700, KTM Duke 390"
                    value={form.vehicleModel}
                    onChange={e => setForm(f => ({ ...f, vehicleModel: e.target.value }))}
                    style={inp} onFocus={onFocus} onBlur={onBlur}
                  />
                </div>

                {/* Services */}
                <div style={{ marginBottom: 12 }}>
                  <label style={lbl}>Select Service(s) *</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {SERVICES.map(s => {
                      const active = form.services.includes(s);
                      return (
                        <button
                          key={s} type="button"
                          onClick={() => toggleService(s)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '11px 13px', borderRadius: 10,
                            border: `1px solid ${active ? 'rgba(200,169,110,0.55)' : '#2A2A2A'}`,
                            background: active ? 'rgba(200,169,110,0.07)' : '#141414',
                            cursor: 'pointer', textAlign: 'left', width: '100%',
                            minHeight: 44, transition: 'all 0.15s',
                            touchAction: 'manipulation',
                          }}
                        >
                          {/* checkbox dot */}
                          <span style={{
                            width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                            border: `1.5px solid ${active ? '#C8A96E' : '#3A3A3A'}`,
                            background: active ? '#C8A96E' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.15s',
                          }}>
                            {active && (
                              <svg width="10" height="10" fill="none" viewBox="0 0 12 12">
                                <path d="M2 6l3 3 5-5" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          <span style={{ fontSize: 13, color: active ? '#C8A96E' : 'rgba(255,255,255,0.55)', fontWeight: active ? 500 : 400, lineHeight: 1.3 }}>
                            {s}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Date + Time side-by-side */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                  <div>
                    <label style={lbl}>Preferred Date *</label>
                    <input
                      required type="date"
                      value={form.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                      style={{ ...inp, colorScheme: 'dark' }}
                      onFocus={onFocus} onBlur={onBlur}
                    />
                  </div>
                  <div>
                    <label style={lbl}>Time Slot *</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {TIME_SLOTS.map(t => {
                        const active = form.timeSlot === t.label;
                        return (
                          <button
                            key={t.label} type="button"
                            onClick={() => setForm(f => ({ ...f, timeSlot: t.label }))}
                            style={{
                              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                              padding: '7px 10px', borderRadius: 8,
                              border: `1px solid ${active ? 'rgba(200,169,110,0.55)' : '#2A2A2A'}`,
                              background: active ? 'rgba(200,169,110,0.07)' : '#141414',
                              cursor: 'pointer', width: '100%', transition: 'all 0.15s',
                              touchAction: 'manipulation',
                            }}
                          >
                            <span style={{ fontSize: 12, color: active ? '#C8A96E' : 'rgba(255,255,255,0.55)', fontWeight: active ? 600 : 400 }}>{t.label}</span>
                            <span style={{ fontSize: 10, color: active ? 'rgba(200,169,110,0.65)' : 'rgba(255,255,255,0.25)', marginTop: 1 }}>{t.sub}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div style={{ marginBottom: 14 }}>
                  <label style={lbl}>Notes <span style={{ color: 'rgba(255,255,255,0.2)' }}>(optional)</span></label>
                  <textarea
                    value={form.notes}
                    onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    placeholder="Specific issues, paint colour, condition details…"
                    rows={2}
                    style={{ ...inp, resize: 'none' }}
                    onFocus={onFocus} onBlur={onBlur}
                  />
                </div>

              </form>
            )}
          </div>

          {/* ── Sticky footer with submit — always visible above keyboard / gesture bar ── */}
          {!submitted && (
            <div
              style={{
                flexShrink: 0,
                padding: '10px 16px',
                paddingBottom: 'max(14px, env(safe-area-inset-bottom))',
                borderTop: '1px solid #1C1C1C',
                background: '#0D0D0D',
              }}
            >
              <button
                type="submit"
                form="booking-form"
                disabled={!isValid}
                style={{
                  width: '100%', padding: '14px', borderRadius: 12, border: 'none',
                  fontSize: 14, fontWeight: 600,
                  cursor: isValid ? 'pointer' : 'not-allowed',
                  background: isValid ? '#C8A96E' : '#1A1A1A',
                  color: isValid ? '#0A0A0A' : 'rgba(255,255,255,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                  transition: 'all 0.2s', minHeight: 50,
                  touchAction: 'manipulation',
                }}
              >
                {/* WhatsApp icon */}
                <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.554 4.11 1.524 5.836L.057 23.57a.5.5 0 00.614.614l5.734-1.467A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 01-5.034-1.373l-.361-.214-3.737.957.974-3.628-.234-.374A9.9 9.9 0 012.1 12C2.1 6.534 6.534 2.1 12 2.1S21.9 6.534 21.9 12 17.466 21.9 12 21.9z"/>
                </svg>
                Send Booking via WhatsApp
              </button>
              <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.18)', marginTop: 7 }}>
                Opens WhatsApp with your booking details pre-filled
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
