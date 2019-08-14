const rule = require('../../../lib/rules/no-default');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true
  }
};

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-default', rule, {

  valid: [
    {
      code: "<FormattedMessage id='in_example' />"
    },
    {
      code: "formatMessage({ id: 'in_example' })"
    },
    {
      code: "defineMessages({ msg1: { id:'in_example' }, msg2: { id:'in_example' }})"
    }
  ],

  invalid: [
    {
      code: "<FormattedMessage id='in_example' defaultMessage='This is an example' />",
      errors: ['Do not use defaultMessage']
    },
    {
      code: "formatMessage({ id:'in_example', defaultMessage: 'This is an example' })",
      errors: ['Do not use defaultMessage']
    },
    {
      code: "defineMessages({ msg1: { id: 'in_ex', defaultMessage: 'example'}, msg2: { id: 'in_ex', defaultMessage: 'example' }})",
      errors: ['Do not use defaultMessage', 'Do not use defaultMessage']
    }
  ]
});
