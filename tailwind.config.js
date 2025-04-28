export const theme = {
  extend: {
    colors: {
      background: 'var(--color-background)',
      foreground: 'var(--color-foreground)',
    },
    fontFamily: {
      sans: 'var(--font-sans)',
      mono: 'var(--font-mono)',
    },
  },
};
export const plugins = [];
export const content = [
  './app/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  './pages/**/*.{js,ts,jsx,tsx}',
  './public/**/*.{js,ts,jsx,tsx}',
  './styles/**/*.{js,ts,jsx,tsx}',
];