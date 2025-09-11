// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Konstantini Pagina Domestica";
export const SITE_DESCRIPTION = "Softwareentwickler und Freizeitnostalgiker";

export const generateUuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : r & (0x3 | 0x8);
    return v.toString(16);
  });
};
