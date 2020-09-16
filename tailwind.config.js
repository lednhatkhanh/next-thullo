module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
    textColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    cursor: ['responsive', 'hover', 'focus', 'disabled'],
  },
  plugins: [require('@tailwindcss/typography')],
};
