import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			'display-serif': ['Cehua', ...defaultTheme.fontFamily.serif],
			'display-sans': ['Glacial Indifference', ...defaultTheme.fontFamily.sans]
		},
		extend: {
			fontFamily: {
				sans: ['Open Sans', ...defaultTheme.fontFamily.sans]
			}
		}
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
		],
	  },
};
