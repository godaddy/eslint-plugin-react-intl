/**
 * Finds an attribute in formatMessage using attribute name.
 *
 * @param {Object} node - parent formatMessage node
 * @param {string} attrName - attribute name.
 * @returns {Object} node - returns node if it finds the attribute.
 */
function findFormatMessageAttrNode(node, attrName) {
  if (
    node.type === 'CallExpression'
    && node.callee.name === 'formatMessage') {
    if (node.arguments.length && node.arguments[0].properties) {
      return node.arguments[0].properties.find(a => a.key && a.key.name === attrName);
    }
  }
}

/**
 * Finds an attribute in FormattedMessage using attribute name.
 *
 * @param {Object} node - parent FormattedMessage node
 * @param {string} attrName - attribute name.
 * @returns {Object} node - returns node if it finds the attribute.
 */
function findFormattedMessageAttrNode(node, attrName) {
  if (
    node.type === 'JSXIdentifier'
    && node.name === 'FormattedMessage'
    && node.parent
    && node.parent.type === 'JSXOpeningElement'
  ) {
    return node.parent.attributes.find(a => a.name && a.name.name === attrName);
  }
}

/**
 * Finds an attribute in defineMessages using attribute name.
 *
 * @param {Object} node - parent defineMessages node
 * @param {string} attrName - attribute name.
 * @returns {Object} node - returns node if it finds the attribute.
 */
function findAttrNodeInDefineMessages(node, attrName) {
  if (node.type === 'Property'
    && node.key.name === attrName
    && node.parent
    && node.parent.parent
    && node.parent.parent.parent
    && node.parent.parent.parent.parent
    && node.parent.parent.parent.parent.type === 'CallExpression'
    && node.parent.parent.parent.parent.callee.name === 'defineMessages'
  ) {
    return node;
  }
}

/**
 * Finds an attribute in defineMessages using attribute name.
 *
 * @param {Object} node - parent defineMessages node
 * @param {string} attrName - attribute name.
 * @returns {Object} node - returns node if it finds the attribute.
 */
function findAttrNodeInDefineMessage(node, attrName) {
  if (node.type === 'Property'
    && node.key.name === attrName
    && node.parent
    && node.parent.parent
    && node.parent.parent.type === 'CallExpression'
    && node.parent.parent.callee.name === 'defineMessage'
  ) {
    return node;
  }
}

module.exports = {
  findFormatMessageAttrNode,
  findFormattedMessageAttrNode,
  findAttrNodeInDefineMessages,
  findAttrNodeInDefineMessage
};
