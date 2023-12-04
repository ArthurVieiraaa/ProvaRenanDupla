import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import CompassScreen from './screens/CompassScreen';

const Stack = createStackNavigator();

export default function RootNavigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: false}} />
                <Stack.Screen name='CompassScreen' component={CompassScreen} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};