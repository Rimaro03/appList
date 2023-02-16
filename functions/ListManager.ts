import List from '../components/interfaces/List';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from '../components/interfaces/Item';

//async storage utility functions
export const addList = async(key: string, item: List) => {
	/**
	 * @todo: move the controls on the home screen
	 */
	try {
		const jsonValue = JSON.stringify(item);
		await AsyncStorage.setItem(`@${key}`, jsonValue);
	} catch (e) {
		throw new Error(`Error on saving list ${key}`);
	}
};

export const setItems = async(key: string, items: Item[]) => {
	await AsyncStorage.mergeItem(`@${key}`, JSON.stringify(items));
};

export const getList = async(key: string):Promise<List | undefined> => {
	try {
		const jsonValue = await AsyncStorage.getItem(`${key}`);
		if(jsonValue){
			return await JSON.parse(jsonValue);
		}
	} catch(e) {
		throw new Error(`Error on getting list ${key}`);
	}
};

export const getAllLists = async(): Promise<List[]> => {
	let keys: readonly string[];
	try {
		keys = await AsyncStorage.getAllKeys();
	} catch(e) {
		throw new Error('Error on getting all keys');
	}
	const lists: List[] = [];
	for(const key of keys){
		const item: List | undefined = await getList(key);
		if(item){
			lists.push(item);
		}
	}
	return lists;
};


export const save = async(lists: List[]) => {
	const multiMerge: [string, string][] = [];
	lists.forEach(list => {
		const key = list.name;
		const data = list;
		multiMerge.push([
			key,
			JSON.stringify(data)
		]);
	});
	await AsyncStorage.multiMerge(multiMerge);
};
