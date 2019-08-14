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
      description: 'Validates intl message ids are in locale file',
      category: 'Intl',
      recommended: true
    },
    fixable: null,
    schema: []
  },

  create: function (context) {

    const translatedIds = getIntlIds(context);
    const translatedIdSet = new Set(translatedIds);

    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    function isLiteralTranslated(id) {
      return translatedIdSet.has(id);
    }

    function isTemplateTranslated(re) {
      return translatedIds.some(k => re.test(k));
    }

    function processLiteral(node) {
      if (!isLiteralTranslated(node.value)) {
        context.report(
          {
            node: node,
            message: 'Missing id: ' + node.value
          }
        );
      }
    }

    function processTemplateLiteral(node) {
      const exStr = sortedTemplateElements(node).map(e => !e.value ? '.*' : e.value.raw).join('');
      const re = new RegExp(exStr);

      if (!isTemplateTranslated(re)) {
        context.report(
          {
            node: node,
            message: 'Missing id pattern: ' + templateLiteralDisplayStr(node)
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
