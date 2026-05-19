/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#070a09', // Deep space dark forest
        foreground: '#e2e8f0',
        card: {
          DEFAULT: 'rgba(15, 23, 20, 0.4)', // Glassmorphic card
          foreground: '#f8fafc',
          border: 'rgba(255, 255, 255, 0.05)',
        },
        eco: {
          primary: '#2D7D46',
          dark: '#1A4D2E',
          accent: '#4CAF50',
          glow: '#10B981', // Emerald glow
          light: '#E8F5E9',
          bg: '#0F1F17',
        },
        border: 'rgba(255, 255, 255, 0.08)',
        ring: 'rgba(16, 185, 129, 0.4)',
      },
      boxShadow: {
        'glow-green': '0 0 15px rgba(16, 185, 129, 0.15)',
        'glow-green-lg': '0 0 25px rgba(16, 185, 129, 0.3)',
      },
      backdropBlur: {
        'glass': '12px',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
