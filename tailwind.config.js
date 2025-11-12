/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#008037',
          8: 'rgba(0, 128, 55, 0.08)',
          16: 'rgba(0, 128, 55, 0.16)',
          24: 'rgba(0, 128, 55, 0.24)',
          40: 'rgba(0, 128, 55, 0.40)',
          60: 'rgba(0, 128, 55, 0.60)',
          80: 'rgba(0, 128, 55, 0.80)',
          85: 'rgba(0, 128, 55, 0.85)',
          70: 'rgba(0, 128, 55, 0.70)',
          50: 'rgba(0, 128, 55, 0.50)'
        },
        background: '#FFFFFF',
        text: {
          primary: 'rgba(0, 128, 55, 0.85)',
          secondary: 'rgba(0, 128, 55, 0.70)',
          placeholder: 'rgba(0, 128, 55, 0.50)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif']
      },
      fontSize: {
        'h1': ['24px', { lineHeight: '1.2', fontWeight: '600' }],
        'h1-lg': ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        'h2': ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        'h2-lg': ['22px', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-lg': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '1.5', fontWeight: '500' }],
        'body-md-lg': ['16px', { lineHeight: '1.5', fontWeight: '500' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
        'caption-lg': ['13px', { lineHeight: '1.4', fontWeight: '400' }]
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '32': '32px',
        '40': '40px'
      },
      borderRadius: {
        'card': '12px',
        'button': '12px',
        'input': '8px'
      },
      boxShadow: {
        'primary': '0 2px 8px rgba(0, 128, 55, 0.12)'
      },
      container: {
        center: true,
        padding: '16px',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1040px',
          '2xl': '1200px'
        }
      },
      screens: {
        'mobile': {'max': '767px'},
        'tablet': {'min': '768px', 'max': '1023px'},
        'desktop': {'min': '1024px'}
      }
    },
  },
  plugins: [],
}

