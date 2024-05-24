/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
