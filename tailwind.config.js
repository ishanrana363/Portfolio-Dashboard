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
    },
  },
  plugins: [require('daisyui')],
}
