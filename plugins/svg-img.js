import Vue from "vue";
import { parse } from "svg-parser";

const renderNode = function (
  createElement,
  node,
  data = {},
  additionalAttrs = {}
) {
  const children = [];

  node.children.forEach(child => {
    if (typeof child === "string") {
      children.push(child);
    } else {
      children.push(renderNode(createElement, child));
    }
  });

  return createElement(
    node.name,
    {
      ...data,
      attrs: {
        ...node.attributes,
        ...additionalAttrs,
      },
    },
    children
  );
};

Vue.component("svg-img", {
  functional: true,
  render(h, ctx) {
    const { src, ...rest } = ctx.props;
    const svgTree = parse(src);

    return renderNode(h, svgTree, ctx.data, rest);
  },
});
