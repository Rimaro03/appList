import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Item from './interfaces/Item';
import Props from './interfaces/Props';

const ItemModal = (props: Props): JSX.Element => {
	const [modalVisible, setModalVisible] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	type NavigationProps = NativeStackNavigationProp<ParamListBase>;
	const navigation = useNavigation<NavigationProps>();
	const {data, setData} = props;

	const handleCompleted = () => {
		if(!(title.length > 0 && description.length > 0)) return;
		const newItem :Item = {title: title, description: description, completed: false};
		setData([...data, newItem]);
		setModalVisible(false);
		setTitle('');
		setDescription('');
		navigation.navigate('List', {refresh: true});
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
						<Text style={styles.modalText}>{title}</Text>
						<View style={styles.inputView}>
							<View style={{flexDirection: 'column'}}>
								<TextInput
									style={{ height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5 }}
									placeholder="Type a title!"
									onChangeText={newText => setTitle(newText)}
									defaultValue={title}
								/>
								<TextInput
									style={{ height: 40, borderBottomColor: 'white', borderBottomWidth: 0.5 }}
									placeholder="Type a description!"
									onChangeText={newText => setDescription(newText)}
									defaultValue={description}
								/>
							</View>
						</View>
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

export default ItemModal;