import React from 'react';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import StatusBarControl from 'infra/components/StatusBarControl';
import InfraCommonManager from 'infra/business/managers/InfraCommonManager';
import { Ionicons } from '@expo/vector-icons';
import Setup from './ui/pages/Setup';
import StorageManager from './business/managers/StorageManager';
import { myTheme } from './data/config/myStyles';
import Globals from './data/config/Globals';
import fonts from './assets/fonts/index';
import AppBackground from './ui/components/AppBackground';
import Commonlib from "commonlib";

class App extends React.Component<{}, {}> {
	state = {
		isLoadingComplete: false,
		areReasourcesReady: false,
	};
	constructor(props: any) {
		super(props);
		SplashScreen.preventAutoHide();
	}
	componentDidMount() {
		this._loadResourcesAsync().then(() =>
			this.setState({
				areReasourcesReady: true,
			}),
		);
		Commonlib.updateTaskDescription(Globals.NAME, myTheme.mix.androidTaskColor);
	}
	render() {
		console.log('App render', this.state.areReasourcesReady);

		if (!this.state.areReasourcesReady) {
			return null;
		}
		return (
			<AppBackground>
				<StatusBarControl backgroundColor={myTheme.mix.statusBar} barStyle="light-content" />
				<Setup />
			</AppBackground>
		);
	}

	_loadResourcesAsync = async () => {
		console.log('_loadResourcesAsync');
		return Promise.all([
			Asset.loadAsync([
				//require('./assets/data/appData.json'),
			]),
			Font.loadAsync({
				...Ionicons.font,
				...fonts,
			}),
			StorageManager.initAll(),
			InfraCommonManager.initAll(),
		]);
	};

	_handleLoadingError = (error: any) => {
		// In this case, you might want to report the error to your error
		// reporting service, for example Sentry
		console.warn('_handleLoadingError');
		console.warn(error);
	};

	_handleFinishLoading = () => {
		console.log('App.js _handleFinishLoading');
		this.setState({ isLoadingComplete: true });
	};
}

export default App;

// function App1() {
// 	return (
// 		<View style={{ flex: 1, backgroundColor: 'red' }}>
// 			<Text>Open up App.tsx to start working on your app!</Text>
// 		</View>
// 	);
// }
