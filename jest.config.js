module.exports = {
  testURL: 'http://localhost:7000',
  testEnvironment: 'jsdom',
  verbose: false,
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: false,
    localStorage: null,
  },
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
  }
};
