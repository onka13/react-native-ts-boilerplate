import { Platform } from 'react-native';
//import NetInfo from '@react-native-community/netinfo';
const NetInfo: any = {};

class ConnectionHelper {
	static myInstance: ConnectionHelper;
	constructor() {}

	static instance() {
		if (this.myInstance == null) this.myInstance = new ConnectionHelper();
		return this.myInstance;
	}

	connectionInfo: any;
	_onChangedEvent = (info: any) => {};
	handleConnectivityChange(connectionInfo: any) {
		console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
		this.connectionInfo = connectionInfo;
		this._onChangedEvent && this._onChangedEvent(connectionInfo);
	}
	startListen(onChangedEvent: () => void) {
		this._onChangedEvent = onChangedEvent;
		this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
		NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
		NetInfo.getConnectionInfo().then((connectionInfo: any) => {
			this.handleConnectivityChange(connectionInfo);
		});
	}
	stopListen() {
		NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
		this._onChangedEvent = () => {};
	}
	isConnected(): boolean {
		return this.connectionInfo && this.connectionInfo.type != 'none';
	}
	isWifi(): boolean {
		return this.connectionInfo && this.connectionInfo.type == 'wifi';
	}
	isCellular(): boolean {
		return this.connectionInfo && this.connectionInfo.type == 'cellular';
	}
	/**
	 * Check has internet connection or not.
	 * @returns {Promise.<Boolean>} A promise that resolves with the value
	 */
	fetchIsConnected() {
		console.log('fetchIsConnected');
		if (Platform.OS == 'android') return NetInfo.isConnected.fetch();

		return new Promise((resolve, reject) => {
			/* NetInfo.isConnected.fetch().then(()=>{
                return NetInfo.isConnected.fetch()
            }) */

			this.startListen(() => {
				this.stopListen();
				resolve(this.isConnected());
			});
		});
	}
}

export default ConnectionHelper.instance();
