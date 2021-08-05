import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
  Provider as PaperProvider
} from 'react-native-paper'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import LoginSocial from './pages/LoginSocial'

const Stack = createStackNavigator()

const Routes = () => {
  return (
    <PaperProvider>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen  name='Home' component={Home} />
        <Stack.Screen  name='Register' component={Register} />
        <Stack.Screen  name='Login' component={Login} />
        <Stack.Screen  name='LoginSocial' component={LoginSocial} />
      </Stack.Navigator>
    </PaperProvider>
  )
}

export default Routes
