import { visit } from "unist-util-visit";

/** @type {import('unified').Plugin<[], import('hast').Root>} */
export default function rehypeInlineFootnotes() {
  return (tree) => {
    const footnoteMap = new Map();

    // 1. Extract footnote definitions
    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName === "section" &&
        node.properties?.className?.includes("footnotes")
      ) {
        const ol = node.children.find((child) => child.tagName === "ol");

        if (ol && ol.children) {
          for (const li of ol.children) {
            const id = li.properties?.id
              ?.replace("user-content-fn-", "")
              .trim();

            if (id && li.children) {
              const isMarginNote = id.startsWith("mn-");

              const childrenElements = li.children.filter((
                { type, value },
                // filter empty newlines
              ) => !(type === "text" && value === "\n")).filter(
                // filter backref
                (child) =>
                  !child.properties?.className?.includes(
                    "data-footnote-backref",
                  ));

              const replacement = [
                {
                  type: "element",
                  tagName: "label",
                  properties: {
                    for: id,
                    className: isMarginNote
                      ? ["margin-toggle"]
                      : ["margin-toggle sidenote-number"],
                  },
                },
                {
                  type: "element",
                  tagName: "input",
                  properties: {
                    type: "checkbox",
                    className: ["margin-toggle"],
                    name: id,
                    id,
                  },
                },
                {
                  type: "element",
                  tagName: "span",
                  properties: {
                    className: isMarginNote ? ["marginnote"] : ["sidenote"],
                  },
                  children: childrenElements,
                },
              ];

              footnoteMap.set(id, replacement);
            }
          }
        }

        // Remove the footnotes section
        if (parent && typeof index === "number") {
          parent.children.splice(index, 1);
        }
      }
    });

    // 2. Replace footnote references with inline elements
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "sup" && node.children?.[0]?.tagName === "a") {
        const id = node.children[0].properties?.href
          ?.replace("#user-content-fn-", "")
          .trim();

        const [label, input, content] = footnoteMap.get(id)

        parent.children.splice(index, 1, label, input, content);
      }
    });
  };
}
