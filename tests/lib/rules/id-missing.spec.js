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
      code: "<FormattedMessage id='in_both_example' />",
      settings
    },
    {
      code: '<FormattedMessage id={`in_both_${bogus}`} />',
      settings
    },
    {
      code: "formatMessage({ id: 'in_both_example' })",
      settings
    },
    {
      code: 'formatMessage({ id: `in_both_${bogus}` })',
      settings
    },
    {
      code: "defineMessages({ msg1: { id: `in_both_${bogus}` }, msg2: { id: 'in_both_example' }})",
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
      errors: ['Missing id: in_a_missing_default_example from file locales/en-US.json']
    },
    {
      code: "<FormattedMessage id='in_a_missing_example' />",
      settings,
      errors: ['Missing id: in_a_missing_example from files tests/mocks/locale_a.json, tests/mocks/locale_b.json']
    },
    {
      code: "<FormattedMessage id='in_a_example' />",
      settings,
      errors: ['Missing id: in_a_example from file tests/mocks/locale_b.json']
    },
    {
      code: "<FormattedMessage id='bad_missing_example' />",
      settings,
      errors: ['Missing id: bad_missing_example from files tests/mocks/locale_a.json, tests/mocks/locale_b.json']
    },
    {
      code: '<FormattedMessage id={`in_both_${bogus}_missing`} />',
      settings,
      errors: ['Missing id pattern: in_both_*_missing from files tests/mocks/locale_a.json, tests/mocks/locale_b.json']
    },
    {
      code: '<FormattedMessage id={`in_b_${bogus}`} />',
      settings,
      errors: ['Missing id pattern: in_b_* from file tests/mocks/locale_a.json']
    },
    {
      code: "formatMessage({ id: 'in_a_missing_example' })",
      settings,
      errors: ['Missing id: in_a_missing_example from files tests/mocks/locale_a.json, tests/mocks/locale_b.json']
    },
    {
      code: "formatMessage({ id: 'in_a_example' })",
      settings,
      errors: ['Missing id: in_a_example from file tests/mocks/locale_b.json']
    },
    {
      code: "formatMessage({ id: 'bad_missing_example' })",
      settings,
      errors: ['Missing id: bad_missing_example from files tests/mocks/locale_a.json, tests/mocks/locale_b.json']
    },
    {
      code: 'formatMessage({ id: `in_both_${bogus}_missing` })',
      settings,
      errors: ['Missing id pattern: in_both_*_missing from files tests/mocks/locale_a.json, tests/mocks/locale_b.json']
    },
    {
      code: 'formatMessage({ id: `in_a_${bogus}` })',
      settings,
      errors: ['Missing id pattern: in_a_* from file tests/mocks/locale_b.json']
    },
    {
      code: "defineMessages({ msg1: { id: `in_both_${bogus}_missing` }, msg2: { id: 'bad_missing_example' }})",
      settings,
      errors: [
        'Missing id pattern: in_both_*_missing from files tests/mocks/locale_a.json, tests/mocks/locale_b.json',
        'Missing id: bad_missing_example from files tests/mocks/locale_a.json, tests/mocks/locale_b.json'
      ]
    },
    {
      code: "defineMessages({ msg1: { id: `in_a_${bogus}` }, msg2: { id: 'in_b_example' }, msg3: { id: 'in_both_example' }})",
      settings,
      errors: [
        'Missing id pattern: in_a_* from file tests/mocks/locale_b.json',
        'Missing id: in_b_example from file tests/mocks/locale_a.json'
      ]
    }
  ]
});
