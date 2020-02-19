module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
    'prettier/@typescript-eslint',
    'prettier',
  ],
  rules: {
    'max-len': [
      'error',
      { code: 100, ignoreStrings: true, ignoreComments: true },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'arrow-parens': ['error', 'always'],
    'implicit-arrow-linebreak': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.spec.js',
          '**/*.test.ts',
          '**/*.spec.ts',
        ],
      },
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
