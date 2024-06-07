/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: 'jit',
  theme: {
    screens: {
      sm: '360px',
      // => @media (min-width: 640px) { ... }

      md: '744px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        bomi: {
          DEFAULT: '#A4DD5A',
        },
        yermi: {
          DEFAULT: '#79DCEF',
        },
        gauri: {
          DEFAULT: '#FFD622',
        },
        gyeouri: {
          DEFAULT: '#ADADF1',
        },
      },
    },

    fontFamily: {
      PyeongChangPeaceBold: ['PyeongChangPeace-Bold'],
      PyeongChangPeace: ['PyeongChangPeace'],
      roboto: ['var(--font-roboto)'],
      apple: ['AppleSDGothicNeo', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
