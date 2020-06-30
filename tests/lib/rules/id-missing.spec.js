const rule = require('../../../lib/rules/id-missing');
const RuleTester = require('eslint').RuleTester;
const defaultSettings = require('../../../lib');

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

const defaultLocales = defaultSettings.configs.recommended.settings;

const settings = {
  localeFiles: ['tests/mocks/locale_a.json', 'tests/mocks/locale_b.json']
};

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('id-missing', rule, {

  valid: [
    {
      code: "<FormattedMessage id='in_a_default_example' />",
      settings: defaultLocales
    },
    {
      code: "<FormattedMessage id='in_a_example' />",
      settings
    },
    {
      code: "<FormattedMessage id='in_b_example' />",
      settings
    },
    {
      code: '<FormattedMessage id={`in_a_${bogus}`} />',
      settings
    },
    {
      code: '<FormattedMessage id={`in_b_${bogus}`} />',
      settings
    },
    {
      code: "formatMessage({ id: 'in_a_example' })",
      settings
    },
    {
      code: "formatMessage({ id: 'in_b_example' })",
      settings
    },
    {
      code: 'formatMessage({ id: `in_a_${bogus}` })',
      settings
    },
    {
      code: 'formatMessage({ id: `in_b_${bogus}` })',
      settings
    },
    {
      code: "defineMessages({ msg1: { id: `in_a_${bogus}` }, msg2: { id: 'in_b_example' }})",
      settings
    },
    {
      code: 'function foo({ id }) { return `Hello ${ id }.`; }\nmodule.exports = { foo };',
      settings
    },
    {
      code: 'export function foo({ id }) { return `Hello ${ id }.`; }',
      settings
    },
    {
      code: 'function foo({ id }) { return `Hello ${ id }.`; }\nexport { foo };',
      settings
    }
  ],

  invalid: [
    {
      code: "<FormattedMessage id='in_a_missing_default_example' />",
      settings: defaultLocales,
      errors: ['Missing id: in_a_missing_default_example']
    },
    {
      code: "<FormattedMessage id='in_a_missing_example' />",
      settings,
      errors: ['Missing id: in_a_missing_example']
    },
    {
      code: "<FormattedMessage id='bad_missing_example' />",
      settings,
      errors: ['Missing id: bad_missing_example']
    },
    {
      code: '<FormattedMessage id={`in_b_${bogus}_missing`} />',
      settings,
      errors: ['Missing id pattern: in_b_*_missing']
    },
    {
      code: "formatMessage({ id: 'in_a_missing_example' })",
      settings,
      errors: ['Missing id: in_a_missing_example']
    },
    {
      code: "formatMessage({ id: 'bad_missing_example' })",
      settings,
      errors: ['Missing id: bad_missing_example']
    },
    {
      code: 'formatMessage({ id: `in_b_${bogus}_missing` })',
      settings,
      errors: ['Missing id pattern: in_b_*_missing']
    },
    {
      code: "intl.formatMessage({ id: 'in_a_missing_example' })",
      settings,
      errors: ['Missing id: in_a_missing_example']
    },
    {
      code: "intl.formatMessage({ id: 'bad_missing_example' })",
      settings,
      errors: ['Missing id: bad_missing_example']
    },
    {
      code: 'intl.formatMessage({ id: `in_b_${bogus}_missing` })',
      settings,
      errors: ['Missing id pattern: in_b_*_missing']
    },
    {
      code: "defineMessages({ msg1: { id: `in_a_${bogus}_missing` }, msg2: { id: 'bad_missing_example' }})",
      settings,
      errors: ['Missing id pattern: in_a_*_missing', 'Missing id: bad_missing_example']
    }
  ]
});
