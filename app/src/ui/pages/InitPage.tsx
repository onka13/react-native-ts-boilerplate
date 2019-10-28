import React from "react";
import { View, Platform } from "react-native";
import { SplashScreen } from "expo";
import Globals from "../../data/config/Globals";
import { createStyles } from "../../data/config/myStyles";
import FirebaseManager from "../../business/managers/FirebaseManager";
import BaseComponent from "../components/BaseComponent";
import { Text, Button } from "react-native-elements";
import MyContainer from "../components/myComponents/MyContainer";
import MyBody from "../components/myComponents/MyBody";
import StorageManager from "../../business/managers/StorageManager";
import { translate } from '../../business/managers/Localization';
import AccountBusinessLogic from '../../business/services/AccountBusinessLogic';

class InitPage extends BaseComponent<{},{}> {
	state = {
		loading: true,
		forceUpdate: false
	};
	componentDidMount() {
		super.componentDidMount();
		SplashScreen.hide();
		this._init();
	}
	async _init() {
		if (!StorageManager.getInstallDate()) {
			await StorageManager.setInstallDate(new Date().toISOString());
			await StorageManager.setDeviceId();
		}

		await FirebaseManager.fetch();
		var minVersion = Platform.OS == "ios" ? FirebaseManager.getCmdOptions().minIosVersion : FirebaseManager.getCmdOptions().minAndroidVersion;
		if (minVersion > Globals.VERSION) {
			return this.setState({ forceUpdate: true, loading: false });
		}

		if (AccountBusinessLogic.isLoggedIn()) {
			this.goToPageAndResetAll("Home");
			return	
		}		
		this.goToPageAndResetAll("Login");
	}
	renderInner() {
		if (this.state.forceUpdate) {
			return (
				<View>
					<Text>{translate("forceUpdate")}</Text>
					<Button title="Go to Market" />
				</View>
			);
		}
		return this.renderLoading();
	}
	render() {
		return (
			<MyContainer>
				<MyBody>{this.renderInner()}</MyBody>
			</MyContainer>
		);
	}
}

const styles = createStyles({});

export default InitPage;
