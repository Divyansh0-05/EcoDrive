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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
          border: 'var(--border)',
        },
        eco: {
          primary: '#2D7D46',
          dark: '#1A4D2E',
          accent: '#4CAF50',
          glow: '#10B981',
          light: '#E8F5E9',
          bg: 'var(--eco-bg)',
        },
        border: 'var(--border)',
        ring: 'var(--ring)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        }
      },
      boxShadow: {
        'glow-green': '0 0 15px rgba(16, 185, 129, 0.15)',
        'glow-green-lg': '0 0 25px rgba(16, 185, 129, 0.3)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
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
