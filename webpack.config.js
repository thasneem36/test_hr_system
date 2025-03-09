const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "crypto": false
    }
  },
  entry: './src/index.js',  // Example entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
