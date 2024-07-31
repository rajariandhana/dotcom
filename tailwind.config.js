/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./resources/**/*.blade.php",
      "./resources/**/*.js",
      "./resources/**/*.vue",
      "./node_modules/flowbite/**/*.js",
    ],
    theme: {
      extend: {
        fontFamily:{
          roboto: "'Roboto', sans-serif",
          poppins:"'Poppins', sans-serif",
          montserrat:"'Montserrat', sans-serif",
        }
      },
    },
    plugins: [
        require('flowbite/plugin')
    ]
  }
