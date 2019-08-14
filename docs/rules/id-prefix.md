# Enforce react-intl message ids to use predefined prefixes (id-prefix)

This rule checks ids used in react-intl's `<FormattedMessage />`, `formatMessage` and `defineMessages`,
to determine if they (or template literal pattern) begin with one of predefined prefixes.

Prefixes are defined in eslint settings.

## Rule Details

Given valid prefixes as `in_` and `out_`...

Examples of **incorrect** code for this rule:

```js
<FormattedMessage id='missing_example' />
```

```js
formatMessage({ id:'missing_example' })
```

```js
defineMessages({ msg: { id: 'missing_example' }})
```

Examples of **correct** code for this rule:

```js
<FormattedMessage id='in_example' />
```

```js
<FormattedMessage id={ `in_${someKey}_label` } />
```

```js
<FormattedMessage id='out_example' />
```

```js
formatMessage({ id: 'in_example' })
```

```js
formatMessage({ id: `in_${someKey}_label` })
```

```js
formatMessage({ id: 'out_example' })
```

```js
defineMessages({ msg: { id: 'in_example' }})
```

```js
defineMessages({ msg: { id: `in_${someKey}_label` }})
```

```js
defineMessages({ msg: { id: 'out_example' }})
```

### Options

```
"@godaddy/react-intl/id-prefix": [<enabled>, Array<string>]
```

Where the array should contain allowed id prefixes.
