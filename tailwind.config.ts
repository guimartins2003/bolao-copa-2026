import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        copa: {
          navy: '#0a1628',
          blue: '#1a3a5c',
          green: '#1b6b3a',
          gold: '#d4a017',
          red: '#c1272d',
        },
      },
    },
  },
  plugins: [],
}

export default config
