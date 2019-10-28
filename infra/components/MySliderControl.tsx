import React from 'react';
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

interface SliderProps {
	width: number;
	children: any;
	pageChanged: (page: number) => void;
}

export default class MySliderControl extends React.Component<SliderProps> {
	width = 100;
	pageChanged!: (page: number) => void;
	itemCount = 0;
	page = 0;
	scrollView: any;
	snapToOffsets!: number[];
	constructor(props: SliderProps) {
		super(props);
		this.initProps(this.props);
	}
	initProps(props: SliderProps) {
		this.width = props.width;
		this.itemCount = props.children.length || 1;
		this.snapToOffsets = new Array(this.itemCount).fill(0).map((x, i) => i * this.width);
		if (props.pageChanged) this.pageChanged = props.pageChanged;
	}
	componentWillReceiveProps(nextProps: SliderProps) {
		this.initProps(nextProps);
	}
	gotoStep(page: number) {
		console.log('gotoStep', page, this.itemCount);
		if (page >= this.itemCount) {
			return;
		}

		this.page = page;
		setTimeout(() => {
			this.scrollView.scrollTo({
				animated: true,
				x: page * this.width,
			});
		}, 1);
	}
	_onMomentumScrollEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
		var offset = e.nativeEvent.contentOffset;
		if (offset) {
			var page = Math.round(offset.x / this.width);
			if (this.page != page) {
				this.page = page;
				this.pageChanged && this.pageChanged(page);
			}
		}
	}
	render() {
		return (
			<ScrollView
				ref={c => {
					this.scrollView = c;
				}}
				horizontal
				pagingEnabled={true}
				snapToInterval={this.width}
				snapToOffsets={this.snapToOffsets}
				onMomentumScrollEnd={e => this._onMomentumScrollEnd(e)}
			>
				{this.props.children}
			</ScrollView>
		);
	}
}
