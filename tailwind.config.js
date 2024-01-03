import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
				'display-serif': ['Cehua', ...defaultTheme.fontFamily.serif],
				'display-sans': ['"Glacial Indifference"', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],

	daisyui: {
		themes: [
			{
				'ideahacks-2024': {
					primary: '#f1b21e',
					secondary: '#130dc8',
					accent: '#37cdbe',
					neutral: '#3d4451',
					'base-content': '#ffffff'
				}
			}
		]
	}
};
