import { StyleSheet, Dimensions, Platform } from 'react-native';
import { moderateScale, moderateScaleLayout, moderateFontScale } from 'infra/helpers/utils';
// @ts-ignore
import color from 'color';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export const mySizes = {
	normal: moderateScale(14),
	subTitle: moderateScale(13),
	title: moderateScale(16),
	titleX: moderateScale(22),
	titleXX: moderateScale(30),
	titleXXX: moderateScale(40),
	padding0: moderateScale(3),
	padding1: moderateScale(5),
	padding2: moderateScale(8),
	padding3: moderateScale(13),
	padding4: moderateScale(21),
	padding5: moderateScale(34),
	padding6: moderateScale(55),
	icon0: moderateScale(16),
	icon1: moderateScale(24),
	icon2: moderateScale(32),
	icon3: moderateScale(48),
	icon4: moderateScale(64),
	icon5: moderateScale(72),
	icon6: moderateScale(128),
	widthD2: deviceWidth / 2,
	widthD3: deviceWidth / 3,
	buttonHeight: moderateScaleLayout(55),
	height: deviceHeight,
	height050: deviceHeight / 2,
	width: deviceWidth,
	width075: deviceWidth * 0.75,
	width050: deviceWidth / 2,
	width033: deviceWidth / 3,
	border: moderateScaleLayout(0.3),
	radius: moderateScaleLayout(3),
	fontSize40: moderateFontScale(4.0 * 3),
	fontSize41: moderateFontScale(4.3 * 3),
	fontSize42: moderateFontScale(4.7 * 3),
	fontSize50: moderateFontScale(5.0 * 3),
	fontSize51: moderateFontScale(5.3 * 3),
	fontSize52: moderateFontScale(5.7 * 3),
	fontSize60: moderateFontScale(6.0 * 3),
	fontSize61: moderateFontScale(6.3 * 3),
	fontSize62: moderateFontScale(6.7 * 3),
	fontSize70: moderateFontScale(7.0 * 3),
	fontSize71: moderateFontScale(7.3 * 3),
	fontSize72: moderateFontScale(7.7 * 3),
	fontSize80: moderateFontScale(8.0 * 3),
	fontSize81: moderateFontScale(8.3 * 3),
	fontSize82: moderateFontScale(8.7 * 3),
};

export const myColors = {
	blue: '#2196f3',
	indigo: '#3f51b5',
	purple: '#9c27b0',
	pink: '#e91e63',
	red: '#e53935',
	orange: '#fb8c00',
	yellow: '#ffeb3b',
	lime: '#CDDC39',
	green: '#4caf50',
	teal: '#009688',
	cyan: '#00bcd4',
	white: '#fef',
	black: '#111',
	gray: '#6c757d',
	grayDark: '#343a40',
	brown: '#795548',
	light: '#e9ecef',
};

export type themeProps = 'primary' | 'secondary' | 'tertiary' | 'success' | 'info' | 'warning' | 'error';

export const myTheme: any = {
	primary: {
		main: '#409DA4',
		contrastText: '#fff',
	},
	secondary: {
		main: '#2F3C43',
		contrastText: '#fff',
	},
	tertiary: {
		main: '#4dabf5',
		contrastText: '#fff',
	},
	success: {
		main: '#4caf50',
		contrastText: '#fff',
	},
	info: {
		main: '#009688',
		contrastText: '#fff',
	},
	warning: {
		main: '#fb8c00',
		contrastText: '#fff',
	},
	error: {
		main: '#e53935',
		contrastText: '#fff',
	},
	text: {
		primary: '#111',
		secondary: '#111111cc',
		note: '#ccc',
		fontSize: mySizes.fontSize42,
	},
	icon: {
		color: '#aaa',
		reverse: '#fff',
	},
	mix: {
		pageBg: [
			'#eee',
			color('#fff')
				.lighten(0.2)
				.hex(),
			'#eee',
		],
		leftBg: '#fff',
		border: '#ccc',
		background: '#0069c0',
		overlay: '#00000022',
		card: '#3f51b5',
		header: 'transparent',
		androidTaskColor: '#2196f3',
	},
};

Object.keys(myTheme)
	.filter(x => myTheme[x].main)
	.forEach(key => {
		myTheme[key].light = color(myTheme[key].main)
			.lighten(0.2)
			.hex();
		myTheme[key].dark = color(myTheme[key].main)
			.darken(0.2)
			.hex();
	});

myTheme.mix.statusBar = myTheme.primary.dark;

export const getTheme = (): any => {
	return {
		colors: {
			primary: myTheme.primary.main,
			secondary: myTheme.secondary.main,
			success: myTheme.success.main,
			error: myTheme.error.main,
			warning: myTheme.warning.main,
			grey0: '#86939e',
			grey1: '#bdc6cf',
			grey2: '#5e6977',
			grey3: '#e1e8ee',
			grey4: '#e1e8ee',
			grey5: '#e1e8ee',
		},
		Button: {
			titleStyle: {
				color: myTheme.text.primary,
			},
		},
		Text: {
			style: {
				color: myTheme.text.primary,
				fontSize: mySizes.normal,
			},
			h4Style: { fontWeight: 'normal', fontSize: mySizes.title },
			h3Style: { fontWeight: 'normal', fontSize: mySizes.titleX },
			h2Style: { fontWeight: 'normal', fontSize: mySizes.titleXX },
			h1Style: { fontWeight: 'normal', fontSize: mySizes.titleXXX },
		},
		ListItem: {
			containerStyle: {
				backgroundColor: 'transparent',
			},
			subtitleStyle: {
				color: myTheme.text.primary,
			},
		},
		Header: {
			statusBarProps: {
				backgroundColor: '#FF0000',
				barStyle: 'light-content',
			},
			placement: 'left',
			containerStyle: {
				paddingTop: 0,
				height: Platform.select({
					android: 56,
					default: 44,
				}),
			},
		},
		Input: {
			leftIcon: {
				color: myTheme.icon.color,
			},
			leftIconContainerStyle: {
				marginRight: 10,
			},
			containerStyle: {
				marginBottom: mySizes.padding3,
			},
		},
		Icon: {
			color: myTheme.icon.color,
			reverseColor: myTheme.icon.reverseColor,
		},
	};
};

// StyleSheet.hairlineWidth
//StyleSheet.absoluteFill

export const createStyles = (styles: any) => {
	return StyleSheet.create({
		...{
			absolute: {
				position: 'absolute',
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
			},
			center: {
				justifyContent: 'center',
				alignItems: 'center',
			},
			centerAll: {
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			},
			acenter: {
				position: 'absolute',
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				justifyContent: 'center',
				alignItems: 'center',
			},
			title: {
				fontSize: mySizes.title,
				paddingBottom: mySizes.padding1,
			},
			shadow: {
				elevation: 3,
				//borderWidth: 0.1,
				shadowOffset: { width: 3, height: 3 },
				shadowColor: '#000000',
				shadowOpacity: 0.6,
				shadowRadius: 6,
				//marginTop: 5,
				//marginBottom: 10,
				//marginHorizontal: 10,
				//backgroundColor: "#0000",
				zIndex: 999,
			},
		},
		...styles,
	});
};
