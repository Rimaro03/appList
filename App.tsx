import React from 'react';
import { Button, Pressable, useColorScheme } from 'react-native';
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './components/screen/ListScreen';
import HomeScreen from './components/screen/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {
	const scheme = useColorScheme();

	return (
		<Provider>
			<NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
				<Stack.Navigator
					initialRouteName="Home"
					screenOptions={{ title: 'APP LIST' }}>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="List" component={ListScreen} options={{
						headerRight: () => (
							<Pressable>
								<Icon name='dots-vertical' size={25} />
							</Pressable>
						),
					}} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider >
	);
};

export default App;
