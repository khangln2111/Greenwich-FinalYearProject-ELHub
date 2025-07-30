import { DEFAULT_THEME, createTheme, mergeMantineTheme } from "@mantine/core";
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

// const primary: MantineColorsTuple = [
//   "#f3f1ff",
//   "#ebe5ff",
//   "#d9ceff",
//   "#bea6ff",
//   "#9f75ff",
//   "#843dff",
//   "#7916ff",
//   "#6b04fd",
//   "#5a03d5",
//   "#4b05ad",
//   "#2c0076",
// ];

export const themeOverride = createTheme({
  colors: {
    primary: [...DEFAULT_THEME.colors.blue],
  },
  fontFamily: `Roboto, ${DEFAULT_THEME.fontFamily}`,
  primaryColor: "primary",
  primaryShade: { dark: 8, light: 6 },
  cursorType: "pointer",
  breakpoints: {
    xs: "36em", // 576px
    sm: "40em", // 640px
    md: "48em", // 768px
    lg: "64em", // 1024px
    xl: "80em", // 1280px
    "2xl": "96em", // 1536px
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
  // lineHeights: {
  //   xs: (1 / 0.75).toString(),
  //   sm: (1.25 / 0.875).toString(),
  //   md: (1.5 / 1).toString(),
  //   lg: (1.75 / 1.125).toString(),
  //   xl: (1.75 / 1.25).toString(),
  // },
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
  shadows: {
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  defaultRadius: "md",
});

const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
// const theme = themeOverride;
export default theme;
