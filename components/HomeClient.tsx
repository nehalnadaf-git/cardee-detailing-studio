'use client';

import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import CarShowcase from '@/components/sections/CarShowcase';
import About from '@/components/sections/About';
import Gallery from '@/components/sections/Gallery';
import VideoGallery from '@/components/sections/VideoGallery';
import USP from '@/components/sections/USP';
import ServicesIntro from '@/components/sections/ServicesIntro';
import InteriorService from '@/components/sections/InteriorService';
import ServicesGrid from '@/components/sections/ServicesGrid';
import ServiceCards from '@/components/sections/ServiceCards';
import CTABanner from '@/components/sections/CTABanner';
import Footer from '@/components/sections/Footer';
import BookingModal from '@/components/ui/BookingModal';

export default function HomeClient() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
      <BookingModal />
      <Navbar />
      <main>
        <Hero />
        <CarShowcase />
        <About />
        <Gallery />
        <VideoGallery />
        <USP />
        <ServicesIntro />
        <InteriorService />
        <ServicesGrid />
        <ServiceCards />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
