const path = require("path");

module.exports = {
  ident: 'postcss',
  plugins: {
    "postcss-flexbugs-fixes":{},
    "postcss-import": {
      // root: path.join(__dirname, '../'),
      // path: [path.join(__dirname, '../components')]
    },
    "postcss-cssnext": {
        browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 11', // React doesn't support IE8 anyway
        ],
    },
    "postcss-reporter": {
      clearMessages: true
    }
  }
};
