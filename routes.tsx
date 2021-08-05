import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import {
  Provider as PaperProvider,
} from 'react-native-paper';

import SocialLogin from './pages/SocialLogin'
import Home from './pages/Home'

const Stack = createStackNavigator()

const Routes = () => {
  return (
    <PaperProvider>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen  name='Home' component={Home} />
        <Stack.Screen  name='SocialLogin' component={SocialLogin} />
      </Stack.Navigator>
    </PaperProvider>
  )
}

export default Routes
