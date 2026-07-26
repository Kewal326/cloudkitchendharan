/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFFFFF",
        maroon: {
          DEFAULT: "#7F1D1D",
          dark: "#5F1717"
        },
        gold: "#F59E0B",
        action: "#F59E0B",
        brand: "#E23744"
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
        },
        pageEnter: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        sheetEnter: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" }
        }
      },
      animation: {
        "cart-shake": "cartShake 420ms ease-in-out",
        "page-enter": "pageEnter 380ms cubic-bezier(0.22,1,0.36,1) both",
        "sheet-enter": "sheetEnter 320ms cubic-bezier(0.22,1,0.36,1) both"
      }
    }
  },
  plugins: []
};
