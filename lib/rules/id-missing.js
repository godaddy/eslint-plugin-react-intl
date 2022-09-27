const {
  sortedTemplateElements,
  templateLiteralDisplayStr,
} = require("../util/templateLiterals");
const { getIntlIds, getIntlIdsNew } = require("../util/translations");
const {
  findFormatMessageAttrNode,
  findFormattedMessageAttrNode,
  findAttrNodeInDefineMessages,
  findAttrNodeInDefineMessage,
} = require("../util/findNodes");

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Validates intl message ids are in locale file",
      category: "Intl",
      recommended: true,
    },
    fixable: null,
    schema: [],
  },

  create: function (context) {
    const translatedIds = getIntlIds(context);
    const translatedIdsDictionarySet = Object.keys(translatedIds).reduce(
      (prev, curr) => {
        return {
          ...prev,
          [curr]: new Set(translatedIds[curr]),
        };
      },
      {}
    );

    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    function checkIsLiteralTranslated(id) {
      const result = Object.keys(translatedIdsDictionarySet).reduce(
        (prev, curr) => {
          const hasCurrentLocale = translatedIdsDictionarySet[curr].has(id);

          return {
            ...prev,
            [curr]: hasCurrentLocale,
            hasAllLocales: prev.hasAllLocales && hasCurrentLocale,
          };
        },
        { hasAllLocales: true }
      );
      return result;
    }

    function checkIsTemplateTranslated(re) {
      const result = Object.keys(translatedIds).reduce(
        (prev, curr) => {
          const hasCurrentLocale = translatedIds[curr].some((k) => re.test(k));

          return {
            ...prev,
            [curr]: hasCurrentLocale,
            hasAllLocales: prev.hasAllLocales && hasCurrentLocale,
          };
        },
        { hasAllLocales: true }
      );
      return result;
    }

    function processLiteral(node) {
      const checkResult = checkIsLiteralTranslated(node.value);
      if (checkResult.hasAllLocales === false) {
        context.report({
          node: node,
          message:
            "Missing id: " +
            node.value +
            ` in ${Object.keys(checkResult)
              .filter(
                (locale) => !checkResult[locale] && locale !== "hasAllLocales"
              )
              .join(", ")}`,
        });
      }
    }

    function processTemplateLiteral(node) {
      const exStr = sortedTemplateElements(node)
        .map((e) => (!e.value ? ".*" : e.value.raw))
        .join("");
      const re = new RegExp(exStr);

      const checkResult = checkIsTemplateTranslated(re).hasAllLocales;
      if (checkResult.hasAllLocales === false) {
        console.log("processTemplateLiteral: ", checkResult);
      }
      if (checkResult.hasAllLocales === false) {
        context.report({
          node: node,
          message:
            "Missing id pattern: " +
            templateLiteralDisplayStr(node) +
            ` in ${Object.keys(checkResult).filter(
              (locale) => !checkResult[locale]
            )}`,
        });
      }
    }

    function processAttrNode(node) {
      if (node.value.type === "Literal") {
        return processLiteral(node.value);
      }
      if (
        node.value.type === "JSXExpressionContainer" &&
        node.value.expression.type === "TemplateLiteral"
      ) {
        return processTemplateLiteral(node.value.expression);
      }
      if (node.value.type === "TemplateLiteral") {
        return processTemplateLiteral(node.value);
      }
    }

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return {
      JSXIdentifier: function (node) {
        const attrNode = findFormattedMessageAttrNode(node, "id");
        if (attrNode) return processAttrNode(attrNode);
      },
      CallExpression: function (node) {
        const attrNode = findFormatMessageAttrNode(node, "id");
        if (attrNode) return processAttrNode(attrNode);
      },
      Property: function (node) {
        const attrNode =
          findAttrNodeInDefineMessages(node, "id") ||
          findAttrNodeInDefineMessage(node, "id");
        if (attrNode) return processAttrNode(attrNode);
      },
    };
  },
};
