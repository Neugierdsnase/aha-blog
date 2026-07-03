export const sanitizeViewTransitionName = (title?: string) => {
  if (title) {
    return title.replaceAll(/[^a-zA-Z0-9-]/g, "").toLowerCase();
  }
  
  return undefined
}
