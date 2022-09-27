/* eslint-disable no-sync */
const fs = require("fs");
const path = require("path");

/**
 * Map of locale file paths to keys and modified time
 *
 * @type {{string: {keys: { locale: string, values: Array }, mtime: number}}}
 */
const localeFilesKeys = {};

/**
 * Get a list of ids keys from reading locale files
 * Keeps track of modified times and reloads if changed,; useful for realtime eslint in-editor
 *
 * @param {object} context - Context
 * @returns {{[key: string]: string[]}} results - Array of ids
 */
function getIntlIds(context) {
  const { localeFiles, projectRoot } = context.settings;

  if (!localeFiles) {
    throw new Error("localeFiles not in settings");
  }

  const results = {};
  const reg = /\/([A-Za-z\-]+)\./;

  localeFiles.forEach((f) => {
    const fullPath = projectRoot ? path.join(projectRoot, f) : f;
    const mtime = fs.lstatSync(fullPath).mtime.getTime();
    if (
      !localeFilesKeys[fullPath] ||
      mtime !== localeFilesKeys[fullPath].mtime
    ) {
      const json = JSON.parse(fs.readFileSync(fullPath));
      localeFilesKeys[fullPath] = {
        keys: {
          locale: reg.exec(f)[1],
          values: Object.keys(json),
        },
        mtime: mtime,
      };
    }
    const fileKeys = localeFilesKeys[fullPath].keys;
    results[fileKeys.locale] = [...fileKeys.values];
  });

  return results;
}

module.exports = {
  getIntlIds,
};
