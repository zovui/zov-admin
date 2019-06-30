module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard", "@vue/prettier"],
  plugins: ["vue"],
  rules: {
    "prettier/prettier": "error", // allow async-await
    "generator-star-spacing": "off",
    "no-console":
      process.env.NODE_ENV === "production" && process.env.CORE_MIN === "lib"
        ? "error"
        : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-useless-return": "off",
    "vue/no-parsing-error": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
