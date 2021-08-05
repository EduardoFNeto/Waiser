import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider as PaperProvider } from "react-native-paper";

import Register from "./pages/Register";
import Login from "./pages/Login";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { UserContext } from "./contexts/user";
import Welcome from "./pages/Welcome";
import Settings from "./pages/Settings";

const Stack = createStackNavigator();

const Routes = () => {
  const [user] = useContext(UserContext);

  return (
    <PaperProvider>
      <Stack.Navigator
        initialRouteName={user ? 'Main' : 'Welcome'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </PaperProvider>
  );
};

export default Routes;
