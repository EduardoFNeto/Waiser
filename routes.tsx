import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider as PaperProvider } from "react-native-paper";

import Register from "./pages/Register";
import Login from "./pages/Login";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { UserContext } from "./contexts/user";
import Welcome from "./pages/Welcome";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";

const Stack = createStackNavigator();

const Routes = () => {
  const [user] = useContext(UserContext);

  return (
    <PaperProvider>
      <Stack.Navigator
        initialRouteName={user ? 'Main' : 'Welcome'}
        screenOptions={{
        }}
      >
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
      </Stack.Navigator>
    </PaperProvider>
  );
};

export default Routes;
