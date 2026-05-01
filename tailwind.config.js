/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8F1",
        maroon: {
          DEFAULT: "#7F1D1D",
          dark: "#5F1717"
        },
        gold: "#F59E0B"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(95, 23, 23, 0.12)"
      },
      keyframes: {
        cartShake: {
          "0%, 100%": { transform: "translateX(0) rotate(0)" },
          "20%": { transform: "translateX(-3px) rotate(-3deg)" },
          "40%": { transform: "translateX(3px) rotate(3deg)" },
          "60%": { transform: "translateX(-2px) rotate(-2deg)" },
          "80%": { transform: "translateX(2px) rotate(2deg)" }
        }
      },
      animation: {
        "cart-shake": "cartShake 420ms ease-in-out"
      }
    }
  },
  plugins: []
};
