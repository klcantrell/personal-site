/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#fefdf8',
          100: '#fdf9ed',
          200: '#f9f0d1',
          300: '#f4e4a6',
          400: '#e6c454',  // Main PCB copper color
          500: '#d4af37',  // Primary PCB gold
          600: '#b8941f',
          700: '#9a7b1a',
          800: '#7f631c',
          900: '#6b521d',
          950: '#3e2f0e',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}