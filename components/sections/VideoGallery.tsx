'use client';

import { useState, useRef, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Play, X, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

interface Video {
  id: string;
  driveId: string;
  thumbnail: string;
}

const videos: Video[] = [
  { id: 'v1',  driveId: '1UETKJPxOanNKVYEnv5YkhYTsCt09hpDN', thumbnail: '/video-thumbnails/1.webp' },
  { id: 'v2',  driveId: '1twJiD-Q2ZzFKXy0i0gfEodRQVMaDuQ65', thumbnail: '/video-thumbnails/2.webp' },
  { id: 'v3',  driveId: '1OUBMz_odFQ4kgZg2ZZHpx2LHI0j3Z14l', thumbnail: '/video-thumbnails/3.webp' },
  { id: 'v4',  driveId: '13OkEH8k3MnbloE6JFAs7JRJWgo8PSLTI', thumbnail: '/video-thumbnails/4.webp' },
  { id: 'v5',  driveId: '1ezOv_khAw5qU1Tq3H3wleruv5GyeKoON', thumbnail: '/video-thumbnails/5.webp' },
  { id: 'v6',  driveId: '14oYzUULKlXmUyr4CmjhweVbSzD9JiYH0', thumbnail: '/video-thumbnails/6.webp' },
  { id: 'v7',  driveId: '1oA-MtcTIg5afFIdCXYLJsWm25qNhk9uT', thumbnail: '/video-thumbnails/7.webp' },
  { id: 'v8',  driveId: '1R3bQU3YYXkQrFdVxaKk00XzjMWl109g8', thumbnail: '/video-thumbnails/8.webp' },
  { id: 'v9',  driveId: '1oS8Iq9ZlfRcLUEegls6KLPHQIQCnepWj', thumbnail: '/video-thumbnails/9.webp' },
  { id: 'v10', driveId: '1GYVN70A9tlILyBDB4VzU1usus2rbYouZ', thumbnail: '/video-thumbnails/10.webp' },
  { id: 'v11', driveId: '1jfDtCmNlblnFzdJ1BN4BGwXrP-f0Pz3A', thumbnail: '/video-thumbnails/11.webp' },
  { id: 'v12', driveId: '1195aHfJ5dipHwxKRu3DcVhBVukBuNC9O', thumbnail: '/video-thumbnails/12.webp' },
];

function getEmbedUrl(driveId: string) {
  return `https://drive.google.com/file/d/${driveId}/preview`;
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
  video,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  video: Video;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const [muted, setMuted] = useState(false);

  // Close on Escape / arrow keys
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      {/* Content */}
      <div
        className="relative flex flex-col items-center w-full max-w-sm mx-auto px-4"
        style={{ maxHeight: '95vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="w-full flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: '#C8A96E' }}>
              CarDee
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMuted(m => !m)}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all"
            >
              {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Video */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10" style={{ aspectRatio: '9/16' }}>
          <iframe
            key={video.driveId + (muted ? '-m' : '')}
            src={getEmbedUrl(video.driveId) + (muted ? '&mute=1' : '')}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
            title="CarDee"
          />
          {/* Gold corner accents */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 rounded-tl-sm" style={{ borderColor: '#C8A96E' }} />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 rounded-tr-sm" style={{ borderColor: '#C8A96E' }} />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 rounded-bl-sm" style={{ borderColor: '#C8A96E' }} />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 rounded-br-sm" style={{ borderColor: '#C8A96E' }} />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-medium transition-all disabled:opacity-25 disabled:cursor-not-allowed"
            style={{ borderColor: hasPrev ? '#C8A96E' : '#3A3A3A', color: hasPrev ? '#C8A96E' : '#555' }}
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Prev
          </button>
          <span className="text-white/30 text-xs font-mono">
            {videos.findIndex(v => v.id === video.id) + 1} / {videos.length}
          </span>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-medium transition-all disabled:opacity-25 disabled:cursor-not-allowed"
            style={{ borderColor: hasNext ? '#C8A96E' : '#3A3A3A', color: hasNext ? '#C8A96E' : '#555' }}
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Video Card ────────────────────────────────────────────────────────────────
function VideoCard({
  video,
  index,
  isVisible,
  onClick,
}: {
  video: Video;
  index: number;
  isVisible: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  return (
    <div
      className="group relative cursor-pointer rounded-2xl overflow-hidden border transition-all duration-500"
      style={{
        aspectRatio: '9/16',
        borderColor: hovered ? '#C8A96E' : '#2A2A2A',
        background: '#111111',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
        transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, border-color 0.3s`,
        boxShadow: hovered ? '0 0 32px rgba(200,169,110,0.18)' : '0 4px 24px rgba(0,0,0,0.4)',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Local thumbnail */}
      {!thumbFailed ? (
        <img
          src={video.thumbnail}
          alt="CarDee"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.07)' : 'scale(1)' }}
          onError={() => setThumbFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1a1a1a 0%,#111 100%)' }}>
          <Play className="w-10 h-10" style={{ color: '#C8A96E', opacity: 0.4 }} />
        </div>
      )}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.1) 100%)',
          opacity: hovered ? 1 : 0.75,
        }}
      />

      {/* Gold corner accent (top-left) */}
      <div className="absolute top-3 left-3 pointer-events-none">
        <div
          className="w-4 h-4 border-t-2 border-l-2 transition-opacity duration-300"
          style={{ borderColor: '#C8A96E', opacity: hovered ? 1 : 0.4, borderRadius: '2px 0 0 0' }}
        />
      </div>

      {/* Play button */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300"
          style={{
            background: 'rgba(200,169,110,0.15)',
            borderColor: '#C8A96E',
            backdropFilter: 'blur(8px)',
            transform: hovered ? 'scale(1)' : 'scale(0.8)',
          }}
        >
          <Play className="w-5 h-5 ml-1" style={{ color: '#C8A96E' }} fill="#C8A96E" />
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div
          className="transition-all duration-300"
          style={{ transform: hovered ? 'translateY(0)' : 'translateY(4px)', opacity: hovered ? 1 : 0.85 }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-px" style={{ background: '#C8A96E' }} />
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: '#C8A96E' }}>
              CarDee
            </span>
          </div>
        </div>
        {/* Index number */}
        <span
          className="absolute bottom-3 right-4 text-[10px] font-mono"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          [{String(index + 1).padStart(2, '0')}]
        </span>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────
export default function VideoGallery() {
  const sectionRef = useScrollAnimation({ threshold: 0.06 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { openModal } = useBooking();

  // Mirror isVisible from the section observer for VideoCard stagger
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); ob.disconnect(); } },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );
    ob.observe(section);
    return () => ob.disconnect();
  }, [sectionRef]);

  const openVideo = (index: number) => setActiveIndex(index);
  const closeVideo = () => setActiveIndex(null);
  const goPrev = () => setActiveIndex(i => (i !== null && i > 0 ? i - 1 : i));
  const goNext = () => setActiveIndex(i => (i !== null && i < videos.length - 1 ? i + 1 : i));

  const activeVideo = activeIndex !== null ? videos[activeIndex] : null;

  return (
    <>
      <section
        ref={sectionRef}
        id="video-gallery"
        className="bg-dark py-16 lg:py-24 relative overflow-hidden"
      >
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 40% at 50% 0%, rgba(200,169,110,0.05) 0%, transparent 70%)`,
          }}
        />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 relative">

          {/* ── Section Header ── */}
          <div
            className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
            data-animate="fade-up"
            data-animate-delay="0"
            data-animate-duration="700"
          >
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase" style={{ color: '#C8A96E' }}>
                [Behind The Craft]
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mt-3 leading-tight">
                Watch Us Work.
                <br />
                <span style={{ color: '#C8A96E' }}>See The Difference.</span>
              </h2>
              <p className="text-sm leading-relaxed mt-4 max-w-md" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Every frame captures the precision and passion that goes into each vehicle we handle — from raw clay to mirror-finish perfection.
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
              {/* Stats pill */}
              <div
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl border"
                style={{ background: '#111111', borderColor: '#2A2A2A' }}
              >
                <div className="text-right">
                  <p className="text-white text-lg font-semibold leading-none">{videos.length}</p>
                  <p className="text-[10px] font-mono tracking-widest uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Videos
                  </p>
                </div>
                <div className="w-px h-8" style={{ background: '#2A2A2A' }} />
                <div>
                  <p className="text-white text-lg font-semibold leading-none">Real</p>
                  <p className="text-[10px] font-mono tracking-widest uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Work
                  </p>
                </div>
              </div>
              <button
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 text-xs font-medium transition-colors"
                style={{ color: '#C8A96E', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Book a session like this →
              </button>
            </div>
          </div>

          {/* ── Divider ── */}
          <div
            className="mb-10 h-px"
            data-animate="fade-right"
            data-animate-delay="200"
            data-animate-duration="900"
            style={{
              background: 'linear-gradient(to right, #C8A96E, transparent)',
              opacity: 0.35,
            }}
          />

          {/* ── Grid ── */}
          {/* Row 1: 4 cards | Row 2: 4 cards | Row 3: 4 cards */}
          <div className="space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {videos.slice(0, 4).map((video, i) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={i}
                  isVisible={isVisible}
                  onClick={() => openVideo(i)}
                />
              ))}
            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {videos.slice(4, 8).map((video, i) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={i + 4}
                  isVisible={isVisible}
                  onClick={() => openVideo(i + 4)}
                />
              ))}
            </div>
            {/* Row 3 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {videos.slice(8).map((video, i) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={i + 8}
                  isVisible={isVisible}
                  onClick={() => openVideo(i + 8)}
                />
              ))}
            </div>
          </div>

          {/* ── Bottom caption ── */}
          <p
            className="text-center text-[11px] font-mono tracking-widest uppercase mt-10"
            data-animate="fade-up"
            data-animate-delay="500"
            data-animate-duration="600"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            Click any video to play · Use ← → keys to navigate
          </p>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {activeVideo && (
        <Lightbox
          video={activeVideo}
          onClose={closeVideo}
          onPrev={goPrev}
          onNext={goNext}
          hasPrev={activeIndex !== null && activeIndex > 0}
          hasNext={activeIndex !== null && activeIndex < videos.length - 1}
        />
      )}
    </>
  );
}
