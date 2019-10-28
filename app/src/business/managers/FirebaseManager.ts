import firebase from 'react-native-firebase';
import { promiseTimeout } from 'infra/helpers/utils';
import { Config } from 'react-native-firebase/config';

class FirebaseManager {
	config!: Config;
	cmdOptions: any = {
		minAndroidVersion: 0,
		minIosVersion: 0,
		dataVersion: 1,
		dataPath: '',
	};

	static myInstance: FirebaseManager;
	static instance() {
		if (this.myInstance == null) this.myInstance = new FirebaseManager();
		return this.myInstance;
	}

	constructor() {
		this._init();
	}

	_init() {
		if (this.config) return;
		this.config = firebase.config();
		this.setDefaults();
	}

	getCmdOptions() {
		return this.cmdOptions;
	}

	setDefaults() {
		var options: any = {};
		for (const key in this.cmdOptions) {
			options['cmd_' + key] = this.cmdOptions[key];
		}
		this.config.setDefaults(options);
	}

	setCmdValues() {
		return this.config
			.getKeysByPrefix('cmd_')
			.then(keys => {
				// @ts-ignore
				return this.config.getValues(keys);
			})
			.then(snapshot => {
				for (const key in snapshot) {
					var val = snapshot[key].val();
					this.cmdOptions[key.replace('cmd_', '')] = val;
				}
			})
			.catch(console.error);
	}

	fetch() {
		this._init();
		if (__DEV__) {
			this.config.enableDeveloperMode();
		}

		return promiseTimeout(10000, (eventDone: Function) => {
			var duration = __DEV__ ? 0 : 10 * 60; // 10dk
			this.config
				.fetch(duration)
				.then(() => {
					return this.config.activateFetched();
				})
				.then(activated => {
					console.log('FirebaseManager activated', activated);
					if (!activated) console.log('Fetched data not activated');
					return Promise.all([this.setCmdValues()]);
				})
				.catch(err => console.log('FirebaseManager error', err.message))
				.finally(() => {
					eventDone();
				});
		});
	}
}

export default FirebaseManager.instance();
