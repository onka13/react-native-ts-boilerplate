import { AppState } from 'react-native';
import moment from 'moment';
// @ts-ignore
import BackgroundTimer from 'react-native-background-timer';

export function formatDate(date: any, format: string) {
	if (!date) return '';
	return moment(date).format(format);
}

export const setTimeoutBackground = (callback: Function, timeout: number) => {
	if (AppState.currentState == 'background') {
		return BackgroundTimer.setTimeout(callback, timeout);
	}
	return setTimeout(callback, timeout);
};

export const clearTimeoutBackground = (timeoutId: number) => {
	if (AppState.currentState == 'background') {
		return BackgroundTimer.clearTimeout(timeoutId);
	}
	return clearTimeout(timeoutId);
};
