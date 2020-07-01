const {
  findFormatMessageAttrNode,
  findFormattedMessageAttrNode,
  findAttrNodeInDefineMessages,
  findAttrNodeInDefineMessage
} = require('../util/findNodes');


// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Validates defaultMessage is not used with react-intl',
      category: 'Intl',
      recommended: true
    },
    fixable: null,
    schema: []
  },

  create: function (context) {
    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    function processAttrNode(node) {
      context.report(
        {
          node: node,
          message: 'Do not use defaultMessage'
        }
      );
    }

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return {
      JSXIdentifier: function (node) {
        const attrNode = findFormattedMessageAttrNode(node, 'defaultMessage');
        if (attrNode) return processAttrNode(attrNode);
      },
      CallExpression: function (node) {
        const attrNode = findFormatMessageAttrNode(node, 'defaultMessage');
        if (attrNode) return processAttrNode(attrNode);
      },
      Property: function (node) {
        const attrNode =
          findAttrNodeInDefineMessages(node, 'defaultMessage') ||
          findAttrNodeInDefineMessage(node, 'defaultMessage');

        if (attrNode) return processAttrNode(attrNode);
      }
    };
  }
};
