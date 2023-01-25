import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListName from '../ListName';
import * as listObj from '../../lists.json';
import List from '../interfaces/List';
import ListModal from '../ListModal';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = (): JSX.Element => {
	const [loading, setLoading] = useState(true);

	const list: List[] = listObj.lists;
	useEffect(() => {
		if (list) {
			setLoading(false);
		}
	}, [list]);

	return (
		<View style={styles.container}>
			<View>
				{!loading &&
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
					})}
			</View>
			<ListModal />
		</View >
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: 1100
	}
});

/* const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  alignItems: 'flex-start',
	},
	list: {
	  margin: 10,
	  padding: 10,
	  borderColor: 'black',
	  borderWidth: 1,
	},
  });
*/

/*const storeData = async (value: Item) => {
  try {
   const jsonValue = JSON.stringify(value);
   await AsyncStorage.setItem('@storage_Key', jsonValue);
  } catch (e) {
   // saving error
  }
};*/

export default HomeScreen;
