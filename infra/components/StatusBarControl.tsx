import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Constants from 'expo-constants';

const MyStatusBar = ({ backgroundColor, ...props }: any) => (
	<View style={[styles.statusBar, { backgroundColor }]}>
		<StatusBar translucent backgroundColor={backgroundColor} {...props} />
	</View>
);

class StatusBarControl extends React.Component<{
	backgroundColor?: string;
	barStyle?: string;
}> {
	render() {
		return <MyStatusBar backgroundColor={this.props.backgroundColor} {...this.props} />;
	}
}

//StatusBar.currentHeight
const styles = StyleSheet.create({
	statusBar: {
		height: Constants.statusBarHeight,
	},
});

export default StatusBarControl;
