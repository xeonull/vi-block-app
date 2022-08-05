module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/base", "plugin:vue/vue3-essential", "eslint:recommended", "@vue/typescript/recommended", "plugin:prettier/recommended"],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "vue/script-setup-uses-vars": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": ["error", { endOfLine: "auto", printWidth: 160 }],
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
};
