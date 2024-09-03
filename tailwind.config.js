/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				paytone: ['Paytone One', 'sans-serif'],
				encode: ['Encode Sans', 'sans-serif']
			},
			colors: {
				'custom-red': '#FF6B6B',
				'custom-green': '#6BCB76'
			}
		}
	},
	plugins: [daisyui],
	daisyui: {
		themes: ['light']
	}
};
