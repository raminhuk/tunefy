import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
          'customPink': '#ff008c',
          'customPink2': '#f00bad',
          'customBlue': '#5160f6'
      },
      gradientColors: {
        'pink-purple-blue': 'linear-gradient(90deg, rgba(255,0,140,1) 0%, rgba(240,11,173,1) 50%, rgba(81,96,246,1) 100%)',
      },
    },
  },
  plugins: [],
}
export default config
