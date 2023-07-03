module.exports = function(api) {
  api.cache(true);
  return {
      presets: ['babel-preset-expo'],
      plugins: [
          'react-native-reanimated/plugin', // This line.
          ["module:react-native-dotenv", {
              "envName": "APP_ENV",
              "moduleName": "@env",
              "path": ".env",
          }]
      ],
  };
};
