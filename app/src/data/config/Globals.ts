import appjson from '../../../app.json';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const extra = Constants.manifest.extra;

var Globals = {
	APP_ID: 1,
	NAME: extra.name,
	VERSION: extra.dataVersion,
	JKEY: '123',
	PACKAGENAME: Platform.OS == 'ios' ? appjson.expo.ios.bundleIdentifier : appjson.expo.android.package,
	IS_TEST: 0,
	API_URL: 'http://192.168.0.11:4001',
};

export default Globals;
