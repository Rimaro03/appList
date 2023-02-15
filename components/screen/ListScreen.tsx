import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Item from '../interfaces/Item';
import ListElement from '../ListElement';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import ItemModal from '../ItemModal';
import { Params } from '../interfaces/Params';
import { setItems } from '../../functions/ListManager';
import SwipeNotCompleted from '../SwipeNotCompleted';
import SwipeCompleted from '../SwipeCompleted';
import CompletedListElement from '../CompletedListElement';
import Snack from '../Snack';

const ListScreen = (): JSX.Element => {
	const route: RouteProp<ParamListBase, string> = useRoute();
	const [params] = useState<Params>(route.params as Params);
	const [snackVisible, setSnackVisible] = useState<boolean>(false);
	const [data, setData] = useState<Array<Item>>(params.data);
	const [notCompleted, setNotCompleted] = useState<Array<Item>>();
	const [completed, setCompleted] = useState<Array<Item>>();
	const [key, setKey] = useState(params.key);
	const [snackLabel, setSnackLabel] = useState('');

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

	const uncompleteItem = (index: number) => {
		data[index].completed = false;
		setData(formatArray(data));
	};

	const handleNotCompetedSwipe = (direction: string, index: number) => {
		if (direction == 'left') {
			completeItem(index);
			setSnackLabel('Task completed');
		}
		else if (direction == 'right') {
			removeItem(index);
			setSnackLabel('Task deleted');
		}
		setSnackVisible(true);
	};

	const SwipeableRow = ({ item, index }: { item: Item, index: React.Key }) => (
		<>
			{!item.completed ?
				<SwipeNotCompleted handleSwipe={handleNotCompetedSwipe} index={index as number} >
					<ListElement title={item.title} description={item.description} completed={item.completed} />
				</SwipeNotCompleted>
				:
				<SwipeCompleted removeItem={removeItem} uncompleteItem={uncompleteItem} index={index as number} >
					<CompletedListElement title={item.title} description={item.description} completed={item.completed} />
				</SwipeCompleted>
			}
		</>
	);

	return (
		<GestureHandlerRootView >
			<View style={styles.container}>
				<ScrollView>
					{
						notCompleted?.map((item, index) => (
							<SwipeableRow item={item} index={index} key={index} />
						))
					}
					{(completed && completed.length > 0) &&
						<View style={styles.titleBox}>
							<Text>Completed</Text>
						</View>
					}
					{
						completed?.map((item, index) => (
							<SwipeableRow item={item} index={index} key={index} />
						))
					}
				</ScrollView>
				<ItemModal data={data} setData={setData} />
			</View>
			<Snack label={snackLabel} action={() => {
				console.log(1);
			}} snackVisible={snackVisible} setSnackVisible={setSnackVisible} />
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
	titleBox: {
		alignSelf: 'center',
		backgroundColor: 'grey',
		padding: 5,
		margin: 10,
		borderRadius: 5,
	},

});

export default ListScreen;
