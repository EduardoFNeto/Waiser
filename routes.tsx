import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider as PaperProvider } from "react-native-paper";

import Register from "./pages/Register";
import Login from "./pages/Login";
import LoginSocial from "./pages/LoginSocial";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import Parse from './services/parse'

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <PaperProvider>
      <Stack.Navigator
        initialRouteName={Parse.User.current() ? 'Main' : 'Welcome'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="Welcome" component={LoginSocial} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </PaperProvider>
  );
};

export default Routes;
