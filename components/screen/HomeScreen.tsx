import React, { useEffect, useRef, useState } from 'react';
import { AppState, StyleSheet, View } from 'react-native';
import ListName from '../ListName';
import List from '../interfaces/List';
import ListModal from '../ListModal';
import { getAllLists, save } from '../../functions/ListManager';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';

const HomeScreen = (): JSX.Element => {
	const [loading, setLoading] = useState(true);
	const [lists, setLists] = useState<List[]>([]);
	const route: RouteProp<ParamListBase, string> = useRoute();
	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(appState.current);

	useEffect(() => {
		getAllLists()
			.then(res => setLists(res as List[]))
			.catch(err => console.error(err));
		if (lists) {
			setLoading(false);
		}
	}, [route.params]);

	useEffect(() => {
		const subscription = AppState.addEventListener('change', async nextAppState => {
			appState.current = nextAppState;
			setAppStateVisible(appState.current);
			if (appState.current == 'background') {
				await save(lists);
			}
		});

		return () => {
			subscription.remove();
		};
	}, []);

	return (
		<GestureHandlerRootView>
			<View style={styles.container}>
				<ScrollView>
					{!loading &&
						lists.map((item: List, index: React.Key) => {
							return (
								<ListName
									name={item.name}
									icon={item.icon}
									completed={item.completed}
									notCompleted={item.notCompleted}
									iconColor={item.iconColor}
									key={index}
								/>
							);
						})}
				</ScrollView >
				<ListModal />
			</View>
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '100%',
	}
});

export default HomeScreen;
