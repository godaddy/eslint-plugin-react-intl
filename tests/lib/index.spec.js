const index = require('../../lib');

describe('Index', function () {
  it('exports three rules', function () {
    const rules = index.rules;
    expect(rules['id-missing']).toBeInstanceOf(Object);
    expect(rules['id-prefix']).toBeInstanceOf(Object);
    expect(rules['no-default']).toBeInstanceOf(Object);
  });
  it('exports recommended config', function () {
    const configs = index.configs;
    expect(configs.recommended).toBeInstanceOf(Object);
    expect(configs.recommended.plugins).toBeInstanceOf(Array);
    expect(configs.recommended.rules).toBeInstanceOf(Object);
    expect(configs.recommended.settings).toBeInstanceOf(Object);
  });
});
