import React from "react"
import { Animated, Easing, StyleProp, ViewStyle } from "react-native"

export interface Props {
	style?: StyleProp<ViewStyle>;
}

export class ShakeViewControl extends React.Component<Props, {}> {
	shakeAnimation = new Animated.Value(0)
	shake() {
		this.shakeAnimation.setValue(0)
		Animated.timing(this.shakeAnimation, {
			toValue: 1,
			duration: 300,
			easing: Easing.linear
		}).start()
	}
	componentDidMount() {}

	render() {
		const marginLeft = this.shakeAnimation.interpolate({
			inputRange: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
			outputRange: [0, -10, 10, -10, 10, -10, 0]
		})

		return <Animated.View style={[this.props.style, { marginHorizontal: marginLeft }]}>{this.props.children}</Animated.View>
	}
}
