// postcss.config.mjs
const config = {
  plugins: {
    "postcss-preset-mantine": {
      autoRem: true,
    },
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "40em", // Custom:  640px / 16 = 40em
        "mantine-breakpoint-sm": "48em", // Custom: 768px / 16 = 48em
        "mantine-breakpoint-md": "64em", // Custom: 1024px / 16 = 64em
        "mantine-breakpoint-lg": "80em", // Custom: 1280px / 16 = 80em
        "mantine-breakpoint-xl": "96em", // Custom: 1536px / 16 = 96em
        "mantine-breakpoint-2xl": "128em", // Custom: 2048px / 16 = 128em
      },
    },
    "postcss-pxtorem": {
      rootValue: 16, // Giá trị mặc định cho 1 rem (16px)
      unitPrecision: 5, // Số lượng chữ số thập phân sau dấu phẩy
      propList: ["*"], // Áp dụng cho tất cả các thuộc tính
      selectorBlackList: [], // Có thể thêm các selector để loại trừ
      replace: true, // Thay thế px bằng rem
      mediaQuery: false, // Không chuyển đổi trong media queries
      minPixelValue: 0, // Không chuyển đổi các giá trị nhỏ hơn 0px
    },
    "@tailwindcss/postcss": {},
  },
};

export default config;
