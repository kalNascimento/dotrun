module.exports = function (api) {
  api.cache(true);
  return {
    // babel-preset-expo já inclui as transformações modernas e o plugin do
    // react-native-worklets (Reanimated 4), então não é preciso declará-los aqui.
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
          alias: {
            '@buttons': './src/components/buttons',
            '@inputs': './src/components/inputs',
            '@configs': './src/common/configs',
            '@hooks': './src/hooks',
            '@theme': './src/theme',
            '@assets': './assets',
          },
        },
      ],
    ],
  };
};
