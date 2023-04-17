module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    "no-shadow": "off",
    "no-unused-vars": ["warn", {vars: "all", args: "all"}],
    "@typescript-eslint/no-unused-vars": ["warn", {vars: "all", args: "all"}],
    'no-plusplus': 'off',
    'radix': ["error", "as-needed"],
    "indent": ["error", 2, { SwitchCase: 1 }],
    "semi": ["error", "always"],
  },
  ignorePatterns: ["C2VSim_II_VD_02.js", "C2VSim_II_VI_02.js", "cvhm.js", "TshipWell.js"],
};
