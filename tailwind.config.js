/** @type {import('tailwindcss').Config} */
export default {
  // Tell Tailwind where to look for class names
  content: [
    './index.html',           // scan index.html
    './src/**/*.{js,ts,jsx,tsx}', // scan everything in src (components, pages)
  ],

  theme: {
    extend: {
      // Add our custom font
      fontFamily: {
        // Creates a new utility class: font-constitution
        // First option is our imported font (Cinzel Decorative from Google Fonts)
        // Fallback 'serif' makes sure text stays readable if font fails to load
        constitution: ['"Cinzel Decorative"', 'serif'],
      },
    },
  },

  // No extra Tailwind plugins yet, leave empty
  plugins: [],
};
