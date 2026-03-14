export const sanitizeViewTransitionName = (title: string) =>
	title.replaceAll(/[^a-zA-Z0-9-]/g, "").toLowerCase();
