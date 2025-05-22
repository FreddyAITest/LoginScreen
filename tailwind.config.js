/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode Palette
        primary: {
          50: '#eff6ff',
          100: '#dbeafe', 
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Haupt-Blau
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Light Mode Grays
        light: {
          bg: '#ffffff',
          surface: '#f8fafc',
          border: '#e2e8f0',
          text: {
            primary: '#1e293b',
            secondary: '#64748b',
            muted: '#94a3b8',
          }
        },
        // Dark Mode Palette  
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          elevated: '#334155',
          border: '#475569',
          text: {
            primary: '#f1f5f9',
            secondary: '#cbd5e1',
            muted: '#94a3b8',
          }
        }
      }
    },
  },
  plugins: [],
}
