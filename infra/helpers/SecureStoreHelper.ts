import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';

export default class SecureStoreHelper {
	defaultOptions = {
		keychainService: 'myKeychain',
	};
	static myInstance: SecureStoreHelper;
	private constructor() {
		//console.log('SecureStoreHelper constructor called!')
	}

	static instance() {
		if (this.myInstance == null) this.myInstance = new SecureStoreHelper();
		return this.myInstance;
	}

	getValue(key: string): Promise<any> {
		//console.log('SecureStore get', key);
		return getItemAsync(key, this.defaultOptions).then((value: any) => {
			//console.log('SecureStore', key, value);
			try {
				return JSON.parse(value).a;
			} catch (error) {}
			return value;
		});
	}

	removeKey(key: string) {
		return deleteItemAsync(key, this.defaultOptions);
	}

	setValue(key: string, value: any) {
		//console.log('SecureStore set', key);
		return setItemAsync(key, JSON.stringify({ a: value }), this.defaultOptions);
	}
}
