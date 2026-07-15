import type { Root, Element, ElementContent } from "hast";
import { visit } from "unist-util-visit";
import { remove } from "unist-util-remove";

/**
 * Rehype plugin that transforms GFM footnotes into tufte-css web components.
 *
 * Converts:
 *   <sup><a href="#user-content-fn-1">1</a></sup>
 *   ...
 *   <section class="footnotes">
 *     <ol><li id="user-content-fn-1"><p>Note content</p></li></ol>
 *   </section>
 *
 * Into:
 *   <tufte-sidenote note-id="user-content-fn-1">Note content</tufte-sidenote>
 *
 * Footnotes starting with "mn-" become <tufte-marginnote> instead.
 */
export default function rehypeTufteSidenotes() {
  return (tree: Root) => {
    // First, collect all footnote definitions from the footnotes section
    const footnotes = new Map<string, ElementContent[]>();

    visit(tree, "element", (node: Element) => {
      if (
        node.tagName === "section" &&
        Array.isArray(node.properties?.className) &&
        node.properties.className.includes("footnotes")
      ) {
        // Find the <ol> inside the footnotes section
        for (const child of node.children) {
          if (
            child.type === "element" &&
            child.tagName === "ol"
          ) {
            // Each <li> is a footnote
            for (const li of child.children) {
              if (li.type === "element" && li.tagName === "li") {
                const id = li.properties?.id as string | undefined;
                if (id) {
                  // Get the content, removing back-reference links
                  const content = extractFootnoteContent(li);
                  footnotes.set(id, content);
                }
              }
            }
          }
        }
      }
    });

    // Replace footnote references with tufte components
    visit(tree, "element", (node: Element, index, parent) => {
      if (
        node.tagName === "sup" &&
        parent &&
        typeof index === "number"
      ) {
        // Check if this sup contains a footnote reference link
        const link = node.children.find(
          (child): child is Element =>
            child.type === "element" &&
            child.tagName === "a" &&
            typeof child.properties?.href === "string" &&
            child.properties.href.startsWith("#user-content-fn-")
        );

        if (link && typeof link.properties?.href === "string") {
          const id = link.properties.href.slice(1); // Remove the '#'
          const content = footnotes.get(id);

          if (content) {
            // Determine if this is a margin note (id contains "mn-")
            const noteId = id.replace("user-content-fn-", "");
            const isMarginNote = noteId.startsWith("mn-");

            // Create the tufte component
            const tufteElement: Element = {
              type: "element",
              tagName: isMarginNote ? "tufte-marginnote" : "tufte-sidenote",
              properties: { "note-id": id },
              children: content,
            };

            // Replace the <sup> with the tufte component
            (parent as Element).children[index] = tufteElement;
          }
        }
      }
    });

    // Remove the footnotes section
    remove(tree, (node) => {
      return (
        node.type === "element" &&
        (node as Element).tagName === "section" &&
        Array.isArray((node as Element).properties?.className) &&
        ((node as Element).properties?.className as string[]).includes("footnotes")
      );
    });
  };
}

/**
 * Extract content from a footnote <li>, removing back-reference links.
 */
function extractFootnoteContent(li: Element): ElementContent[] {
  const result: ElementContent[] = [];

  for (const child of li.children) {
    if (child.type === "element" && child.tagName === "p") {
      // Clone the paragraph's children, filtering out back-references
      const filtered = child.children.filter((c) => {
        if (c.type === "element" && c.tagName === "a") {
          const className = c.properties?.className;
          if (
            Array.isArray(className) &&
            className.some((cn) =>
              typeof cn === "string" && cn.includes("backref")
            )
          ) {
            return false;
          }
        }
        return true;
      });
      result.push(...filtered);
    } else if (child.type === "text" && child.value.trim()) {
      result.push(child);
    } else if (child.type === "element") {
      // For other elements, include them but filter back-references
      result.push(child);
    }
  }

  return result;
}
