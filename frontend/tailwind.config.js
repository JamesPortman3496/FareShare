/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "90rem",
      },
      colors: {
        "background-1": "var(--background-1)",
        "background-2": "var(--background-2)",
        "background-3": "var(--background-3)",
        border: "var(--border)",
        "text-1": "var(--text-1)",
        "text-2": "var(--text-2)",
        "text-3": "var(--text-3)",
        "primary-1": "var(--primary-1)",
        "primary-2": "var(--primary-2)",
        "primary-3": "var(--primary-3)",
        danger: "var(--danger)",
        warning: "var(--warning)",
        success: "var(--success)",
        info: "var(--info)",
        "surface-contrast": "var(--surface-contrast)",
        "text-contrast": "var(--text-contrast)",
        background: "var(--background)",
        foreground: "var(--foreground)"
      },      
    },
  },
  plugins: [],
};
