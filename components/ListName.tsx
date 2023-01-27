import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import List from './interfaces/List';

const ListName = ({ name, icon, iconColor, data }: List): JSX.Element => {
	type NavigationProps = NativeStackNavigationProp<ParamListBase>;
	const navigation = useNavigation<NavigationProps>();
	return (
		<View
			style={styles.container}
			onTouchEnd={() => {
				navigation.navigate('List', { data: data, key: name });
			}}>
			<View style={styles.list}>
				<Icon name={icon} size={25} color={iconColor} />
				<Text style={styles.name}>{name}</Text>
			</View>
			<View style={styles.numData}>
				<Text style={{ fontSize: 15 }}>{data.length}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	list: {
		margin: 5,
		padding: 10,
		display: 'flex',
		flexDirection: 'row',
	},
	name: {
		margin: 2,
		marginLeft: 10,
		fontSize: 15,
	},
	numData: {
		margin: 5,
		padding: 10,
	},
});

export default ListName;
