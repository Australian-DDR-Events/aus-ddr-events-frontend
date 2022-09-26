const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  "core": {
    "builder": {
      name: 'webpack5',
      options: {
        lazyCompilation: true,
      },
    },
  },
  "webpackFinal": async config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [
          new TsconfigPathsPlugin()
        ],
      },
    };
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chakra-ui/storybook-addon"
  ],
  "features": {
    emotionAlias: false,
  },
  "framework": "@storybook/react",
}