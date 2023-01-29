import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Item from './interfaces/Item';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const ListElement = ({ title, description, data, setData, index}: Item): JSX.Element => {
	const [menuOpen, setMenuOpen] = useState(false);

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
		<Pressable onPress={removeItem} onLongPress={()=>{setMenuOpen(true);}}>
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
		margin: 5,
		padding: 10,
		backgroundColor: '#cecece',
		borderRadius: 5,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end',
		margin: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: '#212121',
		borderRadius: 20,
		padding: 3,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	}
});

export default ListElement;
