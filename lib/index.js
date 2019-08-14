const requireIndex = require('requireindex');
const path = require('path');

module.exports.rules = requireIndex(path.join(__dirname, 'rules'));

module.exports.configs = {
  recommended: {
    plugins: [
      '@godaddy/react-intl'
    ],
    rules: {
      '@godaddy/react-intl/id-missing': 2,
      '@godaddy/react-intl/id-prefix': [0, []],
      '@godaddy/react-intl/no-default': 2
    },
    settings: {
      localeFiles: ['locales/en-US.json']
    }
  }
};
