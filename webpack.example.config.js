const path = require('path');

module.exports = {
  entry: './example/index.jsx',
  output: {
    filename: 'example.js',
    path: path.resolve(__dirname, './build/'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'es2015', 'stage-2'] }
        }],
      },
    ],
  },
  devtool: 'source-map',
};