import {
  DEFAULT_THEME,
  MantineColorsTuple,
  createTheme,
  mergeMantineTheme,
} from "@mantine/core";
// import { DEFAULT_THEME } from "@mantine/core";

// const primary: MantineColorsTuple = [
//   "#e6ffee",
//   "#d3f9e0",
//   "#a8f2c0",
//   "#7aea9f",
//   "#54e382",
//   "#3bdf70",
//   "#2bdd66",
//   "#1bc455",
//   "#0bae4a",
//   "#00973c",
// ];

const primary: MantineColorsTuple = [
  "#f3f1ff",
  "#ebe5ff",
  "#d9ceff",
  "#bea6ff",
  "#9f75ff",
  "#843dff",
  "#7916ff",
  "#6b04fd",
  "#5a03d5",
  "#4b05ad",
  "#2c0076",
];

export const themeOverride = createTheme({
  colors: {
    primary,
  },
  primaryColor: "blue",
  primaryShade: { dark: 8, light: 6 },
  cursorType: "pointer",
  breakpoints: {
    xs: "40em", // Custom: sm (640px)
    sm: "48em", // Custom: md (768px)
    md: "64em", // Custom: lg (1024px)
    lg: "80em", // Custom: xl (1280px)
    xl: "96em", // Custom: 2xl (1536px)
  },
  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem", // 72px
    "8xl": "6rem", // 96px
    "9xl": "8rem", // 128px
  },
  spacing: {
    xs: "0.625rem", // 10px
    sm: "0.75rem", // 12px
    md: "1rem", // 16px
    lg: "1.25rem", // 20px
    xl: "2rem", // 32px
    "2xl": "2.5rem", // 40px
    "3xl": "3rem", // 48px
    "4xl": "4rem", // 64px
    "5xl": "5rem", // 80px
    "6xl": "6rem", // 96px
    "7xl": "7rem", // 112px
    "8xl": "8rem", // 128px
    "9xl": "9rem", // 144px
    "10xl": "10rem", // 160px
    "11xl": "11rem", // 176px
    "12xl": "12rem", // 192px
    "13xl": "13rem", // 208px
    "14xl": "14rem", // 224px
    "15xl": "15rem", // 240px
    "16xl": "16rem", // 256px
  },
  radius: {
    xs: "0.125rem", // 2px
    sm: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    "3xl": "1.5rem", // 24px
    "4xl": "2rem", // 32px
    "5xl": "3rem", // 48px
    none: "0",
    full: "max(50%, 9999px)", // absolutely full
  },
  defaultRadius: "2xl",
});

const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
// const theme = themeOverride;
export default theme;
