/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		screens: {
			lg: "761px",
		},
		fontFamily: {
			serif: [
				"et-book",
				"Palatino",
				"Palatino Linotype",
				"Palatino LT STD",
				"Book Antiqua",
				"Georgia",
				"serif",
			],
		},
		fontSize: {
			base: "15px",
			md: "1.4rem",
			lg: "1.7rem",
			xl: "2.2rem",
			"2xl": "3.2rem",
		},
		extend: {},
	},
	daisyui: {
		themes: [
			{
				light: {
					primary: "#b4d5fe",
					secondary: "#b4d5fe",
					accent: "#b4d5fe",
					"base-100": "#fffff8",
					"base-content": "#111111",
					neutral: "#cccccc",
					error: "red",
				},
			},
			{
				dark: {
					primary: "#b4d5fe",
					secondary: "#b4d5fe",
					accent: "#b4d5fe",
					"base-100": "#151515",
					"base-content": "#dddddd",
					neutral: "#cccccc",
					error: "red",
				},
			},
		],
	},
	plugins: [],
};
