module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base', 'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint', 'prettier'
  ],
  ignorePatterns: ["dist", "public", "views"],
  rules: {
    "import/extensions": [1, { "js": "never", "json": "always", "ts": "never" }],
  },
};
