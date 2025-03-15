export const theme = {
	grid: {
		container: '130rem',
		gutter: '3.2rem',
	},
	borderRadius: {
		none: '0',
		xxs: '0.2rem',
		xs: '0.4rem',
		s: '0.6rem',
		sm: '0.8rem',
		md: '1.6rem',
		lg: '2.4rem',
		pill: '50rem',
		circular: '50%',
		full: '100%',
	},
	borderWidth: {
		none: '0',
		hairline: '0.1rem',
		thin: '0.2rem',
		thick: '0.4rem',
		heavy: '0.8rem',
	},
	width: {
		container: '130rem',
	},
	opacity: {
		semiOpaque: '0.80',
		intense: '0.64',
		medium: '0.32',
		light: '0.16',
		semiTransparent: '0.08',
	},
	font: {
		family: 'Barlow, sans-serif',
		weights: {
			regular: 400,
			medium: 600,
			bold: 700,
		},
		sizes: {
			xxxs: '1rem',
			xxs: '1.2rem', // 12px
			xmd: '1.36rem', // 13.6px
			xs: '1.4rem', // 14px
			x: '1.5rem', // 15px
			sm: '1.6rem', // 16px
			smd: '1.8rem', // 18px
			md: '2rem', // 20px
			lg: '2.4rem', // 24px
			xl: '3.2rem', // 32px
			xxl: '4rem', // 40px
			xxxl: '4.8rem', // 48px,
			display: '6.4rem', // 64px
			giant: '8rem', // 80px
		},
	},
	space: {
		xxxsmall: '0.4rem',
		xxsmall: '0.8rem',
		xsmall: '1.2rem',
		small: '1.6rem',
		xmedium: '2.0rem',
		medium: '2.4rem',
		large: '3.2rem',
		xxl: '4rem',
		xlarge: '4.8rem',
		xxlarge: '5.6rem',
		xxxlarge: '6.4rem',
	},
	layers: {
		base: 10,
		menu: 20,
		overlay: 30,
		modal: 40,
		alwaysOnTop: 50,
	},
	boxShadow: {
		regular: '0 0.4rem 1.6rem rgba(0, 0, 0, 0.08)',
		levelOne: '0 0.4rem 0.8rem',
		levelTwo: '0 0.8rem 2.4rem',
		levelThree: '0 1.6rem 3.2rem',
		levelFour: '0 1.6rem 4.8rem',
	},
	transition: {
		default: '0.3s ease-in-out',
		fast: '0.1s ease-in-out',
	},
	colors: {
		primary: '#2563EB',
		white: '#FFF',
		whiteGrey: '#D6DDEB',
		secondWhite: '#F8F8FD',
		cleanGrey: '#D6DDEB',
		cleanBlue: '#E9EBFD',
		grey900: '#0F172A',
		darkGrey: '#202430',
		darkBlue: '#25324B',
		darkTitanium: '#515B6F',
		findBlue: '#4640DE',
		officialGrey: '#7C8493',
		cleanTitanium: '#94A3B8',
		lightGrey: '#A8ADB7',
		lightBlue: '#26A4FF',
		lightGreen: '#56CDAD',
		lightRed: '#FF6550',
		mustYellow: '#FFB836',
	},
} as const;
