import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Item from './interfaces/Item';

const ListElement = ({ title, description, data, setData, index}: Item): JSX.Element => {

	const removeItem = () => {
		data![index!] = { title: '', description: '' };
		data = formatArray(data!);
		setData!(data);
	};

	const formatArray = (array: Item[]) => {
		const newArray: Item[] = array.filter(item => {return item.title.length > 0 && item.description.length > 0; });
		return newArray;
	};

	return (
		<Pressable>
			<View style={styles.container} >
				<View style={{ display: 'flex', flexDirection: 'row' }}>
					<View style={{ margin: 5, marginRight: 15 }}>
						<Icon name={'check-circle'} size={25} />
					</View>
					<View>
						<Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
						<Text>{description}</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: 10,
		backgroundColor: 'black',
	}
});

export default ListElement;
