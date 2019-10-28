import React from 'react';
import { Animated, Dimensions, StyleProp, ViewStyle } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export interface Props {
	options: {
		animationX?: 'left' | 'right';
		animationY?: 'up' | 'down';
	};
	style: StyleProp<ViewStyle>;
}

interface State {
	fadeAnim: Animated.Value;
	top: Animated.Value;
	left: Animated.Value;
}

export class SlideUpDownViewControl extends React.Component<Props, State> {
	public static defaultProps: Partial<Props> = {
		options: {},
	};
	reverse = 0;
	state = {
		fadeAnim: new Animated.Value(1),
		top: new Animated.Value(0),
		left: new Animated.Value(0),
	};
	endLeft = 0;
	endTop = 0;
	constructor(props: any) {
		super(props);
		this.slide(false);
	}
	componentDidMount() {
		this.animate();
	}

	animate(callback?: any) {
		// velocity: 3,
		// tension: 2,
		// friction: 8,
		Animated.sequence([
			Animated.parallel([
				Animated.timing(this.state.left, { toValue: this.endLeft, duration: 500 }),
				Animated.timing(this.state.top, { toValue: this.endTop, duration: 500 }),
			]),
		]).start(finished => {
			//console.log('animate end', finished); callback && callback(finished)
		});
	}

	slideReverse(callback: () => void) {
		this.reverse = 1;
		this.slide(true, callback);
	}

	slide(callSetState: boolean, callback?: () => void) {
		var left = 0,
			top = 0;
		var options = this.props.options;
		var directionX = options.animationX;
		var directionY = options.animationY;

		if (directionX == 'left') {
			if (this.reverse) {
				this.endLeft = deviceWidth;
				left = 0;
			} else {
				this.endLeft = 0;
				left = deviceWidth;
			}
		} else if (directionX == 'right') {
			if (this.reverse) {
				this.endLeft = -deviceWidth;
				left = 0;
			} else {
				this.endLeft = 0;
				left = -deviceWidth;
			}
		}
		if (directionY == 'up') {
			if (this.reverse) {
				this.endTop = deviceHeight;
				top = 0;
			} else {
				this.endTop = 0;
				top = deviceHeight;
			}
		} else if (directionY == 'down') {
			if (this.reverse) {
				this.endTop = -deviceHeight;
				top = 0;
			} else {
				this.endTop = 0;
				top = -deviceHeight;
			}
		}

		//console.log('slide', directionX, directionY, left, top, this.endLeft, this.endTop)
		this.state.top = new Animated.Value(top);
		this.state.left = new Animated.Value(left);

		if (callSetState)
			this.setState(
				{
					top: this.state.top,
					left: this.state.left,
				},
				() => {
					this.animate(callback);
				},
			);
	}

	render() {
		return (
			<Animated.View
				style={{
					...(this.props.style as object),
					transform: [{ translateX: this.state.left }, { translateY: this.state.top }],
				}}
			>
				{this.props.children}
			</Animated.View>
		);
	}
}
