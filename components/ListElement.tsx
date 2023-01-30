import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Item from './interfaces/Item';

const ListElement = ({ title, description }: Item): JSX.Element => {
	return (
		<View style={styles.container} >
			<View style={{ display: 'flex', flexDirection: 'row' }}>
				<View style={{ margin: 5, marginRight: 15 }}>
					<Icon name={'checkbox-blank-circle-outline'} size={25} />
				</View>
				<View>
					<Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
					<Text>{description}</Text>
				</View>
			</View>
		</View>
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
