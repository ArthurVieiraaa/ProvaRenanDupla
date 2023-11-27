import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import DelProduto from './screens/DelProduto';
import AppAdmin from './screens/AppAdmin';
import PainelAdmin from './screens/PainelAdmin';

const Stack = createStackNavigator();

export default function RootNavigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: true}} />
                <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
                <Stack.Screen name='DelProduto' component={DelProduto} options={{headerShown: true}} />
                <Stack.Screen name='AppAdmin' component={AppAdmin} options={{headerShown: true}} />
                <Stack.Screen name='PainelAdmin' component={PainelAdmin} options={{headerShown: true}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}