module.exports = {
  extends: [
    'airbnb-typescript',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    extraFileExtensions: ['.json'],
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'jsx-a11y/href-no-hash': ['off'],
    'react/jsx-filename-extension': [
      'off',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'max-len': [
      'warn',
      {
        code: 80,
        tabWidth: 2,
        comments: 80,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'no-console': 'error',
    'no-alert': 'error',
    'import/no-internal-modules': [
      'error',
      {
        allow: [
          'components/*',
          '**/components/*',
          'context/*',
          'features/*',
          'hooks/*',
          'services/*',
          'types/*',
          'utils/*',
          '!features/*/components/*', // don't allow import from components within a feature
        ],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error', {}
    ],
    'react/destructuring-assignment': 'off',
    'react/props-types': 'off',
    'react/require-default-props': 'off',
    'import/extensions': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
