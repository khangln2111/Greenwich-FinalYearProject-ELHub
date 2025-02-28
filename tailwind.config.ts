// Auto-fit auto-fill grid utility
const createGridAuto = ({ matchUtilities, theme }) => {
  const types = ["fill", "fit"]; // Tạo một mảng chứa cả 2 loại auto-fill và auto-fit

  types.forEach((type) => {
    matchUtilities(
      {
        [`grid-cols-${type}`]: (value) => ({
          "grid-template-columns": `repeat(auto-${type}, minmax(min(${value}, 100%), 1fr))`,
        }),
      },
      { values: theme("spacing") },
    );
  });
};

// Hide scrollbar utility
const hideScrollbar = ({ addUtilities }) => {
  addUtilities({
    ".hide-scrollbar": {
      "-ms-overflow-style": "none",
      "scrollbar-width": "none",
    },
  });
};

const customPlugins = [hideScrollbar, createGridAuto];

const config = {
  // content: [
  //   "./src/**/*.{js,ts,jsx,tsx}",
  //   "./src/**/*.{html,js}",
  //   "./public/index.html",
  // ],
  // plugins: [...customPlugins],
};
export default config;
