/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fintech: {
          green: '#22c55e',
          neon: '#4ade80',
          emerald: '#10b981',
          dark: '#050505',
          secondary: '#0b0f0b',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(34, 197, 94, 0.25)',
        'glow-sm': '0 0 20px rgba(34, 197, 94, 0.15)',
        'glow-lg': '0 0 60px rgba(74, 222, 128, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
