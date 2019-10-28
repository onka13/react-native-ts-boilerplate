import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from '../../../business/redux_source/ReduxHelper';
import BaseComponent from '../../components/BaseComponent';
import MyContainer from '../../components/myComponents/MyContainer';
import { Text, Header, ListItem, Avatar } from 'react-native-elements';
import { createStyles, myTheme, mySizes } from '../../../data/config/myStyles';
import WallBusinessLogic from '../../../business/services/WallBusinessLogic';
import { Imgv2 } from 'infra/components/MixComponents';
import MyIcon from '../../components/myComponents/MyIcon';

class FlatListItem extends React.PureComponent<{
	item: any;
}> {
	render() {
		const { item } = this.props;
		return (
			<ListItem
				title={item.title}
				subtitle={
					<View>
						<Text>{item.body}</Text>
						<Imgv2 source={{ uri: item.image }} />
					</View>
				}
				leftAvatar={{ source: { uri: item.user.avatar } }}
				bottomDivider
			/>
		);
	}
}

class Wall extends BaseComponent<{}, {}> {
	state = {
		data: [],
		page: 1,
		hasNextPage: false,
		loading: false,
		refreshing: true,
	};
	_flat!: any;
	componentDidMount() {
		super.componentDidMount();
		this.list(1);
	}
	list = (page: number) => {
		console.log('Wall-listData', page);
		const state: any = {
			page: page,
			loading: false,
			refreshing: false,
			hasNextPage: false,
		};
		WallBusinessLogic.list(page)
			.then(res => {
				console.log('Wall-listData results', res.results.length);
				if (res.results.length > 0) {
					state.data = page === 1 ? res.results : this.state.data.concat(res.results);
					state.hasNextPage = res.hasNextPage;
				}
			})
			.catch(this.apiReject)
			.finally(() => {
				this.setState(state);
			});
	};
	onRefresh = () => {
		console.log('onRefresh');
		if (this.state.refreshing) return;
		this.setState({ refreshing: true }, () => this.list(1));
	};
	onEndReached = () => {
		console.log('onEndReached');
		if (this.state.loading) return;
		if (!this.state.hasNextPage) return;
		this.setState({ loading: true }, () => this.list(this.state.page + 1));
	};
	renderFooter = () => {
		if (!this.state.loading) {
			return null;
		}
		return (
			<View style={styles.loading}>
				<ActivityIndicator color={myTheme.primary.main} />
			</View>
		);
	};
	renderItem = ({ item }: any) => {
		return <FlatListItem item={item} />;
	};
	render() {
		console.log('Wall data-length', this.state.data.length);
		return (
			<MyContainer>
				<Header>
					<Avatar
						rounded
						source={{
							uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
						}}
						size="small"
						onPress={() => {
							this.props.navigation.openDrawer();
						}}						
					/>
					<Text>Home</Text>
					<View>
						<MyIcon name="settings" mode="reverse" />
					</View>
				</Header>
				{/* Do not put FlatList inside of ScrollView! */}
				<FlatList
					ref={c => (this._flat = c)}
					data={this.state.data}
					keyExtractor={(item: any) => item.id + ''}
					renderItem={this.renderItem}
					onRefresh={this.onRefresh}
					refreshing={this.state.refreshing}
					onEndReached={this.onEndReached}
					onEndReachedThreshold={0.5}
					initialNumToRender={8}
					maxToRenderPerBatch={8}
					updateCellsBatchingPeriod={100}
					removeClippedSubviews={true}
					windowSize={11}
					numColumns={1}
					// getItemLayout={(data, index) => ({
					// 	length: 50,
					// 	offset: 50 * index,
					// 	index
					// })}
				/>
				{this.renderFooter()}
			</MyContainer>
		);
	}
}

const styles = createStyles({
	loading: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: mySizes.padding1,
	},
});

export default connect(
	Wall,
	'wall',
);
