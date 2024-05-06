module.exports = {
  parser: "babel-eslint",
  env: {
    es6: false,
    node: false,
    browser: false
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: false
    }
  },
  // plugins: ["react"],
  // extends: [
  //   "eslint:recommended",
  //   "plugin:react/recommended",
  //   "plugin:prettier/recommended"
  // ]
};
