module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      '@babel/plugin-transform-nullish-coalescing-operator',
      '@babel/plugin-transform-optional-chaining',
      '@babel/plugin-transform-arrow-functions',
      '@babel/plugin-transform-shorthand-properties',
      '@babel/plugin-transform-template-literals',
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "blacklist": null, // DEPRECATED
        "whitelist": null, // DEPRECATED
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }],
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.ts',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
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
