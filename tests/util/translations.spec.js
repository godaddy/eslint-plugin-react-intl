const translations = require('../../lib/util/translations');
const path = require('path');

describe('Util/Translations', function () {
  describe('getIntlIds', function () {
    let context;

    beforeEach(function () {
      context = {
        id: 'id-missing',
        settings: {
          localeFiles: ['tests/mocks/locale_a.json', 'tests/mocks/locale_b.json']
        }
      };
    });

    it('returns all the translation keys', function () {
      const idsByFile = translations.getIntlIds(context);
      expect(idsByFile).toBeInstanceOf(Object);
      expect(idsByFile['tests/mocks/locale_a.json']).toEqual(['in_a_example', 'in_a_another_example', 'in_both_example']);
      expect(idsByFile['tests/mocks/locale_b.json']).toEqual(['in_b_example', 'in_b_another_example', 'in_both_example']);
    });

    it('returns all the translation keys with project root', function () {
      context.settings.projectRoot = path.join(__dirname, '..', '..');
      const idsByFile = translations.getIntlIds(context);
      expect(idsByFile).toBeInstanceOf(Object);
      expect(idsByFile['tests/mocks/locale_a.json']).toEqual(['in_a_example', 'in_a_another_example', 'in_both_example']);
      expect(idsByFile['tests/mocks/locale_b.json']).toEqual(['in_b_example', 'in_b_another_example', 'in_both_example']);
    });

    it('throws exception if localeFiles are not provided', function () {
      context = {
        id: 'id-missing',
        settings: {}
      };
      expect(() => { translations.getIntlIds(context); }).toThrow();
    });
  });
});

