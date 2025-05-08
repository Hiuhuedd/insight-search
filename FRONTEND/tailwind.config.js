

module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            light: '#3B82F6',
            DEFAULT: '#2563EB',
            dark: '#1D4ED8',
          },
          dark: {
            light: '#1E1E2F',
            DEFAULT: '#12121C',
            dark: '#0A0A10',
          }
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        spacing: {
          '9/16': '56.25%',
        },
        letterSpacing: {
          tighter: '-0.02em',
        },
        lineHeight: {
          tight: '1.2',
        },
        boxShadow: {
          sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
          DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
          md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-up': 'slideUp 0.5s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
        },
      },
    },
    plugins: [],
  }