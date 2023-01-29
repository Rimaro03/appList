import React from 'react';
import { Animated, StyleSheet, I18nManager, View } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedView = Animated.createAnimatedComponent(View);

const SwipeableItem = (props: any) => {
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
			<View style={{
				width: 80,
			}}>
				<RectButton style={styles.leftAction} onPress={close}>
					<AnimatedView style={[styles.actionIcon, { transform: [{ scale }] }]}>
						<Icon name='delete' size={25}/>
					</AnimatedView>
				</RectButton>
			</View>
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

			<RectButton style={styles.rightAction} onPress={close}>
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

	const close = () => {
		swipeableRow.close();
	};

	const { children } = props;

	return (
		<Swipeable
			ref={updateRef}
			friction={2}
			leftThreshold={80}
			enableTrackpadTwoFingerGesture
			rightThreshold={80}
			renderLeftActions={renderLeftAcions}
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
});

export default SwipeableItem;
