module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    // 允許 console 用於除錯
    'no-console': 'off',
    // 允許 any 用於快速開發
    '@typescript-eslint/no-explicit-any': 'off',
    // 允許未使用的變數（如 _ 開頭）
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    // 允許 require
    '@typescript-eslint/no-var-requires': 'off',
    // 允許 jsx 在 .tsx 檔案中
    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx', '.jsx'] }],
    // 允許 import devDependencies
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
