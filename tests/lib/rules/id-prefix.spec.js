const rule = require('../../../lib/rules/id-prefix');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true
  }
};

const options = [['in_b_', 'in_a_']];

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('id-prefix', rule, {

  valid: [
    {
      code: "<FormattedMessage id='in_a_example' />",
      options
    },
    {
      code: "<FormattedMessage id='in_b_example' />",
      options
    },
    {
      code: "<FormattedMessage id='in_b_missing_example' />",
      options
    },
    {
      code: '<FormattedMessage id={`in_a_${bogus}`} />',
      options
    },
    {
      code: '<FormattedMessage id={`in_b_${bogus}`} />',
      options
    },
    {
      code: '<FormattedMessage id={`in_b_ignored_${bogus}`} />',
      options
    },
    {
      code: "formatMessage({ id: 'in_a_example' })",
      options
    },
    {
      code: "formatMessage({ id: 'in_b_example' })",
      options
    },
    {
      code: "formatMessage({ id: 'in_b_missing_example' })",
      options
    },
    {
      code: 'formatMessage({ id: `in_a_${bogus}` })',
      options
    },
    {
      code: 'formatMessage({ id: `in_b_${bogus}` })',
      options
    },
    {
      code: 'formatMessage({ id: `in_b_ignored_${bogus}` })',
      options
    },
    {
      code: "defineMessages({ msg1: { id:`in_a_${bogus}` }, msg2: { id: 'in_b_example' }})",
      options
    }
  ],

  invalid: [
    {
      code: "<FormattedMessage id='bad_missing_example' />",
      options,
      errors: ['Invalid id prefix: bad_missing_example']
    },
    {
      code: '<FormattedMessage id={`bad_${bogus}_missing`} />',
      options,
      errors: ['Invalid id prefix: bad_*_missing']
    },
    {
      code: "formatMessage({ id: 'bad_missing_example' })",
      options,
      errors: ['Invalid id prefix: bad_missing_example']
    },
    {
      code: 'formatMessage({ id: `bad_${bogus}_missing` })',
      options,
      errors: ['Invalid id prefix: bad_*_missing']
    },
    {
      code: "defineMessages({ msg1: { id: `bad_${bogus}_missing`}, msg2: { id: 'bad_missing_example' }})",
      options,
      errors: ['Invalid id prefix: bad_*_missing', 'Invalid id prefix: bad_missing_example']
    }
  ]
});
