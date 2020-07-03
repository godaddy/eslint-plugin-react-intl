# Enforce react-intl message ids to be in locale file (id-missing)

This rule checks ids used in react-intl's `<FormattedMessage />`, `formatMessage` and `defineMessages`,
to determine if they (or template literal pattern) can be found in the locale files.

By default, the localeFiles is set to `['locales/en-US.json']`, but can be changed in the eslint config settings.

## Rule Details

Given an example locale file whose content looks like:

```json
{
  "in_example": "An example message",
  "in_one_label": "First message label",
  "in_two_label": "Second message label"
}
```

Examples of **incorrect** code for this rule:

```js
<FormattedMessage id='missing_example' />
```

```js
formatMessage({ id: 'missing_example' })
```

```js
defineMessages({ msg: { id:'missing_example' }})
```

```js
defineMessage({ id:'missing_example' })
```

Examples of **correct** code for this rule:

```js
<FormattedMessage id='in_example' />
```

```js
<FormattedMessage id={ `in_${someKey}_label` } />
```

```js
formatMessage({ id: 'in_example' })
```

```js
formatMessage({ id: `in_${someKey}_label` })
```

```js
defineMessages({ msg: { id: 'in_example' }})
```

```js
defineMessages({ msg: { id: `in_${someKey}_label` }})
```

```js
defineMessage({ id: 'in_example' })
```

```js
defineMessage({ id: `in_${someKey}_label` })
```

### Options

```
"@godaddy/react-intl/id-missing": <enabled>
```

`settings.localeFiles`: list of locale files, defaults to `['locales/en-US.json']`

`settings.projectRoot`: set to `__dirname` to help with realtime linting

## When Not To Use It

Disable this rule if the module does not have locale files.
