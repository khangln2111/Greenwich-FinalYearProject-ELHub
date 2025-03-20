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

const visibility = ({ matchUtilities, theme }) => {
  // Lọc bỏ __CSS_VALUES__ khỏi theme.screens
  const screens = Object.fromEntries(
    Object.entries(theme("screens")).filter(
      ([key]) => key !== "__CSS_VALUES__",
    ),
  );

  matchUtilities(
    {
      "hidden-from": (value) => ({
        [`@media (min-width: ${value})`]: {
          display: "none !important",
        },
      }),
      "visible-from": (value) => {
        const numericValue = parseFloat(value);

        if (isNaN(numericValue)) {
          console.error(`Invalid value for visible-from: ${value}`);
          return {};
        }

        return {
          [`@media (max-width: ${(numericValue - 0.00625).toFixed(5)}em)`]: {
            display: "none !important",
          },
        };
      },
    },
    { values: screens }, // Dùng screens đã lọc
  );
};
const customPlugins = [visibility];

const config = {
  // content: [
  //   "./src/**/*.{js,ts,jsx,tsx}",
  //   "./src/**/*.{html,js}",
  //   "./public/index.html",
  // ],
  plugins: [...customPlugins],
};
export default config;
