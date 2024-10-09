export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: { // 'B' should be lowercase
        sideBarColor: "#1E2A5E",
        navBar: "#58A399",
      },
      animation: {
        'zoom-in': 'zoomIn 0.6s ease-in-out forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease-in-out forwards',
        'fade-in-right': 'fadeInRight 0.6s ease-in-out forwards',
      },
      keyframes: {
        zoomIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },

    },
  },
  plugins: [require('daisyui'), require('tailwindcss-animate'),],

}
