import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Item from '../interfaces/Item';
import ListElement from '../ListElement';
import { ScrollView } from 'react-native-gesture-handler';
import ItemModal from '../ItemModal';
import { Params } from '../interfaces/Params';
import { setItems } from '../../functions/ListManager';

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
	
	return (
		<View style={styles.container}>
			<ScrollView>
				{data.map((item: Item, index: React.Key) => {
					return (
						<ListElement title={item.title} description={item.description} data={data} setData={setData} index={index as number} key={index} />
					);
				})}
			</ScrollView>
			<ItemModal data={data} setData={setData}/>
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

export default ListScreen;
