import './globals.css'
import InteractiveDotsBackground from '@/components/ui/interactive-dots-background'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fintechstackoptimizer.vercel.app'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Stack Optimizer — Build Your Money Stack',
    template: '%s | Stack Optimizer',
  },
  description: 'Build a fintech stack that actually fits you. Discover and personalize the best banking, UPI, investing, credit, and travel apps in 60 seconds.',
  keywords: [
    'fintech stack',
    'fintech optimizer',
    'money stack',
    'banking apps',
    'investing apps',
    'upi apps',
    'credit card rewards',
    'zerodha',
    'groww',
    'cred',
    'hdfc bank',
  ],
  authors: [{ name: 'Dhwani Sagar' }],
  creator: 'Dhwani Sagar',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Stack Optimizer — Build Your Money Stack',
    description: 'Build a fintech stack that actually fits you. Discover and personalize the best banking, UPI, investing, credit, and travel apps in 60 seconds.',
    siteName: 'Stack Optimizer',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Stack Optimizer — Build Your Money Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stack Optimizer — Build Your Money Stack',
    description: 'Build a fintech stack that actually fits you. Discover and personalize the best banking, UPI, investing, credit, and travel apps in 60 seconds.',
    images: ['/og-image.png'],
    creator: '@dhwanisagar',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased min-h-screen relative font-sans selection:bg-zinc-800 selection:text-white">
        <InteractiveDotsBackground
          dotColor="#52525b"
          spacing={52}
          proximityRadius={200}
          backgroundOpacity={0.15}
          maxOpacity={0.9}
        />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
