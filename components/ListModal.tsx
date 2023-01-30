import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { addList } from '../functions/ListManager';

const ListModal = (): JSX.Element => {
	const [modalVisible, setModalVisible] = useState(false);
	const [listName, setListName] = useState('New List');
	const [emoticon, setEmoticon] = useState('emoticon-happy-outline');
	const [emoticonColor, setEmoticonColor] = useState('green');
	const [error, setError] = useState('');
	const [errorOpen, setErrorOpen] = useState(false);
	type NavigationProps = NativeStackNavigationProp<ParamListBase>;
	const navigation = useNavigation<NavigationProps>();

	const handleCompleted = () => {
		if(!(listName.length > 0)) return;
		addList(listName, {
			name: listName,
			icon: emoticon,
			iconColor: emoticonColor,
			data: []
		}).then(() => {
			setErrorOpen(false);
			setModalVisible(false);
			setListName('Nuova Lista');
			setEmoticon('emoticon-happy-outline');
			setEmoticonColor('green');
			navigation.navigate('Home');
		}).catch(err => {
			setError(err.message);
			setErrorOpen(true);
		});
	};

	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}>
				<View style={styles.modalContainerView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>{listName}</Text>
						<View style={styles.inputView}>
							<Icon name='emoticon-happy-outline' size={20} />
							<TextInput
								style={{ height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5 }}
								placeholder="Type a title for the list!"
								onChangeText={newText => setListName(newText)}
								defaultValue={listName}
							/>
						</View>
						{errorOpen && <Text>{error}</Text>}
						<Pressable
							style={[styles.modalButton, styles.buttonClose]}
							onPress={handleCompleted}>
							<Icon name={'check-bold'} />
						</Pressable>
					</View>
				</View>
			</Modal>
			<Pressable
				style={[styles.button, styles.buttonOpen]}
				onPress={() => setModalVisible(true)}
			>
				<Icon name={'plus'} size={25} />
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		padding: 10
	},
	modalContainerView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 22,
	},
	inputView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
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
	},
	modalButton: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginTop: 15,
		marginRight: 5,
		marginBottom: 5,
		alignSelf: 'flex-end'
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});

export default ListModal;