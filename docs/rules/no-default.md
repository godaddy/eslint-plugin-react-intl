# Disallow use of defaultMessage with react-intl (no-default)

This rule looks for defaultMessage in react-intl's `<FormattedMessage />`, `formatMessage` and `defineMessages`.

## Rule Details

Examples of **incorrect** code for this rule:

```js
<FormattedMessage id='missing_example' defaultMessage='Redundant message text' />
```

```js
formatMessage({ id: 'missing_example', defaultMessage: 'Redundant message text' })
```

```js
defineMessages({ msg: { id: 'missing_example', defaultMessage: 'Redundant message text' }})
```

```js
defineMessage({ id: 'missing_example', defaultMessage: 'Redundant message text' })
```

Examples of **correct** code for this rule:

```js
<FormattedMessage id='in_example' />
```

```js
formatMessage({ id: 'in_example' })
```

```js
defineMessages({ msg: { id: 'in_example' }})
```

```js
defineMessage({ id: 'in_example' })
```

### Options

```
"@godaddy/react-intl/no-default": <enabled>
```
