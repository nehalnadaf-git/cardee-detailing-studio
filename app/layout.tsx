import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://cardeedetailing.com'),
  title: 'CarDee Detailing Studio | Premium Car Care & Detailing',
  description:
    "CarDee Detailing Studio — Expert interior detailing, ceramic coating, PPF, paint protection, denting & repainting. Professional car care for every vehicle. Open 9:30 AM – 8:00 PM daily. Book now.",
  keywords: [
    'car detailing studio',
    'ceramic coating',
    'PPF installation',
    'paint protection film',
    'interior car detailing',
    'exterior car wash',
    'paint protection',
    'CarDee',
    'professional car care',
    'premium auto detailing',
  ],
  authors: [{ name: 'CarDee Detailing Studio' }],
  creator: 'CarDee Detailing Studio',
  publisher: 'CarDee Detailing Studio',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://cardeedetailing.com/',
    siteName: 'CarDee Detailing Studio',
    title: 'CarDee Detailing Studio | Premium Car Care & Detailing',
    description:
      "Premium car care studio. Ceramic coating, PPF, interior detailing, paint protection & more. Expert detailers, state-of-the-art facility. Book your service today.",
    images: [{ url: '/cardee logo/Cardee logo.webp', width: 800, height: 600, alt: 'CarDee Detailing Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CarDee Detailing Studio | Premium Car Care & Detailing',
    description: "Premium car care studio. Ceramic coating, PPF, interior detailing & more. Book your service today.",
    images: ['/cardee logo/Cardee logo.webp'],
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', rel: 'shortcut icon' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  other: {
    'application-name': 'CarDee',
    'apple-mobile-web-app-title': 'CarDee',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,   // prevents iOS auto-zoom on input focus
  userScalable: false,
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: 'CarDee Detailing Studio',
  image: '/cardee logo/Cardee logo.webp',
  description:
    'CarDee Detailing Studio — premium car care offering ceramic coating, PPF, interior detailing, paint protection, and denting & repainting.',
  url: 'https://cardeedetailing.com',
  telephone: '+919008399596',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Unkal Cross, Opp. Royal Oak Showroom, Vidyanagar',
    addressLocality: 'Hubballi',
    addressRegion: 'Karnataka',
    postalCode: '580031',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 15.3647,
    longitude: 75.124,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:30',
    closes: '20:00',
  },
  priceRange: '₹₹',
  sameAs: ['https://www.instagram.com/cardeedetailing/'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
