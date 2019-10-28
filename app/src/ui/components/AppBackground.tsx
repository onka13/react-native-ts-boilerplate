import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { myTheme } from "../../data/config/myStyles";

export default class AppBackground extends React.Component {
	render() {
		return (
			<LinearGradient colors={myTheme.mix.pageBg} style={{ flex: 1 }}>
				{this.props.children}
			</LinearGradient>
		);
	}
}
