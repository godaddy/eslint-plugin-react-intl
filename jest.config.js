module.exports = {
  collectCoverageFrom: ['lib/**/*.js'],
  // Work-around for subpath imports.
  // See: https://giters.com/facebook/jest/issues/11100
  "moduleNameMapper": {
    "@eslint/eslintrc": "@eslint/eslintrc/dist/eslintrc-universal.cjs"
  },
};
