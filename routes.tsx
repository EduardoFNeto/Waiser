import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import {
  Provider as PaperProvider,
} from 'react-native-paper';

import Login from './pages/Login'

const Stack = createStackNavigator()

const Routes = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
        >
          <Stack.Screen  name='Login' component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default Routes
