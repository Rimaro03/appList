import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Item from '../interfaces/Item';
import ListElement from '../ListElement';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import ItemModal from '../ItemModal';
import { Params } from '../interfaces/Params';
import { setItems } from '../../functions/ListManager';
import SwipeableItem from '../SwipeableItem';

const ListScreen = (): JSX.Element => {
	const route: RouteProp<ParamListBase, string> = useRoute();
	const [params] = useState<Params>(route.params as Params);
	const [data, setData] = useState<Array<Item>>(params.data);
	const [notCompleted, setNotCompleted] = useState<Array<Item>>();
	const [completed, setCompleted] = useState<Array<Item>>();
	const [key, setKey] = useState(params.key);

	useEffect(() => {
		setData(data);
		setKey(key);
	}, [params]);

	useEffect(() => {
		setItems(key, data)
			.catch(err => console.error(err));
		setCompleted(data.filter(item => { return item.completed; }));
		setNotCompleted(data.filter(item => { return !item.completed; }));
	}, [data]);

	const removeItem = (index: number) => {
		data[index] = { title: '', description: '', completed: false };
		setData(formatArray(data));
	};

	const formatArray = (array: Item[]) => {
		const newArray: Item[] = array.filter(item => { return item.title.length > 0 && item.description.length > 0; });
		return newArray;
	};
	const completeItem = (index: number) => {
		data[index].completed = true;
		setData(formatArray(data));
	};

	const SwipeableRow = ({ item, index }: { item: Item, index: React.Key }) => {
		return (
			<SwipeableItem removeItem={removeItem} completeItem={completeItem} completed={item.completed} index={index as number} >
				<ListElement title={item.title} description={item.description} completed={item.completed} />
			</SwipeableItem>
		);
	};

	return (
		<GestureHandlerRootView >
			<View style={styles.container}>
				<View>
					<Text>Not Completed</Text>
					<FlatList
						data={notCompleted}
						ItemSeparatorComponent={() => <View style={styles.separator} />}
						renderItem={({ item, index }) => <SwipeableRow item={item} index={index} />}
						keyExtractor={(_item, index) => `message ${index}`}
					/>
					<Text>Completed</Text>
					<FlatList
						data={completed}
						ItemSeparatorComponent={() => <View style={styles.separator} />}
						renderItem={({ item, index }) => <SwipeableRow item={item} index={index} />}
						keyExtractor={(_item, index) => `message ${index}`}
					/>
				</View>
				<ItemModal data={data} setData={setData} />
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
