import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
  Provider as PaperProvider,
} from 'react-native-paper';

import SocialLogin from './pages/SocialLogin'
import Register from './pages/Register'
import Home from './pages/Home'

const Stack = createStackNavigator()

const Routes = () => {
  return (
    <PaperProvider>
      <Stack.Navigator 
        headerMode='none'
        initialRouteName="Home">
        <Stack.Screen  name='Home' component={Home} />
        <Stack.Screen  name='Register' component={Register} />
        <Stack.Screen  name='loginSocial' component={SocialLogin} />
      </Stack.Navigator>
    </PaperProvider>
  )
}

export default Routes
