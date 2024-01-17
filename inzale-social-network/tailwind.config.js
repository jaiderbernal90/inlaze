/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      letterSpacing: {
        tightest: '-.075em',
      },
      fontFamily: {
        'body': ['"Open Sans"', ]
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
