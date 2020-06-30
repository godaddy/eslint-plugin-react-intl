const { sortedTemplateElements, templateLiteralDisplayStr } = require('../util/templateLiterals');
const { getIntlIds } = require('../util/translations');
const {
  findFormatMessageAttrNode,
  findFormattedMessageAttrNode,
  findAttrNodeInDefineMessages
} = require('../util/findNodes');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Validates intl message ids are in all locale file',
      category: 'Intl',
      recommended: true
    },
    fixable: null,
    schema: []
  },

  create: function (context) {

    const translatedIdsByFile = getIntlIds(context);
    const localeFilenames = Object.keys(translatedIdsByFile);

    const translatedIdsByFileSet = localeFilenames.reduce((acc, localeFilename) => ({
      ...acc, [localeFilename]: new Set(translatedIdsByFile[localeFilename])
    }), {});

    function formatMissingFileString(missingFiles) {
      return (missingFiles.length > 1 ? ' from files ' : ' from file ') + missingFiles.join(', ');
    }

    function processLiteral(node) {
      const id = node.value;
      const missingFromLocaleFiles = localeFilenames.filter(f => !translatedIdsByFileSet[f].has(id));

      if (missingFromLocaleFiles.length > 0) {
        context.report(
          {
            node: node,
            message: 'Missing id: ' + node.value + formatMissingFileString(missingFromLocaleFiles)
          }
        );
      }
    }

    function processTemplateLiteral(node) {
      const exStr = sortedTemplateElements(node).map(e => !e.value ? '.*' : e.value.raw).join('');
      const re = new RegExp(exStr);

      const missingFromLocaleFiles = localeFilenames.filter(f => !translatedIdsByFile[f].some(k => re.test(k)));

      if (missingFromLocaleFiles.length > 0) {
        context.report(
          {
            node: node,
            message: 'Missing id pattern: ' + templateLiteralDisplayStr(node) + formatMissingFileString(missingFromLocaleFiles)
          }
        );
      }
    }

    function processAttrNode(node) {
      if (node.value.type === 'Literal') {
        return processLiteral(node.value);
      }
      if (node.value.type === 'JSXExpressionContainer'
        && node.value.expression.type === 'TemplateLiteral'
      ) {
        return processTemplateLiteral(node.value.expression);
      }
      if (node.value.type === 'TemplateLiteral') {
        return processTemplateLiteral(node.value);
      }
    }

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return {
      JSXIdentifier: function (node) {
        const attrNode = findFormattedMessageAttrNode(node, 'id');
        if (attrNode) return processAttrNode(attrNode);
      },
      CallExpression: function (node) {
        const attrNode = findFormatMessageAttrNode(node, 'id');
        if (attrNode) return processAttrNode(attrNode);
      },
      Property: function (node) {
        const attrNode = findAttrNodeInDefineMessages(node, 'id');
        if (attrNode) return processAttrNode(attrNode);
      }
    };
  }
};
