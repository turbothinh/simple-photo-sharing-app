module.exports = {
  stories: ['../src/**/*.stories.tsx'],

  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-options',
    '@storybook/addon-viewport',
    '@storybook/addon-a11y/register',
    'storybook-addon-react-docgen'
  ],

  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('awesome-typescript-loader'),
          options: {
            configFileName: './.storybook/tsconfig.json',
          },
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });

    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/react-native-/, // Many react-native libraries do not compile their ES6 JS.
      exclude: /node_modules\/react-native-web\//, // react-native-web is already compiled.
      loader: 'babel-loader',
      query: { cacheDirectory: true },
    });

    config.module.rules.push({
      test: /\.(gif|jpe?g|png|svg)$/,
      use: {
        loader: 'url-loader',
        options: { name: '[name].[ext]' }
      }
    });

    config.resolve.extensions = ['.web.js', '.js', '.json', '.web.jsx', '.jsx', '.ts', '.tsx'];

    config.resolve.alias = {
      'react-native': 'react-native-web'
    };

    return config;
  }
};

