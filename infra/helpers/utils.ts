import { Dimensions, PixelRatio, Platform } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 680;

const baseDensity = 2.875;

const scale = (size: number) => (deviceWidth / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (deviceWidth / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.3) => size + (scale(size) - size) * factor;
//export const moderateScale = (size, factor = 0.625) => size + (size * (deviceWidth / guidelineBaseWidth - 1)) * factor;

export const moderateScaleLayout = (size: number) => PixelRatio.roundToNearestPixel((size * deviceWidth) / guidelineBaseWidth);
export const moderateFontScale = (size: number) => size; //moderateScaleLayout(size) //size * PixelRatio.get(1)

export const isIphoneX = Platform.OS == 'ios' && (deviceHeight === 812 || deviceWidth === 812 || deviceHeight === 896 || deviceWidth === 896);

export function shuffle(array: Array<any>) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

export function promiseQueue(all: Array<Promise<any>>, delay = 0) {
	if (!all || all.length == 0) return Promise.resolve(true);
	return new Promise((resolve, reject) => {
		const output: any = [];

		next(all.splice(0, 1));

		function next(go: Array<any>) {
			if (go.length == 0) return resolve(output);
			const done = (res: any) => {
				output.push(res);

				if (delay > 0) {
					setTimeout(() => {
						next(all.splice(0, 1));
					}, delay);
				} else {
					next(all.splice(0, 1));
				}
			};
			go[0]()
				.then(done)
				.catch(done);
		}
	});
}

export const capitalizeFirstLetter = (a: string) => {
	return a && a[0].toUpperCase() + a.substr(1);
};

export const fixName = (a: string) => {
	if (!a) return '';
	a = a
		.replace(/ç/gi, 'c')
		.replace(/Ç/gi, 'C')
		.replace(/ğ/gi, 'g')
		.replace(/Ğ/gi, 'G')
		.replace(/ı/gi, 'i')
		.replace(/İ/gi, 'I')
		.replace(/ö/gi, 'o')
		.replace(/Ö/gi, 'O')
		.replace(/ş/gi, 's')
		.replace(/Ş/gi, 'S')
		.replace(/ü/gi, 'u')
		.replace(/Ü/gi, 'U');
	a = a.replace(/[^a-zA-Z0-9-_]/, '_');
	return a;
};

export function promiseTimeout(timeout: number, func: (result?: any) => void, logName?: string) {
	return new Promise((resolve, reject) => {
		const opts = { timer: 0, isDone: false };
		const eventDone = (result?: any) => {
			if (opts.isDone) return;
			clearTimeout(opts.timer);
			opts.isDone = true;
			resolve(result);
		};
		opts.timer = setTimeout(() => {
			console.log('promiseTimeout', timeout, logName);
			eventDone();
		}, timeout);
		func(eventDone);
	});
}

export function stringFormat(...args: any[]) {
	if (!args || args.length == 0 || !args[0]) return '';
	var params = args.slice(1);
	return args[0].replace(/{(\d+)}/g, function(match: string, index: number) {
		return typeof params[index] != 'undefined' ? params[index] : match;
	});
}
