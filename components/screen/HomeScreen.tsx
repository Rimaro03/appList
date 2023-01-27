import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ListName from '../ListName';
import * as listObj from '../../lists.json';
import List from '../interfaces/List';
import ListModal from '../ListModal';
import { getAllLists } from '../../functions/ListManager';
import { ScrollView } from 'react-native-gesture-handler';
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';

const HomeScreen = (): JSX.Element => {
	const [loading, setLoading] = useState(true);
	const [lists, setLists] = useState<List[]>([]);
	const route: RouteProp<ParamListBase, string> = useRoute();
	
	const list: List[] = listObj.lists;
	useEffect(() => {
		getAllLists()
			.then(res => setLists(res as List[]))
			.catch(err => console.error(err)
			);
		if (list) {
			setLoading(false);
		}
	}, [route.params, []]);

	return (
		<View style={styles.container}>
			<ScrollView>
				{/*!loading &&
					list.map((item: List, index: React.Key) => {
						return (
							<ListName
								name={item.name}
								icon={item.icon}
								data={item.data}
								iconColor={item.iconColor}
								key={index}
							/>
						);
					})*/}
				{!loading &&
					lists.map((item: List, index: React.Key) => {
						return (
							<ListName
								name={item.name}
								icon={item.icon}
								data={item.data}
								iconColor={item.iconColor}
								key={index}
							/>
						);
					})}
			</ScrollView >
			<ListModal/>
		</View>
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
