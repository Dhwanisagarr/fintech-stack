import './globals.css'
import AnimatedBackground from '@/components/AnimatedBackground'

export const metadata = {
  title: 'Fintech Stack Optimizer — Build Your Money Stack',
  description: 'Find the best banking, UPI, investing, and credit apps for your lifestyle in 60 seconds',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white antialiased min-h-screen">
        <AnimatedBackground />
        {children}
      </body>
    </html>
  )
}
