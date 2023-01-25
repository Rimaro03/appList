import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import Item from '../interfaces/Item';
import ListElement from '../ListElement';

const ListScreen = (): JSX.Element => {
	const route: RouteProp<ParamListBase, string> = useRoute();
	const data = route.params as Array<Item>;
	return (
		<ScrollView>
			{data.map((item: Item, index: React.Key) => {
				return (
					<ScrollView key={index}>
						<ListElement title={item.title} description={item.description} />
					</ScrollView>
				);
			})}
		</ScrollView>
	);
};



export default ListScreen;
