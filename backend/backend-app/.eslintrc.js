module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: null, // keep null unless you use type-aware rules
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // turns off conflicting rules
  ],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'lf' }],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  ignorePatterns: ['dist', 'node_modules'],
};
