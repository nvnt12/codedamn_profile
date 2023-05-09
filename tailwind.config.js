/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			sm: { max: '600px' },
			md: { min: '600px', max: '900px' }
		},
		extend: {}
	},
	plugins: []
}
