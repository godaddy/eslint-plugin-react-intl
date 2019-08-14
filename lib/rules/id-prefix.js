const { templateLiteralDisplayStr } = require('../util/templateLiterals');
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
      description: 'Validates intl message ids has correct prefixes',
      category: 'Intl',
      recommended: true
    },
    fixable: null,
    schema: [
      {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    ]
  },

  create: function (context) {

    if (context.options[0].length === 0) {
      throw new Error('Prefixes are required in settings');
    }

    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    const hasPrefix = (value) => context.options[0].some(p => value.startsWith(p));

    function report(node, value) {
      if (!hasPrefix(value)) {
        context.report(
          {
            node: node,
            message: `Invalid id prefix: ${value}`
          }
        );
      }
    }

    function processLiteral(node) {
      report(node, node.value);
    }

    function processTemplateLiteral(node) {
      const displayStr = templateLiteralDisplayStr(node);
      report(node, displayStr);
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
