import React from 'react';
import { useColorScheme } from 'react-native';

import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './components/screen/ListScreen';
import HomeScreen from './components/screen/HomeScreen';

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {
	const scheme = useColorScheme();

	return (
		<NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{ title: 'APP LIST' }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="List" component={ListScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
