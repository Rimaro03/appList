import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Item from '../interfaces/Item';
import ListElement from '../ListElement';
import { FlatList, GestureHandlerRootView, RectButton, ScrollView } from 'react-native-gesture-handler';
import ItemModal from '../ItemModal';
import { Params } from '../interfaces/Params';
import { setItems } from '../../functions/ListManager';
import SwipeableItem from '../SwipeableItem';
import DataRow from '../interfaces/DataRow';

const ListScreen = (): JSX.Element => {
	const route: RouteProp<ParamListBase, string> = useRoute();
	const [params] = useState<Params>(route.params as Params);
	const [data, setData] = useState<Array<Item>>(params.data);
	const [key, setKey] = useState(params.key);

	useEffect(()=>{
		setData(data);
		setKey(key);
	}, [params]);
	
	useEffect(()=>{
		setItems(key, data)
			.catch(err => console.error(err));
	}, [data]);

	const SwipeableRow = ({ item, index }: { item: Item, index: React.Key }) => {
		return (
			<SwipeableItem>
				<ListElement title={item.title} description={item.description} data={data} setData={setData} index={index as number} />
			</SwipeableItem>
		);
	};
	
	return (
		<GestureHandlerRootView >
			<View style={styles.container}>
				<FlatList
					data={data}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
					renderItem={({ item, index }) => <SwipeableRow item={item} index={index} />}
					keyExtractor={(_item, index) => `message ${index}`}
				/>
				<ItemModal data={data} setData={setData}/>
			</View>
		</GestureHandlerRootView >
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '100%',
	},
	rectButton: {
		flex: 1,
		height: 80,
		paddingVertical: 10,
		paddingHorizontal: 20,
		justifyContent: 'space-between',
		flexDirection: 'column',
		backgroundColor: 'white',
	},
	separator: {
		backgroundColor: 'rgb(200, 199, 204)',
		height: StyleSheet.hairlineWidth,
	},
	fromText: {
		fontWeight: 'bold',
		backgroundColor: 'transparent',
	},
	messageText: {
		color: '#999',
		backgroundColor: 'transparent',
	},
	dateText: {
		backgroundColor: 'transparent',
		position: 'absolute',
		right: 20,
		top: 10,
		color: '#999',
		fontWeight: 'bold',
	},
});

export default ListScreen;
