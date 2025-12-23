// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF4C4C",       // Red
        secondary: "#FFB74D",     // Orange
        accent: "#FFD700",        // Gold / Yellow
        rsvpBg: "#F3F4F6",        // Light Gray
        rsvpText: "#111827",      // Dark Gray
        rsvpTextSecondary: "#6B7280", // Gray
        success: "#34D399",       // Green
        warning: "#F87171",       // Soft Red
        softBlue: "#93C5FD",      // Light Blue
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        chalk: ['"Sketch Chalk"', "cursive"],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        slideDown: "slideDown 0.5s linear forwards",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
