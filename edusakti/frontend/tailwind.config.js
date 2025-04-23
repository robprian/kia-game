module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          preschool: '#FF6B6B',
          elementary: '#45B7D1',
        },
        secondary: {
          preschool: '#4ECDC4',
          elementary: '#98D8D6',
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
      }
    },
  },
  plugins: [],
}
