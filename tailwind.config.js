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
        },
        animation: {
            'infinite-scroll-5-LR': 'infinite-scroll-LR 5s linear infinite',
            'infinite-scroll-5-RL': 'infinite-scroll-RL 5s linear infinite',
            'infinite-scroll-10-LR': 'infinite-scroll-LR 10s linear infinite',
            'infinite-scroll-10-RL': 'infinite-scroll-RL 10s linear infinite',
            marquee: 'marquee 10s linear infinite',
            marquee2: 'marquee2 10s linear infinite',
          },
        keyframes: {
            'infinite-scroll-LR': {
                from: { transform: 'translateX(0)' },
                to: { transform: 'translateX(-100%)' },
            },
            'infinite-scroll-RL': {
                from: { transform: 'translateX(-100%)' },
                to: { transform: 'translateX(0)' },
            },
            marquee: {
                '0%': { transform: 'translateX(0%)' },
                '100%': { transform: 'translateX(-100%)' },
              },
            marquee2: {
            '0%': { transform: 'translateX(0%)' },
            '100%': { transform: 'translateX(-100%)' },
            },
        },
      },
    },
    plugins: [
        require('flowbite/plugin')
    ]
  }
