/**
 * POSTCSS CONFIG
 *
 * Processes CSS through Tailwind v4's PostCSS plugin.
 * This is what makes @import "tailwindcss" work in globals.css.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
