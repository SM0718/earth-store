/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rightIn: {
          '0%': { right: '-400px' },
          '100%': { right: '0px' },
        }
      },
      animation: {
        bringIn: 'rightIn 2s linear',
      }
    },
    fontFamily: {
      serif: ["Roboto", "Jost"]
    },
  },
  plugins: [
    function ({addUtilities}) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }
      };

      addUtilities(newUtilities);
    }
  ],
}

