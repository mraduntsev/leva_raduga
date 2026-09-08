/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
    extend: {
      fontFamily: {
        display: ['"Russo One"', 'system-ui', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
        body: ['Rubik', 'system-ui', 'sans-serif']
      }
    }
  }
}