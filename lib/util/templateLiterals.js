/**
 * Returns a sorted array of nodes, based on their starting posting in the locale id.
 *
 * @param {Object} node - parent node containing the locale id.
 * @returns {Array} child nodes - sorted list.
 */
function sortedTemplateElements(node) {
  return [...node.quasis, ...node.expressions].sort((a, b) => (a.start - b.start));
}

/**
 * Replaces place holders with asterisk and returns the resulting id.
 *
 * @param {Object} node - parent node containing the locale id.
 * @returns {string} id - fixed id.
 */
function templateLiteralDisplayStr(node) {
  return sortedTemplateElements(node).map(e => !e.value ? '*' : e.value.raw).join('');
}

module.exports = {
  sortedTemplateElements,
  templateLiteralDisplayStr
};
