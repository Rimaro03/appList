import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Item from '../interfaces/Item';
import ListElement from '../ListElement';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import ItemModal from '../ItemModal';
import SwipeNotCompleted from '../SwipeNotCompleted';
import SwipeCompleted from '../SwipeCompleted';
import CompletedListElement from '../CompletedListElement';
import Snack from '../Snack';

const ListScreen = (): JSX.Element => {
	const route: RouteProp<ParamListBase, string> = useRoute();
	/**
	 * @todo: fix any type
	 */
	const params: any = route.params;
	const [snackVisible, setSnackVisible] = useState<boolean>(false);
	const [notCompleted, setNotCompleted] = useState<Array<Item>>(params.notCompleted);
	const [completed, setCompleted] = useState<Array<Item>>(params.completed);
	const [key, setKey] = useState(params.key);
	const [snackLabel, setSnackLabel] = useState('');

	useEffect(() => {
		setNotCompleted(notCompleted);
		setCompleted(completed);
		setKey(key);
	}, [params]);

	const removeItem = (index: number) => {
		try{
			notCompleted.splice(index, 1);
			completed.splice(index, 1);
		}
		catch(e){
			return;
		}
	};

	const completeItem = (index: number) => {
		const item: Item = notCompleted[index];
		notCompleted.splice(index, 1);
		setNotCompleted(notCompleted);
		setCompleted([...completed, item]);
	};

	const uncompleteItem = (index: number) => {
		const item: Item = completed[index];
		completed.splice(index, 1);
		setCompleted(completed);
		setNotCompleted([...completed, item]);
	};

	const handleNotCompetedSwipe = (direction: string, index: number) => {
		setSnackVisible(false);
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

	const handleCompetedSwipe = (direction: string, index: number) => {
		setSnackVisible(false);
		if (direction == 'left') {
			uncompleteItem(index);
			setSnackLabel('Task completed');
		}
		else if (direction == 'right') {
			removeItem(index);
			setSnackLabel('Task deleted');
		}
		setSnackVisible(true);
	};

	return (
		<GestureHandlerRootView >
			<View style={styles.container}>
				<ScrollView>
					{
						notCompleted?.map((item, index) => (
							<SwipeNotCompleted handleSwipe={handleNotCompetedSwipe} index={index as number} key={index}>
								<ListElement title={item.title} description={item.description} />
							</SwipeNotCompleted>
						))
					}
					{(completed && completed.length > 0) &&
						<View style={styles.titleBox}>
							<Text>Completed</Text>
						</View>
					}
					{
						completed?.map((item, index) => (
							<SwipeCompleted handleSwipe={handleCompetedSwipe} index={index as number} key={index}>
								<CompletedListElement title={item.title} description={item.description} />
							</SwipeCompleted>
						))
					}
				</ScrollView>
				<ItemModal notCompleted={notCompleted} setNotCompleted={setNotCompleted} />
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
