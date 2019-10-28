import firebase, { RNFirebase } from 'react-native-firebase';
import DeviceHelper from 'infra/helpers/DeviceHelper';

class LogManager {
	analytics: RNFirebase.Analytics;
	crashlytics: RNFirebase.crashlytics.Crashlytics;

	static myInstance: LogManager;
	static instance() {
		if (this.myInstance == null) this.myInstance = new LogManager();
		return this.myInstance;
	}

	constructor() {
		console.log('LogManager constructor called!');
		//if (firebase.crashlytics.nativeModuleExists)
		this.crashlytics = firebase.crashlytics();
		//if (firebase.analytics.nativeModuleExists)
		this.analytics = firebase.analytics();
		this.analytics.setAnalyticsCollectionEnabled(true);
	}

	_nameFix(name: string): string {
		if (!name) return '';
		name = name.replace(/[^a-zA-Z0-9_]/gi, '').replace(/undefined/gi, '');
		if (name.length > 32) name = name.substr(0, 32);
		return name;
	}

	// event: max 32 char
	//key/value pair of event properties, max length of 100 characters
	logEvent(event: string, params: any, addDeviceInfo: boolean = false) {
		event = this._nameFix(event);
		if (!event) return;
		console.log('logEvent', event);
		if (__DEV__) return;
		if (addDeviceInfo) {
			if (!params) params = {};
			params.info = DeviceHelper.getDeviceInfo();
		}
		this.analytics.logEvent(event, params);
	}

	setAnalyticsCollectionEnabled(enabled: boolean) {
		this.analytics.setAnalyticsCollectionEnabled(enabled);
	}

	setCurrentScreen(screenName: string, screenClassOverride: string) {
		screenName = this._nameFix(screenName);
		if (!screenName) return;
		this.analytics.setCurrentScreen(screenName, screenClassOverride);
	}

	setUserId(id: string) {
		this.analytics.setUserId(id + '');
	}

	setUserProperty(name: string, value: string) {
		this.analytics.setUserProperty(name, value + '');
	}

	setUserProperties(params: { [key: string]: string | null }) {
		this.analytics.setUserProperties(params);
	}

	crash() {
		this.crashlytics.crash();
	}

	log(message: string) {
		if (typeof message == 'object') {
			message = JSON.stringify({ m: message });
		}
		this.crashlytics.log(message);
	}

	report(message: string, code: number) {
		if (!message) return;
		if (typeof message == 'object') {
			message = JSON.stringify({ m: message });
		}
		this.crashlytics.recordError(code || 1, message + '');
	}

	setCrashKey(key: string, value: string) {
		if (typeof value == 'number') {
			this.crashlytics.setIntValue(key, value);
		} else if (typeof value == 'boolean') {
			this.crashlytics.setBoolValue(key, value);
		} else {
			this.crashlytics.setStringValue(key, value + '');
		}
	}

	setCrashUserIdentifier(userId: string) {
		this.crashlytics.setUserIdentifier(userId + '');
	}
}

export default LogManager.instance();
