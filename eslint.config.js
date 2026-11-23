// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const globals = require('globals');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'android/*', 'ios/*', 'coverage/*'],
  },
  {
    rules: {
      // `@env` é um módulo virtual gerado pelo react-native-dotenv.
      'import/no-unresolved': ['error', { ignore: ['^@env$'] }],
      // Falso positivo com `import styled from 'styled-components/native'`.
      'import/no-named-as-default': 'off',
    },
  },
  {
    files: ['jest.setup.js', 'src/__tests__/**'],
    languageOptions: {
      globals: globals.jest,
    },
  },
  {
    // Interfaces vazias são a forma idiomática de declaration merging
    // (tema do styled-components e RootParamList do React Navigation).
    files: ['**/*.d.ts', 'src/routes/types.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
]);
