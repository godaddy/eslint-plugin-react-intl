const translations = require('../../lib/util/translations');
const path = require('path');

describe('Util/Translations', function () {
    describe('getIntlIds', function() {
        let context;

        beforeEach(function () {
            context = {
                id: 'id-missing',
                settings: {
                    localeFiles:[ 'tests/mocks/locale_a.json', 'tests/mocks/locale_b.json' ]
                }
            }
        });

        it('returns all the translation keys', function () {
            const keys = translations.getIntlIds(context);
            expect(keys).toBeInstanceOf(Array);
            expect(keys.length).toEqual(4);
        });

        it('returns all the translation keys with project root', function () {
            context.settings.projectRoot = path.join(__dirname, '..', '..');
            const keys = translations.getIntlIds(context);
            expect(keys).toBeInstanceOf(Array);
            expect(keys.length).toEqual(4);
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

