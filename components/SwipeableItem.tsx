import React from 'react';
import { Animated, StyleSheet, I18nManager, View } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedView = Animated.createAnimatedComponent(View);

const SwipeableItem = (props: any) => {
	// eslint-disable-next-line prefer-const
	let { completeItem, removeItem, index, completed } = props;

	const renderLeftAcions = (
		_progress: Animated.AnimatedInterpolation<number>,
		dragX: Animated.AnimatedInterpolation<number>,
	) => {
		const scale = dragX.interpolate({
			inputRange: [0, 80],
			outputRange: [0, 1],
			extrapolate: 'clamp',
		});

		return (

			<RectButton style={styles.leftAction} onPress={handleComplete}>
				<AnimatedView style={[styles.actionIcon, { transform: [{ scale }] }]}>
					<Icon name='check-circle' size={25} />
				</AnimatedView>
			</RectButton>
		);
	};

	const renderLeftAcionsCompleted = (
		_progress: Animated.AnimatedInterpolation<number>,
		dragX: Animated.AnimatedInterpolation<number>,
	) => {
		const scale = dragX.interpolate({
			inputRange: [0, 80],
			outputRange: [0, 1],
			extrapolate: 'clamp',
		});

		return (

			<RectButton style={styles.rightAction} onPress={handleComplete}>
				<AnimatedView style={[styles.actionIcon, { transform: [{ scale }] }]}>
					<Icon name='check-circle' size={25} />
				</AnimatedView>
			</RectButton>
		);
	};

	const renderRightAcions = (
		_progress: Animated.AnimatedInterpolation<number>,
		dragX: Animated.AnimatedInterpolation<number>,
	) => {
		const scale = dragX.interpolate({
			inputRange: [-80, 0],
			outputRange: [1, 0],
			extrapolate: 'clamp',
		});

		return (
			<RectButton style={styles.rightAction} onPress={handleRemove}>
				<AnimatedView style={[styles.actionIcon, { transform: [{ scale }] }]}>
					<Icon name='delete' size={25} />
				</AnimatedView>
			</RectButton>

		);
	};

	let swipeableRow: Swipeable;

	const updateRef = (ref: Swipeable) => {
		swipeableRow = ref;
	};

	const handleComplete = () => {
		swipeableRow.close();
		completeItem(index);
	};

	const handleRemove = () => {
		swipeableRow.close();
		removeItem(index);
	};

	const { children } = props;

	return (
		<Swipeable
			ref={updateRef}
			friction={2}
			leftThreshold={80}
			enableTrackpadTwoFingerGesture
			rightThreshold={80}
			renderLeftActions={completed ? renderLeftAcionsCompleted : renderLeftAcions}
			renderRightActions={renderRightAcions}>
			{children}
		</Swipeable>
	);
};

const styles = StyleSheet.create({
	leftAction: {
		flex: 1,
		backgroundColor: '#388e3c',
		justifyContent: 'flex-end',
		alignItems: 'center',
		flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
	},
	actionIcon: {
		marginHorizontal: 10,
	},
	rightAction: {
		alignItems: 'center',
		flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
		backgroundColor: '#dd2c00',
		flex: 1,
		justifyContent: 'flex-end',
	},
	actionText: {
		color: 'white',
		fontSize: 16,
		backgroundColor: 'transparent',
		padding: 10,
	},
});

export default SwipeableItem;
