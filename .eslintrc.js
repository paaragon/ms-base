module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'google',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'require-jsdoc': ['off'],
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', { 'code': 120 }],
    'new-cap': ['off'],
    'semi': ['off'],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: 'packages/*/src',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
