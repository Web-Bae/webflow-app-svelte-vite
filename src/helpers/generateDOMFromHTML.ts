import { get } from "svelte/store";
import { svgPropertyMap } from "../stores/svgTemplate";
import { DEFAULT_DIVIDER_STYLE } from "../constants";

export const generateDOMFromHTML = async (
  rootElement: Element
): Promise<DOMElement> => {
  let domElement = webflow.createDOM(rootElement.tagName);

  // Set attributes of the SVG element
  Array.from(rootElement.attributes).forEach((attr) => {
    if (attr.name === "class") {
      const dateString = Date.now().toString();
      const unqiueClassName = `${DEFAULT_DIVIDER_STYLE.name}_${dateString}`;
      const newStyle = webflow.createStyle(unqiueClassName);
      newStyle.setProperties({
        ...get(svgPropertyMap),
      });
      domElement.setStyles([newStyle]);
    } else if (attr.name === "fill") {
      domElement.setAttribute("fill", "currentColor");
    } else {
      domElement.setAttribute(attr.name, attr.value);
    }
  });

  // If the SVG element has text content (like text elements), set it
  if (rootElement.textContent && rootElement.textContent.trim().length > 0) {
    domElement.setTextContent(rootElement.textContent.trim());
  }

  // Recursively process child elements
  const childPromises = Array.from(rootElement.children).map(
    async (child) => await generateDOMFromHTML(child)
  );

  if (childPromises.length > 0) {
    const children = await Promise.all(childPromises);
    domElement.setChildren(children);
  }

  return domElement;
};
