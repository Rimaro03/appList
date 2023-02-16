import React from 'react';
import { Snackbar } from 'react-native-paper';
import SnackProps from './interfaces/SnackProps';

const Snack = (props: SnackProps) => {
	const {label, action, snackVisible, setSnackVisible} = props;

	const onToggleSnackBar = () => setSnackVisible(!snackVisible);

	const onDismissSnackBar = () => setSnackVisible(false);

	return (
		<Snackbar
			visible={snackVisible}
			onDismiss={onDismissSnackBar}
			duration={5000}
			action={{
				label: 'Close',
				onPress: () => {
					onToggleSnackBar();
				},
			}}>
			{label}
		</Snackbar>
	);
};

export default Snack;