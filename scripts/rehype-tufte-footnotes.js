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

            // TODO: Create an extra case for startsWith("mn-") to handle margin notes

            if (id && li.children) {
              const childrenWithoutBackRef = li.children[1].children // first child is just a new line, second is the actual content
                .filter(
                  (child) =>
                    !child.properties?.className?.includes(
                      "data-footnote-backref",
                    ),
                );

              const replacement = [
                {
                  type: "element",
                  tagName: "label",
                  properties: {
                    for: id,
                    className: ["margin-toggle sidenote-number"],
                  },
                },
                {
                  type: "element",
                  tagName: "input",
                  id,
                  properties: {
                    type: "checkbox",
                    className: ["margin-toggle"],
                  },
                },
                {
                  type: "element",
                  tagName: "span",
                  properties: {
                    className: ["sidenote"],
                  },
                  children: childrenWithoutBackRef,
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

        parent.children.splice(
          index,
          1,
          ...footnoteMap.get(id),
        );
      }
    });
  };
}
