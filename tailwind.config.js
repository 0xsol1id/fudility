// default settings can be found here
// https://unpkg.com/browse/tailwindcss@2.2.17/stubs/defaultConfig.stub.js

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // or 'false' or 'class'
  theme: {
    fontFamily: {
      // sans: ['Graphik', 'sans-serif'],
      // serif: ['Merriweather', 'serif'],
    },
    extend: {
      // spacing: {
      //   '128': '32rem',
      //   '144': '36rem',
      // },
      // borderRadius: {
      //   '4xl': '2rem',
      // }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      // first one will be the default theme
      {
        'soljunks': {                          /* your theme name */
        "primary": "#df7126",
        "primary-focus": "#ca710c",
        "primary-content": "#3f3f74",
        "secondary": "#6d3a9c",
        "secondary-focus": "#532c77",
        "secondary-content": "#ffffff",
        "accent": "#51a800",
        "accent-focus": "#397500",
        "accent-content": "#ffffff",
        "neutral": "#1b1d1d",
        "neutral-focus": "#3f3f74",
        "neutral-content": "#ffffff",
        "base-100": "#3f3f74",
        "base-200": "#2d2d41",
        "base-300": "#23232d",
        "base-content": "#ffffff",
        "info": "#66c6ff",
        "success": "#87d039",
        "warning": "#e2d562",
        "error": "#ff6f6f",
        "--border-color": "var(--b3)",
        "--rounded-box": "1rem",
        "--rounded-btn": "0.5rem",
        "--rounded-badge": "1.9rem",
        "--animation-btn": "0.25s",
        "--animation-input": ".2s",
        "--btn-text-case": "uppercase",
        "--btn-focus-scale": "0.95",
        "--navbar-padding": ".5rem",
        "--border-btn": "1px",
        "--tab-border": "1px",
        "--tab-radius": "0.5rem",
        },
      },
      // "dark",
      // uncomment to enable
      // "light (default)",
      // "dark",
      // "cupcake",
      // "bumblebee",
      // "emerald",
      // "corporate",
      // "synthwave",
      // "retro",
      // "cyberpunk",
      // "valentine",
      // "halloween",
      // "garden",
      // "forest",
      // "aqua",
      // "lofi",
      // "pastel",
      // "fantasy",
      // "wireframe",
      // "black",
      // "luxury",
      // "dracula",
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
