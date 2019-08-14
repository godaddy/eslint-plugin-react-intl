# @godaddy/eslint-plugin-react-intl

Validation of locale ids used with react-intl functions/components like `<FormattedMessage />`, `formatMessage` and `defineMessages`.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm install eslint --save-dev
```

Next, install `@godaddy/eslint-plugin-react-intl`:

```
$ npm install @godaddy/eslint-plugin-react-intl --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) than you must also install `@godaddy/eslint-plugin-react-intl` globally.

## Usage

Add `@godaddy/react-intl` to the config. You can omit the `eslint-plugin-` prefix:
```json
{
  "extends": ["godaddy/react-intl"]
}
```

Alternatively, you can add `@godaddy/react-intl` to the plugins section of config:

```json
{
    "plugins": [
        "@godaddy/react-intl"
    ]
}
```

By default, `id-missing` and `no-default` rules are enabled to show as errors, and `id-prefix` rule is disabled. 
If you need to set any of these rules differently, then configure the rules under the rules section.

```json
{
    "rules": {
        "@godaddy/react-intl/<rule-name>": 2
    }
}
```

By default, the plugin reads `locales/en-US.json` to apply these eslint rules. The default can be
changed by adding this setting to the config

```json
{
    "settings": {
        "localeFiles": [
            "<path to locale file.json>",
            "<path to any other locale file.json>"
        ]
    }
}
```

If your IDE integrates with eslint, and you are working on multiple packages in a project such as a monorepo, 
then it may have trouble finding which locale files to check keys against. 
To help with this, you can specify the `projectRoot` setting. 
This will need to be an absolute path to the package, which can be determined dynamically from one machine to 
another by using `__dirname` in a .eslintrc.js file.

```js
module.exports = {
    "settings": {
        "projectRoot": __dirname
    }
}
```

## Locale Files

The locale files should be named with their market id (like en-US.json) and should contain data 
in key-value pair format

```json
{
  "in_a_example": "Example",
  "in_a_another_example": "Another Example"
}
```


## Supported Rules

* [id-missing](docs/rules/id-missing.md) Enforces react-intl message ids to be in locale file
* [id-prefix](docs/rules/id-prefix.md) Enforces react-intl message ids to use predefined prefixes
* [no-default](docs/rules/no-default.md) Disallows use of defaultMessage with react-intl
