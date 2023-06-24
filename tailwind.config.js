/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],

	daisyui: {
		themes: [
		  {
			mytheme: {
			  "primary": "#ffffff",
			  "secondary": "#808080",
			  "accent": "#37cdbe",
			  "neutral": "#3d4451",
			  "base-100": "#ffffff",
			},
		  },
		  "dark",
		  "cupcake",
		],
	  },
};
