import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

export interface Props {
	type: string;
	duration?: number;
	style?: StyleProp<ViewStyle>;
}

interface State {
	fadeAnim: Animated.Value;
}

export class FadeInOutViewControl extends React.Component<Props, State> {
	start = 0;
	end = 1;
	state = {
		fadeAnim: new Animated.Value(1),
	};
	constructor(props: any) {
		super(props);
		if (this.props.type == 'fadeIn') {
			this.start = 0;
			this.end = 1;
			this.state.fadeAnim = new Animated.Value(this.start);
		}
	}
	componentDidMount() {
		if (this.props.type == 'fadeIn') this.fadeIn();
	}
	fadeOut(callback?: any) {
		this.start = 1;
		this.end = 0;
		this.animate(callback);
	}
	fadeIn(callback?: any) {
		this.start = 0;
		this.end = 1;
		this.animate(callback);
	}
	animate(callback?: any) {
		this.setState(
			{
				fadeAnim: new Animated.Value(this.start),
			},
			() => {
				Animated.timing(this.state.fadeAnim, {
					toValue: this.end,
					duration: this.props.duration || 1000,
				}).start(callback);
			},
		);
	}
	render() {
		return (
			<Animated.View
				style={{
					...(this.props.style as object),
					opacity: this.state.fadeAnim,
				}}
			>
				{this.props.children}
			</Animated.View>
		);
	}
}
