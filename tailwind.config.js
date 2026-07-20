/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E11D48',
          hover: '#BE123C',
          glow: 'rgba(225, 29, 72, 0.35)',
        },
        secondary: {
          DEFAULT: '#FB7185',
          hover: '#F43F5E',
        },
        accent: '#E11D48',
        background: '#FFF1F2',
        foreground: '#4C0519',
        muted: '#F0ECF2',
        border: '#FECDD3',
        destructive: '#DC2626',
        ring: '#E11D48',
      },
      fontFamily: {
        heading: ['Fredoka', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
