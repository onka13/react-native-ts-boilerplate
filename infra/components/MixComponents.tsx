import React from 'react';
import { Component } from 'react';
import { TouchableOpacity, ImageBackground, Image, View, ImageSourcePropType, ImageStyle, LayoutRectangle, ViewStyle } from 'react-native';
import BaseSaltComponent from './BaseSaltComponent';

export class Img extends Component<{
	source: ImageSourcePropType;
	aspectRatio: number;
	style?: any;
}> {
	render() {
		const source = this.props.source;
		var aspectRatio = 1;
		if (this.props.aspectRatio) {
			aspectRatio = this.props.aspectRatio;
		} else {
			const { width, height } = Image.resolveAssetSource(source);
			aspectRatio = width / height;
		}
		//console.log('Img render', width, height)
		return (
			<Image {...this.props} source={source} style={[this.props.style, { width: null, height: null, resizeMode: 'cover', aspectRatio: aspectRatio }]} />
		);
	}
}

export class Imgv2 extends BaseSaltComponent<
	{
		source: any;
		style?: any;
		width?: number;
		height?: number;
		realSize?: boolean;
	},
	{
		width: number;
		height: number;
		done: boolean;
	}
> {
	state = {
		width: 0,
		height: 0,
		done: false,
	};
	componentWillMount() {
		if (!this.props.source || this.state.done) return;
		let { width, height } = Image.resolveAssetSource(this.props.source);
		if (this.props.width) {
			width = this.props.width;
		}
		if (this.props.height) {
			width = this.props.height;
		}
		if (!width || !height) {
			try {
				Image.getSize(
					this.props.source.uri,
					(width, height) => {
						//console.log('Img getSize', width, height)
						this.setState({ width, height });
					},
					error => {
						console.log('Img Component failure', error);
					},
				);
			} catch (error) {
				console.log('Img Component Error', error);
			}
			return;
		}
		this.setState({ width, height });
	}
	shouldComponentUpdate(){
		return this.state.width == 0;
	}
	render() {
		if (!this.state.width) {
			//this.state.width = 50 //deviceWidth / 3
		}
		if (!this.state.height) {
			//this.state.height = 50//deviceHeight / 3
		}
		//console.log('Img render', this.props, this.state);
		if (this.props.realSize || (this.props.style && (this.props.style.width || this.props.style.height))) {
			return (
				<Image
					{...this.props}
					source={this.props.source}
					style={[{ width: this.state.width, height: this.state.height, resizeMode: 'cover' }, this.props.style]}
				/>
			);
		}
		var aspectRatio = this.state.width / this.state.height || 1;
		return (
			<Image
				{...this.props}
				source={this.props.source}
				style={[{ width: null, height: null, resizeMode: 'contain', aspectRatio: aspectRatio }, this.props.style]}
			/>
		);
	}
}

export class ImgWithBack extends Component<{
	source: ImageSourcePropType;
	style: any;
}> {
	render() {
		const source = this.props.source;
		const { width, height } = Image.resolveAssetSource(source);
		//console.log('ImgWithBack render', width, height)
		return (
			<ImageBackground
				{...this.props}
				source={source}
				style={[{ width: null, height: null, aspectRatio: width / height, justifyContent: 'center', alignItems: 'center' }, this.props.style]}
				resizeMode="cover"
			>
				{this.props.children}
			</ImageBackground>
		);
	}
}

export class Btn extends Component {
	render() {
		return (
			<TouchableOpacity {...this.props} activeOpacity={0.8}>
				{this.props.children}
			</TouchableOpacity>
		);
	}
}

export class BtnDialog extends Component<{
	onLayout: Function;
	onPress: (width: number, height: number) => {};
}> {
	nativeEventLayout!: LayoutRectangle;
	render() {
		return (
			<TouchableOpacity
				activeOpacity={0.8}
				{...this.props}
				onLayout={e => {
					this.nativeEventLayout = e.nativeEvent.layout;
					if (this.props.onLayout) this.props.onLayout(e);
				}}
				onPress={e => {
					if (this.props.onPress) this.props.onPress(this.nativeEventLayout.width, this.nativeEventLayout.height);
				}}
			>
				{this.props.children}
			</TouchableOpacity>
		);
	}
}

export class ViewFlex extends Component<{
	left?: number;
	right?: number;
	center?: number;
	direction?: 'row' | 'column';
	style?: ViewStyle;
}> {
	render() {
		const left = this.props.left || 1;
		const right = this.props.right || 1;
		const center = this.props.center || 2;
		const direction = this.props.direction || 'row';
		return (
			<View style={{ flexDirection: direction }}>
				<View style={{ flex: left }} />
				<View style={[{ flex: center }, this.props.style]}>{this.props.children}</View>
				<View style={{ flex: right }} />
			</View>
		);
	}
}

export class PositionControl extends Component<{
	padding?: number;
	position: 1 | 2 | 3 | 4;
	style?: ViewStyle;
}> {
	render() {
		const position = this.props.position;
		if (!position) return this.props.children;
		var padder = this.props.padding || 0;
		const styles: any = { position: 'absolute' };
		if (position == 1) {
			styles.top = padder;
			styles.left = padder;
		} else if (position == 2) {
			styles.top = padder;
			styles.right = padder;
		}
		if (position == 3) {
			styles.bottom = padder;
			styles.left = padder;
		}
		if (position == 4) {
			styles.right = padder;
			styles.bottom = padder;
		}
		return <View style={[this.props.style, styles]}>{this.props.children}</View>;
	}
}
