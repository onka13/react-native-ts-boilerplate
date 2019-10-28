import React from "react";
import { View, ViewStyle } from "react-native";

export interface Prop {
	style?: ViewStyle;
}

export default class MyContainer extends React.Component<Prop>{
	style!: ViewStyle;
	constructor(props:any) {
		super(props);
		this.init(props);
	}
	componentWillReceiveProps(props:any) {
		this.init(props);
	}
	init(props:Prop) {
		this.style = {
			...{
				flex: 1,
				//borderWidth: 2,
				//borderColor: "red"
			},
			...props.style
		};
	}
	render() {
		return <View {...this.props} style={this.style}>{this.props.children}</View>;
	}
}
