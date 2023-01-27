import List from '../components/interfaces/List';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from '../components/interfaces/Item';

//async storage utility functions
export const addList = async(key: string, item: List) => {
	const secondItem : List | undefined = await getList(`@${key}`)
		.then(res => res)
		.catch(() => {
			throw new Error(`Error on setting list ${key}`);
		});
	
	if(secondItem == undefined){
		try {
			const jsonValue = JSON.stringify(item);
			await AsyncStorage.setItem(`@${key}`, jsonValue);
		} catch (e) {
			throw new Error(`ERROR SAVING LIST ${key}`);
		}
	}
	else{
		throw new Error('List already exists');
	}
};

export const setItems = async(key: string, items: Item[]) => {
	const list: List | undefined = await getList(`@${key}`);
	list!.data = items;
	await AsyncStorage.mergeItem(`@${key}`, JSON.stringify(list));
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
	let keys: readonly string[] = [];
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